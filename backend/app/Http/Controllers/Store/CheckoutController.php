<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Services\SafePayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    protected $safepay;

    public function __construct(SafePayService $safepay)
    {
        $this->safepay = $safepay;
    }

    /**
     * Show the custom billing form
     */
    public function create(Request $request)
    {
        $product = Product::findOrFail($request->product_id ?? 1);
        
        // Prepare cart data for the view
        $cart = [
            [
                'id'    => $product->id,
                'name'  => $product->name,
                'price' => $product->price,
            ]
        ];
        
        $total = $product->price;

        return view('store.checkout', compact('product', 'cart', 'total'));
    }

    /**
     * Handle the form submission and redirect to SafePay Checkout
     */
    public function store(Request $request)
    {
        $validated = $this->validateCheckoutInput($request);
        $product = Product::findOrFail($validated['product_id']);
        $checkoutContext = $this->createPendingOrder($request, $validated, $product->price);

        try {
            // Build the direct checkout redirect URL
            $checkoutUrl = $this->safepay->createCheckoutUrl(
                $product->price,
                $checkoutContext['order_ref'],
                'USD',
                $checkoutContext['state_token']
            );

            return redirect($checkoutUrl);
        } catch (\Exception $e) {
            Log::error("SafePay Redirect Error: " . $e->getMessage());
            return back()->withInput()->with('error', 'Checkout error: ' . $e->getMessage());
        }
    }

    /**
     * Create a SafePay popup session URL for frontend popup checkout.
     */
    public function popupSession(Request $request)
    {
        $validated = $this->validateCheckoutInput($request);
        $product = Product::findOrFail($validated['product_id']);
        $checkoutContext = $this->createPendingOrder($request, $validated, $product->price);

        try {
            $popupToken = bin2hex(random_bytes(24));

            Cache::put(
                $this->popupContextCacheKey($popupToken),
                [
                    'user_id'    => $request->user()->id,
                    'order_ref'  => $checkoutContext['order_ref'],
                    'state_token'=> $checkoutContext['state_token'],
                    'amount'     => (float) $product->price,
                    'currency'   => 'USD',
                ],
                now()->addMinutes(30)
            );

            $checkoutUrl = url('/checkout/popup-gateway?token=' . urlencode($popupToken));

            return response()->json([
                'checkout_url' => $checkoutUrl,
                'order_ref'    => $checkoutContext['order_ref'],
            ]);
        } catch (\Exception $e) {
            Log::error('SafePay Popup Session Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Unable to create checkout session right now. Please try again.',
            ], 500);
        }
    }

    /**
     * Render popup page that initializes SafePay checkout via SDK.
     */
    public function popupGateway(Request $request)
    {
        $token = (string) $request->query('token', '');
        $context = Cache::get($this->popupContextCacheKey($token));

        if (!$context || (int) ($context['user_id'] ?? 0) !== (int) $request->user()->id) {
            abort(403, 'Invalid popup checkout session.');
        }

        $configuredMode = strtolower(trim((string) config('services.safepay.environment', 'sandbox')));
        $mode = in_array($configuredMode, ['production', 'prod', 'live'], true) ? 'production' : 'sandbox';
        $sdkHost = $mode === 'production' ? 'https://api.getsafepay.com' : 'https://sandbox.api.getsafepay.com';

        return view('store.checkout_popup_gateway', [
            'sdkScriptUrl' => $sdkHost . '/checkout/pay.js',
            'mode'         => $mode,
            'apiKey'       => (string) config('services.safepay.api_key'),
            'amount'       => $context['amount'],
            'currency'     => $context['currency'],
            'orderRef'     => $context['order_ref'],
            'stateToken'   => $context['state_token'],
        ]);
    }

    /**
     * Render a tiny relay page used when user cancels from popup flow.
     */
    public function popupCancel(Request $request)
    {
        $orderRef = (string) $request->query('order_ref', '');
        $state = (string) $request->query('state', '');

        if (!$this->validateCheckoutState($orderRef, $state, false)) {
            Log::warning('SafePay cancel callback with invalid/expired state.', [
                'order_ref' => $orderRef,
                'user_id'   => $request->user()->id,
            ]);
        }

        return view('store.checkout_popup_cancel');
    }

    /**
     * Landing page after user completes payment
     */
    public function success(Request $request)
    {
        $orderRef = (string) $request->query('order_ref', '');
        $state = (string) $request->query('state', '');
        $tracker = $request->get('tracker');
        $order = Order::where('safepay_order_ref', $orderRef)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$order) {
            abort(404);
        }

        $stateValid = $this->validateCheckoutState($orderRef, $state);
        if (!$stateValid) {
            Log::warning('SafePay return blocked due to invalid state token.', [
                'order_ref' => $orderRef,
                'user_id'   => $request->user()->id,
            ]);

            abort(403, 'Invalid checkout state.');
        }

        return view('store.success', [
            'tracker'         => $tracker,
            'paymentVerified' => ($order->status === 'paid')
        ]);
    }

    protected function validateCheckoutInput(Request $request): array
    {
        return $request->validate([
            'product_id'  => 'required|exists:products,id',
            'idempotency_key' => 'nullable|string|min:16|max:128',
            'first_name'  => 'required|string|max:255',
            'last_name'   => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'phone'       => 'required|string|max:20',
            'address'     => 'required|string|max:500',
            'city'        => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country'     => 'required|string|max:2',
        ]);
    }

    protected function createPendingOrder(Request $request, array $validated, $amount): array
    {
        $orderRef = null;
        $stateToken = bin2hex(random_bytes(24));
        $userId = $request->user()->id;
        $idempotencyKey = $validated['idempotency_key'] ?? null;

        if (!empty($idempotencyKey)) {
            $cachedOrderRef = Cache::get($this->idempotencyCacheKey($userId, $idempotencyKey));

            if (!empty($cachedOrderRef)) {
                $existing = Order::query()
                    ->where('user_id', $userId)
                    ->where('product_id', $validated['product_id'])
                    ->where('safepay_order_ref', $cachedOrderRef)
                    ->where('status', 'pending')
                    ->first();

                if ($existing) {
                    $orderRef = $existing->safepay_order_ref;
                }
            }
        }

        if ($orderRef === null) {
            $orderRef = 'ORD-' . strtoupper(Str::random(10));

            Order::create([
                'user_id'           => $userId,
                'product_id'        => $validated['product_id'],
                'status'            => 'pending',
                'amount'            => $amount,
                'safepay_order_ref' => $orderRef,
            ]);

            if (!empty($idempotencyKey)) {
                Cache::put(
                    $this->idempotencyCacheKey($userId, $idempotencyKey),
                    $orderRef,
                    now()->addMinutes(20)
                );
            }
        }

        Cache::put(
            $this->stateCacheKey($orderRef),
            hash('sha256', $stateToken),
            now()->addMinutes(45)
        );

        return [
            'order_ref'   => $orderRef,
            'state_token' => $stateToken,
        ];
    }

    protected function stateCacheKey(string $orderRef): string
    {
        return 'checkout_state:' . $orderRef;
    }

    protected function idempotencyCacheKey(int $userId, string $idempotencyKey): string
    {
        return 'checkout_idem:' . $userId . ':' . hash('sha256', $idempotencyKey);
    }

    protected function popupContextCacheKey(string $popupToken): string
    {
        return 'checkout_popup_ctx:' . hash('sha256', $popupToken);
    }

    protected function validateCheckoutState(string $orderRef, string $stateToken, bool $consume = true): bool
    {
        if ($orderRef === '' || $stateToken === '') {
            return false;
        }

        $storedHash = Cache::get($this->stateCacheKey($orderRef));
        if (!$storedHash) {
            return false;
        }

        $providedHash = hash('sha256', $stateToken);
        $isValid = hash_equals($storedHash, $providedHash);

        if ($isValid && $consume) {
            Cache::forget($this->stateCacheKey($orderRef));
        }

        return $isValid;
    }
}
