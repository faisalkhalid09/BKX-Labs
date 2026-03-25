@extends('store.layout')

@section('title', $product->name)
@section('description', $product->short_description)

@section('content')
<div class="max-w-[1152px] mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-8 md:py-13">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6 font-medium overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0" style="-webkit-overflow-scrolling: touch;">
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">Catalog</a>
        <span class="text-slate-300">/</span>
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">{{ ucwords(str_replace('_', ' ', $product->category)) }}</a>
        <span class="text-slate-300">/</span>
        <span class="text-slate-900 dark:text-slate-100 whitespace-nowrap">{{ $product->name }}</span>
    </nav>

    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-19 items-start">
        
        <!-- Left Column: Product Visuals & Detailed Description -->
        <div class="lg:col-span-7 space-y-6 sm:space-y-10 lg:space-y-12 w-full">
            <!-- Product Image -->
            <div class="aspect-[4/3] w-full bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 flex flex-col items-center justify-center relative group">
                @if ($product->thumbnail_path)
                    <img alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="{{ asset('storage/' . $product->thumbnail_path) }}"/>
                @else
                    <span class="material-symbols-outlined text-6xl sm:text-[80px] text-outline-variant/30">image</span>
                @endif
            </div>

            @if (!empty($product->images))
                <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-3 mt-3 sm:mt-5">
                    @foreach ($product->images as $galleryImage)
                        <div class="aspect-square bg-surface-container-low hover:ring-2 hover:ring-primary rounded-xl overflow-hidden cursor-pointer transition-all border border-outline-variant/20">
                            <img alt="{{ $product->name }} gallery" class="w-full h-full object-cover" src="{{ asset('storage/' . $galleryImage) }}"/>
                        </div>
                    @endforeach
                </div>
            @endif
            
            <!-- Product Content -->
            <div class="space-y-6 sm:space-y-10">
                <section class="space-y-3 sm:space-y-5">
                    <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">Overview</h2>
                    <p class="text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
                        {{ $product->short_description }}
                    </p>
                </section>
                
                @if ($product->description)
                <section class="space-y-3 sm:space-y-5 pt-5 sm:pt-6 border-t border-outline-variant/20">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-base sm:text-xl" style="font-variation-settings: 'FILL' 1;">insights</span>
                        <h3 class="text-base sm:text-lg font-bold tracking-tight text-on-surface">Detailed Description</h3>
                    </div>
                    <div class="text-on-surface-variant leading-relaxed prose prose-slate max-w-none text-sm sm:text-base">
                        {!! $product->description !!}
                    </div>
                </section>
                @endif

                <section class="space-y-3 sm:space-y-5 pt-5 sm:pt-6 border-t border-outline-variant/20">
                    <h3 class="text-base sm:text-lg font-bold tracking-tight text-on-surface">What's included</h3>
                    <ul class="space-y-2 sm:space-y-3">
                        <li class="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
                            <span class="material-symbols-outlined text-primary text-base sm:text-lg flex-shrink-0">download_done</span>
                            <span>Instant digital download after purchase</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant text-sm sm:text-base">
                            <span class="material-symbols-outlined text-primary text-lg sm:text-xl flex-shrink-0">lock_clock</span>
                            <span>48-hour secure download link</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant text-sm sm:text-base">
                            <span class="material-symbols-outlined text-primary text-lg sm:text-xl flex-shrink-0">workspace_premium</span>
                            <span>Commercial use license</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant text-sm sm:text-base">
                            <span class="material-symbols-outlined text-primary text-lg sm:text-xl flex-shrink-0">folder_managed</span>
                            <span>Access via My Downloads portal</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        
        <!-- Right Column: Minimalist Sticky Summary Card -->
        <div class="lg:col-span-5 sticky top-16 sm:top-19 lg:top-22 w-full max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)]">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-3 sm:p-5 lg:p-8 shadow-xl shadow-slate-200/50 overflow-y-auto" style="-webkit-overflow-scrolling: touch;">
                <!-- Header Info -->
                <div class="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.4 sm:py-0.8 bg-secondary-container text-on-secondary-container text-[7px] sm:text-[8px] font-bold uppercase tracking-widest rounded-md">
                        {{ ucwords(str_replace('_', ' ', $product->category)) }}
                    </span>
                    <h1 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-on-surface leading-tight">
                        {{ $product->name }}
                    </h1>
                </div>
                
                <!-- Pricing & Action -->
                <div class="pt-3 sm:pt-5 border-t border-outline-variant/20 space-y-3 sm:space-y-5">
                    @livewire('store.product-price', ['product' => $product])
                    
                    <div class="space-y-2 sm:space-y-3">
                        @if($isBought)
                            <div class="bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg p-3 text-center">
                                <span class="material-symbols-outlined text-[#10b981] text-2xl mb-1">check_circle</span>
                                <h4 class="text-[#10b981] font-bold text-base">Already Owned</h4>
                                <p class="text-on-surface-variant text-xs mt-1">
                                <a href="{{ route('downloads.index') }}" class="mt-3 inline-flex items-center gap-1.5 bg-[#10b981] text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-[#059669] transition-all">
                                    Go to My Library
                                    <span class="material-symbols-outlined text-sm">download</span>
                                </a>
                            </div>
                        @else
                            <form action="{{ route('store.add_to_cart', $product) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-white font-bold tracking-tight text-xs sm:text-base hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 min-h-[40px]">
                                    Purchase Now
                                    <span class="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
                                </button>
                            </form>
                            
                            <form action="{{ route('store.add_to_cart_only', $product) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full py-2.5 sm:py-3 rounded-lg bg-surface text-primary border border-primary/20 font-bold tracking-tight text-xs sm:text-base hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[40px]">
                                    Add to Cart
                                    <span class="material-symbols-outlined text-lg sm:text-xl">add_shopping_cart</span>
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
                
                <!-- Trust Signal -->
                <div class="mt-5 sm:mt-6 flex items-start gap-2 p-2.5 sm:p-3 bg-surface-container-low rounded-lg">
                    <div class="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary text-xs">verified_user</span>
                    </div>
                    <p class="text-xs text-on-surface-variant leading-relaxed font-bold">
                        Secured by Stripe
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
