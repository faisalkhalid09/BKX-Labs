@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

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

.search-bar button {
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
.search-bar button:hover { background: #1e40af; }

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

/* Filter Grid (2 or 3 columns) */
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

.filter-option input[type="checkbox"] {
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

.filter-option input[type="checkbox"]:checked + label {
    background: #1e3a8a;
    color: white;
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.filter-option label:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
}

.filter-option input[type="checkbox"]:checked + label:hover {
    background: #1e40af;
    border-color: #1e40af;
}

/* Price Range Filter */
.price-range {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.price-range input {
    flex: 1;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.5rem;
    font-size: 0.8rem;
    min-height: 40px;
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
}
.product-card:hover {
    border-color: #1e3a8a;
    box-shadow: 0 8px 24px rgba(30, 58, 138, 0.12);
}

.product-image {
    aspect-ratio: 1;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid #e2e8f0;
}
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}
.product-card:hover .product-image img {
    transform: scale(1.05);
}

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

/* Mobile Filter Toggle */
.filter-toggle {
    display: none;
    margin-bottom: 1.5rem;
}
@media(max-width: 1023px) {
    .filter-toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #1e3a8a;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        font-size: 0.9rem;
        min-height: 44px;
    }
}

/* Container */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}
@media(min-width: 768px) {
    .container { padding: 0 2rem; }
}
</style>
@endpush

@section('content')

{{-- Hero Section --}}
<div class="search-hero">
    <div class="container">
        <h1>Search Products</h1>

        <form class="search-bar" action="{{ route('store.search') }}" method="GET" id="search-form">
            <input type="text" name="q" placeholder="What are you looking for?" 
                   value="{{ $query }}" autocomplete="off" autofocus>
            <button type="submit">
                <span class="material-symbols-outlined">search</span>
                <span class="hidden sm:inline">Search</span>
            </button>
        </form>

        <div class="search-meta">
            @if ($query)
                Found <strong>{{ $products->count() }}</strong> results for <strong>"{{ $query }}"</strong>
            @else
                Browsing <strong>{{ $products->count() }}</strong> products
            @endif
        </div>
    </div>
</div>

{{-- Main Content --}}
<div class="container">
    <div class="search-container">

        {{-- FILTERS SIDEBAR --}}
        <aside class="filter-sidebar">

            {{-- CATEGORY FILTER --}}
            <div class="filter-section">
                <h3 class="filter-section-title">
                    <span class="material-symbols-outlined text-sm">category</span>
                    Category
                </h3>
                <form id="filter-form" method="GET" action="{{ route('store.search') }}">
                    <input type="hidden" name="q" value="{{ $query }}">

                    <div class="filter-grid">
                        @foreach ($categories as $key => $label)
                            <div class="filter-option">
                                <input type="checkbox" id="cat-{{ $key }}" name="category[]" 
                                       value="{{ $key }}" class="filter-checkbox"
                                       {{ in_array($key, (array)$category) ? 'checked' : '' }}>
                                <label for="cat-{{ $key }}">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>
                </form>
            </div>

            {{-- PRICE FILTER --}}
            <div class="filter-section">
                <h3 class="filter-section-title">
                    <span class="material-symbols-outlined text-sm">price_check</span>
                    Price
                </h3>
                <div class="price-range">
                    <input type="number" id="price-min" placeholder="Min" min="0" value="{{ request('price_min', '') }}">
                    <span style="color: #cbd5e1;">—</span>
                    <input type="number" id="price-max" placeholder="Max" min="0" value="{{ request('price_max', '') }}">
                </div>
                <button onclick="applyPriceFilter()" style="width: 100%; margin-top: 0.75rem; padding: 0.6rem; background: #1e3a8a; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; min-height: 40px;">
                    Apply
                </button>
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
                            <input type="radio" id="sort-{{ $key }}" name="sort" 
                                   value="{{ $key }}" class="sort-radio"
                                   {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}>
                            <label for="sort-{{ $key }}">{{ $label }}</label>
                        </div>
                    @endforeach
                </div>
            </div>

            {{-- CLEAR FILTERS --}}
            @if ($query || $category || request('price_min') || request('price_max'))
                <a href="{{ route('store.search') }}" style="display: block; text-align: center; padding: 0.75rem; background: #f8fafc; color: #1e3a8a; text-decoration: none; border: 2px solid #e2e8f0; border-radius: 8px; font-weight: 700; cursor: pointer; min-height: 44px; line-height: 1.75;">
                    Clear All Filters
                </a>
            @endif
        </aside>

        {{-- PRODUCTS AREA --}}
        <div class="products-area">
            @if ($products->isEmpty())
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No Products Found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <a href="{{ route('store.search') }}">
                        <span class="material-symbols-outlined" style="font-size: 1rem;">refresh</span>
                        Clear Filters
                    </a>
                </div>
            @else
                <div class="product-grid">
                    @foreach ($products as $product)
                        <div class="product-card">
                            @if($product->is_promoted)
                                <div class="product-badge">Sponsored</div>
                            @endif

                            <div class="product-image" style="position: relative;">
                                @if ($product->thumbnail_path)
                                    <img src="{{ asset('storage/' . $product->thumbnail_path) }}" 
                                         alt="{{ $product->name }}">
                                @else
                                    <span class="material-symbols-outlined" style="font-size: 3rem; color: #cbd5e1;">inventory_2</span>
                                @endif
                            </div>

                            <div class="product-body">
                                <div class="product-category">{{ str_replace('_', ' ', $product->category) }}</div>
                                <h3 class="product-name">{{ $product->name }}</h3>
                                <p class="product-desc">{{ $product->short_description ?? 'High quality product' }}</p>

                                <div class="product-footer" style="margin-top: auto;">
                                    <span class="product-price">${{ number_format($product->price, 2) }}</span>
                                    <a href="{{ route('store.show', $product->slug) }}" class="product-cta">
                                        VIEW
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

@endsection

@push('scripts')
<script>
// Price filter
function applyPriceFilter() {
    const minPrice = document.getElementById('price-min').value;
    const maxPrice = document.getElementById('price-max').value;
    const url = new URL(window.location);
    
    if (minPrice) url.searchParams.set('price_min', minPrice);
    else url.searchParams.delete('price_min');
    
    if (maxPrice) url.searchParams.set('price_max', maxPrice);
    else url.searchParams.delete('price_max');
    
    window.location = url.toString();
}

// Category filter
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const form = document.getElementById('filter-form');
        const formData = new FormData(form);
        const url = new URL(window.location);
        
        // Clear existing category params
        url.searchParams.delete('category[]');
        
        // Add selected categories
        formData.getAll('category[]').forEach(val => {
            url.searchParams.append('category[]', val);
        });
        
        window.location = url.toString();
    });
});

