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
</style>
@endpush

@section('content')
<div class="checkout-shell">
    <div class="checkout-body">
        <div class="checkout-panel">
            <h2 style="margin-bottom: 2rem;">Billing Details</h2>
            
            <form id="checkout-form">
                <input type="hidden" id="product_id" value="{{ $product->id }}">
                
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="first_name" class="field-input" value="{{ auth()->user()->name ?? '' }}" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="last_name" class="field-input" required>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Email Address</label>
                    <input type="email" id="email" class="field-input" value="{{ auth()->user()->email ?? '' }}" required>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Phone Number</label>
                    <input type="text" id="phone" class="field-input" required>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Street Address</label>
                    <input type="text" id="address" class="field-input" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="city" class="field-input" required>
                    </div>
                    <div class="form-group">
                        <label>Postal / ZIP Code</label>
                        <input type="text" id="postal_code" class="field-input" required>
                    </div>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label>Country</label>
                    <select id="country" class="field-input" required>
                        <option value="US">United States</option>
                        <option value="PK">Pakistan</option>
                        <option value="GB">United Kingdom</option>
                        {{-- Add more as needed --}}
                    </select>
                </div>
            </form>

            {{-- SafePay Button Container (Hidden - we trigger it via JS) --}}
            <div id="safepay-button-container" style="display: none;"></div>
            
            <button type="button" id="custom-pay-button" class="pay-btn">
                Pay ${{ number_format($total, 2) }} &amp; Complete Order
            </button>
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
{{-- Include SafePay SDK --}}
<script src="https://sandbox.api.getsafepay.com/checkout/pay.js"></script>

<script>
    document.getElementById('custom-pay-button').addEventListener('click', function() {
        const email = document.getElementById('email').value;
        if(!email) { alert('Please enter your email first.'); return; }

        // Initialize SafePay Checkout Overlay
        safepay.setup({
            environment: 'sandbox',
            apiKey: '{{ config('services.safepay.api_key') }}',
            v3: true
        });

        // Open the payment overlay
        safepay.checkout({
            amount: {{ $total }},
            currency: 'USD',
            metadata: {
                order_id: 'ORD-' + Math.random().toString(36).substr(2, 9),
                email: email
            },
            onSucceeded: function(data) {
                window.location.href = "{{ route('checkout.success') }}?success=true&tracker=" + data.tracker;
            },
            onCancelled: function() {
                alert('Payment cancelled.');
            }
        });
    });
</script>
@endpush
