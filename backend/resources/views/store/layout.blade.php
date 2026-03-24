<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>@yield('title', 'Digital Product Store') - BKX</title>
    
    <!-- Production CSS/JS Build Pipeline -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
