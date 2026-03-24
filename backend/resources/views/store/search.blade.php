@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

@push('styles')
<style>
.search-page-hero {
    background: #f8fafc; 
    border-bottom: 2px solid #e2e8f0; 
    padding: 3rem 1rem; 
    text-align: center;
}
@media(min-width: 768px) { .search-page-hero { padding: 4rem 0; } }

.search-bar-wrap {
    display: flex; max-width: 800px; margin: 0 auto;
    background: #fff; border: 2px solid #1e3a8a; border-radius: 0;
    overflow: hidden; box-shadow: 4px 4px 0 rgba(30,58,138,0.1); 
    margin-bottom: 1.5rem; transition: all 0.2s;
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
        grid-template-columns: 1fr 300px; 
        gap: 4rem;
        padding: 4rem 0 8rem;
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
        <h1 class="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">Product Search</h1>
        <form class="search-bar-wrap" action="{{ route('store.search') }}" method="GET" id="search-form">
            <input class="search-bar-input" type="text" name="q"
                   value="{{ $query }}"
                   placeholder="Enter keywords..."
                   autocomplete="off" autofocus>
            {{-- Preserve other filters on search --}}
            <input type="hidden" name="category" value="{{ $category }}">
            <input type="hidden" name="sort" value="{{ $sort }}">
            <button class="search-bar-btn !rounded-none" type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <span class="hidden sm:inline ml-2 uppercase">Search</span>
            </button>
        </form>

        @if ($query)
            <p class="text-sm font-medium text-slate-500">
                Found <span class="text-slate-900 font-black">{{ $products->count() }}</span> results for "<span class="text-primary font-black">{{ $query }}</span>"
            </p>
        @else
            <p class="text-sm font-medium text-slate-500">Exploring all <span class="text-slate-900 font-black">{{ $products->count() }}</span> digital artifacts</p>
        @endif
    </div>
</div>

{{-- Layout: sidebar + results --}}
<div class="container">
    <div class="search-layout">

        {{-- Results Area --}}
        <div class="results-area">
            <div class="results-header mb-8">
                <p class="text-sm font-medium text-slate-400 uppercase tracking-widest flex items-center gap-3">
                    <span class="w-8 h-[2px] bg-blue-600 rounded-full"></span>
                    Displaying Results
                </p>
                @if ($category && $category !== 'all')
                    <div class="mt-4 flex items-center gap-2">
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black ring-1 ring-primary/10">
                            {{ $categories[$category] ?? $category }}
                        </span>
                    </div>
                @endif
            </div>

            @if ($products->isEmpty())
                <div class="py-20 px-8 border-4 border-slate-200 rounded-none bg-slate-50 text-center">
                    <h3 class="text-2xl font-black text-slate-900 mb-2 uppercase">No matches found</h3>
                    <p class="text-slate-500 max-w-sm mx-auto mb-8">Try adjusting your filters.</p>
                    <a href="{{ route('store.search') }}" class="btn btn-outline px-8 !rounded-none border-2">Clear all</a>
                </div>
            @else
                <div class="product-grid">
                    @foreach ($products as $product)
                        <div class="relative bg-white dark:bg-slate-900 border-2 border-slate-200 overflow-hidden hover:border-blue-900 transition-all duration-200 rounded-none">
                            @if($product->is_promoted)
                                <div class="absolute top-0 left-0 z-20 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                                    Sponsored
                                </div>
                            @endif
                            
                            <div class="aspect-video bg-slate-100 overflow-hidden relative border-b-2 border-slate-200 rounded-none">
                                @if ($product->thumbnail_path)
                                    <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover">
                                @else
                                    <div class="w-full h-full flex items-center justify-center opacity-20">
                                        <span class="material-symbols-outlined text-6xl">inventory_2</span>
                                    </div>
                                @endif
                            </div>

                            <div class="p-6">
                                <span class="inline-block px-2 py-0.5 bg-slate-200 text-[10px] font-black text-slate-700 uppercase tracking-widest mb-4">
                                    {{ str_replace('_', ' ', $product->category) }}
                                </span>
                                <h3 class="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight">{{ $product->name }}</h3>
                                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6">{{ $product->short_description }}</p>
                                
                                <div class="flex items-center justify-between pt-5 border-t-2 border-slate-100">
                                    <span class="text-xl font-black text-slate-900 dark:text-white">${{ number_format($product->price, 2) }}</span>
                                    <a href="{{ route('store.show', $product->slug) }}" class="flex items-center gap-2 px-5 py-2 bg-primary text-white text-xs font-black hover:bg-blue-900 transition-colors !rounded-none">
                                        VIEW DETAILS
                                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Sidebar Filters (Right Side) --}}
        <aside class="filter-sidebar">
            <div class="sticky top-24">
                <div class="bg-white border-2 border-slate-200 rounded-none p-6 shadow-[6px_6px_0_#e2e8f0]">
                    <form id="filter-form" action="{{ route('store.search') }}" method="GET">
                        <input type="hidden" name="q" value="{{ $query }}">
                        
                        <div class="flex items-center gap-3 mb-6 border-b-2 border-slate-100 pb-4">
                            <span class="material-symbols-outlined text-primary font-bold">filter_alt</span>
                            <h2 class="text-lg font-black text-slate-900 uppercase tracking-tight">Filters</h2>
                        </div>

                        {{-- Category Group --}}
                        <div class="mb-8">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Categories</p>
                            <div class="space-y-1">
                                @foreach ($categories as $key => $label)
                                    <label class="flex items-center cursor-pointer group">
                                        <input type="radio" name="category" value="{{ $key }}"
                                               {{ $category === $key || ($key === 'all' && $category === '') ? 'checked' : '' }}
                                               class="hidden peer"
                                               onchange="document.getElementById('filter-form').submit()">
                                        <div class="w-full flex items-center justify-between p-2 lg:p-3 border-2 border-slate-100 group-hover:border-slate-300 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white transition-all rounded-none">
                                            <span class="text-xs font-bold uppercase">{{ $label }}</span>
                                            <span class="material-symbols-outlined text-sm peer-checked:block hidden">done</span>
                                        </div>
                                    </label>
                                @endforeach
                            </div>
                        </div>

                        {{-- Sort Group --}}
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Sort Order</p>
                            <div class="space-y-1">
                                @foreach (['relevance' => 'Featured', 'newest' => 'Newest', 'price_asc' => 'Price: Low', 'price_desc' => 'Price: High'] as $key => $label)
                                    <label class="flex items-center cursor-pointer group">
                                        <input type="radio" name="sort" value="{{ $key }}"
                                               {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}
                                               class="hidden peer"
                                               onchange="document.getElementById('filter-form').submit()">
                                        <div class="w-full flex items-center justify-between p-2 lg:p-3 border-2 border-slate-100 group-hover:border-slate-300 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white transition-all rounded-none">
                                            <span class="text-xs font-bold uppercase">{{ $label }}</span>
                                            <span class="material-symbols-outlined text-sm peer-checked:block hidden">done</span>
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
