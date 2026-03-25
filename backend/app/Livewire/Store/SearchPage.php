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
    public $showMobileFilters = false;

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
        $baseQuery = Product::query()->where('is_active', true);

        if ($this->q !== '') {
            $baseQuery->where(function ($query) {
                $query->where('name', 'like', "%{$this->q}%")
                      ->orWhere('short_description', 'like', "%{$this->q}%")
                      ->orWhere('description', 'like', "%{$this->q}%");
            });
        }

        if (!empty($this->category)) {
            $baseQuery->whereIn('category', $this->category);
        }

        if ($this->price_min !== '') {
            $baseQuery->where('price', '>=', (float) $this->price_min);
        }
        if ($this->price_max !== '') {
            $baseQuery->where('price', '<=', (float) $this->price_max);
        }

        $promotedQuery = (clone $baseQuery)->where('is_promoted', true);
        $regularQuery = (clone $baseQuery)->where('is_promoted', false);

        match ($this->sort) {
            'price_asc'  => [$promotedQuery->orderBy('price', 'asc'), $regularQuery->orderBy('price', 'asc')],
            'price_desc' => [$promotedQuery->orderBy('price', 'desc'), $regularQuery->orderBy('price', 'desc')],
            'newest'     => [$promotedQuery->orderBy('created_at', 'desc'), $regularQuery->orderBy('created_at', 'desc')],
            default      => [$promotedQuery->inRandomOrder(), $regularQuery->inRandomOrder()],
        };

        $products = $promotedQuery->get()->concat($regularQuery->get());
        $activePurchasedIds = auth()->check() ? auth()->user()->getActivePurchasedProductIds() : [];

        return view('livewire.store.search-page', [
            'products' => $products,
            'activePurchasedIds' => $activePurchasedIds,
        ])->extends('store.layout')->section('content');
    }
}
