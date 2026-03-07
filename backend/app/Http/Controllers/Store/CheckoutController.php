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

        Stripe::setApiKey(config('services.stripe.secret'));

        $total = collect($cart)->sum('price');
        $amountInCents = (int) round($total * 100);

        $paymentIntent = PaymentIntent::create([
            'amount'   => $amountInCents,
            'currency' => 'usd',
            'metadata' => ['user_id' => Auth::id()],
        ]);

        // Create pending orders for each cart item
        foreach ($cart as $productId => $item) {
            Order::create([
                'user_id'                    => Auth::id(),
                'product_id'                 => $productId,
                'status'                     => 'pending',
                'amount'                     => $item['price'],
                'stripe_payment_intent_id'   => $paymentIntent->id,
            ]);
        }

        return view('store.checkout', [
            'cart'              => $cart,
            'total'             => $total,
            'clientSecret'      => $paymentIntent->client_secret,
            'stripePublicKey'   => config('services.stripe.key'),
        ]);
    }
}