// Sort filter
document.querySelectorAll('.sort-radio').forEach(radio => {
    radio.addEventListener('change', function() {
        const url = new URL(window.location);
        url.searchParams.set('sort', this.value);
        window.location = url.toString();
    });
});
</script>
@endpush
                        </div>

                        {{-- Sort Group --}}
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Sort</p>
                            <div class="space-y-0.5">
                                @foreach (['relevance' => 'Featured', 'newest' => 'Newest', 'price_asc' => 'Price: Low', 'price_desc' => 'Price: High'] as $key => $label)
                                    <label class="flex items-center cursor-pointer group">
                                        <input type="radio" name="sort" value="{{ $key }}"
                                               {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}
                                               class="hidden peer"
                                               onchange="document.getElementById('filter-form').submit()">
                                        <div class="w-full flex items-center justify-between py-1.5 px-3 border-2 border-slate-50 group-hover:border-slate-200 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white transition-all rounded-none">
                                            <span class="text-[10px] font-black uppercase tracking-tight">{{ $label }}</span>
                                            <span class="material-symbols-outlined text-xs peer-checked:block hidden">done</span>
                                        </div>
                                    </label>
                                @endforeach
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    </div>
</div>

@endsection

@push('scripts')
<script>
// Radio filters auto-submit — keep category in sync when sorting changes and vice versa
const filterForm = document.getElementById('filter-form');
const hiddenCat  = document.getElementById('hidden-category');

if (filterForm) {
    const catRadios  = filterForm.querySelectorAll('input[name=category]');
    catRadios.forEach(r => {
        r.addEventListener('change', () => {
            hiddenCat.value = r.value;
            filterForm.submit();
        });
    });
}
</script>
@endpush
