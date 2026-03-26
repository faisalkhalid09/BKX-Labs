<?php

namespace App\Livewire;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Livewire\Component;
use Livewire\WithPagination;

class ProductCatalog extends Component
{
    use WithPagination;

    public string $activeCategory = 'all';
    public int $perPage = 10;

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
        $this->resetPage();
    }

    public function updatedPerPage(): void
    {
        $allowed = [10, 20, 50, 100];
        if (!in_array($this->perPage, $allowed, true)) {
            $this->perPage = 10;
        }
        $this->resetPage();
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

    public function paginationView(): string
    {
        return 'vendor.livewire.custom-pagination';
    }

    public function render()
    {
        // Cache product list for 10 minutes — invalidate when products change
        $cacheKey = 'catalog_' . $this->activeCategory . '_p' . $this->getPage() . '_pp' . $this->perPage;

        $products = Cache::remember($cacheKey, 600, function () {
            $query = Product::where('is_active', true)
                ->select(['id', 'name', 'slug', 'price', 'category', 'short_description', 'is_promoted']);

            if ($this->activeCategory !== 'all') {
                $query->where('category', $this->activeCategory);
            }

            return $query
                ->orderByDesc('is_promoted')
                ->orderByDesc('created_at')
                ->paginate($this->perPage);
        });

        // Only query purchased IDs for logged-in users
        $activePurchasedIds = auth()->check()
            ? auth()->user()->getActivePurchasedProductIds()
            : [];

        return view('livewire.product-catalog', [
            'products'           => $products,
            'activePurchasedIds' => $activePurchasedIds,
        ]);
    }
}
