@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

@push('styles')
<style>
/* Hide header search bar on search page */
nav form[action*="search"] { display: none !important; }

/* Hero Section */
.search-hero {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 1.2rem 0.8rem;
}
@media(min-width: 768px) {
    .search-hero { padding: 1.6rem 0; }
}

.search-hero h1 {
    font-size: 1.2rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.8rem;
}

/* Search Bar */
.search-bar {
    display: flex;
    gap: 0.4rem;
    background: white;
    border: 2px solid #1e3a8a;
    border-radius: 6px;
    overflow: hidden;
    max-width: 480px;
}

.search-bar input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.56rem 0.8rem;
    font-size: 0.76rem;
    color: #0f172a;
    min-height: 40px;
}
.search-bar input::placeholder { color: #94a3b8; }

.search-bar button {
    background: #1e3a8a;
    color: white;
    border: none;
    padding: 0 1.2rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-bar button:hover { background: #1e40af; }

.search-meta {
    font-size: 0.68rem;
    color: #64748b;
    margin-top: 0.6rem;
}

/* Main Layout */
.search-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;
    max-width: 1120px;
    margin: 0 auto;
    padding: 1.6rem 0.8rem;
}
@media(min-width: 1024px) {
    .search-container {
        grid-template-columns: 200px 1fr;
        gap: 2rem;
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
        top: 90px;
    }
}

.filter-section {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
}

.filter-section-title {
    font-size: 0.6rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.6rem;
}

.filter-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.4rem;
}
@media(min-width: 640px) {
    .filter-grid { grid-template-columns: repeat(2, 1fr); }
}
@media(min-width: 1024px) {
    .filter-grid { grid-template-columns: 1fr; }
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
    padding: 0.48rem 0.6rem;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    font-size: 0.64rem;
    font-weight: 500;
    color: #374151;
    transition: all 0.2s;
    min-height: 36px;
    text-align: center;
}

.filter-option input[type="checkbox"]:checked + label,
.filter-option input[type="radio"]:checked + label {
    background: #1e3a8a;
    color: white;
    border-color: #1e3a8a;
}

.filter-option label:hover {
    border-color: #cbd5e1;
}

/* Price Range */
.price-range {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0.4rem;
    max-width: 100%;
}

.price-range input {
    width: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 0.4rem;
    font-size: 0.64rem;
    min-height: 36px;
}
.price-range input:focus {
    outline: none;
    border-color: #1e3a8a;
}

.price-apply {
    width: 100%;
    margin-top: 0.6rem;
    padding: 0.48rem;
    background: #1e3a8a;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    min-height: 36px;
    font-size: 0.64rem;
}
.price-apply:hover { background: #1e40af; }

.clear-filters {
    width: 100%;
    padding: 0.56rem;
    background: #f8fafc;
    color: #1e3a8a;
    text-decoration: none;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    font-size: 0.68rem;
    display: block;
    transition: all 0.2s;
}
.clear-filters:hover { background: #e2e8f0; }

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
    gap: 0.8rem;
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
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s;
}
.product-card:hover {
    border-color: #1e3a8a;
    box-shadow: 0 1.6px 6.4px rgba(30, 58, 138, 0.1);
}

.product-image {
    aspect-ratio: 1;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-badge {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    background: #f97316;
    color: white;
    font-size: 0.52rem;
    font-weight: 700;
    padding: 0.24rem 0.48rem;
    border-radius: 3px;
}

.product-body {
    padding: 0.8rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.product-category {
    font-size: 0.56rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 0.32rem;
}

.product-name {
    font-size: 0.76rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.32rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-desc {
    font-size: 0.64rem;
    color: #64748b;
    line-height: 1.4;
    margin-bottom: 0.6rem;
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
    padding-top: 0.6rem;
    border-top: 1px solid #f1f5f9;
    gap: 0.4rem;
}

.product-price {
    font-size: 0.8rem;
    font-weight: 700;
    color: #1e3a8a;
}

.product-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    padding: 0.4rem 0.6rem;
    background: #1e3a8a;
    color: white;
    text-decoration: none;
    font-size: 0.6rem;
    font-weight: 600;
    border-radius: 5px;
    transition: background 0.2s;
}
.product-cta:hover { background: #1e40af; }

/* No Results */
.no-results {
    text-align: center;
    padding: 2.4rem 0.8rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
}

.no-results h3 {
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.4rem;
}

.no-results p {
    font-size: 0.72rem;
    color: #64748b;
    margin-bottom: 1.2rem;
}

.no-results a {
    display: inline-block;
    padding: 0.48rem 1rem;
    background: #1e3a8a;
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.68rem;
    border-radius: 5px;
}
.no-results a:hover { background: #1e40af; }

.container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 0.8rem;
}
@media(min-width: 768px) {
    .container { padding: 0 1.6rem; }
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
            </button>
        </form>

        <div class="search-meta">
            @if ($query)
                Found <strong>{{ $products->count() }}</strong> results for "{{ $query }}"
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
                <h3 class="filter-section-title">Category</h3>
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
                <h3 class="filter-section-title">Price</h3>
                <div class="price-range">
                    <input type="number" id="price-min" placeholder="Min" min="0" value="{{ request('price_min', '') }}">
                    <span style="color: #cbd5e1;">—</span>
                    <input type="number" id="price-max" placeholder="Max" min="0" value="{{ request('price_max', '') }}">
                </div>
                <button class="price-apply" onclick="applyPriceFilter()">Apply</button>
            </div>

            {{-- SORT FILTER --}}
            <div class="filter-section">
                <h3 class="filter-section-title">Sort By</h3>
                <div class="filter-grid">
                    @foreach (['relevance' => 'Featured', 'newest' => 'Newest', 'price_asc' => 'Low Price', 'price_desc' => 'High Price'] as $key => $label)
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
                <a href="{{ route('store.search') }}" class="clear-filters">Clear All</a>
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
                            @php $isOwned = in_array($product->id, $activePurchasedIds); @endphp
                            
                            @if($isOwned)
                                <div class="product-badge" style="background: #10b981;">Owned</div>
                            @elseif($product->is_promoted)
                                <div class="product-badge">Sponsored</div>
                            @endif

                            <div class="product-image">
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
