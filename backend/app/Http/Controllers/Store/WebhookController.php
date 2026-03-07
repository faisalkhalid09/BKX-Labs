<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $payload   = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret    = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $secret);
        } catch (SignatureVerificationException $e) {
            Log::error('Stripe webhook signature verification failed: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'payment_intent.succeeded') {
            $paymentIntent = $event->data->object;

            Order::where('stripe_payment_intent_id', $paymentIntent->id)
                ->where('status', 'pending')
                ->each(function (Order $order) {
                    $order->update([
                        'status'                => 'paid',
                        'download_expires_at'   => now()->addHours(48),
                    ]);
                });

            // Clear the cart for this user (can't clear session in webhook; handled client-side)
        }

        if ($event->type === 'payment_intent.payment_failed') {
            $paymentIntent = $event->data->object;

            Order::where('stripe_payment_intent_id', $paymentIntent->id)
                ->where('status', 'pending')
                ->update(['status' => 'failed']);
        }

        return response()->json(['status' => 'ok']);
    }
}
