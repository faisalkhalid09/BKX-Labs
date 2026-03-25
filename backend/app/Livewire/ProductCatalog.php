<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;

class ProductCatalog extends Component
{
    public string $activeCategory = 'all';

    public array $categories = [
        'all'      => 'All Products',
        'ai_model' => 'AI Models',
        'script'   => 'Scripts',
        'template' => 'Templates',
        'other'    => 'Other',
    ];

    public function setCategory(string $category): void
    {
        $this->activeCategory = $category;
    }

    public function addToCart(int $productId): void
    {
        if (auth()->check() && auth()->user()->orders()
            ->where('product_id', $productId)
            ->where('status', 'paid')
            ->where('download_expires_at', '>', now())
            ->exists()) {
            session()->flash('error', 'You already have active access to this product.');
            return;
        }

        $product = Product::findOrFail($productId);
        $cart    = session()->get('cart', []);

        if (!isset($cart[$productId])) {
            $cart[$productId] = [
                'id'    => $product->id,
                'name'  => $product->name,
                'price' => $product->price,
                'slug'  => $product->slug,
            ];
        }

        session()->put('cart', $cart);
        $this->dispatch('cart-updated', count($cart));
        session()->flash('added', $product->name . ' added to cart!');
    }

    public function render()
    {
        $baseQuery = Product::where('is_active', true);

        if ($this->activeCategory !== 'all') {
            $baseQuery->where('category', $this->activeCategory);
        }

        $promotedProducts = (clone $baseQuery)
            ->where('is_promoted', true)
            ->inRandomOrder()
            ->get();

        $regularProducts = (clone $baseQuery)
            ->where('is_promoted', false)
            ->inRandomOrder()
            ->get();

        $activePurchasedIds = auth()->check() ? auth()->user()->getActivePurchasedProductIds() : [];

        return view('livewire.product-catalog', [
            'products' => $promotedProducts->concat($regularProducts),
            'activePurchasedIds' => $activePurchasedIds,
        ]);
    }
}
