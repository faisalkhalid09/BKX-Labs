<div>
    {{-- Flash --}}
    @if (session()->has('added'))
        <div class="bg-[#10b981] text-white px-4 py-3 rounded-lg mb-6 sm:mb-8 text-xs sm:text-sm font-semibold animate-[slideIn_0.3s_ease-out]">
            {{ session('added') }} added to cart.
        </div>
    @endif

    {{-- Filter Row: Tonal Layering --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
        <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0" style="scrollbar-width: none; -webkit-overflow-scrolling: touch;">
            @foreach ($categories as $key => $label)
                <button 
                    wire:click="setCategory('{{ $key }}')"
                    class="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap min-h-[40px] flex items-center {{ $activeCategory === $key ? 'bg-primary text-on-primary scale-100' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant' }}">
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
        <div class="text-center py-12 sm:py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
            <div class="w-12 sm:w-16 h-12 sm:h-16 bg-surface-container-low rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-outline">
                <span class="material-symbols-outlined text-2xl sm:text-3xl">inventory_2</span>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-on-surface mb-2">No products found</h3>
            <p class="text-on-surface-variant text-xs sm:text-sm max-w-md mx-auto mb-4 sm:mb-6 px-4">There are no products in this category yet.</p>
            <button class="bg-primary text-on-primary px-4 sm:px-6 py-2 sm:py-2.5 rounded font-bold transition-all hover:scale-105 text-sm" wire:click="setCategory('all')">View all products</button>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" wire:loading.class.add="opacity-50" style="transition:opacity .2s;">
            @foreach ($products as $product)
                <!-- Product Card -->
                <div class="group bg-surface-container-lowest p-3 sm:p-5 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-outline-variant/20 hover:border-outline-variant/40 flex flex-col h-full">
                    <div class="aspect-[4/3] bg-surface-container-low mb-3 sm:mb-6 overflow-hidden rounded-xl flex items-center justify-center relative">
                        <!-- Top-right absolute add to cart button on hover -->
                        <div class="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button class="bg-surface-container-lowest text-primary p-2 sm:p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center" 
                                    wire:click="addToCart({{ $product->id }})"
                                    wire:loading.attr="disabled"
                                    title="Quick Add">
                                <span wire:loading.remove wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-base sm:text-[18px]">shopping_cart_checkout</span>
                                <span wire:loading wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-base sm:text-[18px] animate-spin">refresh</span>
                            </button>
                        </div>

                        <!-- Mobile quick add button - always visible on mobile -->
                        <button class="sm:hidden absolute bottom-2 right-2 left-2 bg-primary text-on-primary py-2 rounded-lg font-semibold text-xs transition-all hover:bg-primary-container active:scale-95 group-hover:hidden flex items-center justify-center gap-1 min-h-[44px]"
                                wire:click="addToCart({{ $product->id }})"
                                wire:loading.attr="disabled"
                                title="Add to Cart">
                            <span class="material-symbols-outlined text-base">shopping_cart_checkout</span>
                            <span>Add</span>
                        </button>

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
                    <div class="mb-3 sm:mb-4 flex-1 flex flex-col">
                        <div>
                            <span class="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-secondary-container text-on-secondary-container text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-md mb-2 sm:mb-4">
                                {{ ucwords(str_replace('_', ' ', $product->category)) }}
                            </span>
                        </div>
                        <a href="{{ route('store.show', $product->slug) }}">
                            <h3 class="text-base sm:text-xl font-bold text-on-surface mb-1 sm:mb-2 tracking-tight line-clamp-2 hover:text-primary transition-colors">{{ $product->name }}</h3>
                        </a>
                        <p class="text-on-surface-variant text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6">{{ $product->short_description }}</p>
                    </div>
                    <div class="flex items-center justify-between pt-3 sm:pt-5 border-t border-outline-variant/10 mt-auto gap-2">
                        <span class="text-lg sm:text-2xl font-black text-primary tracking-tight">${{ number_format($product->price, 2) }}</span>
                        <a href="{{ route('store.show', $product->slug) }}" class="text-xs sm:text-sm font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-0.5 sm:gap-1 group/link whitespace-nowrap">
                            Details <span class="material-symbols-outlined text-sm sm:text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
