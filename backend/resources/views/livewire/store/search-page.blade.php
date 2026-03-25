<div>
    @push('styles')
    <style>
    /* Hero Section */
    .search-hero {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-bottom: 1px solid #e2e8f0;
        padding: 2rem 1rem 1.5rem;
    }
    @media(min-width: 768px) {
        .search-hero { padding: 2.5rem 0 2rem; }
    }

    .search-hero h1 {
        font-size: 1.75rem;
        font-weight: 900;
        color: #0f172a;
        margin-bottom: 1.25rem;
        text-transform: uppercase;
        letter-spacing: -0.02em;
    }
    @media(min-width: 768px) {
        .search-hero h1 { font-size: 2.25rem; margin-bottom: 1.5rem; }
    }

    /* Search Bar */
    .search-bar {
        display: flex;
        gap: 0.5rem;
        max-width: 100%;
        background: white;
        border: 2px solid #1e3a8a;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.2s;
    }
    .search-bar:focus-within {
        box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }

    .search-bar input {
        flex: 1;
        border: none;
        outline: none;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        font-family: inherit;
        color: #0f172a;
        min-height: 44px;
    }
    .search-bar input::placeholder { color: #94a3b8; }

    .search-bar .search-btn {
        background: #1e3a8a;
        color: white;
        border: none;
        padding: 0 1.25rem;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }
    .search-bar .search-btn:hover { background: #1e40af; }

    .search-meta {
        font-size: 0.8rem;
        color: #64748b;
        margin-top: 0.75rem;
    }
    .search-meta strong { color: #0f172a; }

    /* Main Layout */
    .search-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }
    @media(min-width: 1024px) {
        .search-container {
            grid-template-columns: 280px 1fr;
            gap: 3rem;
            padding: 2.5rem 1rem;
        }
    }
    @media(min-width: 1280px) {
        .search-container {
            grid-template-columns: 320px 1fr;
            gap: 4rem;
            padding: 3rem 2rem;
        }
    }

    /* Filter Sidebar */
    .filter-sidebar {
        order: 2;
    }
    @media(min-width: 1024px) {
        .filter-sidebar {
            order: 1;
            height: fit-content;
            position: sticky;
            top: 100px;
        }
    }

    .filter-section {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.25rem;
        margin-bottom: 1.5rem;
    }

    .filter-section-title {
        font-size: 0.8rem;
        font-weight: 900;
        color: #0f172a;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .filter-section-title::before {
        content: '';
        width: 3px;
        height: 16px;
        background: #1e3a8a;
        border-radius: 2px;
    }

    /* Filter Grid */
    .filter-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    @media(min-width: 640px) {
        .filter-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media(min-width: 1024px) {
        .filter-grid { grid-template-columns: 1fr; }
    }

    .filter-option {
        position: relative;
    }

    .filter-option input[type="checkbox"],
    .filter-option input[type="radio"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .filter-option label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        color: #374151;
        text-align: center;
        transition: all 0.2s;
        min-height: 44px;
        word-break: break-word;
    }

    .filter-option input:checked + label {
        background: #1e3a8a;
        color: white;
        border-color: #1e3a8a;
        box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }

    .filter-option label:hover {
        border-color: #cbd5e1;
        background: #f8fafc;
    }

    .filter-option input:checked + label:hover {
        background: #1e40af;
        border-color: #1e40af;
    }

    /* Price Range Filter */
    .price-range {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 100%;
    }

    .price-range input {
        flex: 1;
        min-width: 0;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 0.5rem;
        font-size: 0.8rem;
        min-height: 40px;
        box-sizing: border-box;
    }
    .price-range input::-webkit-outer-spin-button,
    .price-range input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .price-range input[type=number] {
        -moz-appearance: textfield;
    }
    .price-range input:focus {
        outline: none;
        border-color: #1e3a8a;
        box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.1);
    }

    /* Products Area */
    .products-area {
        order: 1;
    }
    @media(min-width: 1024px) {
        .products-area { order: 2; }
    }

    /* Product Grid */
    .product-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }
    @media(min-width: 640px) {
        .product-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media(min-width: 768px) {
        .product-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media(min-width: 1024px) {
        .product-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media(min-width: 1280px) {
        .product-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Product Card */
    .product-card {
        display: flex;
        flex-direction: column;
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s;
        height: 100%;
    }
    .product-card:hover {
        border-color: #1e3a8a;
        box-shadow: 0 8px 24px rgba(30, 58, 138, 0.12);
    }

    .product-card.product-card-promoted {
        border: 2px solid #f59e0b;
        box-shadow: 0 10px 26px rgba(245, 158, 11, 0.16);
    }

    .product-card.product-card-promoted:hover {
        border-color: #d97706;
        box-shadow: 0 12px 30px rgba(217, 119, 6, 0.2);
    }

    .product-image {
        aspect-ratio: 1;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-bottom: 1px solid #e2e8f0;
        position: relative;
    }
    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    .product-card:hover .product-image img { transform: scale(1.05); }

    .product-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background: #f97316;
        color: white;
        font-size: 0.7rem;
        font-weight: 900;
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
        text-transform: uppercase;
        z-index: 10;
    }

    .product-body {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .product-category {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
    }

    .product-name {
        font-size: 0.95rem;
        font-weight: 800;
        color: #0f172a;
        margin-bottom: 0.5rem;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .product-desc {
        font-size: 0.8rem;
        color: #64748b;
        line-height: 1.4;
        margin-bottom: 1rem;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .product-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0.75rem;
        border-top: 1px solid #f1f5f9;
        gap: 0.5rem;
    }

    .product-price {
        font-size: 1.1rem;
        font-weight: 900;
        color: #1e3a8a;
        letter-spacing: -0.02em;
    }

    .product-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 0.75rem;
        background: #1e3a8a;
        color: white;
        text-decoration: none;
        font-size: 0.75rem;
        font-weight: 700;
        border-radius: 6px;
        transition: background 0.2s;
        white-space: nowrap;
    }
    .product-cta:hover { background: #1e40af; }

    /* No Results */
    .no-results {
        text-align: center;
        padding: 3rem 1rem;
        background: #f8fafc;
        border: 2px dashed #cbd5e1;
        border-radius: 12px;
        margin: 2rem 0;
    }

    .no-results-icon {
        width: 64px;
        height: 64px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-size: 2rem;
    }

    .no-results h3 {
        font-size: 1.25rem;
        font-weight: 900;
        color: #0f172a;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .no-results p {
        font-size: 0.9rem;
        color: #64748b;
        margin-bottom: 1.5rem;
    }

    .no-results a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        background: #1e3a8a;
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.85rem;
        border-radius: 8px;
        transition: background 0.2s;
    }
    .no-results a:hover { background: #1e40af; }

    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    @media(min-width: 768px) {
        .container { padding: 0 2rem; }
    }
    /* Mobile Filter Drawer */
    .mobile-filter-header {
        display: none;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        align-items: center;
        justify-content: space-between;
        background: white;
        position: sticky;
        top: 0;
        z-index: 20;
    }
    .mobile-filter-header h2 {
        font-size: 1rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #0f172a;
        margin: 0;
    }
    
    .filter-drawer-backdrop {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(4px);
        z-index: 99;
    }

    @media(max-width: 1023px) {
        .filter-sidebar {
            position: fixed;
            top: 0;
            right: -100%;
            width: 320px;
            height: 100vh;
            background: white;
            z-index: 1000;
            transition: right 0.3s ease;
            margin-bottom: 0;
            border-radius: 0;
            overflow-y: auto;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
        }
        .filter-sidebar.active {
            right: 0;
        }
        .mobile-filter-header {
            display: flex;
        }
        .filter-drawer-backdrop.active {
            display: block;
        }
        .filter-section {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #f1f5f9;
            margin-bottom: 0;
            padding: 1.5rem;
        }
    }

    .mobile-filter-btn {
        display: none;
        width: 100%;
        margin-bottom: 1.5rem;
        padding: 0.85rem;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        color: #1e3a8a;
        font-weight: 700;
        font-size: 0.9rem;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    @media(max-width: 1023px) {
        .mobile-filter-btn { display: flex; }
    }
    .mobile-filter-btn:hover { border-color: #1e3a8a; background: #f8fafc; }

    /* Scaling for small devices */
    @media(max-width: 1023px) {
        .search-container { gap: 1.5rem; padding: 1.5rem 1rem; }
    }
 
    @media(max-width: 640px) {
        .search-hero { padding: 1.5rem 1rem 1rem; }
        .search-hero h1 { font-size: 1.5rem; margin-bottom: 1rem; }
        .search-bar input { padding: 0.6rem 0.85rem; font-size: 0.9rem; }
        .search-bar .search-btn { padding: 0 1rem; }
 
        .product-grid { gap: 1rem; }
        .product-name { font-size: 0.85rem; margin-bottom: 0.25rem; }
        .product-desc { font-size: 0.75rem; margin-bottom: 0.75rem; -webkit-line-clamp: 1; }
        .product-price { font-size: 1rem; }
        .product-body { padding: 0.75rem; }
        .product-image { aspect-ratio: 16/10; }
        .product-badge { top: 0.5rem; right: 0.5rem; font-size: 0.6rem; padding: 0.3rem 0.5rem; }
        .product-cta { padding: 0.4rem 0.6rem; font-size: 0.7rem; }
        .product-footer { padding-top: 0.5rem; }
    }
    </style>
    @endpush

    {{-- Hero Section --}}
    <div class="search-hero">
        <div class="container">
            <h1>Search Products</h1>

            <div class="search-bar">
                <input type="text" wire:model.live.debounce.300ms="q" placeholder="Type to search..." autocomplete="off" autofocus>
                <div class="search-btn">
                    <span class="material-symbols-outlined" wire:loading.remove wire:target="q">search</span>
                    <span class="material-symbols-outlined animate-spin" wire:loading wire:target="q">refresh</span>
                    <span class="hidden sm:inline">Searching</span>
                </div>
            </div>

            <div class="search-meta">
                @if ($q)
                    Found <strong>{{ $products->count() }}</strong> results for <strong>"{{ $q }}"</strong>
                @else
                    Browsing <strong>{{ $products->count() }}</strong> products
                @endif
            </div>
        </div>
    </div>

    {{-- Main Content --}}
    <div class="container">
        <div class="search-container">

            <button class="mobile-filter-btn" wire:click="$set('showMobileFilters', true)">
                <span class="material-symbols-outlined">filter_list</span>
                Filters & Sorting
            </button>

            <div class="filter-drawer-backdrop @if($showMobileFilters) active @endif" wire:click="$set('showMobileFilters', false)"></div>

            {{-- FILTERS SIDEBAR --}}
            <aside class="filter-sidebar @if($showMobileFilters) active @endif">
                <div class="mobile-filter-header">
                    <h2>Filters</h2>
                    <button class="p-2" wire:click="$set('showMobileFilters', false)">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                {{-- CATEGORY FILTER --}}
                <div class="filter-section">
                    <h3 class="filter-section-title">
                        <span class="material-symbols-outlined text-sm">category</span>
                        Category
                    </h3>
                    <div class="filter-grid">
                        @foreach ($categories_map as $key => $label)
                            <div class="filter-option">
                                <input type="checkbox" id="cat-{{ $key }}" wire:model.live="category" value="{{ $key }}">
                                <label for="cat-{{ $key }}">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- PRICE FILTER --}}
                <div class="filter-section">
                    <h3 class="filter-section-title">
                        <span class="material-symbols-outlined text-sm">price_check</span>
                        Price
                    </h3>
                    <div class="price-range">
                        <input type="number" wire:model.live.debounce.500ms="price_min" placeholder="Min" min="0">
                        <span style="color: #cbd5e1;">—</span>
                        <input type="number" wire:model.live.debounce.500ms="price_max" placeholder="Max" min="0">
                    </div>
                </div>

                {{-- SORT FILTER --}}
                <div class="filter-section">
                    <h3 class="filter-section-title">
                        <span class="material-symbols-outlined text-sm">sort</span>
                        Sort
                    </h3>
                    <div class="filter-grid">
                        @foreach (['relevance' => 'Featured', 'newest' => 'Newest', 'price_asc' => 'Price: Low→High', 'price_desc' => 'Price: High→Low'] as $key => $label)
                            <div class="filter-option">
                                <input type="radio" id="sort-{{ $key }}" wire:model.live="sort" value="{{ $key }}">
                                <label for="sort-{{ $key }}">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- CLEAR FILTERS --}}
                @if ($q || !empty($category) || $price_min || $price_max)
                    <button wire:click="clearFilters" style="width: 100%; display: block; text-align: center; padding: 0.75rem; background: #f8fafc; color: #1e3a8a; text-decoration: none; border: 2px solid #e2e8f0; border-radius: 8px; font-weight: 700; cursor: pointer; min-height: 44px; line-height: 1.75;">
                        Clear All Filters
                    </button>
                @endif
            </aside>

            {{-- PRODUCTS AREA --}}
            <div class="products-area">
                <div wire:loading.class="opacity-50" wire:target="q, category, price_min, price_max, sort">
                    @if ($products->isEmpty())
                        <div class="no-results">
                            <div class="no-results-icon">🔍</div>
                            <h3>No Products Found</h3>
                            <p>Try adjusting your search or filters</p>
                            <button wire:click="clearFilters" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1.5rem; background: #1e3a8a; color: white; border: none; font-weight: 700; font-size: 0.85rem; border-radius: 8px; cursor: pointer;">
                                <span class="material-symbols-outlined" style="font-size: 1rem;">refresh</span>
                                Clear Filters
                            </button>
                        </div>
                    @else
                        <div class="product-grid">
                            @foreach ($products as $product)
                                <div class="product-card {{ $product->is_promoted ? 'product-card-promoted' : '' }}">
                                    @php $isOwned = in_array($product->id, $activePurchasedIds); @endphp
                                    
                                    @if($product->is_promoted)
                                        <div class="product-badge">Promoted</div>
                                    @endif

                                    @if($isOwned)
                                        <div class="product-badge" style="left: 0.75rem; right: auto; background: #10b981;">Owned</div>
                                    @endif

                                    <div class="product-image">
                                        <a href="{{ route('store.show', $product->slug) }}" class="w-full h-full block">
                                            @if ($product->thumbnail_path)
                                                <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}">
                                            @else
                                                <span class="material-symbols-outlined" style="font-size: 3rem; color: #cbd5e1;">inventory_2</span>
                                            @endif
                                        </a>
                                    </div>

                                    <div class="product-body">
                                        <div class="product-category">{{ str_replace('_', ' ', $product->category) }}</div>
                                        <h3 class="product-name">
                                            <a href="{{ route('store.show', $product->slug) }}" class="hover:text-primary transition-colors text-inherit decoration-none">
                                                {{ $product->name }}
                                            </a>
                                        </h3>
                                        <p class="product-desc">{{ $product->short_description ?? 'High quality product' }}</p>

                                        <div class="product-footer" style="margin-top: auto;">
                                            <span class="product-price">${{ number_format($product->price, 2) }}</span>
                                            <a href="{{ route('store.show', $product->slug) }}" class="product-cta" @if($isOwned) style="background: #10b981;" @endif>
                                                @if($isOwned) VIEW OWNED @else VIEW @endif
                                                <span class="material-symbols-outlined" style="font-size: 0.85rem;">arrow_forward</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
