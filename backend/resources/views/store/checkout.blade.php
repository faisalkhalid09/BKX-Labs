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
.checkout-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
.checkout-overlay.show {
    display: flex;
}
.overlay-card {
    background: #fff;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    width: min(92vw, 420px);
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}
.loader-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    margin: 0 auto 0.875rem;
    animation: spin 0.9s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
.overlay-note {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
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

<div id="checkout-overlay" class="checkout-overlay" aria-hidden="true">
    <div class="overlay-card">
        <div class="loader-spinner" aria-hidden="true"></div>
        <h3 style="margin:0 0 0.5rem 0;">Waiting For Payment</h3>
        <p class="overlay-note">Please complete payment in the popup window. Keep this page open.</p>
    </div>
</div>
@endsection

@push('scripts')
<script>
    (function() {
        const form = document.getElementById('checkout-form');
        const payButton = document.getElementById('custom-pay-button');
        const overlay = document.getElementById('checkout-overlay');
        const messageBox = document.getElementById('checkout-message');
        const popupName = 'safepay-checkout-popup';
        let paymentPopup = null;
        let popupWatch = null;

        function setLoading(isLoading) {
            payButton.disabled = isLoading;
            overlay.classList.toggle('show', isLoading);
            overlay.setAttribute('aria-hidden', isLoading ? 'false' : 'true');
        }

        function showError(message) {
            messageBox.textContent = message;
            messageBox.className = 'checkout-message error';
        }

        function clearError() {
            messageBox.textContent = '';
            messageBox.className = 'checkout-message';
        }

        function openPaymentPopup(url) {
            const width = 520;
            const height = 760;
            const left = Math.max(0, (window.screen.width - width) / 2);
            const top = Math.max(0, (window.screen.height - height) / 2);
            const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

            paymentPopup = window.open(url, popupName, features);
            if (!paymentPopup) {
                throw new Error('Popup blocked by browser. Please allow popups and try again.');
            }

            popupWatch = window.setInterval(function() {
                if (paymentPopup && paymentPopup.closed) {
                    window.clearInterval(popupWatch);
                    popupWatch = null;
                    setLoading(false);
                    showError('Payment window was closed. You can try checkout again.');
                }
            }, 500);
        }

        window.addEventListener('message', function(event) {
            if (event.origin !== window.location.origin) {
                return;
            }

            const data = event.data || {};
            if (data.type === 'safepay:success') {
                if (popupWatch) {
                    window.clearInterval(popupWatch);
                    popupWatch = null;
                }
                setLoading(false);
                window.location.href = data.redirect || "{{ route('checkout.success', ['success' => 'true']) }}";
            }

            if (data.type === 'safepay:cancelled') {
                if (popupWatch) {
                    window.clearInterval(popupWatch);
                    popupWatch = null;
                }
                setLoading(false);
                showError('Payment was cancelled. Please complete checkout to purchase your item.');
            }
        });

        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            clearError();
            setLoading(true);

            try {
                const formData = new FormData(form);
                const response = await fetch("{{ route('checkout.popup.session') }}", {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Accept': 'application/json'
                    },
                    body: formData,
                    credentials: 'same-origin'
                });

                const payload = await response.json().catch(function() { return {}; });

                if (!response.ok || !payload.checkout_url) {
                    throw new Error(payload.message || 'Unable to start payment. Please try again.');
                }

                openPaymentPopup(payload.checkout_url);
            } catch (error) {
                setLoading(false);
                showError(error.message || 'Checkout failed. Please try again.');
            }
        });
    })();
</script>
@endpush

