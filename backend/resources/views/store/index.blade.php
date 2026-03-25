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
<!-- Hero Section: High-Contrast Inversion -->
<section class="bg-primary-container text-on-primary py-9 sm:py-14 md:py-19 px-4 sm:px-6 md:px-12 overflow-hidden">
    <div class="max-w-[1920px] mx-auto grid grid-cols-12 gap-4 sm:gap-5 items-center">
        <div class="col-span-12 md:col-span-7">
            <h1 class="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-2 sm:mb-4 md:mb-5 leading-none">
                Digital Product Store
            </h1>
            <p class="text-xs sm:text-sm md:text-base text-on-primary-container font-light max-w-2xl leading-relaxed">
                Expert-grade AI models, automation scripts, and workflow templates designed to accelerate your engineering teams.
            </p>
        </div>
        
        <div class="hidden md:block col-span-5 relative">
            <div class="relative group">
                <!-- Outer Glow -->
                <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-full blur-3xl opacity-50"></div>
                
                <div class="relative aspect-square flex items-center justify-center">
                    <img src="/logo.png" 
                         alt="BKX Labs" 
                         class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(30,58,138,0.3)] animate-[float_6s_ease-in-out_infinite]">
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
