@extends('store.layout')
@section('title', 'Secure Checkout')

@push('styles')
<style>
/* ── Checkout page: no header/footer noise, minimal and focused ── */
.checkout-shell {
    min-height: 100vh;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
}
.checkout-logo-bar {
    padding: 1.25rem 2rem;
    border-bottom: 1px solid #e2e8f0;
    background: #fff;
}
.checkout-logo-bar img {
    height: 1.75rem;
    width: auto;
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

/* ── Left: form panel ── */
.checkout-panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 2rem 2rem 2.5rem;
}
.checkout-section-title {
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.checkout-section-title span.material-symbols-outlined {
    font-size: 1rem;
    color: #6366f1;
}
.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
@media (max-width: 600px) {
    .form-row { grid-template-columns: 1fr; }
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    margin-bottom: 1rem;
}
.form-group.full { grid-column: 1 / -1; }
label.field-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.01em;
}
.field-input {
    padding: 0.625rem 0.875rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 0.6rem;
    font-size: 0.9rem;
    color: #0f172a;
    background: #f8fafc;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
    font-family: 'Inter', sans-serif;
    width: 100%;
    box-sizing: border-box;
}
.field-input::placeholder { color: #94a3b8; }
.field-input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
.field-input.is-error { border-color: #ef4444; background: #fff5f5; }
.field-error {
    font-size: 0.7rem;
    color: #ef4444;
    font-weight: 600;
}

/* Country select */
select.field-input {
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2.25rem;
    cursor: pointer;
}

/* ── Pay button ── */
.pay-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 0.875rem;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: #fff;
    font-size: 1.05rem;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.02em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    box-shadow: 0 8px 24px rgba(99,102,241,0.25);
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    min-height: 56px;
    position: relative;
}
.pay-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(99,102,241,0.3); }
.pay-btn:active { transform: scale(0.99); }
.pay-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

/* Loading spinner inside button */
.pay-btn .spinner {
    width: 18px; height: 18px;
    border: 2.5px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: none;
}
@keyframes spin { to { transform: rotate(360deg); } }
.pay-btn.loading .pay-label { display: none; }
.pay-btn.loading .spinner { display: block; }

/* ── Trust badges ── */
.trust-badges {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 1.25rem;
    flex-wrap: wrap;
}
.trust-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #94a3b8;
}
.trust-badge .material-symbols-outlined { font-size: 0.9rem; }

/* ── Right: Order summary ── */
.order-summary {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.25rem;
    padding: 1.75rem 1.75rem 2rem;
    position: sticky;
    top: 2rem;
}
.order-summary-title {
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.order-items { margin-bottom: 1.5rem; }
.order-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.875rem 0;
    border-bottom: 1px solid #f1f5f9;
    gap: 1rem;
}
.order-item:last-child { border-bottom: none; }
.order-item-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.4;
    flex: 1;
}
.order-item-price {
    font-size: 0.875rem;
    font-weight: 800;
    color: #0f172a;
    white-space: nowrap;
}
.order-divider { height: 1px; background: #f1f5f9; margin: 1rem 0; }
.order-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;
    color: #64748b;
    margin-bottom: 0.5rem;
}
.order-line .label { font-weight: 600; }
.order-line .value { font-weight: 700; }
.order-line .value.free { color: #16a34a; }
.order-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid #f1f5f9;
}
.order-total-label {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
}
.order-total-amount {
    font-size: 2rem;
    font-weight: 900;
    color: #6366f1;
    letter-spacing: -0.04em;
}

/* ── Encryption notice ── */
.encryption-notice {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    border: 1px solid #86efac;
    border-radius: 0.75rem;
    margin-top: 1.25rem;
}
.encryption-notice .material-symbols-outlined {
    font-size: 1.25rem;
    color: #16a34a;
    flex-shrink: 0;
    margin-top: 0.1rem;
}
.encryption-notice p {
    font-size: 0.75rem;
    color: #166534;
    line-height: 1.6;
    margin: 0;
}
.encryption-notice strong { font-weight: 800; }

