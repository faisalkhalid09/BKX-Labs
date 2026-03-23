<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>@yield('title', 'Digital Product Store') - BKX</title>
    
    <!-- Tailwind Configuration from Stitch -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-error": "#ffffff",
                        "inverse-on-surface": "#eef0ff",
                        "surface-tint": "#4059aa",
                        "on-primary-fixed": "#00164e",
                        "inverse-primary": "#b6c4ff",
                        "on-error-container": "#93000a",
                        "surface-container-highest": "#dae2fd",
                        "error-container": "#ffdad6",
                        "outline-variant": "#c5c5d3",
                        "tertiary-fixed-dim": "#ffb691",
                        "surface-container": "#eaedff",
                        "primary-fixed-dim": "#b6c4ff",
                        "primary-container": "#1e3a8a",
                        "on-tertiary": "#ffffff",
                        "background": "#faf8ff",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-fixed-variant": "#773205",
                        "on-surface": "#131b2e",
                        "on-surface-variant": "#444651",
                        "outline": "#757682",
                        "surface-bright": "#faf8ff",
                        "on-secondary-fixed": "#111a37",
                        "surface-container-low": "#f2f3ff",
                        "on-secondary": "#ffffff",
                        "on-background": "#131b2e",
                        "tertiary": "#4b1c00",
                        "secondary": "#555d7e",
                        "surface-dim": "#d2d9f4",
                        "primary-fixed": "#dce1ff",
                        "surface": "#faf8ff",
                        "on-tertiary-container": "#f39461",
                        "tertiary-fixed": "#ffdbcb",
                        "error": "#ba1a1a",
                        "secondary-fixed": "#dce1ff",
                        "on-primary": "#ffffff",
                        "on-secondary-container": "#555e7f",
                        "inverse-surface": "#283044",
                        "primary": "#00236f",
                        "secondary-container": "#d0d8ff",
                        "tertiary-container": "#6e2c00",
                        "secondary-fixed-dim": "#bdc5eb",
                        "on-primary-fixed-variant": "#264191",
                        "on-tertiary-fixed": "#341100",
                        "surface-variant": "#dae2fd",
                        "surface-container-high": "#e2e7ff",
                        "on-primary-container": "#90a8ff"
                    },
                    fontFamily: {
                        "headline": ["Inter"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    },
                    borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
                },
            },
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
    @livewireStyles
    @stack('styles')
</head>
<body class="bg-background text-on-background antialiased">

<!-- TopNavBar Shared Component -->
<nav class="fixed top-0 w-full z-50 bg-slate-50 dark:bg-slate-950 font-['Inter'] tracking-tight antialiased border-b border-outline-variant/20">
    <div class="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-[1920px] mx-auto">
        <div class="flex items-center gap-12">
            <a href="{{ url('/store') }}" style="display: flex; align-items: center; overflow: hidden; height: 50px;">
                <img src="/brand-logo.png" alt="BKX Labs" style="height: 140px; width: auto; object-fit: contain; object-position: left center; transform: scale(0.5); transform-origin: left center;" />
            </a>
        </div>
        
        <div class="flex items-center gap-8">
            <div class="hidden md:flex items-center gap-8">
                <a class="{{ request()->is('store') ? 'text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300' }} transition-colors" href="{{ url('/store') }}">Catalog</a>
                @auth
                    <a class="{{ request()->is('downloads*') ? 'text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300' }} transition-colors" href="{{ url('/downloads') }}">My Downloads</a>
                @endauth
            </div>
            
            <div class="h-6 w-[1px] bg-outline-variant/30 hidden md:block"></div>
            
            <div class="flex items-center gap-4">
                @auth
                    <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                        @csrf
                        <button type="submit" class="text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">Log out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium">Sign in</a>
                    <a href="{{ route('register') }}" class="bg-primary text-on-primary px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-all active:scale-95">Get Started</a>
                @endauth
                
                @livewire('cart')
            </div>
        </div>
    </div>
</nav>

<main class="pt-20">
    @yield('content')
</main>

<!-- Footer Shared Component -->
<footer class="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 font-['Inter'] text-sm tracking-wide mt-20">
    <div class="flex flex-col md:flex-row justify-between items-center w-full px-12 py-12 max-w-[1920px] mx-auto">
        <div class="mb-8 md:mb-0">
            <span class="text-lg font-bold text-blue-900 dark:text-blue-500">BKX Labs</span>
            <p class="text-slate-500 dark:text-slate-400 mt-2">© {{ date('Y') }} BKX Labs. All rights reserved.</p>
        </div>
        <div class="flex gap-8">
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Privacy Policy</a>
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Terms of Service</a>
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors" href="#">Contact</a>
        </div>
    </div>
</footer>

@livewireScripts
@stack('scripts')
</body>
</html>
