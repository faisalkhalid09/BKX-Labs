<?php

namespace App\Livewire\Store;

use App\Models\Product;
use Livewire\Component;
use Livewire\WithPagination;

class SearchPage extends Component
{
    use WithPagination;

    public $q = '';
    public $category = [];
    public $price_min = '';
    public $price_max = '';
    public $sort = 'relevance';

    // Categories mapping
    public array $categories_map = [
        'ai_model' => 'AI Models',
        'script'   => 'Scripts',
        'template' => 'Templates',
        'other'    => 'Other',
    ];

    protected $queryString = [
        'q' => ['except' => ''],
        'category' => ['except' => []],
        'price_min' => ['except' => ''],
        'price_max' => ['except' => ''],
        'sort' => ['except' => 'relevance'],
    ];

    public function mount()
    {
        $this->q = request()->get('q', '');
        $this->category = (array) request()->get('category', []);
        $this->price_min = request()->get('price_min', '');
        $this->price_max = request()->get('price_max', '');
        $this->sort = request()->get('sort', 'relevance');
    }

    public function updated($propertyName)
    {
        if (in_array($propertyName, ['q', 'category', 'price_min', 'price_max', 'sort'])) {
            $this->resetPage();
        }
    }

    public function clearFilters()
    {
        $this->q = '';
        $this->category = [];
        $this->price_min = '';
        $this->price_max = '';
        $this->sort = 'relevance';
        $this->resetPage();
    }

    public function render()
    {
        $products = Product::query()->where('is_active', true);

        if ($this->q !== '') {
            $products->where(function ($query) {
                $query->where('name', 'like', "%{$this->q}%")
                      ->orWhere('short_description', 'like', "%{$this->q}%")
                      ->orWhere('description', 'like', "%{$this->q}%");
            });
        }

        if (!empty($this->category)) {
            $products->whereIn('category', $this->category);
        }

        if ($this->price_min !== '') {
            $products->where('price', '>=', (float) $this->price_min);
        }
        if ($this->price_max !== '') {
            $products->where('price', '<=', (float) $this->price_max);
        }

        $products->orderBy('is_promoted', 'desc');

        match ($this->sort) {
            'price_asc'  => $products->orderBy('price', 'asc'),
            'price_desc' => $products->orderBy('price', 'desc'),
            'newest'     => $products->orderBy('created_at', 'desc'),
            default      => $this->q !== '' 
                ? $products->orderByRaw( "CASE WHEN name LIKE ? THEN 0 ELSE 1 END, created_at DESC", ["%{$this->q}%"])
                : $products->inRandomOrder(),
        };

        $products = $products->get();
        $activePurchasedIds = auth()->check() ? auth()->user()->getActivePurchasedProductIds() : [];

        return view('livewire.store.search-page', [
            'products' => $products,
            'activePurchasedIds' => $activePurchasedIds,
        ])->extends('store.layout')->section('content');
    }
}
