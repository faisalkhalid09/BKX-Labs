<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Services\SafePayService;
use Illuminate\Http\Request;
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
        $orderRef = $this->createPendingOrder($request, $validated, $product->price);

        try {
            // Build the direct checkout redirect URL
            $checkoutUrl = $this->safepay->createCheckoutUrl($product->price, $orderRef, 'USD');

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
        $orderRef = $this->createPendingOrder($request, $validated, $product->price);

        try {
            $checkoutUrl = $this->safepay->createCheckoutUrl($product->price, $orderRef, 'USD');

            return response()->json([
                'checkout_url' => $checkoutUrl,
                'order_ref'    => $orderRef,
            ]);
        } catch (\Exception $e) {
            Log::error('SafePay Popup Session Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Unable to create checkout session right now. Please try again.',
            ], 500);
        }
    }

    /**
     * Render a tiny relay page used when user cancels from popup flow.
     */
    public function popupCancel()
    {
        return view('store.checkout_popup_cancel');
    }

    /**
     * Landing page after user completes payment
     */
    public function success(Request $request)
    {
        $tracker = $request->get('tracker');
        $success = $request->get('success');

        return view('store.success', [
            'tracker'         => $tracker,
            'paymentVerified' => ($success === 'true')
        ]);
    }

    protected function validateCheckoutInput(Request $request): array
    {
        return $request->validate([
            'product_id'  => 'required|exists:products,id',
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

    protected function createPendingOrder(Request $request, array $validated, $amount): string
    {
        $orderRef = 'ORD-' . strtoupper(Str::random(10));

        Order::create([
            'user_id'           => $request->user()->id,
            'product_id'        => $validated['product_id'],
            'status'            => 'pending',
            'amount'            => $amount,
            'safepay_order_ref' => $orderRef,
        ]);

        return $orderRef;
    }
}
