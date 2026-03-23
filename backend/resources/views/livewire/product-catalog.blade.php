<div>
    {{-- Flash --}}
    @if (session()->has('added'))
        <div class="bg-[#10b981] text-white px-4 py-3 rounded-lg mb-8 text-sm font-semibold animate-[slideIn_0.3s_ease-out]">
            {{ session('added') }} added to cart.
        </div>
    @endif

    {{-- Filter Row: Tonal Layering --}}
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div class="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0" style="scrollbar-width: none;">
            @foreach ($categories as $key => $label)
                <button 
                    wire:click="setCategory('{{ $key }}')"
                    class="px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all whitespace-nowrap {{ $activeCategory === $key ? 'bg-primary text-on-primary scale-100' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-variant' }}">
                    {{ $label }}
                </button>
            @endforeach
        </div>
        <div class="flex items-center gap-4">
            <span class="text-on-surface-variant text-sm font-medium">{{ $products->count() }} {{ Str::plural('product', $products->count()) }}</span>
        </div>
    </div>

    {{-- Product Grid: No Borders, Tonal Boundaries --}}
    @if ($products->isEmpty())
        <div class="text-center py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
            <div class="w-16 h-16 bg-surface-container-low rounded-xl flex items-center justify-center mx-auto mb-4 text-outline">
                <span class="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
            <h3 class="text-xl font-bold text-on-surface mb-2">No products found</h3>
            <p class="text-on-surface-variant text-sm max-w-md mx-auto mb-6">There are no products in this category yet.</p>
            <button class="bg-primary text-on-primary px-6 py-2 rounded font-bold transition-all hover:scale-105" wire:click="setCategory('all')">View all products</button>
        </div>
    @else
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" wire:loading.class.add="opacity-50" style="transition:opacity .2s;">
            @foreach ($products as $product)
                <!-- Product Card -->
                <div class="group bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-outline-variant/20 hover:border-outline-variant/40 flex flex-col h-full">
                    <div class="aspect-[4/3] bg-surface-container-low mb-6 overflow-hidden rounded-xl flex items-center justify-center relative">
                        <!-- Top-right absolute add to cart button on hover -->
                        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button class="bg-surface-container-lowest text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50" 
                                    wire:click="addToCart({{ $product->id }})"
                                    wire:loading.attr="disabled"
                                    title="Quick Add">
                                <span wire:loading.remove wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                                <span wire:loading wire:target="addToCart({{ $product->id }})" class="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                            </button>
                        </div>

                        <a href="{{ route('store.show', $product->slug) }}" class="w-full h-full block">
                            @if ($product->thumbnail_path)
                                <img src="{{ asset('storage/thumbnails/' . $product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            @else
                                <div class="w-full h-full flex items-center justify-center">
                                    <span class="material-symbols-outlined text-5xl text-outline-variant/40">image</span>
                                </div>
                            @endif
                        </a>
                    </div>
                    <div class="mb-4 flex-1 flex flex-col">
                        <div>
                            <span class="inline-block px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-md mb-4">
                                {{ ucwords(str_replace('_', ' ', $product->category)) }}
                            </span>
                        </div>
                        <a href="{{ route('store.show', $product->slug) }}">
                            <h3 class="text-xl font-bold text-on-surface mb-2 tracking-tight line-clamp-2 hover:text-primary transition-colors">{{ $product->name }}</h3>
                        </a>
                        <p class="text-on-surface-variant text-sm leading-relaxed line-clamp-3 mb-6">{{ $product->short_description }}</p>
                    </div>
                    <div class="flex items-center justify-between pt-5 border-t border-outline-variant/10 mt-auto">
                        <span class="text-2xl font-black text-primary tracking-tight">${{ number_format($product->price, 2) }}</span>
                        <a href="{{ route('store.show', $product->slug) }}" class="text-sm font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1 group/link">
                            Details <span class="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
