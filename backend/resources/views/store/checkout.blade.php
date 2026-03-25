@extends('store.layout')
@section('title', 'Checkout')

@section('content')
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
    
    <div class="mb-10 text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-on-surface">Secure Checkout</h1>
        <p class="text-on-surface-variant mt-2 text-base font-light dark:opacity-60">Review your order details and complete your purchase securely.</p>
    </div>

    @if(session('error'))
        <div class="max-w-4xl mx-auto lg:mx-0 bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl mb-10 text-sm font-bold flex items-start gap-3">
            <span class="material-symbols-outlined text-red-500 mt-0.5">error</span>
            <div>
                <p class="font-black text-red-800">Configuration Error</p>
                <p class="font-medium opacity-80 mt-1">{{ session('error') }}</p>
                <p class="mt-2 text-xs opacity-60 font-normal italic">Tip: Ensure your products have a valid Lemon Squeezy Variant ID in the database.</p>
            </div>
        </div>
    @endif

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Left Column: Payment & Shipping Info -->
        <div class="lg:col-span-7 w-full order-2 lg:order-1 space-y-6">
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 sm:p-10 shadow-sm">
                
                <h2 class="text-sm font-black uppercase tracking-widest text-on-surface-variant mb-8 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-xl">payments</span>
                    Payment Method
                </h2>

                <div class="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 mb-10">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span class="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-on-surface">Digital Payment Gateway</p>
                            <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                                You will be redirected to **Lemon Squeezy** to finish your transaction. All major credit cards, PayPal, and local payment methods are accepted.
                            </p>
                        </div>
                    </div>
                </div>

                <form action="{{ route('checkout.store') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full py-5 rounded-2xl bg-primary text-white font-black tracking-tight text-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 min-h-[64px]">
                        <span>Pay ${{ number_format($total, 2) }} & Complete Order</span>
                        <span class="material-symbols-outlined text-2xl">arrow_forward</span>
                    </button>
                </form>
                
                <div class="mt-8 flex items-center justify-center gap-4 text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40">
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">shield_check</span>
                        <span>Secure SSL</span>
                    </div>
                    <div class="w-1 h-1 bg-on-surface-variant rounded-full"></div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">verified</span>
                        <span>PCI Compliant</span>
                    </div>
                </div>
            </div>

            <!-- Additional Help Text -->
            <div class="px-6 py-4 bg-surface-container-low/30 rounded-2xl">
                <p class="text-[11px] text-on-surface-variant leading-relaxed opacity-70">
                    By completing your purchase, you agree to our <a href="{{ route('store.terms') }}" class="underline decoration-primary/30 hover:text-primary transition-colors">Terms of Service</a> and acknowledge our Privacy Policy. Digital products are delivered immediately via email.
                </p>
            </div>
        </div>

        <!-- Right Column: Detailed Summary -->
        <div class="lg:col-span-5 w-full order-1 lg:order-2">
            <div class="bg-surface-container rounded-3xl p-6 sm:p-9">
                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-8 flex items-center justify-between">
                    <span>Order Details</span>
                    <span class="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px]">{{ count($cart) }} {{ Str::plural('Item', count($cart)) }}</span>
                </h3>
                
                <div class="space-y-6 mb-10">
                    @foreach ($cart as $item)
                        <div class="flex flex-col gap-1 pb-4 border-b border-outline-variant/10">
                            <div class="flex justify-between items-start gap-4">
                                <span class="text-on-surface font-black text-sm leading-snug">{{ $item['name'] }}</span>
                                <span class="text-on-surface font-black text-sm whitespace-nowrap">${{ number_format($item['price'], 2) }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-[10px] text-on-surface-variant font-bold opacity-60">
                                <span class="material-symbols-outlined text-xs">digital_outofhome</span>
                                <span>Lifetime License</span>
                                <span class="mx-1">•</span>
                                <span>Instant Delivery</span>
                            </div>
                        </div>
                    @endforeach
                </div>
                
                <div class="space-y-3 mb-8">
                    <div class="flex justify-between text-xs font-bold text-on-surface-variant">
                        <span class="opacity-60">Subtotal</span>
                        <span>${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                    </div>
                    <div class="flex justify-between text-xs font-bold text-on-surface-variant">
                        <span class="opacity-60">Platform Fee</span>
                        <span class="text-green-600">FREE</span>
                    </div>
                    <div class="flex justify-between text-xs font-bold text-on-surface-variant">
                        <span class="opacity-60">VAT / Taxes</span>
                        <span class="italic text-[10px] font-normal">Calculated in next step</span>
                    </div>
                </div>

                <div class="h-px bg-outline-variant/30 mb-6"></div>

                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xs font-black text-on-surface-variant uppercase tracking-widest block mb-1">Total Amount</span>
                        <span class="text-on-surface font-medium text-[10px] opacity-40 italic">Final price shown at checkout secure page</span>
                    </div>
                    <span class="text-4xl font-black text-primary tracking-tight">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                </div>
            </div>
        </div>
        
    </div>
</div>
@endsection
