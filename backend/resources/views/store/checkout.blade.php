@extends('store.layout')
@section('title', 'Secure Checkout')

@section('content')
<div class="max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">
    
    <!-- Back Navigation -->
    <a href="{{ url('/store') }}" class="inline-flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-primary transition-colors mb-10 group">
        <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Return to Catalog
    </a>

    <div class="mb-10">
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-on-surface leading-tight">Secure Checkout</h1>
        <p class="text-on-surface-variant mt-2 text-lg font-light">Complete your purchase to receive instant access.</p>
    </div>

    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        <!-- Payment Details Form (Col 8) -->
        <div class="lg:col-span-7 w-full space-y-8">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-8 lg:p-10 shadow-sm">
                <h3 class="text-xs font-black uppercase tracking-[0.15em] text-on-surface-variant mb-8 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-primary">credit_card</span>
                    Payment Information
                </h3>

                @if (!auth()->check())
                    <div class="bg-surface-container-low border border-outline-variant/30 rounded-xl p-5 mb-8 flex items-start gap-4">
                        <span class="material-symbols-outlined text-primary mt-0.5">info</span>
                        <div>
                            <p class="text-on-surface-variant text-sm leading-relaxed">
                                <strong class="text-on-surface">Sign in required.</strong><br/>
                                <a href="{{ route('login') }}" class="text-primary font-bold hover:underline">Sign in</a> or
                                <a href="{{ route('register') }}" class="text-primary font-bold hover:underline">create an account</a>
                                to securely vault your purchase.
                            </p>
                        </div>
                    </div>
                @endif

                @if (isset($clientSecret))
                    <form id="payment-form" class="space-y-6">
                        <div class="space-y-3">
                            <label class="block text-sm font-bold text-on-surface">Card Details</label>
                            <div class="bg-surface p-4 rounded-xl border border-outline-variant/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <div id="card-element" class="w-full"></div>
                            </div>
                            <div id="card-errors" role="alert" class="text-error text-sm font-medium mt-2 min-h-[20px]"></div>
                        </div>
                        
                        <div class="pt-6">
                            <button class="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50" id="pay-btn">
                                <span class="material-symbols-outlined text-xl">lock</span>
                                Pay ${{ number_format($total, 2) }}
                            </button>
                        </div>
                    </form>
                @else
                    <form action="{{ route('checkout.store') }}" method="POST">
                        @csrf
                        <div class="space-y-4 mb-6">
                            <div>
                                <label class="block text-sm font-bold text-on-surface mb-2">Cardholder Name</label>
                                <input type="text" placeholder="John Doe" class="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-on-surface mb-2">Card Number</label>
                                <input type="text" placeholder="**** **** **** ****" class="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-bold text-on-surface mb-2">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" class="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-on-surface mb-2">CVC</label>
                                    <input type="text" placeholder="123" class="w-full bg-surface p-4 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface">
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-center flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary">info</span>
                            <p class="text-primary text-sm font-medium text-left">This gateway is currently in dummy test mode. Any random combination of payment details will be successfully processed unconditionally.</p>
                        </div>
                        
                        <button type="submit" class="w-full py-4 rounded-xl bg-primary text-white font-bold tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20">
                            Proceed to Payment
                            <span class="material-symbols-outlined text-[20px]">lock_open</span>
                        </button>
                    </form>
                @endif
                
                <div class="mt-8 flex items-center justify-center gap-3 text-xs text-on-surface-variant font-medium">
                    <span class="material-symbols-outlined text-[16px]">verified_user</span>
                    Payments are securely processed by Stripe with 256-bit encryption.
                </div>
            </div>
        </div>

        <!-- Order Summary Sidebar (Col 4) -->
        <div class="lg:col-span-5 w-full sticky top-28">
            <div class="bg-surface-container rounded-2xl p-8 lg:p-10">
                <h3 class="text-xs font-black uppercase tracking-[0.15em] text-on-surface-variant mb-8 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                    Order Summary
                </h3>
                
                <div class="space-y-6">
                    @foreach ($cart as $item)
                        <div class="flex items-start justify-between gap-4 pb-6 border-b border-outline-variant/20">
                            <div class="flex-1">
                                <h4 class="text-on-surface font-bold text-lg leading-snug">{{ $item['name'] }}</h4>
                                <p class="text-on-surface-variant text-sm mt-1">Digital License</p>
                            </div>
                            <span class="text-on-surface font-black text-lg">${{ number_format($item['price'], 2) }}</span>
                        </div>
                    @endforeach
                </div>
                
                <div class="pt-6 mt-2 space-y-4">
                    <div class="flex justify-between text-on-surface-variant text-sm font-medium">
                        <span>Subtotal</span>
                        <span>${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                    </div>
                    <div class="flex justify-between text-on-surface-variant text-sm font-medium">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-6 mt-6 border-t border-outline-variant/30">
                    <span class="text-on-surface font-bold text-lg">Total</span>
                    <span class="text-4xl font-black text-primary tracking-tight">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
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
