@extends('store.layout')
@section('title', 'Secure Checkout')

@push('styles')
<style>
/* ── Checkout page components ── */
.checkout-shell {
    min-height: 100vh;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
}
.checkout-body {
    flex: 1;
    max-width: 1080px;
    margin: 0 auto;
    width: 100%;
    padding: 2.5rem 1.25rem 4rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}
@media (min-width: 900px) {
    .checkout-body {
        grid-template-columns: 1fr 420px;
        align-items: start;
        gap: 2.5rem;
    }
}
.checkout-panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 2rem;
}
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}
.field-input {
    padding: 0.625rem 0.875rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.6rem;
    font-size: 0.9rem;
    width: 100%;
}
.order-summary {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 1.75rem;
    position: sticky;
    top: 2rem;
}
.order-total-amount {
    font-size: 2rem;
    font-weight: 900;
    color: #6366f1;
}
/* Pay button */
.pay-btn {
    width: 100%;
    padding: 1.25rem;
    background: #6366f1;
    color: #fff;
    border-radius: 0.875rem;
    font-weight: 800;
    cursor: pointer;
    border: none;
    margin-top: 1.5rem;
}
.checkout-message {
    margin-top: 1rem;
    padding: 0.75rem 0.9rem;
    border-radius: 0.65rem;
    font-size: 0.85rem;
    display: none;
}
.checkout-message.error {
    display: block;
    color: #991b1b;
    background: #fef2f2;
    border: 1px solid #fecaca;
}
</style>
@endpush

@section('content')
<div class="checkout-shell">
    <div class="checkout-body">
        <div class="checkout-panel">
            <h2 style="margin-bottom: 2rem;">Billing Details</h2>
            
            <form id="checkout-form" method="POST" action="{{ route('checkout.store') }}">
                @csrf
                <input type="hidden" id="product_id" name="product_id" value="{{ $product->id }}">
                <input type="hidden" id="idempotency_key" name="idempotency_key" value="">
                
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="first_name" name="first_name" class="field-input" value="{{ auth()->user()->name ?? '' }}" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="last_name" name="last_name" class="field-input" required>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Email Address</label>
                    <input type="email" id="email" name="email" class="field-input" value="{{ auth()->user()->email ?? '' }}" required>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Phone Number</label>
                    <input type="text" id="phone" name="phone" class="field-input" required>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Street Address</label>
                    <input type="text" id="address" name="address" class="field-input" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="city" name="city" class="field-input" required>
                    </div>
                    <div class="form-group">
                        <label>Postal / ZIP Code</label>
                        <input type="text" id="postal_code" name="postal_code" class="field-input" required>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Country</label>
                    <select id="country" name="country" class="field-input" required>
                        <option value="US">United States</option>
                        <option value="PK">Pakistan</option>
                        <option value="GB">United Kingdom</option>
                        {{-- Add more as needed --}}
                    </select>
                </div>
            </form>

            <button type="submit" id="custom-pay-button" class="pay-btn" form="checkout-form">
                Pay ${{ number_format($total, 2) }} &amp; Complete Order
            </button>
            @if (session('error'))
                <div class="checkout-message error" style="display:block;">{{ session('error') }}</div>
            @endif
            <div id="checkout-message" class="checkout-message"></div>
        </div>

        <div class="order-summary">
            <h3>Order Summary</h3>
            @foreach($cart as $item)
            <div style="display:flex; justify-content:space-between; margin: 1rem 0;">
                <span>{{ $item['name'] }}</span>
                <strong>${{ number_format($item['price'], 2) }}</strong>
            </div>
            @endforeach
            <hr>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span>Total</span>
                <span class="order-total-amount">${{ number_format($total, 2) }}</span>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    (function() {
        const form = document.getElementById('checkout-form');
        const payButton = document.getElementById('custom-pay-button');
        const messageBox = document.getElementById('checkout-message');

        const idempotencyInput = document.getElementById('idempotency_key');
        if (idempotencyInput && !idempotencyInput.value) {
            if (window.crypto && typeof window.crypto.randomUUID === 'function') {
                idempotencyInput.value = window.crypto.randomUUID();
            } else {
                idempotencyInput.value = 'idem-' + Date.now() + '-' + Math.random().toString(36).slice(2);
            }
        }

        function setLoading(isLoading) {
            payButton.disabled = isLoading;
            payButton.textContent = isLoading
                ? 'Redirecting To SafePay...'
                : 'Pay ${{ number_format($total, 2) }} & Complete Order';
        }

        form.addEventListener('submit', function() {
            messageBox.textContent = '';
            messageBox.className = 'checkout-message';
            setLoading(true);
        });
    })();
</script>
@endpush

