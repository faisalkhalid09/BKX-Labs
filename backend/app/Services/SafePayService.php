<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;

class SafePayService
{
    protected $apiKey;
    protected $secretKey;
    protected $webhookSecret;
    protected $baseUrl;
    protected $mode;

    public function __construct()
    {
        $this->apiKey = config('services.safepay.api_key');
        $this->secretKey = config('services.safepay.secret_key');
        $this->webhookSecret = config('services.safepay.webhook_secret');
        $this->mode = config('services.safepay.environment', 'sandbox');
        
        $this->baseUrl = ($this->mode === 'production') 
            ? 'https://api.getsafepay.com' 
            : 'https://sandbox.api.getsafepay.com';
    }

    /**
     * Build the direct checkout URL for the Express Checkout (Redirect Flow)
     */
    public function createCheckoutUrl($amount, $orderRef, $currency = 'USD')
    {
        $this->assertConfigured();

        $params = [
            'merchant_api_key' => $this->apiKey,
            'amount'           => $amount,
            'currency'         => $currency,
            'metadata'         => json_encode(['order_id' => $orderRef]),
            'success_url'      => route('checkout.success'),
            'cancel_url'       => route('checkout.create'),
        ];

        $queryString = http_build_query($params);
        
        return "{$this->baseUrl}/checkout/pay?{$queryString}";
    }

    /**
     * Verify the webhook signature from SafePay
     */
    public function verifySignature($payload, $headerSignature)
    {
        $this->assertConfigured();
        
        if (empty($headerSignature)) {
            return false;
        }

        // SafePay signature verification: HMAC-SHA256 of the JSON payload
        $computedSignature = hash_hmac('sha256', json_encode($payload), $this->webhookSecret);
        
        return hash_equals($computedSignature, $headerSignature);
    }

    protected function assertConfigured()
    {
        if (empty($this->apiKey) || empty($this->secretKey)) {
            throw new Exception("SafePay API or Secret key is missing in config.");
        }
    }
}
