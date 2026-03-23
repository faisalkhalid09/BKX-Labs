@extends('store.layout')

@section('title', 'Digital Product Store')
@section('description', 'Browse and purchase AI models, automation scripts, and digital templates from BKX Labs.')

@section('content')
<!-- Hero Section: High-Contrast Inversion -->
<section class="bg-primary-container text-on-primary py-32 px-6 md:px-12">
    <div class="max-w-[1920px] mx-auto grid grid-cols-12 gap-8 items-center">
        <div class="col-span-12 md:col-span-7">
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                Digital Product Store
            </h1>
            <p class="text-lg md:text-xl text-on-primary-container font-light max-w-2xl leading-relaxed">
                Expert-grade AI models, automation scripts, and workflow templates designed to accelerate your engineering teams.
            </p>
        </div>
        <div class="hidden md:block col-span-5 relative">
            <div class="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                <span class="material-symbols-outlined text-[120px] text-on-primary-container/30">inventory_2</span>
            </div>
        </div>
    </div>
</section>

<!-- Main Content Area -->
<div class="max-w-[1920px] mx-auto px-6 md:px-12 py-20">
    @livewire('product-catalog')
</div>
@endsection
