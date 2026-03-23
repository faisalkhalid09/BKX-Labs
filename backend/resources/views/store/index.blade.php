@extends('store.layout')

@section('title', 'Digital Product Store')
@section('description', 'Browse and purchase AI models, automation scripts, and digital templates from BKX Labs.')

@push('styles')
<style>
    .catalog-hero {
        background: #1e3a8a;
        border-bottom: 1px solid #1e40af;
        padding: 3.5rem 0;
        margin-bottom: 3rem;
    }
    .catalog-hero h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }
    .catalog-hero p {
        font-size: 1rem;
        color: #bfdbfe;
        max-width: 60ch;
    }

    /* Filter Bar */
    .filter-bar {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 2rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .filter-bar::-webkit-scrollbar { display: none; }
    
    .filter-tab {
        background: #fff;
        border: 1.5px solid #e2e8f0;
        padding: 0.5rem 1.25rem;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 600;
        color: #64748b;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
    }
    .filter-tab:hover { border-color: #cbd5e1; color: #0f172a; }
    .filter-tab.active {
        background: #1e3a8a;
        border-color: #1e3a8a;
        color: #fff;
    }

    .result-count { font-size: 0.875rem; color: #94a3b8; margin-bottom: 1.5rem; }

    /* Product Grid */
    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        padding-bottom: 5rem;
    }
    @media (max-width: 640px) {
        .product-grid { grid-template-columns: 1fr; }
    }

    .product-card {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .product-card-thumb {
        aspect-ratio: 16/9;
        background: #f1f5f9;
        border-radius: 10px 10px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-bottom: 1px solid #e2e8f0;
    }
    .product-card-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .product-card-thumb-placeholder svg { width: 32px; height: 32px; stroke: #cbd5e1; }

    .product-card-body {
        padding: 1.25rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .product-card-category { margin-bottom: 0.5rem; }
    .product-card-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 0.4rem;
        line-height: 1.3;
    }
    .product-card-desc {
        font-size: 0.825rem;
        color: #64748b;
        line-height: 1.6;
        flex: 1;
        margin-bottom: 1.25rem;
    }
    .product-card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid #f1f5f9;
        margin-top: auto;
    }
    .product-card-price {
        font-size: 1.15rem;
        font-weight: 800;
        color: #0f172a;
    }
    .product-card-actions { display: flex; gap: 0.5rem; }

    .flash-banner {
        background: #10b981;
        color: #fff;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>
@endpush

@section('content')
<div class="catalog-hero">
    <div class="container">
        <h1>Digital Product Store</h1>
        <p>Expert-grade AI models, automation scripts, and workflow templates designed to accelerate your engineering teams.</p>
    </div>
</div>

<div class="container">
    @livewire('product-catalog')
</div>
@endsection
