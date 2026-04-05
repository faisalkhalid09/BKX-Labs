@extends('store.layout')
@section('title', 'Order Confirmed')

@push('styles')
<style>
.success-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    background: #f8fafc;
}
.success-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 1.5rem;
    padding: 3rem 2rem 2.5rem;
    max-width: 460px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 32px rgba(0,0,0,0.04);
}
.success-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border: 2px solid #86efac;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
}
.success-icon svg { width: 28px; height: 28px; }
.processing-icon {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-color: #93c5fd;
}
.success-title {
    font-size: 1.5rem;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.03em;
    margin-bottom: 0.625rem;
}
.success-subtitle {
    font-size: 0.8125rem;
    color: #64748b;
    line-height: 1.75;
    max-width: 34ch;
    margin: 0 auto 2rem;
}
.success-actions {
    display: flex;
    gap: 0.625rem;
    justify-content: center;
    flex-wrap: wrap;
}
.btn-primary-solid {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6875rem 1.25rem;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    border-radius: 999px;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(99,102,241,0.25);
}
.btn-primary-solid:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
.btn-ghost-solid {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6875rem 1.25rem;
    background: #f1f5f9;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 700;
    border-radius: 999px;
    text-decoration: none;
    transition: background 0.15s;
}
.btn-ghost-solid:hover { background: #e2e8f0; }
.order-ref-badge {
    display: inline-block;
    margin: 1.25rem auto 0;
    padding: 0.35rem 0.875rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 999px;
    font-size: 0.7rem;
    color: #94a3b8;
    font-weight: 700;
    letter-spacing: 0.04em;
    font-family: 'Courier New', monospace;
}
</style>
@endpush

@section('content')
<div class="success-shell">
    <div class="success-card">

        @if($paymentVerified ?? false)
            {{-- Verified paid --}}
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            </div>
            <h1 class="success-title">Payment Successful!</h1>
            <p class="success-subtitle">
                Your order is confirmed and payment has been received.
                Head to <strong>My Downloads</strong> to access your files — download links are active for 48 hours.
            </p>

        @else
            {{-- Payment processing (webhook will confirm) --}}
            <div class="success-icon processing-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            </div>
            <h1 class="success-title">Order Received!</h1>
            <p class="success-subtitle">
                Your payment is being processed and will be confirmed shortly.
                You'll receive an email confirmation once it's complete.
                Your downloads will appear in <strong>My Downloads</strong>.
            </p>
        @endif

        <div class="success-actions">
            <a href="{{ url('/downloads') }}" class="btn-primary-solid">
                <span class="material-symbols-outlined" style="font-size:1rem;">download</span>
                My Downloads
            </a>
            <a href="{{ url('/store') }}" class="btn-ghost-solid">
                Continue Shopping
            </a>
        </div>

        @if(!empty($tracker))
            <div class="order-ref-badge">
                Ref: {{ Str::upper(Str::substr($tracker, -12)) }}
            </div>
        @endif

    </div>
</div>
@endsection

@push('scripts')
<script>
    (function() {
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
                type: 'safepay:success',
                redirect: window.location.href
            }, window.location.origin);

            // Close popup when success page is opened from checkout popup flow.
            window.close();
        }
    })();
</script>
@endpush