/* ── Error alert ── */
.alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.75rem;
    padding: 0.875rem 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
}
.alert-error .material-symbols-outlined { font-size: 1.1rem; color: #ef4444; flex-shrink: 0; margin-top: 0.1rem; }
.alert-error p { font-size: 0.8125rem; color: #dc2626; margin: 0; font-weight: 600; line-height: 1.5; }

/* ── Terms footer ── */
.checkout-terms {
    font-size: 0.7rem;
    color: #94a3b8;
    line-height: 1.7;
    margin-top: 1rem;
    text-align: center;
}
.checkout-terms a {
    color: #6366f1;
    text-decoration: underline;
    text-decoration-color: rgba(99,102,241,0.3);
}
</style>
@endpush

@section('content')
{{-- Strip the standard layout header/footer — checkout is a focused, distraction-free page --}}
@php $isCheckoutPage = true; @endphp

<div class="checkout-shell">

    {{-- Minimal logo bar --}}
    <div class="checkout-logo-bar">
        <img src="/brand-logo.png" alt="BKX Labs" loading="lazy">
    </div>

    <div class="checkout-body">

        {{-- ══ LEFT COLUMN: Billing Form ══ --}}
        <div class="checkout-panel">

            {{-- Error alert --}}
            @if(session('error'))
            <div class="alert-error">
                <span class="material-symbols-outlined">error</span>
                <p>{{ session('error') }}</p>
            </div>
            @endif

            {{-- Validation errors --}}
            @if($errors->any())
            <div class="alert-error" style="flex-direction:column;gap:0.25rem;">
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span class="material-symbols-outlined" style="font-size:1.1rem;color:#ef4444;">error</span>
                    <p style="font-weight:800;">Please correct the following:</p>
                </div>
                <ul style="margin:0.25rem 0 0 1.5rem;padding:0;">
                    @foreach($errors->all() as $error)
                        <li style="font-size:0.78rem;color:#dc2626;font-weight:600;margin-bottom:0.2rem;">{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
            @endif

            {{-- Contact Info --}}
            <p class="checkout-section-title">
                <span class="material-symbols-outlined">person</span>
                Contact Information
            </p>

            <form id="checkout-form" action="{{ route('checkout.store') }}" method="POST" novalidate>
                @csrf

                <div class="form-row">
                    <div class="form-group">
                        <label class="field-label" for="first_name">First Name <span style="color:#ef4444">*</span></label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            class="field-input {{ $errors->has('first_name') ? 'is-error' : '' }}"
                            value="{{ old('first_name', auth()->user()->name ? explode(' ', auth()->user()->name)[0] : '') }}"
                            placeholder="John"
                            autocomplete="given-name"
                            required>
                        @error('first_name')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                    <div class="form-group">
                        <label class="field-label" for="last_name">Last Name <span style="color:#ef4444">*</span></label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            class="field-input {{ $errors->has('last_name') ? 'is-error' : '' }}"
                            value="{{ old('last_name', isset(explode(' ', auth()->user()->name)[1]) ? explode(' ', auth()->user()->name)[1] : '') }}"
                            placeholder="Doe"
                            autocomplete="family-name"
                            required>
                        @error('last_name')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="field-label" for="email">Email Address <span style="color:#ef4444">*</span></label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            class="field-input {{ $errors->has('email') ? 'is-error' : '' }}"
                            value="{{ old('email', auth()->user()->email) }}"
                            placeholder="john@example.com"
                            autocomplete="email"
                            required>
                        @error('email')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                    <div class="form-group">
                        <label class="field-label" for="phone">Phone Number <span style="color:#ef4444">*</span></label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            class="field-input {{ $errors->has('phone') ? 'is-error' : '' }}"
                            value="{{ old('phone') }}"
                            placeholder="+1 555 000 0000"
                            autocomplete="tel"
                            required>
                        @error('phone')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                </div>

                {{-- Billing Address --}}
                <p class="checkout-section-title" style="margin-top:1.25rem;">
                    <span class="material-symbols-outlined">location_on</span>
                    Billing Address
                </p>

                <div class="form-group full">
                    <label class="field-label" for="address">Street Address <span style="color:#ef4444">*</span></label>
                    <input
                        id="address"
                        type="text"
                        name="address"
                        class="field-input {{ $errors->has('address') ? 'is-error' : '' }}"
                        value="{{ old('address') }}"
                        placeholder="123 Main Street, Apt 4B"
                        autocomplete="street-address"
                        required>
                    @error('address')<span class="field-error">{{ $message }}</span>@enderror
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="field-label" for="city">City <span style="color:#ef4444">*</span></label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            class="field-input {{ $errors->has('city') ? 'is-error' : '' }}"
                            value="{{ old('city') }}"
                            placeholder="New York"
                            autocomplete="address-level2"
                            required>
                        @error('city')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                    <div class="form-group">
                        <label class="field-label" for="postal_code">Postal / ZIP Code <span style="color:#ef4444">*</span></label>
                        <input
                            id="postal_code"
                            type="text"
                            name="postal_code"
                            class="field-input {{ $errors->has('postal_code') ? 'is-error' : '' }}"
                            value="{{ old('postal_code') }}"
                            placeholder="10001"
                            autocomplete="postal-code"
                            required>
                        @error('postal_code')<span class="field-error">{{ $message }}</span>@enderror
                    </div>
                </div>

                <div class="form-group">
                    <label class="field-label" for="country">Country <span style="color:#ef4444">*</span></label>
                    <select
                        id="country"
                        name="country"
                        class="field-input {{ $errors->has('country') ? 'is-error' : '' }}"
                        autocomplete="country"
                        required>
                        <option value="">Select country…</option>
                        @php
                            $countries = [
                                'US' => 'United States',
                                'GB' => 'United Kingdom',
                                'CA' => 'Canada',
                                'AU' => 'Australia',
                                'DE' => 'Germany',
                                'FR' => 'France',
                                'AE' => 'United Arab Emirates',
                                'SA' => 'Saudi Arabia',
                                'PK' => 'Pakistan',
                                'IN' => 'India',
                                'SG' => 'Singapore',
                                'NL' => 'Netherlands',
                                'SE' => 'Sweden',
                                'NO' => 'Norway',
                                'CH' => 'Switzerland',
                                'NZ' => 'New Zealand',
                                'JP' => 'Japan',
                                'TR' => 'Turkey',
                                'BD' => 'Bangladesh',
                                'NG' => 'Nigeria',
                                'ZA' => 'South Africa',
                                'EG' => 'Egypt',
                                'MX' => 'Mexico',
                                'BR' => 'Brazil',
                                'PH' => 'Philippines',
                                'ID' => 'Indonesia',
                                'MY' => 'Malaysia',
                                'KE' => 'Kenya',
                                'GH' => 'Ghana',
                            ];
                            $selectedCountry = old('country', '');
                        @endphp
                        @foreach($countries as $code => $name)
                            <option value="{{ $code }}" {{ $selectedCountry === $code ? 'selected' : '' }}>
                                {{ $name }}
                            </option>
                        @endforeach
                    </select>
                    @error('country')<span class="field-error">{{ $message }}</span>@enderror
                </div>

                {{-- Pay button --}}
                <button type="submit" id="pay-btn" class="pay-btn">
                    <span class="pay-label" style="display:flex;align-items:center;gap:0.5rem;">
                        <span class="material-symbols-outlined" style="font-size:1.25rem;">lock</span>
                        Pay ${{ number_format($total, 2) }} &amp; Complete Order
                    </span>
                    <span class="spinner"></span>
                </button>

                {{-- Trust badges --}}
                <div class="trust-badges">
                    <div class="trust-badge">
                        <span class="material-symbols-outlined">shield_lock</span>
                        <span>256-bit SSL</span>
                    </div>
                    <div class="trust-badge" style="width:1px;height:14px;background:#e2e8f0;padding:0;"></div>
                    <div class="trust-badge">
                        <span class="material-symbols-outlined">verified_user</span>
                        <span>PCI Compliant</span>
                    </div>
                    <div class="trust-badge" style="width:1px;height:14px;background:#e2e8f0;padding:0;"></div>
                    <div class="trust-badge">
                        <span class="material-symbols-outlined">encrypted</span>
                        <span>Encrypted Checkout</span>
                    </div>
                </div>

                {{-- Terms --}}
                <p class="checkout-terms">
                    By completing your purchase you agree to our
                    <a href="{{ route('store.terms') }}" target="_blank">Terms of Service</a>
                    and acknowledge our Privacy Policy.
                    Digital products are delivered immediately via email upon payment confirmation.
                </p>

            </form>
        </div>

        {{-- ══ RIGHT COLUMN: Order Summary ══ --}}
        <div>
            <div class="order-summary">
                <div class="order-summary-title">
                    <span>Order Summary</span>
                    <span style="background:#eef2ff;color:#6366f1;font-size:0.625rem;padding:0.2rem 0.6rem;border-radius:999px;">
                        {{ count($cart) }} {{ Str::plural('item', count($cart)) }}
                    </span>
                </div>

                <div class="order-items">
                    @foreach($cart as $item)
                    <div class="order-item">
                        <div class="order-item-name">{{ $item['name'] }}</div>
                        <div class="order-item-price">${{ number_format($item['price'], 2) }}</div>
                    </div>
                    @endforeach
                </div>

                <div class="order-line">
                    <span class="label">Subtotal</span>
                    <span class="value">${{ number_format(collect($cart)->sum('price'), 2) }}</span>
                </div>
                <div class="order-line">
                    <span class="label">Platform Fee</span>
                    <span class="value free">FREE</span>
                </div>

                <div class="order-divider"></div>

                <div class="order-total">
                    <div class="order-total-label">Total</div>
                    <div class="order-total-amount">${{ number_format(collect($cart)->sum('price'), 2) }}</div>
                </div>

                {{-- Encryption assurance --}}
                <div class="encryption-notice">
                    <span class="material-symbols-outlined">lock</span>
                    <p>
                        <strong>Your payment is safe &amp; encrypted.</strong><br>
                        All transactions are protected with 256-bit SSL encryption and processed through a PCI-DSS compliant payment gateway. We never store your card details.
                    </p>
                </div>
            </div>
        </div>

    </div>{{-- end checkout-body --}}
</div>{{-- end checkout-shell --}}
@endsection

@push('scripts')
<script>
    // Show loading spinner on submit
    document.getElementById('checkout-form').addEventListener('submit', function () {
        const btn = document.getElementById('pay-btn');
        btn.classList.add('loading');
        btn.disabled = true;
    });
</script>
@endpush
