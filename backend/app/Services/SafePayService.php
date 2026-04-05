<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;

class SafePayService
{
    protected $merchantKey;
    protected $apiKey;
    protected $secretKey;
    protected $webhookSecret;
    protected $baseUrl;
    protected $mode;

    public function __construct()
    {
        $this->merchantKey = config('services.safepay.merchant_key');
        $this->apiKey = config('services.safepay.api_key');
        $this->secretKey = config('services.safepay.secret_key');
        $this->webhookSecret = config('services.safepay.webhook_secret');
        $configuredMode = strtolower(trim((string) config('services.safepay.environment', 'sandbox')));
        $this->mode = in_array($configuredMode, ['production', 'prod', 'live'], true)
            ? 'production'
            : 'sandbox';
        
        $this->baseUrl = ($this->mode === 'production') 
            ? 'https://api.getsafepay.com' 
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

        $merchantKey = (string) ($this->merchantKey ?: $this->apiKey);

        $params = [
            'merchant_api_key' => $merchantKey,
            'environment'      => $this->mode,
            'env'              => $this->mode,
            'source'           => 'checkout',
            'order_id'         => $orderRef,
            'amount'           => $amount,
            'currency'         => $currency,
            'metadata'         => json_encode(['order_id' => $orderRef]),
            'success_url'      => route('checkout.success', [
                'success'  => 'true',
                'order_ref'=> $orderRef,
                'state'    => $stateToken,
            ]),
            'cancel_url'       => route('checkout.popup.cancel', [
                'order_ref'=> $orderRef,
                'state'    => $stateToken,
            ]),
        ];

        Log::info('SafePay checkout redirect params', [
            'mode'         => $this->mode,
            'base_url'     => $this->baseUrl,
            'merchant_key_prefix' => substr($merchantKey, 0, 8),
            'has_api_key'  => !empty($this->apiKey),
            'param_keys'   => array_keys($params),
            'success_url'  => $params['success_url'],
            'cancel_url'   => $params['cancel_url'],
        ]);

        $queryString = http_build_query($params);
        
        return "{$this->baseUrl}/checkout/pay?{$queryString}";
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
        if ((empty($this->merchantKey) && empty($this->apiKey)) || empty($this->secretKey)) {
            throw new Exception("SafePay merchant/api key or secret key is missing in config.");
        }
    }
}
