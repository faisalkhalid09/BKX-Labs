@extends('store.layout')

@section('title', 'Digital Product Store')
@section('description', 'Browse and purchase AI models, automation scripts, and digital templates from BKX Labs.')

@push('styles')
<style>
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(-20px) rotate(2deg); }
    }
</style>
@endpush

@section('content')
<!-- Hero Section: Premium Minimalist (Compact) -->
<section class="bg-white dark:bg-slate-950 pt-10 sm:pt-14 pb-8 sm:pb-12 px-6 md:px-10 overflow-hidden border-b border-slate-50 dark:border-slate-900">
    <div class="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-12 lg:col-span-9">
            <h1 class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tightest mb-4 sm:mb-6 text-slate-900 dark:text-white leading-[1.1] sm:leading-[1.0]">
                Engineering <span class="text-primary text-2xl sm:text-4xl md:text-5xl block sm:inline italic font-medium tracking-tight">Excellence.</span>
            </h1>
            <p class="text-sm sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed">
                Expert-grade AI models, automation scripts, and workflow templates designed to accelerate your engineering teams and modernize your stack.
            </p>
            
            <div class="mt-6 sm:mt-10 flex flex-wrap gap-3">
                <a href="#catalog" class="bg-primary text-on-primary px-6 py-3 rounded-full text-xs font-bold transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-95">Explore Catalog</a>
                <a href="{{ route('register') }}" class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-full text-xs font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95">Create Account</a>
            </div>
        </div>
        
        <div class="hidden lg:flex lg:col-span-3 justify-end relative">
            <div class="relative w-full max-w-[240px] aspect-square">
                <!-- Subtle Background Element -->
                <div class="absolute -inset-6 bg-slate-50 dark:bg-slate-900/40 rounded-full blur-2xl opacity-40"></div>
                
                <div class="relative w-full h-full flex items-center justify-center">
                    <img src="{{ asset('logo.png') }}" 
                         alt="BKX Labs" 
                         class="w-full h-full object-contain opacity-5 dark:opacity-10 grayscale brightness-0 dark:brightness-200">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Main Content Area -->
<div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
    @livewire('product-catalog')
</div>
@endsection
