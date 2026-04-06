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
use Symfony\Component\HttpFoundation\Response;

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
            $redirectUrl = $this->safepay->createCheckoutUrl(
                $product->price,
                $checkoutContext['order_ref'],
                'USD',
                $checkoutContext['state_token']
            );

            $popupToken = bin2hex(random_bytes(24));

            Cache::put(
                $this->popupContextCacheKey($popupToken),
                [
                    'user_id'    => $request->user()->id,
                    'order_ref'  => $checkoutContext['order_ref'],
                    'state_token'=> $checkoutContext['state_token'],
                    'amount'     => (float) $product->price,
                    'currency'   => 'USD',
                    'redirect_url' => $redirectUrl,
                ],
                now()->addMinutes(30)
            );

            $checkoutUrl = url('/checkout/popup-gateway?token=' . urlencode($popupToken));

            Log::info('SafePay popup session created', [
                'user_id'    => $request->user()->id,
                'order_ref'  => $checkoutContext['order_ref'],
                'popup_token_prefix' => substr($popupToken, 0, 10),
                'mode'       => config('services.safepay.environment', 'sandbox'),
            ]);

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

        $redirectUrl = (string) ($context['redirect_url'] ?? '');
        if ($redirectUrl === '') {
            // Fallback for old cache entries that predate redirect_url in popup context.
            $redirectUrl = $this->safepay->createCheckoutUrl(
                (float) ($context['amount'] ?? 0),
                (string) ($context['order_ref'] ?? ''),
                (string) ($context['currency'] ?? 'USD'),
                (string) ($context['state_token'] ?? '')
            );
        }

        Log::info('SafePay popup gateway render', [
            'user_id'   => $request->user()->id,
            'order_ref' => $context['order_ref'] ?? null,
            'has_redirect_url' => $redirectUrl !== '',
        ]);

        $configuredMode = strtolower(trim((string) config('services.safepay.environment', 'sandbox')));
        $mode = in_array($configuredMode, ['production', 'prod', 'live'], true) ? 'production' : 'sandbox';

        return view('store.checkout_popup_gateway', [
            'redirectUrl'  => $redirectUrl,
            'mode'         => $mode,
            'apiKey'       => (string) config('services.safepay.api_key'),
            'amount'       => (float) ($context['amount'] ?? 0),
            'currency'     => (string) ($context['currency'] ?? 'USD'),
            'orderRef'     => $context['order_ref'],
            'stateToken'   => $context['state_token'],
        ]);
    }

    /**
     * Serve the SafePay checkout component script from backend origin.
     */
    public function safepayScript(): Response
    {
        $scriptPath = base_path('sfpy-checkout.js');

        if (!is_file($scriptPath)) {
            abort(404, 'SafePay script not found.');
        }

        return response()->file($scriptPath, [
            'Content-Type' => 'application/javascript; charset=UTF-8',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }

    /**
     * Render a tiny relay page used when user cancels from popup flow.
     */
    public function popupCancel(Request $request)
    {
        $orderRef = (string) $request->query('order_ref', '');
        $state = $this->extractStateToken($request);

        $stateWasProvided = ($state !== '');
        $stateValid = !$stateWasProvided || $this->validateCheckoutState($orderRef, $state, false);
        if ($stateWasProvided && !$stateValid) {
            Log::warning('SafePay cancel callback with invalid/expired state.', [
                'order_ref' => $orderRef,
                'user_id'   => $request->user()->id,
            ]);
        }

        $order = Order::query()
            ->where('safepay_order_ref', $orderRef)
            ->where('user_id', $request->user()->id)
            ->first();

        $checkoutUrl = $order
            ? route('checkout.create', ['product_id' => $order->product_id])
            : route('checkout.create');

        return redirect($checkoutUrl)->with(
            'error',
            $stateValid
                ? 'Payment was cancelled. No charge was made.'
                : 'Payment was cancelled and the checkout session has expired. Please try again.'
        );
    }

    /**
     * Landing page after user completes payment
     */
    public function success(Request $request)
    {
        $orderRef = (string) $request->query('order_ref', '');
        $state = $this->extractStateToken($request);
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

    protected function extractStateToken(Request $request): string
    {
        $state = (string) $request->query('state', '');
        if ($state !== '') {
            return $state;
        }

        // Some provider redirects may HTML-escape query delimiters and produce amp;state.
        $escapedState = (string) $request->query('amp;state', '');
        if ($escapedState !== '') {
            return $escapedState;
        }

        $rawQuery = html_entity_decode((string) $request->server('QUERY_STRING', ''), ENT_QUOTES | ENT_HTML5);
        parse_str($rawQuery, $params);

        return (string) ($params['state'] ?? $params['amp;state'] ?? '');
    }
}
