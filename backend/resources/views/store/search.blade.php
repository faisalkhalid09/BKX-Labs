@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

@push('styles')
<style>
.search-page-hero {
    background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 1.5rem 1rem; 
}
@media(min-width: 640px) { .search-page-hero { padding: 2rem 0; } }
@media(min-width: 768px) { .search-page-hero { padding: 2.5rem 0; } }

.search-bar-wrap {
    display: flex; max-width: 640px;
    background: #fff; border: 1.5px solid #cbd5e1; border-radius: 12px;
    overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.07); margin-bottom: 1rem;
    transition: border-color .2s, box-shadow .2s;
}
.search-bar-wrap:focus-within { border-color: #1e3a8a; box-shadow: 0 0 0 3px rgba(30,58,138,.1); }
.search-bar-input {
    flex: 1; border: none; outline: none; padding: .7rem 1rem;
    font-size: .875rem; font-family: 'Inter', sans-serif; color: #0f172a; background: transparent;
    min-height: 44px;
}
@media(min-width: 640px) { .search-bar-input { padding: .9rem 1.1rem; font-size: .975rem; } }
.search-bar-input::placeholder { color: #94a3b8; }
.search-bar-btn {
    background: #1e3a8a; color: #fff; border: none; cursor: pointer;
    padding: 0 1rem; font-size: .75rem; font-weight: 600; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; gap: .4rem; transition: background .2s; flex-shrink: 0;
    min-height: 44px;
}
@media(min-width: 640px) { .search-bar-btn { padding: 0 1.4rem; font-size: .875rem; } }
.search-bar-btn:hover { background: #1e40af; }

.search-meta { font-size: .8rem; color: #64748b; padding: 0 1rem; }
@media(min-width: 640px) { .search-meta { font-size: .85rem; padding: 0; } }
.search-meta strong { color: #0f172a; }

/* Filter sidebar + results layout */
.search-layout { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 1.5rem;
    padding: 1.5rem 1rem 3rem; 
    align-items: start;
}
@media(min-width: 1024px) { 
    .search-layout { 
        grid-template-columns: 1fr 280px; 
        gap: 3rem;
        padding: 2.5rem 0 5rem;
    } 
}

/* Sidebar filters */
.filter-sidebar { 
    order: 2;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
@media(min-width: 1024px) { .filter-sidebar { order: 2; position: sticky; top: 100px; } }

.filter-card { 
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
}
@media(min-width: 640px) { .filter-card { padding: 1.25rem; } }

.filter-section-title { 
    font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #64748b; 
    margin-bottom: .75rem;
}
@media(min-width: 640px) { .filter-section-title { font-size: .7rem; margin-bottom: .875rem; } }

.filter-option { 
    display: flex; align-items: center; gap: .625rem; padding: .5rem 0; cursor: pointer;
}
@media(min-width: 640px) { .filter-option { padding: .35rem 0; } }

.filter-option input[type=radio] { 
    accent-color: #1e3a8a; width: 16px; height: 16px; cursor: pointer; flex-shrink: 0;
}
@media(min-width: 640px) { .filter-option input[type=radio] { width: 15px; height: 15px; } }

.filter-option label { 
    font-size: .8rem; color: #374151; cursor: pointer; line-height: 1.4;
}
@media(min-width: 640px) { .filter-option label { font-size: .875rem; } }

.filter-option input[type=radio]:checked + label { color: #1e3a8a; font-weight: 600; }

.filter-divider {
    margin: 1rem 0;
    border: none;
    border-top: 1px solid #e2e8f0;
}
@media(min-width: 640px) { .filter-divider { margin: 1.25rem 0; } }

/* Results area */
.results-area { order: 1; }
@media(min-width: 1024px) { .results-area { order: 1; } }

.results-header { 
    display: flex; align-items: center; justify-content: space-between; 
    margin-bottom: 1rem; flex-wrap: wrap; gap: .75rem;
}
@media(min-width: 640px) { .results-header { margin-bottom: 1.5rem; } }

.results-count { font-size: .8rem; color: #64748b; }
@media(min-width: 640px) { .results-count { font-size: .875rem; } }

.results-count strong { color: #0f172a; font-weight: 700; }
.sort-select {
    border: 1.5px solid #e2e8f0; border-radius: 8px; padding: .35rem .75rem;
    font-size: .75rem; font-family: 'Inter', sans-serif; color: #374151;
    background: #fff; outline: none; cursor: pointer; transition: border-color .2s;
    min-height: 44px;
}
@media(min-width: 640px) { 
    .sort-select { 
        padding: .45rem .875rem; 
        font-size: .825rem;
    } 
}
.sort-select:focus { border-color: #1e3a8a; }

/* Product grid — same as catalog */
.product-grid { 
    display: grid; 
    grid-template-columns: 1fr;
    gap: 1rem;
}
@media(min-width: 640px) { 
    .product-grid { 
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    } 
}
@media(min-width: 768px) { 
    .product-grid { 
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1.25rem;
    } 
}

.product-card { 
    display: flex; flex-direction: column;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
}

.product-card-thumb { 
    aspect-ratio: 16/9;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid #e2e8f0;
}

.product-card-thumb img { 
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-card-thumb-placeholder { 
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-card-thumb-placeholder svg { 
    width: 20px;
    height: 20px;
    stroke: #94a3b8;
}

.product-card-body { 
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}
@media(min-width: 640px) { .product-card-body { padding: 1.125rem; } }

.product-card-category { margin-bottom: .4rem; }
@media(min-width: 640px) { .product-card-category { margin-bottom: .45rem; } }

.product-card-name { 
    font-size: .85rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: .25rem;
    line-height: 1.35;
}
@media(min-width: 640px) { .product-card-name { font-size: .95rem; } }

.product-card-desc { 
    font-size: .75rem;
    color: #64748b;
    line-height: 1.5;
    flex: 1;
    margin-bottom: .75rem;
}
@media(min-width: 640px) { 
    .product-card-desc { 
        font-size: .8rem;
        line-height: 1.6;
        margin-bottom: .875rem;
    } 
}

.product-card-footer { 
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f1f5f9;
    padding-top: .75rem;
    margin-top: auto;
    gap: .5rem;
    flex-wrap: wrap;
}
@media(min-width: 640px) { 
    .product-card-footer { 
        padding-top: .875rem;
    } 
}

.product-card-price { 
    font-size: .95rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
}
@media(min-width: 640px) { .product-card-price { font-size: 1.1rem; } }

.product-card-actions { 
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
}

.no-results { 
    text-align: center; 
    padding: 2rem 1rem;
}
@media(min-width: 640px) { .no-results { padding: 4rem 1rem; } }

.no-results-icon { 
    width: 48px;
    height: 48px;
    background: #f1f5f9;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}
@media(min-width: 640px) { 
    .no-results-icon { 
        width: 52px;
        height: 52px;
    } 
}

.no-results h3 { 
    font-size: .95rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: .375rem;
}
@media(min-width: 640px) { .no-results h3 { font-size: 1.05rem; } }

.no-results p { 
    font-size: .8rem;
    color: #64748b;
    max-width: 34ch;
    margin: 0 auto 1.5rem;
}
@media(min-width: 640px) { .no-results p { font-size: .875rem; } }

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: .5rem .75rem;
    border-radius: 6px;
    font-size: .75rem;
    font-weight: 600;
    text-decoration: none;
    transition: all .2s;
    min-height: 36px;
    cursor: pointer;
}
@media(min-width: 640px) {
    .btn {
        padding: .6rem .9rem;
        font-size: .8rem;
        min-height: 40px;
    }
}

.btn-outline {
    border: 1.5px solid #e2e8f0;
    color: #374151;
    background: #fff;
}
.btn-outline:hover { border-color: #1e3a8a; color: #1e3a8a; }

.btn-ghost {
    color: #1e3a8a;
    background: transparent;
}
.btn-ghost:hover { background: #f0f4ff; }

.btn-sm {
    padding: .35rem .5rem;
    font-size: .7rem;
}
@media(min-width: 640px) {
    .btn-sm {
        padding: .4rem .65rem;
        font-size: .75rem;
    }
}

.chip {
    display: inline-block;
    padding: .25rem .5rem;
    border-radius: 4px;
    font-size: .65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .05em;
}
@media(min-width: 640px) {
    .chip {
        padding: .3rem .6rem;
        font-size: .7rem;
    }
}

.chip-blue { background: #e0e7ff; color: #3730a3; }

.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 1rem;
}
@media(min-width: 640px) { .container { padding: 0 1.5rem; } }
@media(min-width: 768px) { .container { padding: 0 3rem; } }

.card {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}
</style>
@endpush

@section('content')

{{-- Search hero --}}
<div class="search-page-hero">
    <div class="container">
        <form class="search-bar-wrap" action="{{ route('store.search') }}" method="GET" id="search-form">
            <input class="search-bar-input" type="text" name="q"
                   value="{{ $query }}"
                   placeholder="Search products..."
                   autocomplete="off" autofocus>
            {{-- Preserve other filters on search --}}
            <input type="hidden" name="category" value="{{ $category }}">
            <input type="hidden" name="sort" value="{{ $sort }}">
            <button class="search-bar-btn" type="submit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <span class="hidden sm:inline">Search</span>
            </button>
        </form>

        @if ($query)
            <p class="search-meta">
                <strong>{{ $products->count() }}</strong> {{ Str::plural('result', $products->count()) }} for
                "<strong>{{ substr($query, 0, 30) }}</strong>"
            </p>
        @else
            <p class="search-meta">Showing all <strong>{{ $products->count() }}</strong> {{ Str::plural('product', $products->count()) }}</p>
        @endif
    </div>
</div>

        {{-- Results --}}
        <div class="results-area">
            <div class="results-header">
                <p class="results-count">
                    Found <strong>{{ $products->count() }}</strong> {{ Str::plural('product', $products->count()) }}
                    @if ($category && $category !== 'all') in <strong class="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{{ $categories[$category] ?? $category }}</strong>@endif
                </p>
            </div>

            @if ($products->isEmpty())
                <div class="no-results bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                    <div class="no-results-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    </div>
                    <h3 class="text-xl font-black">No matches found</h3>
                    <p class="mt-2">Try different keywords or browse our catalog.</p>
                    <a href="{{ route('store.search') }}" class="btn btn-outline mt-6">Clear all filters</a>
                </div>
            @else
                <div class="product-grid">
                    @foreach ($products as $product)
                        <div class="card product-card group hover:border-blue-700/30 transition-all duration-300">
                            @if($product->is_promoted)
                                <div class="absolute top-2 left-2 z-10 bg-primary text-on-primary text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm">
                                    Promoted
                                </div>
                            @endif
                            <div class="product-card-thumb relative">
                                @if ($product->thumbnail_path)
                                    <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="group-hover:scale-105 transition-transform duration-500">
                                @else
                                    <div class="product-card-thumb-placeholder">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>
                                    </div>
                                @endif
                            </div>
                            <div class="product-card-body">
                                <div class="product-card-category">
                                    <span class="chip chip-blue opacity-80">{{ ucwords(str_replace('_', ' ', $product->category)) }}</span>
                                </div>
                                <div class="product-card-name">{{ $product->name }}</div>
                                <div class="product-card-desc">{{ $product->short_description }}</div>
                                <div class="product-card-footer">
                                    <span class="product-card-price">${{ number_format($product->price, 2) }}</span>
                                    <div class="product-card-actions">
                                        <a href="{{ route('store.show', $product->slug) }}" class="btn btn-ghost hover:shadow-lg transition-all rounded-lg text-sm">View Details &rarr;</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Sidebar Filters (Now on the Right) --}}
        <aside class="filter-sidebar">
            <div class="filter-card shadow-lg shadow-slate-200/50 border-slate-200/80">
                <form id="filter-form" action="{{ route('store.search') }}" method="GET">
                    <input type="hidden" name="q" value="{{ $query }}">
                    
                    <div class="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <span class="material-symbols-outlined text-blue-900 text-xl font-bold">tune</span>
                        <p class="font-black text-sm text-slate-900 tracking-tight">Filter Results</p>
                    </div>

                    {{-- Category --}}
                    <p class="filter-section-title">Niche / Category</p>
                    <div class="space-y-1">
                        @foreach ($categories as $key => $label)
                            <div class="filter-option group pr-4 rounded-md hover:bg-slate-50 transition-colors">
                                <input type="radio" name="category" id="cat_{{ $key }}" value="{{ $key }}"
                                       {{ $category === $key || ($key === 'all' && $category === '') ? 'checked' : '' }}
                                       onchange="document.getElementById('filter-form').submit()">
                                <label for="cat_{{ $key }}" class="font-medium group-hover:text-blue-900 transition-colors">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>

                    <hr class="filter-divider">

                    {{-- Sort --}}
                    <p class="filter-section-title">Preference</p>
                    <div class="space-y-1">
                        @foreach (['relevance' => 'All (Shuffled)', 'newest' => 'Latest Arrivals', 'price_asc' => 'Lowest Price', 'price_desc' => 'Highest Price'] as $key => $label)
                            <div class="filter-option group pr-4 rounded-md hover:bg-slate-50 transition-colors transition-colors">
                                <input type="radio" name="sort" id="sort_{{ $key }}" value="{{ $key }}"
                                       {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}
                                       onchange="document.getElementById('filter-form').submit()">
                                <label for="sort_{{ $key }}" class="font-medium group-hover:text-blue-900 transition-colors">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>

                    <input type="hidden" name="category" value="{{ $category ?: 'all' }}" id="hidden-category">
                </form>

                <div class="mt-8 pt-6 border-t border-slate-100 italic text-[11px] text-slate-400 text-center px-4 leading-relaxed">
                    Sponsoring these niche products helps fund our community builders.
                </div>
            </div>
        </aside>

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
