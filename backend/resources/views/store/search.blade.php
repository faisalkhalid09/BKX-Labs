@extends('store.layout')

@section('title', $query ? 'Search: ' . $query : 'Search Products')

@push('styles')
<style>
/* Clean, minimalist adjustments */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
@endpush

@section('content')
<!-- Search Page Container -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
    
    <!-- Hero/Header Section -->
    <div class="mb-10 sm:mb-16">
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Search Results</h1>
        
        <div class="max-w-2xl">
            <form action="{{ route('store.search') }}" method="GET" class="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden flex items-center transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5">
                <span class="material-symbols-outlined pl-5 text-slate-400">search</span>
                <input type="text" name="q" value="{{ $query }}" placeholder="What are you looking for?" 
                       class="flex-1 bg-transparent border-none px-4 py-4 text-sm sm:text-base focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 font-medium outline-none">
                <button type="submit" class="bg-primary text-white px-8 py-4 text-sm font-bold hover:bg-primary/90 transition-colors">
                    Search
                </button>
            </form>
            
            <p class="mt-4 text-xs font-medium text-slate-500 flex items-center gap-2 uppercase tracking-widest">
                <span class="material-symbols-outlined text-sm">filter_list</span>
                @if ($query)
                    Found <strong>{{ $products->count() }}</strong> results for "{{ $query }}"
                @else
                    Showing <strong>{{ $products->count() }}</strong> products
                @endif
            </p>
        </div>
    </div>

    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-start">
        
        <!-- Sidebar: Filters -->
        <aside class="lg:col-span-3 w-full sticky top-24 space-y-8">
            
            <!-- Category Filter -->
            <div class="space-y-4">
                <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</h3>
                <form id="filter-form" method="GET" action="{{ route('store.search') }}" class="flex flex-wrap lg:flex-col gap-2">
                    <input type="hidden" name="q" value="{{ $query }}">
                    @foreach ($categories as $key => $label)
                        <label class="flex items-center gap-2 group cursor-pointer">
                            <div class="relative flex items-center">
                                <input type="checkbox" name="category[]" value="{{ $key }}"
                                       class="filter-checkbox w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                       {{ in_array($key, (array)$category) ? 'checked' : '' }}>
                            </div>
                            <span class="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                {{ $label }}
                            </span>
                        </label>
                    @endforeach
                </form>
            </div>

            <!-- Price Range -->
            <div class="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Price Range</h3>
                <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <input type="number" id="price-min" placeholder="Min" value="{{ request('price_min') }}"
                           class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary transition-all">
                    <span class="text-slate-300">-</span>
                    <input type="number" id="price-max" placeholder="Max" value="{{ request('price_max') }}"
                           class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-primary transition-all">
                </div>
                <button onclick="applyPriceFilter()" class="w-full bg-slate-900 dark:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold hover:bg-black transition-all">
                    Apply Filter
                </button>
            </div>

            <!-- Sort By -->
            <div class="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800/50">
                <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort By</h3>
                <div class="flex flex-wrap lg:flex-col gap-2">
                    @foreach (['relevance' => 'Featured', 'newest' => 'Newest', 'price_asc' => 'Lowest Price', 'price_desc' => 'Highest Price'] as $key => $label)
                        <label class="flex items-center gap-2 group cursor-pointer">
                            <input type="radio" name="sort" value="{{ $key }}"
                                   class="sort-radio w-5 h-5 border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                   {{ $sort === $key || ($key === 'relevance' && $sort === '') ? 'checked' : '' }}>
                            <span class="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                                {{ $label }}
                            </span>
                        </label>
                    @endforeach
                </div>
            </div>

            @if ($query || $category || request('price_min') || request('price_max'))
                <div class="pt-8">
                    <a href="{{ route('store.search') }}" class="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-100 text-red-600 font-bold text-xs hover:bg-red-50 transition-all">
                        <span class="material-symbols-outlined text-sm">close</span>
                        Clear All Filters
                    </a>
                </div>
            @endif
        </aside>

        <!-- Product Grid -->
        <main class="lg:col-span-9 w-full">
            @if ($products->isEmpty())
                <div class="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <div class="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <span class="material-symbols-outlined text-3xl">sentiment_very_dissatisfied</span>
                    </div>
                    <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">No matching products</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mb-8">Try adjusting your terms or filters to find what you're looking for.</p>
                    <a href="{{ route('store.search') }}" class="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-bold transition-all hover:shadow-xl active:scale-95">
                        <span class="material-symbols-outlined text-sm">refresh</span>
                        Reset Filters
                    </a>
                </div>
            @else
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    @foreach ($products as $product)
                        <!-- Product Card: Modern Minimalist -->
                        <div class="group flex flex-col h-full bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-900 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none">
                            <div class="aspect-[4/5] bg-slate-50 dark:bg-slate-900/50 overflow-hidden relative rounded-t-[2rem]">
                                @php $isOwned = in_array($product->id, $activePurchasedIds); @endphp
                                
                                <a href="{{ route('store.show', $product->slug) }}" class="w-full h-full block">
                                    @if ($product->thumbnail_path)
                                        <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                                    @else
                                        <div class="w-full h-full flex items-center justify-center text-slate-200">
                                            <span class="material-symbols-outlined text-5xl">image</span>
                                        </div>
                                    @endif
                                    
                                    @if($isOwned)
                                        <div class="absolute top-4 left-4 z-10">
                                            <span class="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Owned</span>
                                        </div>
                                    @endif
                                </a>
                            </div>

                            <div class="p-6 flex-1 flex flex-col">
                                <span class="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">
                                    {{ str_replace('_', ' ', $product->category) }}
                                </span>
                                <a href="{{ route('store.show', $product->slug) }}">
                                    <h3 class="text-base font-black text-slate-900 dark:text-white mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors truncate">
                                        {{ $product->name }}
                                    </h3>
                                </a>
                                <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6">
                                    {{ $product->short_description ?? 'Digital asset for engineering excellence.' }}
                                </p>
                                
                                <div class="mt-auto flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-900">
                                    <span class="text-lg font-black text-slate-900 dark:text-white">${{ number_format($product->price, 2) }}</span>
                                    <a href="{{ route('store.show', $product->slug) }}" class="p-2.5 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-primary hover:text-white transition-all">
                                        <span class="material-symbols-outlined text-base">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </main>
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
