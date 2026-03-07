@extends('store.layout')
@section('title', 'Order Confirmed')
@section('content')
<div style="display:flex;align-items:center;justify-content:center;min-height:70vh;padding:4rem 1rem;">
    <div style="text-align:center;max-width:480px;">
        <div style="width:64px;height:64px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 style="font-size:1.75rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin-bottom:.5rem;">Payment Successful</h1>
        <p style="font-size:.95rem;color:#64748b;line-height:1.7;margin-bottom:2rem;max-width:40ch;margin-left:auto;margin-right:auto;">Your order is confirmed. Head to My Downloads to access your files — links are active for 48 hours.</p>
        <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
            <a href="{{ url('/downloads') }}" class="btn btn-primary">Go to My Downloads</a>
            <a href="{{ url('/store') }}" class="btn btn-ghost">Continue Shopping</a>
        </div>
    </div>
</div>
@endsection
