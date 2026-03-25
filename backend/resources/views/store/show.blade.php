@extends('store.layout')

@section('title', $product->name)
@section('description', $product->short_description)

@section('content')
<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-10">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-1 text-xs text-slate-500 mb-4 sm:mb-5 font-medium overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0" style="-webkit-overflow-scrolling: touch;">
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">Catalog</a>
        <span class="text-slate-300">/</span>
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">{{ ucwords(str_replace('_', ' ', $product->category)) }}</a>
        <span class="text-slate-300">/</span>
        <span class="text-slate-900 dark:text-slate-100 whitespace-nowrap">{{ $product->name }}</span>
    </nav>

    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-14 items-start">
        
        <!-- Left Column: Product Visuals & Detailed Description -->
        <div class="lg:col-span-7 space-y-5 sm:space-y-7 lg:space-y-9 w-full">
            <!-- Product Image -->
            <div class="aspect-[4/3] w-full bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 flex flex-col items-center justify-center relative group">
                @if ($product->thumbnail_path)
                    <img alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="{{ asset('storage/' . $product->thumbnail_path) }}"/>
                @else
                    <span class="material-symbols-outlined text-5xl sm:text-6xl text-outline-variant/30">image</span>
                @endif
            </div>

            @if (!empty($product->images))
                <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 mt-2 sm:mt-4">
                    @foreach ($product->images as $galleryImage)
                        <div class="aspect-square bg-surface-container-low hover:ring-2 hover:ring-primary rounded-lg overflow-hidden cursor-pointer transition-all border border-outline-variant/20">
                            <img alt="{{ $product->name }} gallery" class="w-full h-full object-cover" src="{{ asset('storage/' . $galleryImage) }}"/>
                        </div>
                    @endforeach
                </div>
            @endif
            
            <!-- Product Content -->
            <div class="space-y-5 sm:space-y-7">
                <section class="space-y-2 sm:space-y-3">
                    <h2 class="text-lg sm:text-xl font-bold tracking-tight text-on-surface">Overview</h2>
                    <p class="text-sm sm:text-base text-on-surface-variant leading-relaxed font-light">
                        {{ $product->short_description }}
                    </p>
                </section>
                
                @if ($product->description)
                <section class="space-y-2 sm:space-y-3 pt-4 sm:pt-5 border-t border-outline-variant/20">
                    <div class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-primary text-sm sm:text-lg" style="font-variation-settings: 'FILL' 1;">insights</span>
                        <h3 class="text-sm sm:text-base font-bold tracking-tight text-on-surface">Detailed Description</h3>
                    </div>
                    <div class="text-on-surface-variant leading-relaxed prose prose-slate max-w-none text-xs sm:text-sm">
                        {!! $product->description !!}
                    </div>
                </section>
                @endif

                <section class="space-y-2 sm:space-y-3 pt-4 sm:pt-5 border-t border-outline-variant/20">
                    <h3 class="text-sm sm:text-base font-bold tracking-tight text-on-surface">What's included</h3>
                    <ul class="space-y-1.5 sm:space-y-2">
                        <li class="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm">
                            <span class="material-symbols-outlined text-primary text-sm sm:text-base flex-shrink-0">download_done</span>
                            <span>Instant digital download after purchase</span>
                        </li>
                        <li class="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm">
                            <span class="material-symbols-outlined text-primary text-sm sm:text-base flex-shrink-0">lock_clock</span>
                            <span>48-hour secure download link</span>
                        </li>
                        <li class="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm">
                            <span class="material-symbols-outlined text-primary text-sm sm:text-base flex-shrink-0">workspace_premium</span>
                            <span>Commercial use license</span>
                        </li>
                        <li class="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm">
                            <span class="material-symbols-outlined text-primary text-sm sm:text-base flex-shrink-0">folder_managed</span>
                            <span>Access via My Downloads portal</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        
        <!-- Right Column: Minimalist Sticky Summary Card -->
        <div class="lg:col-span-5 sticky top-12 sm:top-14 lg:top-16 w-full max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)]">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-2 sm:p-3 lg:p-6 shadow-xl shadow-slate-200/50 overflow-y-auto" style="-webkit-overflow-scrolling: touch;">
                <!-- Header Info -->
                <div class="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.3 sm:py-0.6 bg-secondary-container text-on-secondary-container text-[6px] sm:text-[7px] font-bold uppercase tracking-widest rounded-sm">
                        {{ ucwords(str_replace('_', ' ', $product->category)) }}
                    </span>
                    <h1 class="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-on-surface leading-tight">
                        {{ $product->name }}
                    </h1>
                </div>
                
                <!-- Pricing & Action -->
                <div class="pt-3 sm:pt-4 border-t border-outline-variant/20 space-y-3 sm:space-y-4">
                    <div class="rounded-xl border border-outline-variant/20 bg-surface p-3 sm:p-4 space-y-3">
                        @livewire('store.product-price', ['product' => $product])
                        <div class="h-px bg-outline-variant/20"></div>

                        <div class="space-y-2 sm:space-y-2.5">
                        @if($isBought)
                            <div class="bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-3 text-center">
                                <span class="material-symbols-outlined text-[#10b981] text-lg mb-0.5">check_circle</span>
                                <h4 class="text-[#10b981] font-bold text-sm">Already Owned</h4>
                                <p class="text-on-surface-variant text-xs mt-0.5">You already have this product in your library.</p>
                                <a href="{{ route('downloads.index') }}" class="mt-2 inline-flex items-center justify-center gap-1 bg-[#10b981] text-white px-3 py-2 rounded text-xs font-bold hover:bg-[#059669] transition-all min-h-[40px]">
                                    Go to My Library
                                    <span class="material-symbols-outlined text-xs">download</span>
                                </a>
                            </div>
                        @else
                            <form action="{{ route('store.add_to_cart', $product) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-white font-bold tracking-tight text-xs sm:text-sm hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 min-h-[42px]">
                                    Purchase Now
                                    <span class="material-symbols-outlined text-base">arrow_forward</span>
                                </button>
                            </form>
                            
                            <form action="{{ route('store.add_to_cart_only', $product) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full py-2.5 sm:py-3 rounded-lg bg-surface-container-low text-primary border border-primary/30 font-bold tracking-tight text-xs sm:text-sm hover:border-primary hover:bg-surface-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 min-h-[42px]">
                                    Add to Cart
                                    <span class="material-symbols-outlined text-base">add_shopping_cart</span>
                                </button>
                            </form>
                        @endif
                        </div>
                    </div>
                </div>
                
                <!-- Trust Signal -->
                <div class="mt-4 sm:mt-5 flex items-start gap-1.5 p-2 sm:p-2.5 bg-surface-container-low rounded-lg">
                    <div class="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary text-[10px]">verified_user</span>
                    </div>
                    <p class="text-xs text-on-surface-variant leading-relaxed font-bold">
                        Secured by Lemon Squeezy
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
