<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query    = trim($request->get('q', ''));
        $category = $request->get('category', '');
        $sort     = $request->get('sort', 'relevance');

        $products = Product::query()->where('is_active', true);

        // Keyword search — name, short description, description
        if ($query !== '') {
            $products->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('short_description', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            });
        }

        // Category filter
        if ($category !== '' && $category !== 'all') {
            $products->where('category', $category);
        }

        // Priority Sorting: Promoted products always come first
        $products->orderBy('is_promoted', 'desc');

        // Second-tier Sorting
        match ($sort) {
            'price_asc'  => $products->orderBy('price', 'asc'),
            'price_desc' => $products->orderBy('price', 'desc'),
            'newest'     => $products->orderBy('created_at', 'desc'),
            default      => $query !== '' 
                ? $products->orderByRaw( "CASE WHEN name LIKE ? THEN 0 ELSE 1 END, created_at DESC", ["%{$query}%"])
                : $products->inRandomOrder(),
        };

        $products = $products->get();

        $categories = [
            'all'      => 'All Categories',
            'ai_model' => 'AI Models',
            'script'   => 'Scripts',
            'template' => 'Templates',
            'other'    => 'Other',
        ];

        $activePurchasedIds = auth()->check() ? auth()->user()->getActivePurchasedProductIds() : [];

        return view('store.search', compact('products', 'query', 'category', 'sort', 'categories', 'activePurchasedIds'));
    }
}
