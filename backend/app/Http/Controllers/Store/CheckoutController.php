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
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|email|max:255',
            'phone'      => 'required|string|max:20',
            'address'    => 'required|string|max:500',
            'city'       => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country'    => 'required|string|max:2',
        ]);

        $product = Product::findOrFail($request->product_id);
        $orderRef = 'ORD-' . strtoupper(Str::random(10));

        // Create a pending order record using the actual orders schema.
        $order = Order::create([
            'user_id'           => $request->user()->id,
            'product_id'        => $request->product_id,
            'status'            => 'pending',
            'amount'            => $product->price,
            'safepay_order_ref' => $orderRef,
        ]);

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
}
