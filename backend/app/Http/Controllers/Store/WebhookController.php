<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\SafePayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(protected SafePayService $safepay) {}

    /**
     * Handle incoming SafePay webhook events.
     *
     * SafePay events handled:
     *  - payment.succeeded → mark order as paid
     *  - payment.failed    → mark order as failed
     *
     * All other events acknowledge with 200 (idempotent, no-op).
     */
    public function handle(Request $request)
    {
        $rawBody   = $request->getContent();
        $signature = $request->header('X-SFPY-Signature', '');

        // ── 1. Verify signature ───────────────────────────────────────────────
        if (! $this->safepay->verifyWebhookSignature($rawBody, $signature)) {
            Log::error('SafePay webhook: invalid signature', [
                'ip'        => $request->ip(),
                'signature' => $signature,
            ]);
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        $payload = $request->all();
        $event   = $payload['type'] ?? $payload['event'] ?? null;

        Log::info('SafePay webhook received', ['event' => $event]);

        // ── 2. Route event type ───────────────────────────────────────────────
        try {
            match ($event) {
                'payment.succeeded' => $this->handlePaymentSucceeded($payload),
                'payment.failed'    => $this->handlePaymentFailed($payload),
                default             => null, // acknowledge unknown events silently
            };
        } catch (\Throwable $e) {
            Log::error('SafePay webhook handler threw exception', [
                'event'   => $event,
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);
            // Return 200 so SafePay doesn't keep retrying for server-side bugs
            return response()->json(['status' => 'error_logged'], 200);
        }

        return response()->json(['status' => 'ok'], 200);
    }

    // ─────────────────────────────────────────────────────────────────────────

    private function handlePaymentSucceeded(array $payload): void
    {
        $trackerToken = $this->extractTrackerToken($payload);

        if (! $trackerToken) {
            Log::warning('SafePay webhook payment.succeeded: no tracker token found', $payload);
            return;
        }

        $orders = Order::where('safepay_tracker_token', $trackerToken)->get();

        if ($orders->isEmpty()) {
            Log::warning('SafePay webhook payment.succeeded: no orders found for tracker', [
                'tracker' => $trackerToken,
            ]);
            return;
        }

        foreach ($orders as $order) {
            if ($order->status === 'paid') {
                // Already paid (possibly fulfilled on redirect) — idempotent
                continue;
            }

            $order->update([
                'status'              => 'paid',
                'download_expires_at' => now()->addHours(48),
            ]);

            Log::info('SafePay webhook: order marked as paid', [
                'order_id' => $order->id,
                'tracker'  => $trackerToken,
            ]);
        }
    }

    private function handlePaymentFailed(array $payload): void
    {
        $trackerToken = $this->extractTrackerToken($payload);

        if (! $trackerToken) {
            Log::warning('SafePay webhook payment.failed: no tracker token found', $payload);
            return;
        }

        $updated = Order::where('safepay_tracker_token', $trackerToken)
            ->whereNotIn('status', ['paid', 'refunded'])
            ->update(['status' => 'failed']);

        Log::info('SafePay webhook: orders marked as failed', [
            'tracker' => $trackerToken,
            'updated' => $updated,
        ]);
    }

    // ─────────────────────────────────────────────────────────────────────────

    /**
     * SafePay sends the tracker token at different paths depending on webhook version.
     * Try common paths defensively.
     */
    private function extractTrackerToken(array $payload): ?string
    {
        return $payload['data']['tracker']['token']
            ?? $payload['tracker']
            ?? $payload['data']['tracker']
            ?? null;
    }
}
