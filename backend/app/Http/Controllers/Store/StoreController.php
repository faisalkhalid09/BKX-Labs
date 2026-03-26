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
        dispatch(function () { try { StorePageView::track('store'); } catch (\Throwable) {} })->afterResponse();
        return view('store.index');
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        dispatch(function () use ($product) {
            try {
                StorePageView::track('product');
                ProductView::track($product->id);
            } catch (\Throwable) {}
        })->afterResponse();

        $isBought = false;
        if (auth()->check()) {
            $isBought = auth()->user()->orders()
                ->where('product_id', $product->id)
                ->where('status', 'paid')
                ->where('download_expires_at', '>', now())
                ->exists();
        }

        return view('store.show', compact('product', 'isBought'));
    }

    public function addToCart(Product $product)
    {
        if (auth()->check() && auth()->user()->orders()
            ->where('product_id', $product->id)
            ->where('status', 'paid')
            ->where('download_expires_at', '>', now())
            ->exists()) {
            return redirect()->route('store.show', $product->slug)->with('error', 'You already have active access to this product.');
        }

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
        if (auth()->check() && auth()->user()->orders()
            ->where('product_id', $product->id)
            ->where('status', 'paid')
            ->where('download_expires_at', '>', now())
            ->exists()) {
            return redirect()->back()->with('error', 'You already have active access to this product.');
        }

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
