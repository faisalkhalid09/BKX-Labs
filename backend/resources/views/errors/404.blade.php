@extends('store.layout')
@section('title', 'Page Not Found')

@section('content')
<div class="min-h-[70vh] flex items-center justify-center px-6 py-20 relative overflow-hidden bg-surface">
    <!-- Massive subtle background text -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
        <span class="text-[35vw] font-black tracking-tighter text-primary">404</span>
    </div>
    
    <!-- Foreground content -->
    <div class="relative z-10 text-center max-w-2xl mx-auto">
        <div class="w-20 h-20 bg-surface-container-highest rounded-2xl flex items-center justify-center mx-auto mb-8 border border-outline-variant/20 shadow-sm">
            <span class="material-symbols-outlined text-[40px] text-primary">broken_image</span>
        </div>
        
        <h1 class="text-5xl md:text-6xl font-black tracking-tight text-on-surface mb-6 leading-none">
            Page not found
        </h1>
        
        <p class="text-xl text-on-surface-variant leading-relaxed font-light mb-10 max-w-lg mx-auto">
            The product, download, or page you are looking for does not exist or has been moved.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onclick="window.history.back()" class="px-8 py-4 bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors rounded-xl font-bold flex items-center justify-center gap-3">
                <span class="material-symbols-outlined text-[20px]">arrow_back</span>
                Go Back
            </button>
            <a href="{{ url('/store') }}" class="px-8 py-4 bg-primary text-white hover:bg-primary-container transition-all active:scale-95 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                Return to Store
                <span class="material-symbols-outlined text-[20px]">storefront</span>
            </a>
        </div>
    </div>
</div>
@endsection
