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
        $query = Product::where('is_active', true);

        if ($this->activeCategory !== 'all') {
            $query->where('category', $this->activeCategory);
        }

        return view('livewire.product-catalog', [
            'products' => $query->latest()->get(),
        ]);
    }
}
