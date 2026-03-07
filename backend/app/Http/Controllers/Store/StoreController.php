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
        StorePageView::track('store');
        return view('store.index');
    }

    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        StorePageView::track('product');
        ProductView::track($product->id);

        return view('store.show', compact('product'));
    }
}
