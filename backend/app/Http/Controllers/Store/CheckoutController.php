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
     * Show the custom billing form (with the 100% distraction-free shell)
     */
    public function create(Request $request)
    {
        $product = Product::findOrFail($request->product_id ?? 1); // fallback for testing
        return view('store.checkout', compact('product'));
    }

    /**
     * Handle the form submission and redirect to SafePay Checkout (Redirect Flow)
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
            'postal'     => 'required|string|max:20',
            'country'    => 'required|string|max:2',
        ]);

        $product = Product::findOrFail($request->product_id);
        $orderRef = 'ORD-' . strtoupper(Str::random(10));

        // Create a pending order record
        $order = Order::create([
            'order_number'    => $orderRef,
            'customer_name'   => $request->first_name . ' ' . $request->last_name,
            'customer_email'  => $request->email,
            'billing_address' => json_encode($request->only(['phone', 'address', 'city', 'postal', 'country'])),
            'total_amount'    => $product->price,
            'status'          => 'pending',
            'product_id'      => $request->product_id,
        ]);

        try {
            // Build the direct checkout redirect URL
            // This bypasses the server-side 401 header issues
            $checkoutUrl = $this->safepay->createCheckoutUrl($product->price, $orderRef, 'USD');

            return redirect($checkoutUrl);
        } catch (\Exception $e) {
            Log::error("SafePay Redirect Error: " . $e->getMessage());
            return back()->withInput()->with('error', 'Checkout error: ' . $e->getMessage());
        }
    }

    /**
     * Landing page after user completes payment on SafePay
     */
    public function success(Request $request)
    {
        $tracker = $request->get('tracker');
        $success = $request->get('success');

        // Note: In Redirect flow, we usually wait for the Webhook to confirm the order.
        // We can show a 'Processing' state here.
        return view('store.success', [
            'tracker'         => $tracker,
            'paymentVerified' => ($success === 'true')
        ]);
    }
}
