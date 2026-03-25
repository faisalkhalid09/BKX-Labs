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
            
            <div class="mt-10 sm:mt-16 max-w-2xl w-full">
                <form action="{{ route('store.search') }}" method="GET" class="relative p-[6px] rounded-2xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 shadow-2xl overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600 blur-xl opacity-20 animate-[pulse_3s_infinite]"></div>
                    <div class="relative bg-white dark:bg-slate-950 rounded-[0.8rem] flex items-center overflow-hidden">
                        <span class="material-symbols-outlined pl-5 text-slate-400">search</span>
                        <input type="text" name="q" placeholder="Search for AI models, scripts, templates..." 
                               class="flex-1 bg-transparent border-none px-4 py-5 text-sm sm:text-base focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 font-medium outline-none"
                               autocomplete="off">
                        <button type="submit" class="bg-primary text-white px-8 py-5 text-sm font-black uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2">
                            <span>Search</span>
                            <span class="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </div>
                </form>
                <p class="mt-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2">Popular: <span class="text-slate-600 dark:text-slate-300">LLM Models, Python Scripts, UI Kits</span></p>
            </div>
        </div>
        
        <div class="hidden lg:flex lg:col-span-4 justify-end relative">
            <div class="relative w-full max-w-xs aspect-square">
                <!-- Subtle Background Element -->
                <div class="absolute -inset-20 bg-slate-50 dark:bg-slate-900/50 rounded-full blur-3xl opacity-50"></div>
                
                <div class="relative w-full h-full flex items-center justify-center">
                    <img src="{{ asset('logo-hero.png') }}" 
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
