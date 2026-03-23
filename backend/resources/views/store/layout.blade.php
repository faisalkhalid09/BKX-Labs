<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Store') — BKX Labs</title>
    <meta name="description" content="@yield('description', 'BKX Labs digital product store — AI Models, scripts, and templates.')">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #0f172a; background: #ffffff; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }

        /* Layout */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Nav */
        .store-header {
            position: sticky; top: 0; z-index: 100;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
        }
        .store-header-inner {
            display: flex; align-items: center; justify-content: space-between;
            height: 64px;
        }
        .store-logo {
            font-size: 1.25rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em;
        }
        .store-logo span { color: #1e3a8a; }
        .store-nav-links {
            display: flex; align-items: center; gap: 2rem;
            list-style: none;
        }
        .store-nav-links a {
            font-size: 0.9rem; font-weight: 500; color: #64748b;
            transition: color .2s;
        }
        .store-nav-links a:hover, .store-nav-links a.active { color: #0f172a; }
        .store-nav-actions { display: flex; align-items: center; gap: 1rem; }
        .store-nav-actions .signin-link {
            font-size: 0.875rem; font-weight: 500; color: #64748b;
            transition: color .2s;
        }
        .store-nav-actions .signin-link:hover { color: #0f172a; }

        /* Buttons */
        .btn {
            display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;
            font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.875rem;
            border-radius: 8px; cursor: pointer; transition: all .2s;
            border: 1.5px solid transparent; padding: 0.55rem 1.25rem;
            white-space: nowrap;
        }
        .btn-primary { background: #1e3a8a; color: #fff; border-color: #1e3a8a; }
        .btn-primary:hover { background: #1e40af; border-color: #1e40af; }
        .btn-outline { background: transparent; color: #1e3a8a; border-color: #1e3a8a; }
        .btn-outline:hover { background: #eff6ff; }
        .btn-ghost { background: transparent; color: #64748b; border-color: #e2e8f0; }
        .btn-ghost:hover { background: #f8fafc; color: #0f172a; }
        .btn-lg { padding: 0.75rem 1.75rem; font-size: 1rem; border-radius: 10px; }
        .btn-full { width: 100%; justify-content: center; }
        .btn-sm { padding: 0.4rem 1rem; font-size: 0.8rem; border-radius: 6px; }
        .btn-danger-outline { background: transparent; color: #dc2626; border-color: #fca5a5; }
        .btn-danger-outline:hover { background: #fef2f2; }
        .btn[disabled] { opacity: .45; cursor: not-allowed; pointer-events: none; }

        /* Cart icon */
        .cart-btn {
            position: relative; background: none; border: 1.5px solid #e2e8f0;
            border-radius: 8px; width: 40px; height: 40px; display: flex;
            align-items: center; justify-content: center; cursor: pointer;
            font-size: 1rem; transition: all .2s; color: #0f172a;
        }
        .cart-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .cart-badge {
            position: absolute; top: -6px; right: -6px;
            background: #1e3a8a; color: #fff;
            font-size: 0.65rem; font-weight: 700;
            min-width: 18px; height: 18px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            border: 2px solid #fff;
        }

        /* Chips / Badges */
        .chip {
            display: inline-block; padding: 0.2rem 0.65rem;
            font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em;
            text-transform: uppercase; border-radius: 4px;
            background: #f1f5f9; color: #475569;
        }
        .chip-blue { background: #eff6ff; color: #1e3a8a; }
        .chip-green { background: #f0fdf4; color: #166534; }
        .chip-red { background: #fef2f2; color: #991b1b; }

        /* Cards */
        .card {
            background: #fff; border: 1px solid #e2e8f0;
            border-radius: 12px; transition: box-shadow .2s, border-color .2s;
        }
        .card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.08); border-color: #cbd5e1; }

        /* Section helpers */
        .section-hero-dark {
            background: #0f172a; color: #fff;
            padding: 2.5rem 0;
        }
        .section-hero-dark h1 { color: #fff; font-size: 1.6rem; font-weight: 700; letter-spacing: -0.03em; }
        .section-hero-dark p { color: #94a3b8; font-size: 0.95rem; margin-top: 0.25rem; }

        /* Alerts */
        .alert { padding: 0.875rem 1.125rem; border-radius: 8px; font-size: 0.875rem; margin-bottom: 1rem; }
        .alert-error { background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c; }
        .alert-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; }

        /* Divider */
        .divider { border: none; border-top: 1px solid #e2e8f0; margin: 1.25rem 0; }

        /* Footer */
        .store-footer {
            background: #0f172a; color: #94a3b8;
            padding: 2.5rem 0; margin-top: 5rem;
        }
        .store-footer-inner {
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 1rem;
        }
        .store-footer-logo { font-size: 1rem; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
        .store-footer p { font-size: 0.8rem; color: #475569; margin: 0; max-width: none; }
        .store-footer-links { display: flex; gap: 1.5rem; }
        .store-footer-links a { font-size: 0.8rem; color: #475569; transition: color .2s; }
        .store-footer-links a:hover { color: #94a3b8; }

        /* Form inputs */
        .form-label { display: block; font-weight: 600; font-size: 0.875rem; color: #374151; margin-bottom: 0.375rem; }
        .form-input {
            width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px;
            padding: 0.65rem 0.875rem; font-size: 0.9rem; font-family: 'Inter', sans-serif;
            color: #0f172a; background: #fff; outline: none; transition: border-color .2s, box-shadow .2s;
        }
        .form-input:focus { border-color: #1e3a8a; box-shadow: 0 0 0 3px rgba(30,58,138,.1); }
        .form-input::placeholder { color: #94a3b8; }
        .form-group { margin-bottom: 1.125rem; }

        /* Empty state */
        .empty-state { text-align: center; padding: 5rem 1rem; }
        .empty-state-icon { width: 56px; height: 56px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
        .empty-state h3 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.375rem; }
        .empty-state p { font-size: 0.9rem; color: #64748b; max-width: 36ch; margin: 0 auto 1.5rem; }

        /* Responsive */
        @media(max-width:768px){
            .store-nav-links { display: none; }
            .store-header-inner { padding: 0; }
            .container { padding: 0 1rem; }
        }
    </style>
    @livewireStyles
    @stack('styles')
</head>
<body>

{{-- ===== HEADER ===== --}}
<header class="store-header">
    <div class="container">
        <div class="store-header-inner" style="height: 80px;">
            <a href="{{ url('/store') }}" class="store-logo" style="display: flex; align-items: center; overflow: hidden; width: 140px; height: 50px;">
                <img src="/brand-logo.png" alt="BKX Labs" style="height: 140px; width: auto; object-fit: contain; object-position: left center; transform: scale(1.8); transform-origin: left center;" />
            </a>

            <ul class="store-nav-links">
                <li><a href="{{ url('/store') }}" class="{{ request()->is('store') ? 'active' : '' }}">Catalog</a></li>
                @auth
                    <li><a href="{{ url('/downloads') }}" class="{{ request()->is('downloads*') ? 'active' : '' }}">My Downloads</a></li>
                @endauth
            </ul>

            <div class="store-nav-actions">
                @auth
                    <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                        @csrf
                        <button type="submit" class="signin-link" style="background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-size:.875rem;font-weight:500;color:#64748b;padding:0;">Log out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="signin-link">Sign in</a>
                    <a href="{{ route('register') }}" class="btn btn-primary btn-sm">Get Started</a>
                @endauth
                @livewire('cart')
            </div>
        </div>
    </div>
</header>

<main>@yield('content')</main>

{{-- ===== FOOTER ===== --}}
<footer class="store-footer">
    <div class="container">
        <div class="store-footer-inner">
            <div>
                <div class="store-footer-logo">BKX Labs</div>
                <p style="margin-top:.25rem;">Digital products for builders.</p>
            </div>
            <p>© {{ date('Y') }} BKX Labs. All rights reserved.</p>
        </div>
    </div>
</footer>

@livewireScripts
@stack('scripts')
</body>
</html>
