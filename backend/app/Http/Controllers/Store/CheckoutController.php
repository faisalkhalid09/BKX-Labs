<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Services\SafePayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function __construct(protected SafePayService $safepay) {}

    // ─────────────────────────────────────────────────────────────────────────
    //  Step 1 — Show the checkout page with billing form
    // ─────────────────────────────────────────────────────────────────────────

    public function create()
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        $total = collect($cart)->sum('price');

        return view('store.checkout', compact('cart', 'total'));
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Step 2 — Process billing form, create SafePay session, redirect
    // ─────────────────────────────────────────────────────────────────────────

    public function store(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('store.index');
        }

        if (! Auth::check()) {
            return redirect()->route('login')->with('info', 'Please log in to complete your purchase.');
        }

        // Validate billing details collected on our page
        $validated = $request->validate([
            'first_name'  => ['required', 'string', 'max:80'],
            'last_name'   => ['required', 'string', 'max:80'],
            'email'       => ['required', 'email', 'max:255'],
            'phone'       => ['required', 'string', 'max:30'],
            'address'     => ['required', 'string', 'max:255'],
            'city'        => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country'     => ['required', 'string', 'size:2'],
        ]);

        $user        = Auth::user();
        $total       = collect($cart)->sum('price');
        $productIds  = array_keys($cart);

        // Amount must be in smallest unit (SafePay uses integer cents for USD)
        // $10.00 USD → 1000
        $amountInCents = (int) round($total * 100);
        $currency       = 'USD';

        // Generate a unique internal order reference for this checkout attempt
        $orderRef = 'BKX-' . strtoupper(Str::random(10));

        // Store billing info in session in case we need it later
        session()->put('checkout_billing', $validated);
        session()->put('checkout_order_ref', $orderRef);

        try {
            // 1. Create the SafePay payment tracker
            $tracker = $this->safepay->createPaymentSession($amountInCents, $currency, $orderRef);

            // 2. Generate the short-lived auth token
            $authToken = $this->safepay->createAuthToken();

            // 3. Pre-create a pending order in our DB so we can match on return
            $pendingOrder = $this->createPendingOrders(
                $user->id,
                $productIds,
                $total,
                $tracker['token'],
                $orderRef
            );

            if (! $pendingOrder) {
                throw new \RuntimeException('Could not create order record. Please try again.');
            }

            // 4. Build checkout URL
            $checkoutUrl = $this->safepay->buildCheckoutUrl(
                trackerToken: $tracker['token'],
                authToken: $authToken,
                redirectUrl: route('checkout.success'),
                cancelUrl: route('checkout.create'),
            );

            Log::info('SafePay checkout initiated', [
                'user'     => $user->id,
                'tracker'  => $tracker['token'],
                'order_ref'=> $orderRef,
                'amount'   => $total,
            ]);

            // 5. Redirect user to SafePay hosted checkout
            return redirect()->away($checkoutUrl);

        } catch (\RuntimeException $e) {
            Log::error('Checkout failed', ['message' => $e->getMessage(), 'user' => $user->id]);
            return back()->with('error', $e->getMessage());
        } catch (\Throwable $e) {
            Log::error('Unexpected checkout error', ['message' => $e->getMessage()]);
            return back()->with('error', 'An unexpected error occurred. Please try again later.');
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Step 3 — Handle SafePay redirect back after payment
    // ─────────────────────────────────────────────────────────────────────────

    public function success(Request $request)
    {
        $trackerToken = $request->query('tracker');

        // If no tracker token is present, just show the generic success page
        // (webhook will handle marking the order as paid)
        if (! $trackerToken) {
            session()->forget(['cart', 'checkout_billing', 'checkout_order_ref']);
            return view('store.success', ['paymentVerified' => false]);
        }

        // Verify the payment with SafePay
        try {
            $trackerData = $this->safepay->fetchTracker($trackerToken);
            $isPaid      = $this->safepay->isTrackerPaid($trackerData);

            if ($isPaid) {
                // Mark all pending orders for this tracker as paid
                $updated = Order::where('safepay_tracker_token', $trackerToken)
                    ->where('status', 'pending')
                    ->get()
                    ->each(function (Order $order) {
                        $order->update([
                            'status'               => 'paid',
                            'download_expires_at'  => now()->addHours(48),
                        ]);
                    });

                Log::info('SafePay payment verified on redirect', [
                    'tracker'       => $trackerToken,
                    'orders_updated'=> $updated->count(),
                ]);

                // Clear the cart
                session()->forget(['cart', 'checkout_billing', 'checkout_order_ref']);

                return view('store.success', ['paymentVerified' => true, 'tracker' => $trackerToken]);
            }

            // Payment state is not TRACKER_ENDED yet — webhook will catch it
            // Still show success UI but note it's "processing"
            Log::warning('SafePay redirect: tracker not yet in TRACKER_ENDED state', [
                'tracker' => $trackerToken,
                'state'   => $trackerData['state'] ?? 'unknown',
            ]);

            session()->forget(['cart', 'checkout_billing', 'checkout_order_ref']);

            return view('store.success', ['paymentVerified' => false, 'tracker' => $trackerToken]);

        } catch (\Throwable $e) {
            Log::error('SafePay success callback error', ['error' => $e->getMessage(), 'tracker' => $trackerToken]);

            // Don't panic the user — show success page, webhook will confirm
            session()->forget(['cart', 'checkout_billing', 'checkout_order_ref']);
            return view('store.success', ['paymentVerified' => false, 'tracker' => $trackerToken]);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Private helpers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Create pending orders (one per product) in the database.
     * Returns the first order or null on failure.
     */
    private function createPendingOrders(
        int $userId,
        array $productIds,
        float $total,
        string $trackerToken,
        string $orderRef
    ): ?Order {
        $products = Product::whereIn('id', $productIds)->get();

        if ($products->isEmpty()) {
            Log::error('CheckoutController: no products found for cart', ['product_ids' => $productIds]);
            return null;
        }

        // Split price evenly across products (or per-product if available)
        $cart    = session()->get('cart', []);
        $firstOrder = null;

        foreach ($products as $product) {
            $price = $cart[$product->id]['price'] ?? ($total / count($productIds));

            $order = Order::updateOrCreate(
                [
                    'user_id'               => $userId,
                    'product_id'            => $product->id,
                    'safepay_tracker_token' => $trackerToken,
                ],
                [
                    'status'               => 'pending',
                    'amount'               => $price,
                    'safepay_order_ref'    => $orderRef,
                ]
            );

            $firstOrder ??= $order;
        }

        return $firstOrder;
    }
}
