<div id="catalog" class="pt-8 sm:pt-12 scroll-mt-20">
    {{-- Flash Notifications --}}
    @if (session()->has('added'))
        <div class="fixed bottom-8 right-8 z-[100] bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-[slideInUp_0.3s_ease-out]">
            <span class="material-symbols-outlined text-xl">check_circle</span>
            <span class="text-sm font-bold">{{ session('added') }} added to cart</span>
        </div>
    @endif

    @if (session()->has('error'))
        <div class="fixed bottom-8 right-8 z-[100] bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-[slideInUp_0.3s_ease-out]">
            <span class="material-symbols-outlined text-xl">error</span>
            <span class="text-sm font-bold">{{ session('error') }}</span>
        </div>
    @endif

    {{-- Filter Row: Premium Minimalist --}}
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 sm:mb-16 gap-6">
        <div class="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
            @foreach ($categories as $key => $label)
                <button 
                    wire:click="setCategory('{{ $key }}')"
                    class="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap min-h-[44px] flex items-center border {{ $activeCategory === $key ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-400 dark:hover:border-slate-600' }}">
                    {{ $label }}
                </button>
            @endforeach
        </div>
        <div class="flex items-center gap-3 text-xs uppercase tracking-widest font-black text-slate-400 dark:text-slate-600">
            <span class="material-symbols-outlined text-sm">grid_view</span>
            <span>{{ $products->count() }} {{ Str::plural('Results', $products->count()) }}</span>
        </div>
    </div>

    {{-- Product Grid --}}
    @if ($products->isEmpty())
        <div class="text-center py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div class="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
                <span class="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
            <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">No products found</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto mb-8">Refine your category selection or search query.</p>
            <button class="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-bold transition-all hover:shadow-xl active:scale-95" wire:click="setCategory('all')">View All Products</button>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-12" wire:loading.class.add="opacity-50" style="transition:opacity .2s;">
            @foreach ($products as $product)
                <!-- Product Card -->
                <div class="catalog-product-card group relative bg-white dark:bg-slate-950 rounded-[4px] overflow-hidden transition-all duration-500 hover:-translate-y-1 {{ $product->is_promoted ? 'promoted-card-animated border border-transparent' : 'border border-slate-200 dark:border-slate-800' }}">
                    <div class="catalog-product-media bg-slate-50 dark:bg-slate-900/50 overflow-hidden relative rounded-[2px]">
                        @php $isOwned = in_array($product->id, $activePurchasedIds); @endphp

                        @if($product->is_promoted)
                            <div class="absolute top-4 right-4 z-10">
                                <span class="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl" style="color:#ffffff;">Promoted</span>
                            </div>
                        @endif

                        @if($isOwned)
                            <div class="absolute top-4 left-4 z-10">
                                <span class="bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Already Purchased</span>
                            </div>
                        @endif

                        <a href="{{ route('store.show', $product->slug) }}" class="w-full h-full block">
                            @if ($product->thumbnail_path)
                                <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                            @else
                                <div class="w-full h-full flex items-center justify-center">
                                    <span class="material-symbols-outlined text-4xl text-slate-200 dark:text-slate-800">image_not_supported</span>
                                </div>
                            @endif
                        </a>

                        @unless($isOwned)
                            <!-- Quick Action Button -->
                            <button class="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-primary p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50" 
                                    wire:click="addToCart({{ $product->id }})"
                                    wire:loading.attr="disabled">
                                <span wire:loading.remove wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined">add_shopping_cart</span>
                                <span wire:loading wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined animate-spin">refresh</span>
                            </button>
                        @endif
                    </div>

                    <div class="catalog-product-body pt-3 sm:pt-4 pb-2 px-2 sm:px-3 flex flex-col {{ $product->is_promoted ? 'bg-white' : '' }}">
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <span class="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-[10px] font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                                {{ str_replace('_', ' ', $product->category) }}
                            </span>
                            <span class="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                                ${{ number_format($product->price, 2) }}
                            </span>
                        </div>
                        <a href="{{ route('store.show', $product->slug) }}">
                            <h3 class="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-1 sm:mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                                {{ $product->name }}
                            </h3>
                        </a>
                        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-1 sm:line-clamp-2 mb-3 sm:mb-4">
                            {{ $product->short_description }}
                        </p>
                        
                        <div class="mt-auto flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-50 dark:border-slate-900">
                            <div class="flex flex-col">
                                <span class="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Price</span>
                                <span class="text-lg sm:text-xl font-black text-slate-900 dark:text-white">${{ number_format($product->price, 2) }}</span>
                            </div>
                            <a href="{{ route('store.show', $product->slug) }}" class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes slideInUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    .promoted-card-animated {
        border: 3px solid transparent;
        background:
            linear-gradient(var(--card-bg, #ffffff), var(--card-bg, #ffffff)) padding-box,
            linear-gradient(120deg, #0f3bbf 0%, #1d4ed8 16%, #2563eb 33%, #38bdf8 50%, #2563eb 67%, #1d4ed8 84%, #0f3bbf 100%) border-box;
        background-size: 100% 100%, 180% 180%;
        animation: promotedBorderFlow 2.8s linear infinite;
        box-shadow: 0 10px 28px rgba(29, 78, 216, 0.22);
    }

    .catalog-product-card {
        aspect-ratio: 1 / 1;
        display: grid;
        grid-template-rows: 60% 40%;
    }

    .catalog-product-media {
        height: 100%;
    }

    .catalog-product-body {
        min-height: 0;
    }

    @media (prefers-color-scheme: dark) {
        .promoted-card-animated {
            --card-bg: #020617;
        }
    }

    @keyframes promotedBorderFlow {
        0% { background-position: 0% 50%; }
        100% { background-position: 180% 50%; }
    }
</style>
