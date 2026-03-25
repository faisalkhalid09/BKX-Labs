<div>
    {{-- Flash --}}
    @if (session()->has('added'))
        <div class="bg-[#10b981] text-white px-3 py-2.5 rounded-lg mb-5 sm:mb-6 text-xs sm:text-sm font-semibold animate-[slideIn_0.3s_ease-out]">
            {{ session('added') }} added to cart.
        </div>
    @endif

    @if (session()->has('error'))
        <div class="bg-red-500 text-white px-3 py-2.5 rounded-lg mb-5 sm:mb-6 text-xs sm:text-sm font-semibold animate-[slideIn_0.3s_ease-out]">
            {{ session('error') }}
        </div>
    @endif

    {{-- Filter Row: Tonal Layering --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-13 gap-3 sm:gap-5">
        <div class="flex gap-1.5 sm:gap-2.5 overflow-x-auto pb-1.5 -mx-3 px-3 sm:mx-0 sm:px-0 sm:pb-0" style="scrollbar-width: none; -webkit-overflow-scrolling: touch;">
            @foreach ($categories as $key => $label)
                <button 
                    wire:click="setCategory('{{ $key }}')"
                    class="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap min-h-[36px] flex items-center {{ $activeCategory === $key ? 'bg-primary text-on-primary scale-100' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant' }}">
                    {{ $label }}
                </button>
            @endforeach
        </div>
        <div class="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span class="text-on-surface-variant font-medium whitespace-nowrap">{{ $products->count() }} {{ Str::plural('product', $products->count()) }}</span>
        </div>
    </div>

    {{-- Product Grid: No Borders, Tonal Boundaries --}}
    @if ($products->isEmpty())
        <div class="text-center py-10 sm:py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
            <div class="w-10 sm:w-13 h-10 sm:h-13 bg-surface-container-low rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 text-outline">
                <span class="material-symbols-outlined text-xl sm:text-2xl">inventory_2</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-on-surface mb-1.5">No products found</h3>
            <p class="text-on-surface-variant text-xs max-w-md mx-auto mb-3 sm:mb-5 px-3">There are no products in this category yet.</p>
            <button class="bg-primary text-on-primary px-3 sm:px-5 py-1.5 sm:py-2 rounded font-bold transition-all hover:scale-105 text-xs" wire:click="setCategory('all')">View all products</button>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6" wire:loading.class.add="opacity-50" style="transition:opacity .2s;">
            @foreach ($products as $product)
                <!-- Product Card -->
                <div class="group bg-surface-container-lowest p-2.5 sm:p-4 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-outline-variant/20 hover:border-outline-variant/40 flex flex-col h-full">
                    <div class="aspect-[4/3] bg-surface-container-low mb-2.5 sm:mb-5 overflow-hidden rounded-lg flex items-center justify-center relative">
                        @php $isOwned = in_array($product->id, $activePurchasedIds); @endphp

                        @if($isOwned)
                            <div class="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 z-10">
                                <span class="bg-[#10b981] text-white px-1.5 py-0.75 rounded text-[8px] font-black uppercase tracking-widest shadow-lg">Owned</span>
                            </div>
                        @else
                            <!-- Top-right absolute add to cart button on hover -->
                            <div class="absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <button class="bg-surface-container-lowest text-primary p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center" 
                                        wire:click="addToCart({{ $product->id }})"
                                        wire:loading.attr="disabled"
                                        title="Quick Add">
                                    <span wire:loading.remove wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-sm">shopping_cart_checkout</span>
                                    <span wire:loading wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-sm animate-spin">refresh</span>
                                </button>
                            </div>

                            <!-- Mobile quick add button - always visible on mobile -->
                            <button class="sm:hidden absolute bottom-1.5 right-1.5 left-1.5 bg-primary text-on-primary py-1.5 rounded-lg font-semibold text-xs transition-all hover:bg-primary-container active:scale-95 group-hover:hidden flex items-center justify-center gap-0.5 min-h-[36px]"
                                    wire:click="addToCart({{ $product->id }})"
                                    wire:loading.attr="disabled"
                                    title="Add to Cart">
                                <span class="material-symbols-outlined text-base">shopping_cart_checkout</span>
                                <span>Add</span>
                            </button>
                        @endif

                        <a href="{{ route('store.show', $product->slug) }}" class="w-full h-full block">
                            @if ($product->thumbnail_path)
                                <img src="{{ asset('storage/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            @else
                                <div class="w-full h-full flex items-center justify-center">
                                    <span class="material-symbols-outlined text-3xl sm:text-5xl text-outline-variant/40">image</span>
                                </div>
                            @endif
                        </a>
                    </div>
                    <div class="mb-2.5 sm:mb-3 flex-1 flex flex-col">
                        <div>
                            <span class="inline-block px-1.5 sm:py-0.75 bg-secondary-container text-on-secondary-container text-[7px] font-bold uppercase tracking-widest rounded-md mb-1.5 sm:mb-3">
                                {{ ucwords(str_replace('_', ' ', $product->category)) }}
                            </span>
                        </div>
                        <a href="{{ route('store.show', $product->slug) }}">
                            <h3 class="text-sm sm:text-lg font-bold text-on-surface mb-0.75 sm:mb-1.5 tracking-tight line-clamp-2 hover:text-primary transition-colors">{{ $product->name }}</h3>
                        </a>
                        <p class="text-on-surface-variant text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-5">{{ $product->short_description }}</p>
                    </div>
                    <div class="flex items-center justify-between pt-2.5 sm:pt-4 border-t border-outline-variant/10 mt-auto gap-1.5">
                        <span class="text-base sm:text-xl font-black text-primary tracking-tight">${{ number_format($product->price, 2) }}</span>
                        <a href="{{ route('store.show', $product->slug) }}" class="text-xs font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-0.5 group/link whitespace-nowrap">
                            Details <span class="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
