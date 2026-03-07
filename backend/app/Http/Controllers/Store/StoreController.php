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
}
