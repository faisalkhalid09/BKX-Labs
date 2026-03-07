@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

@push('styles')
<style>
.search-page-hero {
    background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 2.5rem 0;
}
.search-bar-wrap {
    display: flex; max-width: 640px;
    background: #fff; border: 1.5px solid #cbd5e1; border-radius: 12px;
    overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.07); margin-bottom: 1rem;
    transition: border-color .2s, box-shadow .2s;
}
.search-bar-wrap:focus-within { border-color: #1e3a8a; box-shadow: 0 0 0 3px rgba(30,58,138,.1); }
.search-bar-input {
    flex: 1; border: none; outline: none; padding: .9rem 1.1rem;
    font-size: .975rem; font-family: 'Inter', sans-serif; color: #0f172a; background: transparent;
}
.search-bar-input::placeholder { color: #94a3b8; }
.search-bar-btn {
    background: #1e3a8a; color: #fff; border: none; cursor: pointer;
    padding: 0 1.4rem; font-size: .875rem; font-weight: 600; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; gap: .4rem; transition: background .2s; flex-shrink: 0;
}
.search-bar-btn:hover { background: #1e40af; }

.search-meta { font-size: .85rem; color: #64748b; }
.search-meta strong { color: #0f172a; }

/* Filter sidebar + results layout */
.search-layout { display: grid; grid-template-columns: 220px 1fr; gap: 2.5rem; padding: 2.5rem 0 5rem; align-items: start; }
@media(max-width:860px){ .search-layout{grid-template-columns:1fr;} }

/* Sidebar filters */
.filter-card { padding: 1.25rem; }
.filter-section-title { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #64748b; margin-bottom: .875rem; }
.filter-option { display: flex; align-items: center; gap: .625rem; padding: .35rem 0; cursor: pointer; }
.filter-option input[type=radio] { accent-color: #1e3a8a; width: 15px; height: 15px; cursor: pointer; flex-shrink: 0; }
.filter-option label { font-size: .875rem; color: #374151; cursor: pointer; line-height: 1.4; }
.filter-option input[type=radio]:checked + label { color: #1e3a8a; font-weight: 600; }

/* Results area */
.results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: .75rem; }
.results-count { font-size: .875rem; color: #64748b; }
.results-count strong { color: #0f172a; font-weight: 700; }
.sort-select {
    border: 1.5px solid #e2e8f0; border-radius: 8px; padding: .45rem .875rem;
    font-size: .825rem; font-family: 'Inter', sans-serif; color: #374151;
    background: #fff; outline: none; cursor: pointer; transition: border-color .2s;
}
.sort-select:focus { border-color: #1e3a8a; }

/* Product grid — same as catalog */
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
@media(max-width:640px){ .product-grid{grid-template-columns:1fr;} }
.product-card { display: flex; flex-direction: column; }
.product-card-thumb { aspect-ratio:16/9;background:#f1f5f9;border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;overflow:hidden;border-bottom:1px solid #e2e8f0; }
.product-card-thumb img { width:100%;height:100%;object-fit:cover; }
.product-card-thumb-placeholder { width:40px;height:40px;border-radius:8px;background:#e2e8f0;display:flex;align-items:center;justify-content:center; }
.product-card-thumb-placeholder svg { width:20px;height:20px;stroke:#94a3b8; }
.product-card-body { padding:1.125rem;flex:1;display:flex;flex-direction:column; }
.product-card-category { margin-bottom:.45rem; }
.product-card-name { font-size:.95rem;font-weight:700;color:#0f172a;margin-bottom:.3rem;line-height:1.35; }
.product-card-desc { font-size:.8rem;color:#64748b;line-height:1.6;flex:1;margin-bottom:.875rem; }
.product-card-footer { display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f1f5f9;padding-top:.875rem;margin-top:auto;gap:.5rem; }
.product-card-price { font-size:1.1rem;font-weight:800;color:#0f172a;letter-spacing:-0.02em; }
.product-card-actions { display:flex;gap:.4rem; }

.no-results { text-align: center; padding: 4rem 1rem; }
.no-results-icon { width:52px;height:52px;background:#f1f5f9;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem; }
.no-results h3 { font-size:1.05rem;font-weight:700;color:#0f172a;margin-bottom:.375rem; }
.no-results p { font-size:.875rem;color:#64748b;max-width:34ch;margin:0 auto 1.5rem; }
</style>
@endpush

@section('content')

{{-- Search hero --}}
<div class="search-page-hero">
    <div class="container">
        <form class="search-bar-wrap" action="{{ route('store.search') }}" method="GET" id="search-form">
            <input class="search-bar-input" type="text" name="q"
                   value="{{ $query }}"
                   placeholder="Search products, AI models, scripts..."
                   autocomplete="off" autofocus>
            {{-- Preserve other filters on search --}}
            <input type="hidden" name="category" value="{{ $category }}">
            <input type="hidden" name="sort" value="{{ $sort }}">
            <button class="search-bar-btn" type="submit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                Search
            </button>
        </form>

        @if ($query)
            <p class="search-meta">
                <strong>{{ $products->count() }}</strong> {{ Str::plural('result', $products->count()) }} for
                "<strong>{{ $query }}</strong>"
            </p>
        @else
            <p class="search-meta">Showing all <strong>{{ $products->count() }}</strong> {{ Str::plural('product', $products->count()) }}</p>
        @endif
    </div>
</div>

{{-- Layout: sidebar + results --}}
<div class="container">
    <div class="search-layout">

        {{-- Sidebar Filters --}}
        <aside>
            <div class="card filter-card">
                <form id="filter-form" action="{{ route('store.search') }}" method="GET">
                    <input type="hidden" name="q" value="{{ $query }}">

                    {{-- Category --}}
                    <p class="filter-section-title">Category</p>
                    @foreach ($categories as $key => $label)
                        <div class="filter-option">
                            <input type="radio" name="category" id="cat_{{ $key }}" value="{{ $key }}"
                                   {{ $category === $key || ($key === 'all' && $category === '') ? 'checked' : '' }}
                                   onchange="document.getElementById('filter-form').submit()">
                            <label for="cat_{{ $key }}">{{ $label }}</label>
                        </div>
                    @endforeach

                    <hr class="divider" style="margin:1.25rem 0;">

                    {{-- Sort --}}
                    <p class="filter-section-title">Sort By</p>
                    @foreach (['relevance' => 'Relevance', 'newest' => 'Newest', 'price_asc' => 'Price: Low to High', 'price_desc' => 'Price: High to Low'] as $key => $label)
                        <div class="filter-option">
                            <input type="radio" name="sort" id="sort_{{ $key }}" value="{{ $key }}"
                                   {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}
                                   onchange="document.getElementById('filter-form').submit()">
                            <label for="sort_{{ $key }}">{{ $label }}</label>
                        </div>
                    @endforeach

                    <input type="hidden" name="category" value="{{ $category ?: 'all' }}" id="hidden-category">
                </form>
            </div>
        </aside>

        {{-- Results --}}
        <div>
            <div class="results-header">
                <p class="results-count">
                    <strong>{{ $products->count() }}</strong> {{ Str::plural('product', $products->count()) }}
                    @if ($category && $category !== 'all') in <strong>{{ $categories[$category] ?? $category }}</strong>@endif
                </p>
            </div>

            @if ($products->isEmpty())
                <div class="no-results">
                    <div class="no-results-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    </div>
                    <h3>No products found</h3>
                    <p>Try different keywords or remove filters to see all products.</p>
                    <a href="{{ route('store.search') }}" class="btn btn-outline">Clear search</a>
                </div>
            @else
                <div class="product-grid">
                    @foreach ($products as $product)
                        <div class="card product-card">
                            <div class="product-card-thumb">
                                @if ($product->thumbnail_path)
                                    <img src="{{ asset('storage/thumbnails/'.$product->thumbnail_path) }}" alt="{{ $product->name }}">
                                @else
                                    <div class="product-card-thumb-placeholder">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>
                                    </div>
                                @endif
                            </div>
                            <div class="product-card-body">
                                <div class="product-card-category">
                                    <span class="chip chip-blue">{{ ucwords(str_replace('_', ' ', $product->category)) }}</span>
                                </div>
                                <div class="product-card-name">{{ $product->name }}</div>
                                <div class="product-card-desc">{{ $product->short_description }}</div>
                                <div class="product-card-footer">
                                    <span class="product-card-price">${{ number_format($product->price, 2) }}</span>
                                    <div class="product-card-actions">
                                        <a href="{{ route('store.show', $product->slug) }}" class="btn btn-ghost btn-sm">Details</a>
                                        <a href="{{ route('store.show', $product->slug) }}" class="btn btn-outline btn-sm">Add to Cart</a>
                                    </div>
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
// Radio filters auto-submit — keep category in sync when sorting changes and vice versa
const filterForm = document.getElementById('filter-form');
const catRadios  = filterForm.querySelectorAll('input[name=category]');
const sortRadios = filterForm.querySelectorAll('input[name=sort]');
const hiddenCat  = document.getElementById('hidden-category');

catRadios.forEach(r => {
    r.addEventListener('change', () => {
        hiddenCat.value = r.value;
        // Remove duplicate hidden field to avoid conflict
        hiddenCat.remove();
        filterForm.submit();
    });
});
sortRadios.forEach(r => {
    r.removeEventListener('change', () => {});
});
</script>
@endpush
