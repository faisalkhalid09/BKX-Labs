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
        .mobile-menu-open { overflow: hidden; }
        .mobile-menu-active { display: flex; }
        @media (min-width: 768px) {
            .mobile-menu-btn { display: none !important; }
            .mobile-menu { display: none !important; }
        }
    </style>
    @livewireStyles
    @stack('styles')
</head>
<body class="bg-background text-on-background antialiased">

<!-- TopNavBar Shared Component -->
<nav class="fixed top-0 w-full z-50 bg-slate-50 dark:bg-slate-950 font-['Inter'] tracking-tight antialiased border-b border-outline-variant/20">
    <div class="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 h-14 sm:h-16 max-w-[1920px] mx-auto">
        <!-- Logo -->
        <div class="flex items-center gap-8 md:gap-12">
            <a href="{{ url('/store') }}" style="display: flex; align-items: center; overflow: hidden; height: 40px; sm:height: 50px;">
                <img src="/brand-logo.png" alt="BKX Labs" style="height: 60px; width: auto; object-fit: contain; object-position: left center; transform: scale(0.4) sm:scale(0.5); transform-origin: left center;" />
            </a>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
            <div class="flex items-center gap-8">
                <a class="{{ request()->is('store') ? 'text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300' }} transition-colors text-sm" href="{{ url('/store') }}">Catalog</a>
                @auth
                    <a class="{{ request()->is('downloads*') ? 'text-blue-900 dark:text-blue-400 font-bold border-b-2 border-blue-900 dark:border-blue-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300' }} transition-colors text-sm" href="{{ url('/downloads') }}">My Downloads</a>
                @endauth
            </div>
            
            <div class="h-6 w-[1px] bg-outline-variant/30"></div>
            
            <div class="flex items-center gap-4">
                @auth
                    <form action="{{ route('logout') }}" method="POST" style="display:inline;">
                        @csrf
                        <button type="submit" class="text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-sm">Log out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-sm">Sign in</a>
                    <a href="{{ route('register') }}" class="bg-primary text-on-primary px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap">Get Started</a>
                @endauth
                
                @livewire('cart')
            </div>
        </div>

        <!-- Mobile Menu Button & Cart -->
        <div class="md:hidden flex items-center gap-2">
            @livewire('cart')
            
            <button class="mobile-menu-btn p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" id="mobile-menu-toggle" aria-label="Toggle menu">
                <span class="material-symbols-outlined text-2xl text-slate-900 dark:text-slate-100">menu</span>
            </button>
        </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-menu hidden fixed top-16 sm:top-20 left-0 right-0 bg-slate-50 dark:bg-slate-950 border-b border-outline-variant/20 flex-col max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto z-40 md:hidden" id="mobile-menu">
        <div class="px-4 py-4 space-y-2 flex flex-col">
            <a href="{{ url('/store') }}" class="{{ request()->is('store') ? 'text-blue-900 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }} transition-all px-4 py-3 rounded-lg text-sm font-medium">Catalog</a>
            
            @auth
                <a href="{{ url('/downloads') }}" class="{{ request()->is('downloads*') ? 'text-blue-900 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }} transition-all px-4 py-3 rounded-lg text-sm font-medium">My Downloads</a>
            @endauth
            
            <div class="border-t border-outline-variant/20 my-2"></div>
            
            @auth
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all px-4 py-3 rounded-lg text-sm font-medium">Log out</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all px-4 py-3 rounded-lg text-sm font-medium block">Sign in</a>
                <a href="{{ route('register') }}" class="bg-primary text-on-primary px-4 py-3 rounded-lg text-sm font-bold text-center transition-all active:scale-95">Get Started</a>
            @endauth
        </div>
    </div>
</nav>

<main class="pt-14 sm:pt-16">
    @yield('content')
</main>

<!-- Footer Shared Component -->
<footer class="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 font-['Inter'] text-xs sm:text-sm tracking-wide mt-16 sm:mt-20">
    <div class="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-[1920px] mx-auto gap-6 md:gap-0">
        <div class="text-center md:text-left">
            <span class="text-lg font-bold text-blue-900 dark:text-blue-500">BKX Labs</span>
            <p class="text-slate-500 dark:text-slate-400 mt-2 text-xs sm:text-sm">© {{ date('Y') }} BKX Labs. All rights reserved.</p>
        </div>
        <div class="flex gap-4 sm:gap-8 flex-wrap justify-center">
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors text-xs sm:text-sm" href="#">Privacy Policy</a>
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors text-xs sm:text-sm" href="#">Terms of Service</a>
            <a class="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors text-xs sm:text-sm" href="#">Contact</a>
        </div>
    </div>
</footer>

@livewire('promoted-widget')
@livewireScripts
@stack('scripts')

<script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const htmlElement = document.documentElement;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('mobile-menu-active');
            htmlElement.classList.toggle('mobile-menu-open');
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-active');
                htmlElement.classList.remove('mobile-menu-open');
            });
        });
    }
</script>
</body>
</html>
