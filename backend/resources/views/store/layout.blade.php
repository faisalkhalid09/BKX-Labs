<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>@yield('title', 'Digital Product Store') - BKX</title>

    @php
        $hasViteManifest = file_exists(public_path('build/manifest.json'));
        $hasViteHot = file_exists(storage_path('vite.hot'));
    @endphp

    <!-- Production CSS/JS Build Pipeline -->
    @if($hasViteManifest || $hasViteHot)
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
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

@php
    $hideStoreHeader = request()->routeIs('login') || request()->routeIs('register') || request()->routeIs('verify.otp');
@endphp

<!-- TopNavBar Shared Component -->
@unless($hideStoreHeader)
<nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md font-['Inter'] tracking-tight antialiased border-b border-slate-200/60 dark:border-slate-800/60">
    <div class="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 h-16 sm:h-20 max-w-6xl mx-auto">
        <!-- Logo Only -->
        <a href="{{ url('/store') }}" class="shrink-0 flex items-center hover:opacity-80 transition-opacity">
              <img src="/brand-logo.png" 
                  alt="BKX Labs" 
                  class="h-[2.875rem] sm:h-[3.45rem] w-auto object-contain drop-shadow-sm"
                 loading="lazy">
        </a>
        
        <!-- Desktop Navigation -->
        @if(!($isLegalPage ?? false))
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
                    <div class="relative" x-data="{ open: false }">
                        <button @click="open = !open" @click.away="open = false" class="flex items-center gap-2 group">
                            <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:border-primary/30 transition-all">
                                <span class="material-symbols-outlined text-[18px]">person</span>
                            </div>
                            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{{ explode(' ', auth()->user()->name)[0] }}</span>
                        </button>

                        <div x-show="open" 
                             x-transition:enter="transition ease-out duration-200"
                             x-transition:enter-start="opacity-0 scale-95"
                             x-transition:enter-end="opacity-100 scale-100"
                             x-transition:leave="transition ease-in duration-75"
                             x-transition:leave-start="opacity-100 scale-100"
                             x-transition:leave-end="opacity-0 scale-95"
                             class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-xl shadow-xl py-2 z-[60]"
                             style="display: none;">
                            
                            <div class="px-4 py-2 border-b border-slate-100 dark:border-slate-900 mb-1">
                                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Account</p>
                                <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ auth()->user()->name }}</p>
                            </div>

                            <a href="{{ route('profile') }}" class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary transition-all">
                                <span class="material-symbols-outlined text-[16px]">settings</span>
                                Profile Settings
                            </a>
                            <a href="{{ route('profile') }}?tab=security" class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary transition-all">
                                <span class="material-symbols-outlined text-[16px]">shield</span>
                                Security
                            </a>
                            <a href="{{ route('profile') }}?tab=preferences" class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary transition-all">
                                <span class="material-symbols-outlined text-[16px]">mail</span>
                                Preferences
                            </a>

                            <div class="h-px bg-slate-100 dark:bg-slate-900 my-1"></div>

                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-left">
                                    <span class="material-symbols-outlined text-[16px]">logout</span>
                                    Log out
                                </button>
                            </form>
                        </div>
                    </div>
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
        <div class="lg:hidden flex items-center gap-2">
            @livewire('cart')
            <button class="mobile-menu-btn w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" id="mobile-menu-toggle" aria-label="Toggle menu">
                <span class="material-symbols-outlined text-[20px] leading-none text-slate-900 dark:text-slate-100">menu</span>
            </button>
        </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-menu hidden fixed top-16 sm:top-20 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60 flex-col max-h-[calc(100vh-4rem)] overflow-y-auto z-40 lg:hidden" id="mobile-menu">
        <div class="px-6 py-6 space-y-4 flex flex-col">
            <a href="{{ url('/store') }}" class="{{ request()->is('store') ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300' }} text-sm font-medium">Catalog</a>
            @auth
                <div class="pt-4 border-t border-slate-100 dark:border-slate-900 space-y-4">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Account</p>
                    <a href="{{ url('/downloads') }}" class="{{ request()->is('downloads*') ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300' }} text-sm font-medium block">My Downloads</a>
                    <a href="{{ route('profile') }}" class="{{ request()->is('profile*') ? 'text-primary font-bold' : 'text-slate-700 dark:text-slate-300' }} text-sm font-medium block">Profile Settings</a>
                    <a href="{{ route('profile') }}?tab=security" class="text-slate-700 dark:text-slate-300 text-sm font-medium block">Security</a>
                    <a href="{{ route('profile') }}?tab=preferences" class="text-slate-700 dark:text-slate-300 text-sm font-medium block">Preferences</a>
                    
                    <form action="{{ route('logout') }}" method="POST" class="pt-2">
                        @csrf
                        <button type="submit" class="w-full text-left text-red-500 text-sm font-bold">Log out</button>
                    </form>
                </div>
            @else
                <div class="pt-4 border-t border-slate-100 dark:border-slate-900">
                    <a href="{{ route('login') }}" class="text-slate-700 dark:text-slate-300 text-sm font-medium block">Sign in</a>
                    <a href="{{ route('register') }}" class="mt-4 bg-primary text-on-primary px-4 py-3 rounded-xl text-sm font-bold text-center block transition-all active:scale-95">Get Started</a>
                </div>
            @endauth
        </div>
    </div>
</nav>
@endunless

<main class="{{ $hideStoreHeader ? 'pt-0' : 'pt-16 sm:pt-20' }} min-h-screen">
    @yield('content')
</main>

<!-- Footer Shared Component -->
@unless($hideStoreHeader)
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
                        <li><a href="https://bkxlabs.com/contact" class="text-sm text-slate-500 hover:text-primary transition-colors">Contact</a></li>
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
@endunless

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
