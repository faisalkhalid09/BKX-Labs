@extends('store.layout')

@section('title', $product->name)
@section('description', $product->short_description)

@section('content')
<div class="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors">Catalog</a>
        <span class="text-slate-300">/</span>
        <a href="{{ url('/store') }}" class="hover:text-primary transition-colors">{{ ucwords(str_replace('_', ' ', $product->category)) }}</a>
        <span class="text-slate-300">/</span>
        <span class="text-slate-900 dark:text-slate-100">{{ $product->name }}</span>
    </nav>

    <div class="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        <!-- Left Column: Product Visuals & Detailed Description -->
        <div class="lg:col-span-7 space-y-16 w-full">
            <!-- Product Image -->
            <div class="aspect-[4/3] w-full bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 flex flex-col items-center justify-center relative group">
                @if ($product->thumbnail_path)
                    <img alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="{{ asset('storage/' . $product->thumbnail_path) }}"/>
                @else
                    <span class="material-symbols-outlined text-[80px] text-outline-variant/30">image</span>
                @endif
            </div>

            @if (!empty($product->images))
                <div class="grid grid-cols-4 sm:grid-cols-5 gap-4 mt-6">
                    @foreach ($product->images as $galleryImage)
                        <div class="aspect-square bg-surface-container-low hover:ring-2 hover:ring-primary rounded-xl overflow-hidden cursor-pointer transition-all border border-outline-variant/20">
                            <img alt="{{ $product->name }} gallery" class="w-full h-full object-cover" src="{{ asset('storage/' . $galleryImage) }}"/>
                        </div>
                    @endforeach
                </div>
            @endif
            
            <!-- Product Content -->
            <div class="space-y-12">
                <section class="space-y-6">
                    <h2 class="text-3xl font-bold tracking-tight text-on-surface">Overview</h2>
                    <p class="text-lg text-on-surface-variant leading-relaxed font-light">
                        {{ $product->short_description }}
                    </p>
                </section>
                
                @if ($product->description)
                <section class="space-y-6 pt-8 border-t border-outline-variant/20">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">insights</span>
                        <h3 class="text-xl font-bold tracking-tight text-on-surface">Detailed Description</h3>
                    </div>
                    <div class="text-on-surface-variant leading-relaxed prose prose-slate max-w-none">
                        {!! $product->description !!}
                    </div>
                </section>
                @endif

                <section class="space-y-6 pt-8 border-t border-outline-variant/20">
                    <h3 class="text-xl font-bold tracking-tight text-on-surface">What's included</h3>
                    <ul class="space-y-4">
                        <li class="flex items-center gap-3 text-on-surface-variant">
                            <span class="material-symbols-outlined text-primary text-xl">download_done</span>
                            <span>Instant digital download after purchase</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant">
                            <span class="material-symbols-outlined text-primary text-xl">lock_clock</span>
                            <span>48-hour secure download link</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant">
                            <span class="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                            <span>Commercial use license</span>
                        </li>
                        <li class="flex items-center gap-3 text-on-surface-variant">
                            <span class="material-symbols-outlined text-primary text-xl">folder_managed</span>
                            <span>Access via My Downloads portal</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        
        <!-- Right Column: Minimalist Sticky Summary Card -->
        <div class="lg:col-span-5 sticky top-28 w-full">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-8 lg:p-10 shadow-xl shadow-slate-200/50">
                <!-- Header Info -->
                <div class="space-y-4 mb-8">
                    <span class="inline-flex items-center px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-md">
                        {{ ucwords(str_replace('_', ' ', $product->category)) }}
                    </span>
                    <h1 class="text-3xl lg:text-4xl font-black tracking-tight text-on-surface leading-tight">
                        {{ $product->name }}
                    </h1>
                </div>
                
                <!-- Pricing & Action -->
                <div class="pt-6 border-t border-outline-variant/20 space-y-6">
                    @livewire('store.product-price', ['product' => $product])
                    
                    <div class="space-y-4">
                        <form action="{{ route('store.add_to_cart', $product) }}" method="POST">
                            @csrf
                            <button type="submit" class="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                                Purchase Now
                                <span class="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </form>
                        
                        <form action="{{ route('store.add_to_cart_only', $product) }}" method="POST">
                            @csrf
                            <button type="submit" class="w-full py-4 rounded-xl bg-surface text-primary border border-primary/20 font-bold tracking-tight text-lg hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                Add to Cart
                                <span class="material-symbols-outlined text-xl">add_shopping_cart</span>
                            </button>
                        </form>
                    </div>
                </div>
                
                <!-- Trust Signal -->
                <div class="mt-8 flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                    <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary text-sm">verified_user</span>
                    </div>
                    <p class="text-xs text-on-surface-variant leading-relaxed mt-1 font-bold">
                        Secured by Stripe
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
