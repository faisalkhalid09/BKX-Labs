@extends('store.layout')
@section('title', 'Checkout')

@push('styles')
<style>
.checkout-grid { display:grid; grid-template-columns:1fr 380px; gap:3rem; padding:3rem 0 5rem; align-items:start; }
@media(max-width:900px){ .checkout-grid{grid-template-columns:1fr;} }
.checkout-card { padding:1.75rem; }
.checkout-section-label { font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#64748b; margin-bottom:1.25rem; }
.order-row { display:flex;justify-content:space-between;align-items:center;padding:.625rem 0;border-bottom:1px solid #f1f5f9;font-size:.9rem; }
.order-row:last-child { border-bottom:none; }
.order-total { display:flex;justify-content:space-between;align-items:center;padding:1rem 0 0;margin-top:.25rem;border-top:1px solid #e2e8f0; }
.order-total-label { font-weight:600;font-size:.95rem;color:#0f172a; }
.order-total-price { font-size:1.4rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em; }
#card-element { border:1.5px solid #e2e8f0; border-radius:8px; padding:.75rem 1rem; transition:border-color .2s; }
#card-element.StripeElement--focus { border-color:#1e3a8a; box-shadow:0 0 0 3px rgba(30,58,138,.1); }
#card-errors { color:#dc2626; font-size:.825rem; margin-top:.5rem; min-height:1.2em; }
.page-back { display:inline-flex;align-items:center;gap:.375rem;font-size:.825rem;color:#64748b;margin-bottom:1.5rem;transition:color .2s; }
.page-back:hover { color:#0f172a; }
</style>
@endpush

@section('content')
<div class="container">
    <a href="{{ url('/store') }}" class="page-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Store
    </a>

    <h1 style="font-size:1.6rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin-bottom:2rem;">Checkout</h1>

    <div class="checkout-grid">
        {{-- Payment form --}}
        <div class="card checkout-card">
            <p class="checkout-section-label">Payment Details</p>

            @if (!auth()->check())
                <div class="alert alert-info" style="margin-bottom:1.25rem;">
                    <strong>Sign in required.</strong>
                    <a href="{{ route('login') }}" style="color:#1e3a8a;font-weight:700;"> Sign in</a> or
                    <a href="{{ route('register') }}" style="color:#1e3a8a;font-weight:700;">create an account</a>
                    to complete your purchase.
                </div>
            @endif

            @if (isset($clientSecret))
                <form id="payment-form">
                    <div class="form-group">
                        <label class="form-label">Card Information</label>
                        <div id="card-element"></div>
                        <div id="card-errors" role="alert"></div>
                    </div>
                    <button class="btn btn-primary btn-full" id="pay-btn" style="margin-top:.75rem;font-size:.95rem;padding:.7rem 1.5rem;">
                        Pay ${{ number_format($total, 2) }}
                    </button>
                </form>
            @else
                <form action="{{ route('checkout.store') }}" method="POST">
                    @csrf
                    <p style="font-size:.875rem;color:#64748b;margin-bottom:1.25rem;">Review your order and proceed to enter card details.</p>
                    <button type="submit" class="btn btn-primary btn-full" style="font-size:.95rem;padding:.7rem 1.5rem;">
                        Proceed to Pay ${{ number_format(collect($cart)->sum('price'), 2) }}
                    </button>
                </form>
            @endif

            <hr class="divider">
            <div style="display:flex;align-items:center;gap:.5rem;color:#94a3b8;font-size:.775rem;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secured by Stripe · 256-bit SSL
            </div>
        </div>

        {{-- Order summary --}}
        <div class="card checkout-card">
            <p class="checkout-section-label">Order Summary</p>
            @foreach ($cart as $item)
                <div class="order-row">
                    <span style="color:#374151;">{{ $item['name'] }}</span>
                    <span style="font-weight:600;color:#0f172a;">${{ number_format($item['price'], 2) }}</span>
                </div>
            @endforeach
            <div class="order-total">
                <span class="order-total-label">Total</span>
                <span class="order-total-price">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
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
        base: { fontSize: '15px', color: '#0f172a', fontFamily: 'Inter, sans-serif', fontWeight: '500', '::placeholder': { color: '#94a3b8' } },
        invalid: { color: '#dc2626' }
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
    btn.textContent = 'Processing...';
    const { error, paymentIntent } = await stripe.confirmCardPayment('{{ $clientSecret }}', {
        payment_method: { card }
    });
    if (error) {
        document.getElementById('card-errors').textContent = error.message;
        btn.disabled = false;
        btn.textContent = 'Pay ${{ number_format($total, 2) }}';
    } else if (paymentIntent.status === 'succeeded') {
        window.location.href = '{{ route("checkout.success") }}';
    }
});
</script>
@endif
@endpush
