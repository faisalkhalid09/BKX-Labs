@extends('store.layout')
@section('title', 'My Downloads')

@push('styles')
<style>
.downloads-wrap { padding: 3rem 0 5rem; }
.downloads-list { display: flex; flex-direction: column; gap: 1rem; }

.download-row { display:flex;align-items:center;gap:1.5rem;padding:1.25rem 1.5rem; }
@media(max-width:640px){ .download-row{flex-direction:column;align-items:flex-start;} }

.download-icon-box { width:48px;height:48px;background:#f1f5f9;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center; }
.download-icon-box svg { width:22px;height:22px;stroke:#64748b; }
.download-info { flex:1;min-width:0; }
.download-name { font-weight:700;font-size:.95rem;color:#0f172a;margin-bottom:.25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.download-meta { font-size:.8rem;color:#94a3b8;display:flex;align-items:center;gap:.75rem;flex-wrap:wrap; }
.dl-action { flex-shrink:0; }
</style>
@endpush

@section('content')
<div class="section-hero-dark">
    <div class="container">
        <h1>My Downloads</h1>
        <p>Access your purchased products. Download links expire 48 hours after purchase.</p>
    </div>
</div>

<div class="downloads-wrap">
    <div class="container">
        @if ($orders->isEmpty())
            <div class="empty-state">
                <div class="empty-state-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke="#94a3b8" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                </div>
                <h3>No purchases yet</h3>
                <p>Once you buy a product, it will appear here with a download link.</p>
                <a href="{{ url('/store') }}" class="btn btn-primary">Browse Store</a>
            </div>
        @else
            <div class="downloads-list">
                @foreach ($orders as $order)
                    <div class="card download-row">
                        <div class="download-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        </div>
                        <div class="download-info">
                            <div class="download-name">{{ $order->product->name }}</div>
                            <div class="download-meta">
                                <span class="chip">{{ ucwords(str_replace('_', ' ', $order->product->category)) }}</span>
                                <span>Order #{{ $order->id }}</span>
                                <span>Purchased {{ $order->created_at->format('M d, Y') }}</span>
                                @if ($order->download_expires_at)
                                    @if ($order->canDownload())
                                        <span class="chip chip-green">Active · Expires {{ $order->download_expires_at->diffForHumans() }}</span>
                                    @else
                                        <span class="chip chip-red">Expired</span>
                                    @endif
                                @endif
                            </div>
                        </div>
                        <div class="dl-action">
                            @if ($order->canDownload())
                                <a href="{{ route('downloads.download', $order) }}" class="btn btn-primary btn-sm">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                                    Download
                                </a>
                            @else
                                <button class="btn btn-ghost btn-sm" disabled>Expired</button>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</div>
@endsection
