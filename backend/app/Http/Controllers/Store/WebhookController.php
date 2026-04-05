<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\SafePayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    protected $safepay;

    public function __construct(SafePayService $safepay)
    {
        $this->safepay = $safepay;
    }

    /**
     * Handle incoming SafePay webhook events.
     */
    public function handle(Request $request)
    {
        $payload = $request->all();
        $signature = $request->header('X-SFPY-Signature');
        
        Log::info('SafePay Webhook Received', [
            'event'     => $payload['type'] ?? 'unknown',
            'signature' => $signature ? 'Present' : 'Missing'
        ]);

        // 1. Verify HMAC Signature
        if (!$this->safepay->verifySignature($payload, $signature)) {
            Log::error('SafePay Webhook: Invalid signature', ['payload' => $payload]);
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $event = $payload['type'] ?? null;

        // 2. Process Event
        try {
            if ($event === 'payment.succeeded') {
                $this->handlePaymentSucceeded($payload);
            } elseif ($event === 'payment.failed') {
                $this->handlePaymentFailed($payload);
            }
        } catch (\Exception $e) {
            Log::error('SafePay Webhook Processing Error: ' . $e->getMessage());
            return response()->json(['error' => 'Processing failed'], 500);
        }

        return response()->json(['status' => 'success']);
    }

    protected function handlePaymentSucceeded($payload)
    {
        $trackerToken = $payload['data']['tracker']['token'] ?? null;
        $metadata = $payload['data']['metadata'] ?? [];
        
        // If metadata is a string (SafePay sometimes encodes it), decode it
        if (is_string($metadata)) {
            $metadata = json_decode($metadata, true);
        }

        $orderNumber = $metadata['order_id'] ?? null;

        Log::info('SafePay Payment Succeeded', [
            'order_number' => $orderNumber,
            'tracker'      => $trackerToken
        ]);

        if ($orderNumber) {
            $order = Order::where('order_number', $orderNumber)->first();
            
            if ($order && $order->status !== 'paid') {
                $order->update([
                    'status'                 => 'paid',
                    'safepay_tracker_token'  => $trackerToken, // Store the tracker for reference
                    'download_expires_at'    => now()->addHours(48),
                ]);
                
                Log::info("Order #{$orderNumber} marked as PAID via SafePay Webhook.");
            }
        }
    }

    protected function handlePaymentFailed($payload)
    {
        $metadata = $payload['data']['metadata'] ?? [];
        if (is_string($metadata)) {
            $metadata = json_decode($metadata, true);
        }
        
        $orderNumber = $metadata['order_id'] ?? null;

        if ($orderNumber) {
            Order::where('order_number', $orderNumber)
                 ->where('status', 'pending')
                 ->update(['status' => 'failed']);
        }
    }
}
