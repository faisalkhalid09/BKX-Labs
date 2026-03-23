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
            <div class="aspect-[4/3] w-full bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 flex items-center justify-center">
                @if ($product->thumbnail_path)
                    <img alt="{{ $product->name }}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" src="{{ asset('storage/thumbnails/'.$product->thumbnail_path) }}"/>
                @else
                    <span class="material-symbols-outlined text-[80px] text-outline-variant/30">image</span>
                @endif
            </div>
            
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
                        {!! nl2br(e($product->description)) !!}
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
                    <div class="flex items-baseline gap-2">
                        <span class="text-4xl font-black text-on-surface">${{ number_format($product->price, 2) }}</span>
                        <span class="text-sm text-on-surface-variant font-medium">USD / Single License</span>
                    </div>
                    
                    @auth
                        <form action="{{ route('checkout.store') }}" method="POST">
                            @csrf
                            <input type="hidden" name="direct_product_id" value="{{ $product->id }}">
                            <button type="submit" class="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                                Purchase Now
                                <span class="material-symbols-outlined text-xl">arrow_forward</span>
                            </button>
                        </form>
                    @else
                        <a href="{{ route('login') }}" class="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                            Sign in to Purchase
                            <span class="material-symbols-outlined text-xl">login</span>
                        </a>
                    @endauth
                </div>
                
                <!-- Trust Signal -->
                <div class="mt-8 flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                    <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-primary text-sm">verified_user</span>
                    </div>
                    <p class="text-xs text-on-surface-variant leading-relaxed">
                        Secured by Stripe <br/><span class="font-bold">256-bit SSL encryption.</span> Instant access after checkout.
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
