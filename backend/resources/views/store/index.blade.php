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
<!-- Hero Section: Premium Minimalist -->
<section class="bg-white dark:bg-slate-950 pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 overflow-hidden border-b border-slate-50 dark:border-slate-900">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-12 lg:col-span-8">
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tightest mb-6 sm:mb-8 text-slate-900 dark:text-white leading-[0.9] sm:leading-[0.85]">
                Engineering <br class="hidden sm:block" /><span class="text-primary tracking-tighter">Excellence.</span>
            </h1>
            <p class="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                Expert-grade AI models, automation scripts, and workflow templates designed to accelerate your engineering teams and modernize your stack.
            </p>
            
            <div class="mt-8 sm:mt-12 flex flex-wrap gap-4">
                <a href="#catalog" class="bg-primary text-on-primary px-10 py-4 rounded-full text-sm font-bold transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-95">Explore Catalog</a>
                <a href="{{ route('register') }}" class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-10 py-4 rounded-full text-sm font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95">Create Account</a>
            </div>
        </div>
        
        <div class="hidden lg:flex lg:col-span-4 justify-end relative">
            <div class="relative w-full max-w-xs aspect-square">
                <!-- Subtle Background Element -->
                <div class="absolute -inset-20 bg-slate-50 dark:bg-slate-900/50 rounded-full blur-3xl opacity-50"></div>
                
                <div class="relative w-full h-full flex items-center justify-center">
                    <img src="{{ asset('logo.png') }}" 
                         alt="BKX Labs Logo" 
                         class="w-full h-full object-contain">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Main Content Area -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12">
    @livewire('product-catalog')
</div>
@endsection
