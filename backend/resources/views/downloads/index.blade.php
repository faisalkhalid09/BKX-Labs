@extends('store.layout')
@section('title', 'My Downloads')

@section('content')
<div class="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-outline-variant/20 pb-8">
        <div>
            <h1 class="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-tight">My Library</h1>
            <p class="text-on-surface-variant mt-3 text-lg font-medium">{{ Auth::user()->email }}</p>
        </div>
        <a href="{{ url('/store') }}" class="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-container transition-colors">
            <span class="material-symbols-outlined text-[20px]">storefront</span>
            Browse Catalog
        </a>
    </div>

    @if ($orders->isEmpty())
        <div class="text-center py-24 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm">
            <div class="w-20 h-20 bg-surface-container-low rounded-2xl flex items-center justify-center mx-auto mb-6 text-outline">
                <span class="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
            <h3 class="text-2xl font-bold text-on-surface mb-3 tracking-tight">No purchases yet</h3>
            <p class="text-on-surface-variant text-base max-w-md mx-auto mb-8 leading-relaxed">Your digital products, models, and scripts will appear here instantly after purchase.</p>
            <a href="{{ url('/store') }}" class="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-primary-container active:scale-95 shadow-lg shadow-primary/20">
                Browse Catalog
            </a>
        </div>
    @else
        <!-- Content Area: List of purchased digital products -->
        <div class="space-y-6">
            @foreach ($orders as $order)
                <div class="group bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-outline-variant/40 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                    
                    <!-- Thumbnail -->
                    <div class="w-full md:w-48 aspect-video bg-surface-container-low rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-outline-variant/10">
                        @if ($order->product->thumbnail_path)
                            <img src="{{ asset('storage/thumbnails/' . $order->product->thumbnail_path) }}" alt="{{ $order->product->name }}" class="w-full h-full object-cover">
                        @else
                            <span class="material-symbols-outlined text-3xl text-outline-variant/40">image</span>
                        @endif
                    </div>
                    
                    <!-- Info -->
                    <div class="flex-1 min-w-0 w-full">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="inline-block px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-widest rounded-md">
                                {{ ucwords(str_replace('_', ' ', $order->product->category)) }}
                            </span>
                            @if ($order->download_expires_at)
                                @if ($order->canDownload())
                                    <span class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
                                        <span class="material-symbols-outlined text-[14px]">timer</span>
                                        Expires {{ $order->download_expires_at->diffForHumans() }}
                                    </span>
                                @else
                                    <span class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-error">
                                        <span class="material-symbols-outlined text-[14px]">timer_off</span>
                                        Expired
                                    </span>
                                @endif
                            @endif
                        </div>
                        <h3 class="text-2xl font-bold text-on-surface tracking-tight mb-3 truncate hover:text-primary transition-colors cursor-pointer">{{ $order->product->name }}</h3>
                        <div class="flex items-center gap-4 text-sm font-medium text-on-surface-variant flex-wrap">
                            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">receipt</span> Order #{{ $order->id }}</span>
                            <span class="w-1.5 h-1.5 rounded-full bg-outline-variant/50"></span>
                            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">event</span> Purchased {{ $order->created_at->format('M d, Y') }}</span>
                        </div>
                    </div>
                    
                    <!-- Action -->
                    <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 pt-6 md:pt-0 border-t border-outline-variant/20 md:border-0">
                        <button class="px-5 py-3 md:py-2.5 bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-variant rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
                            Receipt
                        </button>
                        @if ($order->canDownload())
                            <a href="{{ route('downloads.download', $order) }}" class="px-8 py-3 md:py-2.5 bg-primary text-on-primary rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary-container active:scale-[0.98] shadow-md shadow-primary/20">
                                <span class="material-symbols-outlined text-[18px]">download</span>
                                Download
                            </a>
                        @else
                            <button disabled class="px-8 py-3 md:py-2.5 bg-surface-container-high text-outline-variant rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                                <span class="material-symbols-outlined text-[18px]">lock</span>
                                Locked
                            </button>
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
