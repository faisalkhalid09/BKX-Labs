<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
        $tracker = $this->createPaymentSession($amountMinor, (string) $currency, (string) $orderRef);
        $passportToken = $this->createPassportToken($tracker, (string) $orderRef);
        // Force the documented hosted flow shape to avoid tenant-level mode mismatch.
        $checkoutSource = 'hosted';

        $params = [
            'env'              => $this->mode,
            'source'           => $checkoutSource,
            'tracker'          => $tracker,
            'tbt'              => $passportToken,
            'redirect_url'     => $successUrl,
            'cancel_url'       => $cancelUrl,
        ];

        if (filter_var(config('services.safepay.include_order_id', false), FILTER_VALIDATE_BOOL)) {
            $params['order_id'] = $orderRef;
        }

        Log::info('SafePay checkout redirect params', [
            'mode'         => $this->mode,
            'base_url'     => $this->baseUrl,
            'checkout_base_url' => $this->checkoutBaseUrl,
            'merchant_key_prefix' => substr($merchantKey, 0, 8),
            'has_api_key'  => !empty($this->apiKey),
            'tracker_prefix' => substr((string) $tracker, 0, 10),
            'tbt_prefix'   => substr((string) $passportToken, 0, 8),
            'amount_minor' => $amountMinor,
            'source'       => $checkoutSource,
            'include_order_id' => array_key_exists('order_id', $params),
            'param_keys'   => array_keys($params),
            'redirect_url' => $params['redirect_url'] ?? null,
            'success_url'  => $params['success_url'] ?? null,
            'cancel_url'   => $params['cancel_url'],
        ]);

        $queryString = http_build_query($params);
        
        return "{$this->checkoutBaseUrl}/checkout/pay?{$queryString}";
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

    protected function createPassportToken(string $tracker, string $orderRef): string
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
            'source' => 'hosted',
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
}
