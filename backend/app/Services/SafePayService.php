<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;

class SafePayService
{
    protected string $apiKey;
    protected string $secretKey;
    protected string $baseUrl;
    protected string $environment;

    public function __construct()
    {
        $this->apiKey      = config('services.safepay.api_key');
        $this->secretKey   = config('services.safepay.secret_key');
        $this->environment = config('services.safepay.environment', 'sandbox');
        $this->baseUrl     = $this->environment === 'production'
            ? 'https://api.getsafepay.com'
            : 'https://sandbox.api.getsafepay.com';
    }

    /**
     * Create a payment tracker (session) on SafePay.
     *
     * @param  int|float  $amount     Amount in the smallest unit (e.g. cents for USD: $10 = 1000)
     * @param  string     $currency   e.g. 'USD', 'PKR'
     * @param  string     $orderId    Your internal order reference for metadata
     * @return array      ['token' => 'track_xxx', ...]
     * @throws \RuntimeException
     */
    public function createPaymentSession(int $amount, string $currency, string $orderId): array
    {
        $this->assertConfigured();

        try {
            $response = Http::withToken($this->secretKey)
                ->timeout(10)
                ->post("{$this->baseUrl}/order/payments/v3/", [
                    'merchant_api_key' => $this->apiKey,
                    'intent'           => 'CYBERSOURCE',
                    'mode'             => 'payment',
                    'entry_mode'       => 'raw',
                    'currency'         => $currency,
                    'amount'           => $amount,
                    'metadata'         => [
                        'order_id' => $orderId,
                        'source'   => 'bkxlabs',
                    ],
                    'include_fees'     => false,
                ]);

            $this->throwIfFailed($response, 'createPaymentSession');

            $data = $response->json('data.tracker');

            if (empty($data['token'])) {
                throw new \RuntimeException('SafePay returned an unexpected tracker response.');
            }

            Log::info('SafePay tracker created', ['tracker' => $data['token'], 'order' => $orderId]);

            return $data;

        } catch (ConnectionException $e) {
            Log::error('SafePay connection failed (createPaymentSession)', ['error' => $e->getMessage()]);
            throw new \RuntimeException('Payment gateway is temporarily unavailable. Please try again shortly.');
        }
    }

    /**
     * Create a short-lived authentication token (valid for 1 hour).
     *
     * @return string  The token string
     * @throws \RuntimeException
     */
    public function createAuthToken(): string
    {
        $this->assertConfigured();

        try {
            $response = Http::withToken($this->secretKey)
                ->timeout(10)
                ->post("{$this->baseUrl}/client/passport/v1/token");

            $this->throwIfFailed($response, 'createAuthToken');

            $token = $response->json('data');

            if (empty($token)) {
                throw new \RuntimeException('SafePay returned an empty authentication token.');
            }

            return $token;

        } catch (ConnectionException $e) {
            Log::error('SafePay connection failed (createAuthToken)', ['error' => $e->getMessage()]);
            throw new \RuntimeException('Payment gateway is temporarily unavailable. Please try again shortly.');
        }
    }

    /**
     * Build the hosted checkout redirect URL.
     *
     * @param  string       $trackerToken   From createPaymentSession
     * @param  string       $authToken      From createAuthToken
     * @param  string       $redirectUrl    Success redirect URL on your site
     * @param  string       $cancelUrl      Cancel redirect URL on your site
     * @param  string|null  $customerToken  Optional: prefill shopper (cus_xxx)
     * @return string       Full URL to redirect the user to
     */
    public function buildCheckoutUrl(
        string $trackerToken,
        string $authToken,
        string $redirectUrl,
        string $cancelUrl,
        ?string $customerToken = null
    ): string {
        $checkoutBase = $this->environment === 'production'
            ? 'https://app.getsafepay.com'
            : 'https://sandbox.api.getsafepay.com';

        $params = [
            'env'          => $this->environment,
            'tracker'      => $trackerToken,
            'tbt'          => $authToken,
            'source'       => 'hosted',
            'redirect_url' => $redirectUrl,
            'cancel_url'   => $cancelUrl,
        ];

        if ($customerToken) {
            $params['user_id'] = $customerToken;
        }

        return "{$checkoutBase}/embedded/pay/?" . http_build_query($params);
    }

    /**
     * Fetch the current state of a tracker to verify payment status.
     *
     * @param  string  $trackerToken
     * @return array|null  The full tracker data or null on failure
     */
    public function fetchTracker(string $trackerToken): ?array
    {
        $this->assertConfigured();

        try {
            $response = Http::withToken($this->secretKey)
                ->timeout(10)
                ->get("{$this->baseUrl}/reporter/api/v1/payments/{$trackerToken}");

            if (! $response->successful()) {
                Log::warning('SafePay fetchTracker returned non-200', [
                    'tracker' => $trackerToken,
                    'status'  => $response->status(),
                    'body'    => $response->body(),
                ]);
                return null;
            }

            return $response->json('data.tracker');

        } catch (ConnectionException $e) {
            Log::error('SafePay connection failed (fetchTracker)', [
                'tracker' => $trackerToken,
                'error'   => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Determine whether a fetched tracker represents a completed (paid) payment.
     *
     * @param  array|null  $trackerData
     * @return bool
     */
    public function isTrackerPaid(?array $trackerData): bool
    {
        if (empty($trackerData)) {
            return false;
        }

        return ($trackerData['state'] ?? '') === 'TRACKER_ENDED'
            && ($trackerData['is_success'] ?? false) === true;
    }

    /**
     * Verify the SafePay webhook signature.
     *
     * SafePay signs webhooks using HMAC-SHA256 of the raw request body
     * with your webhook secret key. The signature is in the X-SFPY-Signature header.
     *
     * @param  string  $rawBody
     * @param  string  $signature  Value from X-SFPY-Signature header
     * @return bool
     */
    public function verifyWebhookSignature(string $rawBody, string $signature): bool
    {
        $secret = config('services.safepay.webhook_secret');

        if (empty($secret)) {
            Log::critical('SafePay webhook secret is not configured (SAFEPAY_WEBHOOK_SECRET).');
            return false;
        }

        $computed = hash_hmac('sha256', $rawBody, $secret);
        return hash_equals($computed, strtolower($signature));
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Private helpers
    // ─────────────────────────────────────────────────────────────────────────

    private function assertConfigured(): void
    {
        if (empty($this->apiKey) || empty($this->secretKey)) {
            throw new \RuntimeException(
                'SafePay API credentials are not configured. Set SAFEPAY_API_KEY and SAFEPAY_SECRET_KEY in .env.'
            );
        }
    }

    private function throwIfFailed($response, string $context): void
    {
        if (! $response->successful()) {
            $body = $response->json();
            $errors = $body['status']['errors'] ?? [];
            $message = ! empty($errors)
                ? implode('; ', (array) $errors)
                : ($body['status']['message'] ?? 'Unknown SafePay error');

            Log::error("SafePay API error in {$context}", [
                'status'  => $response->status(),
                'message' => $message,
                'body'    => $response->body(),
            ]);

            throw new \RuntimeException("SafePay error: {$message}");
        }
    }
}
