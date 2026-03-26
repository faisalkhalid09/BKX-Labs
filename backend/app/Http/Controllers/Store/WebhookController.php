<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->all();
        $signature = $request->header('X-Lemon-Squeezy-Signature');
        
        $secret = config('services.lemon-squeezy.signing_secret');
        
        if (!$secret) {
            Log::critical('Lemon Squeezy webhook: LEMON_SQUEEZY_SIGNING_SECRET is not set.');
            return response()->json(['error' => 'Webhook not configured'], 500);
        }
        
        $computedSignature = hash_hmac('sha256', $request->getContent(), $secret);
        if (!hash_equals($computedSignature, (string) $signature)) {
            Log::error('Lemon Squeezy webhook signature verification failed.');
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $eventName = $payload['meta']['event_name'] ?? null;

        if ($eventName === 'order_created') {
            $data = $payload['data']['attributes'];
            $customData = $payload['meta']['custom_data'] ?? [];
            
            $userId = $customData['user_id'] ?? null;
            $productIds = $customData['product_ids'] ?? '[]';
            
            if (is_string($productIds)) {
                $productIds = json_decode($productIds, true);
            }

            if ($userId && !empty($productIds)) {
                foreach ($productIds as $productId) {
                    Order::updateOrCreate(
                        [
                            'user_id' => $userId,
                            'product_id' => $productId,
                            'lemon_squeezy_order_id' => $data['order_number'],
                        ],
                        [
                            'status' => 'paid',
                            'amount' => $data['total'] / 100,
                            'lemon_squeezy_id' => $payload['data']['id'],
                            'download_expires_at' => now()->addHours(48),
                        ]
                    );
                }
            }
        }

        if ($eventName === 'order_refunded') {
            $data = $payload['data']['attributes'];
            Order::where('lemon_squeezy_order_id', $data['order_number'])
                ->update(['status' => 'refunded']);
        }

        return response()->json(['status' => 'ok']);
    }
}
