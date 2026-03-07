<div>
    {{-- Flash --}}
    @if (session()->has('added'))
        <div class="flash-banner">{{ session('added') }} added to cart.</div>
    @endif

    {{-- Filter tabs --}}
    <div class="filter-bar" role="tablist">
        @foreach ($categories as $key => $label)
            <button class="filter-tab {{ $activeCategory === $key ? 'active' : '' }}"
                    wire:click="setCategory('{{ $key }}')"
                    role="tab">{{ $label }}</button>
        @endforeach
    </div>

    {{-- Result count --}}
    <p class="result-count">{{ $products->count() }} {{ Str::plural('product', $products->count()) }}</p>

    {{-- Grid --}}
    @if ($products->isEmpty())
        <div class="empty-state">
            <div class="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>
            </div>
            <h3>No products found</h3>
            <p>There are no products in this category yet.</p>
            <button class="btn btn-outline" wire:click="setCategory('all')">View all products</button>
        </div>
    @else
        <div class="product-grid" wire:loading.class.add="opacity-50" style="transition:opacity .2s;">
            @foreach ($products as $product)
                <div class="card product-card">
                    {{-- Thumbnail --}}
                    <div class="product-card-thumb">
                        @if ($product->thumbnail_path)
                            <img src="{{ asset('storage/thumbnails/' . $product->thumbnail_path) }}" alt="{{ $product->name }}">
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
                                <button class="btn btn-outline btn-sm"
                                        wire:click="addToCart({{ $product->id }})"
                                        wire:loading.attr="disabled"
                                        wire:target="addToCart({{ $product->id }})">
                                    <span wire:loading.remove wire:target="addToCart({{ $product->id }})">Add to Cart</span>
                                    <span wire:loading wire:target="addToCart({{ $product->id }})">Adding...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
