@extends('store.layout')

@section('title', $product->name)
@section('description', $product->short_description)

@section('content')
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-10 md:py-16">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-medium overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0" style="-webkit-overflow-scrolling: touch;">
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">Catalog</a>
        <span class="text-slate-300">/</span>
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors whitespace-nowrap">{{ ucwords(str_replace('_', ' ', $product->category)) }}</a>
        <span class="text-slate-300">/</span>
        <span class="text-slate-900 dark:text-slate-100 whitespace-nowrap">{{ $product->name }}</span>
    </nav>

    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 items-start">
        
        <!-- Left Column: Product Visuals & Detailed Description -->
        <div class="lg:col-span-7 space-y-8 sm:space-y-12 lg:space-y-16 w-full">
            <!-- Product Image -->
            <div class="aspect-[4/3] w-full bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 flex flex-col items-center justify-center relative group">
                @if ($product->thumbnail_path)
                    <img alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="{{ asset('storage/' . $product->thumbnail_path) }}"/>
                @else
                    <span class="material-symbols-outlined text-6xl sm:text-[80px] text-outline-variant/30">image</span>
                @endif
            </div>

            @if (!empty($product->images))
                <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mt-4 sm:mt-6">
                    @foreach ($product->images as $galleryImage)
                        <div class="aspect-square bg-surface-container-low hover:ring-2 hover:ring-primary rounded-xl overflow-hidden cursor-pointer transition-all border border-outline-variant/20">
                            <img alt="{{ $product->name }} gallery" class="w-full h-full object-cover" src="{{ asset('storage/' . $galleryImage) }}"/>
                        </div>
                    @endforeach
                </div>
            @endif
            
            <!-- Product Content -->
            <div class="space-y-8 sm:space-y-12">
                <section class="space-y-4 sm:space-y-6">
                    <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Overview</h2>
                    <p class="text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
                        {{ $product->short_description }}
                    </p>
                </section>
                
                @if ($product->description)
                <section class="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-outline-variant/20">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary text-lg sm:text-2xl" style="font-variation-settings: 'FILL' 1;">insights</span>
                        <h3 class="text-lg sm:text-xl font-bold tracking-tight text-on-surface">Detailed Description</h3>
                    </div>
                    <div class="text-on-surface-variant leading-relaxed prose prose-slate max-w-none text-sm sm:text-base">
                        {!! $product->description !!}
                    </div>
                </section>
                @endif

                <section class="space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-outline-variant/20">
                    <h3 class="text-lg sm:text-xl font-bold tracking-tight text-on-surface">What's included</h3>
                    <ul class="space-y-3 sm:space-y-4">
                        <li class="flex items-center gap-3 text-on-surface-variant text-sm sm:text-base">
                            <span class="material-symbols-outlined text-primary text-lg sm:text-xl flex-shrink-0">download_done</span>
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
        <div class="lg:col-span-5 sticky top-20 sm:top-24 lg:top-28 w-full max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-7rem)]">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 sm:p-6 lg:p-10 shadow-xl shadow-slate-200/50 overflow-y-auto" style="-webkit-overflow-scrolling: touch;">
                <!-- Header Info -->
                <div class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <span class="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-secondary-container text-on-secondary-container text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-md">
                        {{ ucwords(str_replace('_', ' ', $product->category)) }}
                    </span>
                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-on-surface leading-tight">
                        {{ $product->name }}
                    </h1>
                </div>
                
                <!-- Pricing & Action -->
                <div class="pt-4 sm:pt-6 border-t border-outline-variant/20 space-y-4 sm:space-y-6">
                    @livewire('store.product-price', ['product' => $product])
                    
                    <div class="space-y-3 sm:space-y-4">
                        <form action="{{ route('store.add_to_cart', $product) }}" method="POST">
                            @csrf
                            <button type="submit" class="w-full py-3 sm:py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-sm sm:text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-primary/20 min-h-[48px]">
                                Purchase Now
                                <span class="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
                            </button>
                        </form>
                        
                        <form action="{{ route('store.add_to_cart_only', $product) }}" method="POST">
                            @csrf
                            <button type="submit" class="w-full py-3 sm:py-4 rounded-xl bg-surface text-primary border border-primary/20 font-bold tracking-tight text-sm sm:text-lg hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 min-h-[48px]">
                                Add to Cart
                                <span class="material-symbols-outlined text-lg sm:text-xl">add_shopping_cart</span>
                            </button>
                        </form>
                    </div>
                </div>
                
                <!-- Trust Signal -->
                <div class="mt-6 sm:mt-8 flex items-start gap-3 p-3 sm:p-4 bg-surface-container-low rounded-xl">
                    <div class="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary text-xs sm:text-sm">verified_user</span>
                    </div>
                    <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-bold">
                        Secured by Stripe
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
