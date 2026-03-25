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
<nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md font-['Inter'] tracking-tight antialiased border-b border-slate-200/60 dark:border-slate-800/60">
    <div class="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-14 sm:h-16 max-w-6xl mx-auto">
        <!-- Logo Only -->
        <a href="{{ url('/store') }}" class="shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <img src="/brand-logo.png" 
                 alt="BKX Labs" 
                 class="h-6 sm:h-7 w-auto object-cover scale-110 drop-shadow-sm"
                 loading="lazy">
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
            <div class="flex items-center gap-8">
                <a class="{{ request()->is('store') ? 'text-primary dark:text-blue-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-300' }} transition-colors text-xs uppercase tracking-wider" href="{{ url('/store') }}">Catalog</a>
                @auth
                    <a class="{{ request()->is('downloads*') ? 'text-primary dark:text-blue-400 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-blue-300' }} transition-colors text-xs uppercase tracking-wider" href="{{ url('/downloads') }}">My Downloads</a>
                @endauth
            </div>
            
            <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            
            <div class="flex items-center gap-4">
                @auth
                    <form action="{{ route('logout') }}" method="POST" class="inline">
                        @csrf
                        <button type="submit" class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-medium">Log out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-medium">Sign in</a>
                    <a href="{{ route('register') }}" class="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-bold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 whitespace-nowrap">Get Started</a>
                @endauth
                
                <div class="relative">
                    @livewire('cart')
                </div>
            </div>
        </div>

        <!-- Mobile Cart & Menu -->
        <div class="lg:hidden flex items-center gap-3">
            @livewire('cart')
            <button class="mobile-menu-btn p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" id="mobile-menu-toggle" aria-label="Toggle menu">
                <span class="material-symbols-outlined text-2xl text-slate-900 dark:text-slate-100">menu</span>
            </button>
        </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-menu hidden fixed top-14 sm:top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 flex-col max-h-[calc(100vh-4rem)] overflow-y-auto z-40 lg:hidden" id="mobile-menu">
        <div class="px-6 py-6 space-y-4 flex flex-col">
            <a href="{{ url('/store') }}" class="{{ request()->is('store') ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300' }} text-sm font-medium">Catalog</a>
            @auth
                <a href="{{ url('/downloads') }}" class="{{ request()->is('downloads*') ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300' }} text-sm font-medium">My Downloads</a>
            @endauth
            
            <div class="border-t border-slate-100 dark:border-slate-900 pt-4">
                @auth
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full text-left text-slate-700 dark:text-slate-300 text-sm font-medium">Log out</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-slate-700 dark:text-slate-300 text-sm font-medium block">Sign in</a>
                    <a href="{{ route('register') }}" class="mt-4 bg-primary text-on-primary px-4 py-3 rounded-xl text-sm font-bold text-center block transition-all active:scale-95">Get Started</a>
                @endauth
            </div>
        </div>
    </div>
</nav>

<main class="pt-14 sm:pt-16 min-h-screen">
    @yield('content')
</main>

<!-- Footer Shared Component -->
<footer class="w-full border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 font-['Inter'] mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div class="md:col-span-4">
                <span class="text-xl font-black text-primary tracking-tighter">BKX Labs</span>
                <p class="text-slate-500 dark:text-slate-400 mt-4 text-sm leading-relaxed max-w-sm">
                    Providing high-performance AI models and automation scripts to power the next generation of software engineering.
                </p>
            </div>
            <div class="md:col-span-8 flex flex-wrap gap-x-16 gap-y-10 md:justify-end">
                <div class="space-y-4">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">Shop</h4>
                    <ul class="space-y-2">
                        <li><a href="{{ url('/store') }}" class="text-sm text-slate-500 hover:text-primary transition-colors">Catalog</a></li>
                        <li><a href="#" class="text-sm text-slate-500 hover:text-primary transition-colors">New Arrivals</a></li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">Legal</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">Connect</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-sm text-slate-500 hover:text-primary transition-colors">Contact</a></li>
                        <li><a href="#" class="text-sm text-slate-500 hover:text-primary transition-colors">Support</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-12 md:mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-slate-400 dark:text-slate-600 text-[10px] uppercase tracking-widest">© {{ date('Y') }} BKX Labs. All rights reserved.</p>
            <div class="flex gap-6">
                <!-- Social links could go here -->
            </div>
        </div>
    </div>
</footer>

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
