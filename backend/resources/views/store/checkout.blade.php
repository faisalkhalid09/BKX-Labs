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
        <p class="text-on-surface-variant mt-1.5 text-xs sm:text-base font-light">Complete your purchase to receive instant access.</p>
    </div>

    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-13 items-start">
        
        <!-- Payment Details Form (Col 8) -->
        <div class="lg:col-span-7 w-full space-y-5 sm:space-y-6">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-3 sm:p-5 lg:p-8 shadow-sm">
                <h3 class="text-xs font-black uppercase tracking-[0.15em] text-on-surface-variant mb-5 sm:mb-6 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base text-primary">credit_card</span>
                    Payment Information
                </h3>

                @if (!auth()->check())
                    <div class="bg-surface-container-low border border-outline-variant/30 rounded-lg p-3 sm:p-4 mb-5 sm:mb-6 flex items-start gap-2 sm:gap-3">
                        <span class="material-symbols-outlined text-primary text-base sm:text-xl flex-shrink-0 mt-0.4">info</span>
                        <div>
                            <p class="text-on-surface-variant text-xs leading-relaxed">
                                <strong class="text-on-surface">Sign in required.</strong><br/>
                                <a href="{{ route('login') }}" class="text-primary font-bold hover:underline">Sign in</a> or
                                <a href="{{ route('register') }}" class="text-primary font-bold hover:underline">create an account</a>
                                to securely vault your purchase.
                            </p>
                        </div>
                    </div>
                @endif

                @if (isset($clientSecret))
                    <form id="payment-form" class="space-y-3 sm:space-y-5">
                        <div class="space-y-1.5 sm:space-y-2">
                            <label class="block text-xs sm:text-sm font-bold text-on-surface">Card Details</label>
                            <div class="bg-surface p-2.5 sm:p-3 rounded-lg border border-outline-variant/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all min-h-[40px] sm:min-h-[44px] flex items-center">
                                <div id="card-element" class="w-full text-xs"></div>
                            </div>
                            <div id="card-errors" role="alert" class="text-error text-xs font-medium mt-1.5 min-h-[18px]"></div>
                        </div>
                        
                        <div class="pt-3 sm:pt-5">
                            <button class="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-white font-bold tracking-tight text-xs sm:text-base hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 min-h-[40px]" id="pay-btn">
                                <span class="material-symbols-outlined text-lg sm:text-xl">lock</span>
                                <span>Pay ${{ number_format($total, 2) }}</span>
                            </button>
                        </div>
                    </form>
                @else
                    <form action="{{ route('checkout.store') }}" method="POST">
                        @csrf
                        <div class="space-y-3 sm:space-y-4 mb-6">
                            <div>
                                <label class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5 sm:mb-2">Cardholder Name</label>
                                <input type="text" placeholder="John Doe" class="w-full bg-surface p-3 sm:p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base min-h-[44px]">
                            </div>
                            <div>
                                <label class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5 sm:mb-2">Card Number</label>
                                <input type="text" placeholder="**** **** **** ****" class="w-full bg-surface p-3 sm:p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base min-h-[44px]">
                            </div>
                            <div class="grid grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5 sm:mb-2">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" class="w-full bg-surface p-3 sm:p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base min-h-[44px]">
                                </div>
                                <div>
                                    <label class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5 sm:mb-2">CVC</label>
                                    <input type="text" placeholder="123" class="w-full bg-surface p-3 sm:p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base min-h-[44px]">
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-primary/5 border border-primary/20 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 text-center flex items-start gap-2 sm:gap-3">
                            <span class="material-symbols-outlined text-primary text-lg flex-shrink-0">info</span>
                            <p class="text-primary text-xs sm:text-sm font-medium text-left leading-relaxed">This gateway is currently in dummy test mode. Any random combination of payment details will be successfully processed unconditionally.</p>
                        </div>
                        
                            <button type="submit" class="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-white font-bold tracking-tight text-xs sm:text-base hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/20 min-h-[40px]">
                            <span>Proceed to Payment</span>
                            <span class="material-symbols-outlined text-lg sm:text-[20px]">lock_open</span>
                        </button>
                    </form>
                @endif
                
                <div class="mt-5 sm:mt-6 flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-on-surface-variant font-medium flex-wrap">
                    <span class="material-symbols-outlined text-xs">verified_user</span>
                    <span>Payments are securely processed by Stripe with 256-bit encryption.</span>
                </div>
            </div>
        </div>

        <!-- Order Summary Sidebar (Col 4) -->
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
                    <div class="flex justify-between text-on-surface-variant text-xs font-medium">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-outline-variant/30 gap-2">
                    <span class="text-on-surface font-bold text-sm sm:text-base">Total</span>
                    <span class="text-xl sm:text-3xl font-black text-primary tracking-tight">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection

@push('scripts')
@if (isset($clientSecret))
<script src="https://js.stripe.com/v3/"></script>
<script>
const stripe = Stripe('{{ $stripePublicKey }}');
const elements = stripe.elements();
const card = elements.create('card', {
    style: {
        base: { 
            iconColor: '#1e3a8a',
            color: '#131b2e',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#131b2e' },
            '::placeholder': { color: '#94a3b8' }
        },
        invalid: { iconColor: '#ba1a1a', color: '#ba1a1a' }
    }
});
card.mount('#card-element');
card.on('change', e => {
    document.getElementById('card-errors').textContent = e.error ? e.error.message : '';
});

const btn = document.getElementById('pay-btn');
document.getElementById('payment-form').addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined text-xl animate-spin">refresh</span> Processing...';
    
    const { error, paymentIntent } = await stripe.confirmCardPayment('{{ $clientSecret }}', {
        payment_method: { card }
    });
    
    if (error) {
        document.getElementById('card-errors').textContent = error.message;
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined text-xl">lock</span> Pay ${{ number_format($total, 2) }}';
    } else if (paymentIntent.status === 'succeeded') {
        window.location.href = '{{ route("checkout.success") }}';
    }
});
</script>
@endif
@endpush
