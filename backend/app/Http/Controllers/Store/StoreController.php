<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductView;
use App\Models\StorePageView;

class StoreController extends Controller
{
    public function index()
    {
        try { StorePageView::track('store'); } catch (\Throwable) {}
        return view('store.index');
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        try {
            StorePageView::track('product');
            ProductView::track($product->id);
        } catch (\Throwable) {}

        return view('store.show', compact('product'));
    }

    public function addToCart(Product $product)
    {
        $cart = session()->get('cart', []);
        
        if (!isset($cart[$product->id])) {
            $cart[$product->id] = [
                'id'    => $product->id,
                'name'  => $product->name,
                'price' => $product->price,
                'slug'  => $product->slug,
            ];
            session()->put('cart', $cart);
        }

        return redirect()->route('checkout.create');
    }

    public function addToCartOnly(Product $product)
    {
        $cart = session()->get('cart', []);
        
        if (!isset($cart[$product->id])) {
            $cart[$product->id] = [
                'id'    => $product->id,
                'name'  => $product->name,
                'price' => $product->price,
                'slug'  => $product->slug,
            ];
            session()->put('cart', $cart);
        }

        return redirect()->back()->with('success', 'Product added to your cart.');
    }
}
