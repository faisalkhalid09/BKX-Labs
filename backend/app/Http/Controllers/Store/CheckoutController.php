<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function create()
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        $total = collect($cart)->sum('price');

        return view('store.checkout', compact('cart', 'total'));
    }

    public function store(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('store.index');
        }

        if (!Auth::check()) {
            return redirect()->route('login')->with('info', 'Please log in to complete your purchase.');
        }

        // ==========================================
        // DUMMY PAYMENT FLOW
        // ==========================================
        foreach ($cart as $productId => $item) {
            Order::create([
                'user_id'                    => Auth::id(),
                'product_id'                 => $productId,
                'status'                     => 'paid',
                'amount'                     => $item['price'],
                'stripe_payment_intent_id'   => 'dummy_pi_' . uniqid(),
                'download_expires_at'        => now()->addHours(48),
            ]);
        }

        session()->forget('cart');

        return redirect()->route('downloads.index')
            ->with('success', 'Payment successful! You can now download your digital products.');
    }
}
