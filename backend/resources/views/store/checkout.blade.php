@extends('store.layout')
@section('title', 'Checkout')

@section('content')
<div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
    
    <div class="mb-10 text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-on-surface">Checkout</h1>
        <p class="text-on-surface-variant mt-2 text-base font-light opacity-70">Instant secure download after payment.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Left Column: Payment -->
        <div class="lg:col-span-7 w-full order-2 lg:order-1">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 sm:p-10 shadow-sm">
                
                @if(session('error'))
                    <div class="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
                        <span class="material-symbols-outlined text-base">error</span>
                        {{ session('error') }}
                    </div>
                @endif

                <div class="space-y-6">
                    <div class="flex items-center gap-4 text-on-surface-variant mb-8">
                        <div class="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary text-2xl">payments</span>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-on-surface">Secure Gateway</p>
                            <p class="text-xs opacity-60">Verified by Lemon Squeezy</p>
                        </div>
                    </div>

                    <form action="{{ route('checkout.store') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full py-5 rounded-2xl bg-primary text-white font-black tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 min-h-[64px]">
                            <span>Complete Purchase</span>
                            <span class="material-symbols-outlined text-2xl">arrow_forward</span>
                        </button>
                    </form>
                    
                    <p class="text-center text-[10px] sm:text-xs text-on-surface-variant font-medium opacity-40 uppercase tracking-widest">
                        SSL Encrypted • PCI Compliant
                    </p>
                </div>
            </div>
        </div>

        <!-- Right Column: Summary -->
        <div class="lg:col-span-5 w-full order-1 lg:order-2">
            <div class="bg-surface-container rounded-2xl p-6 sm:p-8">
                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6 opacity-60">Your Order</h3>
                
                <div class="space-y-4">
                    @foreach ($cart as $item)
                        <div class="flex justify-between items-start gap-4 pb-4 border-b border-outline-variant/20">
                            <span class="text-on-surface font-bold text-sm leading-snug line-clamp-1">{{ $item['name'] }}</span>
                            <span class="text-on-surface font-black text-sm whitespace-nowrap">${{ number_format($item['price'], 2) }}</span>
                        </div>
                    @endforeach
                </div>
                
                <div class="flex items-center justify-between pt-6 mt-4 border-t border-outline-variant/30">
                    <span class="text-on-surface font-bold">Total</span>
                    <span class="text-3xl font-black text-primary tracking-tight">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
