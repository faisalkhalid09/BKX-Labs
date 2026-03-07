@extends('store.layout')

@section('title', $product->name)
@section('description', $product->short_description)

@push('styles')
<style>
.breadcrumb { display:flex; align-items:center; gap:.5rem; font-size:.8rem; color:#94a3b8; padding:1.25rem 0; }
.breadcrumb a { color:#64748b; } .breadcrumb a:hover { color:#0f172a; }
.breadcrumb-sep { color:#e2e8f0; }

.detail-grid { display:grid; grid-template-columns:1fr 380px; gap:3rem; align-items:start; padding-bottom:5rem; }
@media(max-width:900px){ .detail-grid{grid-template-columns:1fr;} }

.detail-media { background:#f8fafc; border-radius:12px; aspect-ratio:4/3; display:flex; align-items:center; justify-content:center; border:1px solid #e2e8f0; overflow:hidden; }
.detail-media img { width:100%; height:100%; object-fit:cover; }
.detail-media-placeholder svg { width:48px; height:48px; stroke:#cbd5e1; }

.detail-includes { margin-top:2rem; }
.detail-includes h3 { font-size:.875rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#64748b; margin-bottom:1rem; }
.detail-includes ul { list-style:none; display:flex; flex-direction:column; gap:.625rem; }
.detail-includes li { display:flex; align-items:center; gap:.625rem; font-size:.9rem; color:#374151; }
.detail-includes li svg { flex-shrink:0; }

.sidebar { position:sticky; top:80px; }
.sidebar-card { padding:1.75rem; }
.sidebar-price { font-size:2.25rem; font-weight:800; color:#0f172a; letter-spacing:-0.04em; margin:1rem 0 1.25rem; line-height:1; }
.sidebar-name { font-size:1.3rem; font-weight:800; color:#0f172a; letter-spacing:-0.03em; margin-bottom:.5rem; line-height:1.25; }
.sidebar-desc { font-size:.875rem; color:#64748b; line-height:1.65; margin-bottom:0; }
.sidebar-actions { display:flex; flex-direction:column; gap:.625rem; margin-bottom:1.25rem; }
.trust-line { display:flex; align-items:center; gap:.5rem; color:#94a3b8; font-size:.775rem; }
.trust-line svg { flex-shrink:0; }

.about-section { border-top:1px solid #e2e8f0; padding:3rem 0 5rem; }
.about-section h2 { font-size:1.2rem; font-weight:700; color:#0f172a; margin-bottom:1.125rem; }
.about-prose { color:#475569; font-size:.95rem; line-height:1.8; white-space:pre-line; max-width:75ch; }
</style>
@endpush

@section('content')
<div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="{{ url('/store') }}">Store</a>
        <span class="breadcrumb-sep">/</span>
        <a href="{{ url('/store') }}">{{ ucwords(str_replace('_', ' ', $product->category)) }}</a>
        <span class="breadcrumb-sep">/</span>
        <span style="color:#0f172a;">{{ $product->name }}</span>
    </nav>

    <div class="detail-grid">
        {{-- Left column --}}
        <div>
            <div class="detail-media">
                @if ($product->thumbnail_path)
                    <img src="{{ asset('storage/thumbnails/'.$product->thumbnail_path) }}" alt="{{ $product->name }}">
                @else
                    <div class="detail-media-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/></svg>
                    </div>
                @endif
            </div>

            <div class="detail-includes">
                <h3>What's included</h3>
                <ul>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        Instant digital download after purchase
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        48-hour secure download link
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        Commercial use license
                    </li>
                    <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        Access via My Downloads portal
                    </li>
                </ul>
            </div>
        </div>

        {{-- Right sticky sidebar --}}
        <div class="sidebar">
            <div class="card sidebar-card">
                <span class="chip">{{ ucwords(str_replace('_', ' ', $product->category)) }}</span>
                <div class="sidebar-name">{{ $product->name }}</div>
                @if($product->short_description)
                    <p class="sidebar-desc">{{ $product->short_description }}</p>
                @endif
                <div class="sidebar-price">${{ number_format($product->price, 2) }}</div>

                @auth
                    <div class="sidebar-actions">
                        @livewire('cart')
                        <form action="{{ route('checkout.store') }}" method="POST">
                            @csrf
                            <input type="hidden" name="direct_product_id" value="{{ $product->id }}">
                            <button type="submit" class="btn btn-outline btn-full">Buy Now</button>
                        </form>
                    </div>
                @else
                    <div class="sidebar-actions">
                        <a href="{{ route('login') }}" class="btn btn-primary btn-full">Sign in to Purchase</a>
                    </div>
                @endauth

                <hr class="divider">
                <div class="trust-line">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Secured by Stripe · 256-bit SSL encryption
                </div>
            </div>
        </div>
    </div>
</div>

@if ($product->description)
    <div class="about-section">
        <div class="container">
            <h2>About this product</h2>
            <div class="about-prose">{{ $product->description }}</div>
        </div>
    </div>
@endif
@endsection
