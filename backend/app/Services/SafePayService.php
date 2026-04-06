<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SafePayService
{
    protected $merchantKey;
    protected $apiKey;
    protected $secretKey;
    protected $webhookSecret;
    protected $baseUrl;
    protected $mode;
    protected $caBundle;
    protected $disableSslVerify;
    protected $checkoutBaseUrl;

    public function __construct()
    {
        $this->merchantKey = config('services.safepay.merchant_key');
        $this->apiKey = config('services.safepay.api_key');
        $this->secretKey = config('services.safepay.secret_key');
        $this->webhookSecret = config('services.safepay.webhook_secret');
        $this->caBundle = config('services.safepay.ca_bundle');
        $this->disableSslVerify = filter_var(config('services.safepay.disable_ssl_verify', false), FILTER_VALIDATE_BOOL);
        $configuredMode = strtolower(trim((string) config('services.safepay.environment', 'sandbox')));
        $this->mode = in_array($configuredMode, ['production', 'prod', 'live'], true)
            ? 'production'
            : 'sandbox';
        
        $this->baseUrl = ($this->mode === 'production') 
            ? 'https://api.getsafepay.com' 
            : 'https://sandbox.api.getsafepay.com';

        // Hosted checkout URL base for redirect flow.
        $this->checkoutBaseUrl = ($this->mode === 'production')
            ? 'https://getsafepay.com'
            : 'https://sandbox.api.getsafepay.com';
    }

    /**
     * Build the direct checkout URL for the Express Checkout (Redirect Flow)
     */
    public function createCheckoutUrl($amount, $orderRef, $currency = 'USD', $stateToken = null)
    {
        $this->assertConfigured();

        if (empty($stateToken)) {
            throw new Exception('Checkout state token is missing.');
        }

        $merchantKey = $this->resolveMerchantApiKey();
        $successUrl = route('checkout.success', [
            'success'  => 'true',
            'order_ref'=> $orderRef,
            'state'    => $stateToken,
        ]);
        $cancelUrl = route('checkout.popup.cancel', [
            'order_ref'=> $orderRef,
            'state'    => $stateToken,
        ]);

        $amountMinor = $this->toMinorAmount((float) $amount);

        // Try variants in order and return the first one that doesn't render the invalid-session page.
        $candidates = [
            ['source' => 'hosted', 'include_order_id' => false],
            ['source' => 'hosted', 'include_order_id' => true],
            ['source' => 'checkout', 'include_order_id' => true],
        ];

        $lastUrl = null;
        foreach ($candidates as $candidate) {
            $source = $candidate['source'];
            $includeOrderId = (bool) $candidate['include_order_id'];

            $tracker = $this->createPaymentSession($amountMinor, (string) $currency, (string) $orderRef);
            $passportToken = $this->createPassportToken($tracker, (string) $orderRef, $source);
            $params = $this->buildCheckoutParams($source, $includeOrderId, $orderRef, $tracker, $passportToken, $successUrl, $cancelUrl);

            $queryString = http_build_query($params);
            $url = "{$this->checkoutBaseUrl}/checkout/pay?{$queryString}";
            $lastUrl = $url;

            $isValid = $this->looksLikeValidCheckoutPage($url);

            Log::info('SafePay checkout redirect params', [
                'mode'         => $this->mode,
                'base_url'     => $this->baseUrl,
                'checkout_base_url' => $this->checkoutBaseUrl,
                'merchant_key_prefix' => substr($merchantKey, 0, 8),
                'has_api_key'  => !empty($this->apiKey),
                'tracker_prefix' => substr((string) $tracker, 0, 10),
                'tbt_prefix'   => substr((string) $passportToken, 0, 8),
                'amount_minor' => $amountMinor,
                'source'       => $source,
                'include_order_id' => $includeOrderId,
                'param_keys'   => array_keys($params),
                'redirect_url' => $params['redirect_url'] ?? null,
                'success_url'  => $params['success_url'] ?? null,
                'cancel_url'   => $params['cancel_url'],
                'preflight_valid' => $isValid,
            ]);

            if ($isValid) {
                return $url;
            }
        }

        // Fallback to the last generated URL if Safepay preflight checks are inconclusive.
        return (string) $lastUrl;
    }

    /**
     * Verify the webhook signature from SafePay
     */
    public function verifySignature(string $rawPayload, string $headerSignature = null): bool
    {
        if (empty($this->webhookSecret)) {
            throw new Exception('SafePay webhook secret is missing in config.');
        }
        
        if (empty($headerSignature)) {
            return false;
        }

        // Support headers like "sha256=<hash>" or plain hash.
        if (str_contains($headerSignature, '=')) {
            [, $headerSignature] = explode('=', $headerSignature, 2);
        }
        $headerSignature = trim($headerSignature);

        // SafePay signature verification: HMAC-SHA256 of the raw request body.
        $computedSignature = hash_hmac('sha256', $rawPayload, $this->webhookSecret);
        
        return hash_equals($computedSignature, $headerSignature);
    }

    protected function assertConfigured()
    {
        if (empty($this->resolveMerchantApiKey()) || empty($this->secretKey)) {
            throw new Exception("SafePay merchant API key or secret key is missing in config.");
        }
    }

    protected function createPassportToken(string $tracker, string $orderRef, string $source = 'hosted'): string
    {
        $merchantApiKey = $this->resolveMerchantApiKey();

        $request = Http::acceptJson()
            ->withHeaders([
                'X-SFPY-API-KEY' => $merchantApiKey,
                'X-SFPY-MERCHANT-SECRET' => (string) $this->secretKey,
                'Content-Type' => 'application/json',
            ]);

        if (!empty($this->caBundle)) {
            $request = $request->withOptions(['verify' => (string) $this->caBundle]);
        } elseif ($this->disableSslVerify) {
            // For diagnostics only; keep disabled in production.
            $request = $request->withOptions(['verify' => false]);
        }

        $payload = [
            'tracker' => $tracker,
            'source' => $source,
            'order_id' => $orderRef,
        ];

        $response = $request->post("{$this->baseUrl}/client/passport/v1/token", $payload);

        $token = $this->firstNonEmptyString($response->json(), [
            'data.token',
            'data',
            'token',
        ]);
        if ($token !== '') {
            return $token;
        }

        // Fallback to legacy body accepted by some tenants.
        $fallbackResponse = $request->withBody('{}', 'application/json')->post("{$this->baseUrl}/client/passport/v1/token");
        $fallbackToken = $this->firstNonEmptyString($fallbackResponse->json(), [
            'data.token',
            'data',
            'token',
        ]);
        if ($fallbackToken !== '') {
            Log::warning('SafePay passport token created via legacy fallback payload.', [
                'mode' => $this->mode,
                'order_ref' => $orderRef,
                'tracker_prefix' => substr($tracker, 0, 10),
            ]);

            return $fallbackToken;
        }

        Log::error('SafePay passport token generation failed.', [
            'mode' => $this->mode,
            'order_ref' => $orderRef,
            'tracker_prefix' => substr($tracker, 0, 10),
            'merchant_key_prefix' => substr($merchantApiKey, 0, 8),
            'status' => $response->status(),
            'body' => $response->body(),
            'fallback_status' => $fallbackResponse->status(),
            'fallback_body' => $fallbackResponse->body(),
        ]);

        throw new Exception('Unable to create SafePay passport token for checkout.');
    }

    protected function createPaymentSession(int $amountMinor, string $currency, string $orderRef): string
    {
        $merchantApiKey = $this->resolveMerchantApiKey();

        $request = Http::acceptJson()
            ->withHeaders([
                'X-SFPY-API-KEY' => $merchantApiKey,
                'X-SFPY-MERCHANT-SECRET' => (string) $this->secretKey,
                'Content-Type' => 'application/json',
            ]);

        if (!empty($this->caBundle)) {
            $request = $request->withOptions(['verify' => (string) $this->caBundle]);
        } elseif ($this->disableSslVerify) {
            $request = $request->withOptions(['verify' => false]);
        }

        $payload = [
            'merchant_api_key' => $merchantApiKey,
            'intent' => 'CYBERSOURCE',
            'mode' => 'payment',
            'currency' => strtoupper($currency),
            'amount' => $amountMinor,
            'metadata' => [
                'order_id' => $orderRef,
                'source' => 'checkout',
            ],
        ];

        $response = $request->post("{$this->baseUrl}/order/payments/v3/", $payload);

        $tracker = $this->firstNonEmptyString($response->json(), [
            'data.tracker.token',
            'data.tracker',
            'data.token',
            'tracker.token',
            'tracker',
            'token',
        ]);

        if ($tracker !== '') {
            return $tracker;
        }

        Log::error('SafePay payment session creation failed.', [
            'mode' => $this->mode,
            'order_ref' => $orderRef,
            'amount_minor' => $amountMinor,
            'currency' => strtoupper($currency),
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        throw new Exception('Unable to create SafePay payment tracker for checkout.');
    }

    protected function resolveMerchantApiKey(): string
    {
        $candidates = array_values(array_filter([
            (string) $this->merchantKey,
            (string) $this->apiKey,
        ]));

        foreach ($candidates as $candidate) {
            if (str_starts_with($candidate, 'sec_')) {
                return $candidate;
            }
        }

        return $candidates[0] ?? '';
    }

    protected function toMinorAmount(float $amount): int
    {
        return (int) round($amount * 100);
    }

    protected function firstNonEmptyString(array $data, array $paths): string
    {
        foreach ($paths as $path) {
            $value = data_get($data, $path);
            if (is_string($value) && trim($value) !== '') {
                return trim($value);
            }
        }

        return '';
    }

    protected function buildCheckoutParams(
        string $source,
        bool $includeOrderId,
        string $orderRef,
        string $tracker,
        string $passportToken,
        string $successUrl,
        string $cancelUrl
    ): array {
        $params = [
            'env' => $this->mode,
            'source' => $source,
            'tracker' => $tracker,
            'tbt' => $passportToken,
            'cancel_url' => $cancelUrl,
        ];

        if ($source === 'checkout') {
            $params['success_url'] = $successUrl;
            $params['order_id'] = $orderRef;
        } else {
            $params['redirect_url'] = $successUrl;
            if ($includeOrderId) {
                $params['order_id'] = $orderRef;
            }
        }

        return $params;
    }

    protected function looksLikeValidCheckoutPage(string $url): bool
    {
        $request = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0',
        ])->withOptions([
            'http_errors' => false,
            'allow_redirects' => true,
        ]);

        if (!empty($this->caBundle)) {
            $request = $request->withOptions(['verify' => (string) $this->caBundle]);
        } elseif ($this->disableSslVerify) {
            $request = $request->withOptions(['verify' => false]);
        }

        try {
            $response = $request->get($url);
            $body = Str::lower((string) $response->body());

            if (str_contains($body, 'your session does not validate for either a payment or subscription')) {
                return false;
            }

            if (str_contains($body, 'tracker is in an invalid state')) {
                return false;
            }

            return $response->successful();
        } catch (\Throwable $e) {
            Log::warning('SafePay checkout preflight failed; allowing redirect fallback.', [
                'message' => $e->getMessage(),
            ]);

            return true;
        }
    }
}
