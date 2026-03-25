@extends('store.layout')
@section('title', 'Secure Checkout')

@section('content')
<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 md:py-13">
    
    <!-- Back Navigation -->
    <a href="{{ url('/store') }}" class="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-medium hover:text-primary transition-colors mb-5 sm:mb-8 group min-h-[40px]">
        <span class="material-symbols-outlined text-base sm:text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span>Return to Catalog</span>
    </a>

    <div class="mb-6 sm:mb-8">
        <h1 class="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-on-surface leading-tight">Secure Checkout</h1>
        <p class="text-on-surface-variant mt-1.5 text-xs sm:text-base font-light">Complete your purchase via Lemon Squeezy secure gateway.</p>
    </div>

    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-13 items-start">
        
        <!-- Payment Redirection Area (Col 7) -->
        <div class="lg:col-span-7 w-full space-y-5 sm:space-y-6">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-3 sm:p-5 lg:p-8 shadow-sm">
                <h3 class="text-xs font-black uppercase tracking-[0.15em] text-on-surface-variant mb-5 sm:mb-6 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-primary">shopping_cart_checkout</span>
                    Pay with Lemon Squeezy
                </h3>

                <div class="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-center sm:text-left flex items-start gap-4">
                    <span class="material-symbols-outlined text-primary text-2xl sm:text-3xl flex-shrink-0 mt-1">payments</span>
                    <div>
                        <p class="text-on-surface text-sm sm:text-base font-medium leading-relaxed">
                            You are about to be redirected to our secure payment partner, <strong class="text-primary">Lemon Squeezy</strong>, to complete your transaction safely.
                        </p>
                        <p class="text-on-surface-variant text-xs mt-2">
                            Digital products will be delivered instantly to your account after successful payment.
                        </p>
                    </div>
                </div>

                <form action="{{ route('checkout.store') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white font-black tracking-tight text-sm sm:text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-primary/20 min-h-[52px]">
                        <span>Pay ${{ number_format($total, 2) }} Now</span>
                        <span class="material-symbols-outlined text-xl sm:text-[24px]">arrow_forward</span>
                    </button>
                </form>
                
                <div class="mt-6 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-on-surface-variant font-semibold flex-wrap opacity-60">
                    <span class="material-symbols-outlined text-xs sm:text-sm">verified</span>
                    <span>PCI-DSS COMPLIANT GATEWAY</span>
                    <span class="mx-1">•</span>
                    <span>SSL ENCRYPTED</span>
                </div>
            </div>
        </div>

        <!-- Order Summary Sidebar (Col 5) -->
        <div class="lg:col-span-5 w-full sticky top-16 sm:top-19 lg:top-22 max-h-[calc(100vh-5rem)] overflow-y-auto" style="-webkit-overflow-scrolling: touch;">
            <div class="bg-surface-container rounded-2xl p-3 sm:p-5 lg:p-8">
                <h3 class="text-xs font-black uppercase tracking-[0.15em] text-on-surface-variant mb-5 sm:mb-6 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">receipt_long</span>
                    <span>Order Summary</span>
                </h3>
                
                <div class="space-y-3 sm:space-y-5">
                    @foreach ($cart as $item)
                        <div class="flex items-start justify-between gap-2 sm:gap-3 pb-3 sm:pb-5 border-b border-outline-variant/20">
                            <div class="flex-1 min-w-0">
                                <h4 class="text-on-surface font-bold text-xs sm:text-base leading-snug line-clamp-2">{{ $item['name'] }}</h4>
                                <p class="text-on-surface-variant text-xs mt-0.5">Digital License</p>
                            </div>
                            <span class="text-on-surface font-black text-xs sm:text-base flex-shrink-0">${{ number_format($item['price'], 2) }}</span>
                        </div>
                    @endforeach
                </div>
                
                <div class="pt-3 sm:pt-5 mt-1.5 space-y-2 sm:space-y-3">
                    <div class="flex justify-between text-on-surface-variant text-xs font-medium">
                        <span>Subtotal</span>
                        <span>${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-outline-variant/30 gap-2">
                    <span class="text-on-surface font-bold text-sm sm:text-base">Grand Total</span>
                    <span class="text-xl sm:text-3xl font-black text-primary tracking-tight">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
