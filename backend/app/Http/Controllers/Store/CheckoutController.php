<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        $user = Auth::user();
        
        $productIds = array_keys($cart);
        $products = Product::whereIn('id', $productIds)->get();
        
        $variantId = null;
        foreach ($products as $product) {
            if ($product->lemon_squeezy_variant_id) {
                $variantId = $product->lemon_squeezy_variant_id;
                break;
            }
        }

        if (!$variantId) {
            return back()->with('error', 'Payment is currently unavailable for these items.');
        }

        return $user->checkout($variantId)
            ->withCustomData([
                'user_id' => $user->id,
                'product_ids' => json_encode($productIds),
            ])
            ->withRedirectUrl(route('checkout.success'));
    }
}
