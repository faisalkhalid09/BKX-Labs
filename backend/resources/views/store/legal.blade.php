@extends('store.layout')

@php
    $tabTitle = match($tab) {
        'privacy' => 'Privacy Policy',
        'dmca'    => 'DMCA & Copyright Policy',
        default   => 'Terms & Conditions',
    };
    $tabDesc = match($tab) {
        'privacy' => 'Read the BKX Labs Digital Store privacy policy. Learn how we collect, use, and protect your personal data when you purchase or download our software products.',
        'dmca'    => 'BKX Labs DMCA and copyright enforcement policy for our digital products store. Intellectual property rights and takedown procedures.',
        default   => 'The master terms and conditions for purchasing and using digital products from the BKX Labs Store. License, delivery, refund, and usage restrictions.',
    };
    $canonicalUrl = match($tab) {
        'privacy' => url('/store/terms?tab=privacy'),
        'dmca'    => url('/store/terms?tab=dmca'),
        default   => url('/store/terms'),
    };
@endphp

@section('title', $tabTitle)
@section('description', $tabDesc)
@section('canonical', $canonicalUrl)
{{-- Query-param duplicates should not be indexed; canonical handles the signal --}}
@section('robots', 'noindex, follow')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <div class="flex flex-col lg:flex-row gap-12 items-start">
        
        <!-- Main Content Area -->
        <div class="flex-1 w-full bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm min-h-[600px]">
            
            @if($tab === 'terms')
                <div class="space-y-8">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">BKX Labs Master<br>Terms &amp; Conditions</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-12">
                        <section>
                            <p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Welcome to the BKX Labs Store. These Master Terms &amp; Conditions ("Terms") govern your access to and use of our website, as well as the purchase, download, and use of any digital products provided by BKX Labs. By creating an account or purchasing any item from our store, you agree to be bound by these Terms.
                            </p>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-sm font-black">1</span>
                                Definition of Digital Products
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                "Digital Products" refers to any and all downloadable or digitally delivered items available on the BKX Labs store. This includes, but is not limited to: complete software applications, web &amp; automation scripts, raw source code, plugins &amp; extensions, and UI/UX designs &amp; assets.
                            </p>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-sm font-black">2</span>
                                License &amp; Restrictions
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Upon completing a purchase, BKX Labs grants you a revocable, non-exclusive, non-transferable, limited license to download and use the Digital Products. Your purchase grants a usage license, not an ownership stake.
                            </p>
                            <div class="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 space-y-3">
                                <p class="text-red-600 dark:text-red-400 font-black uppercase tracking-widest text-[10px]">Strictly Prohibited</p>
                                <ul class="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    <li class="flex gap-2"><span class="text-red-500 font-black mt-0.5">•</span> Reselling, renting, or redistributing the raw source code on any platform.</li>
                                    <li class="flex gap-2"><span class="text-red-500 font-black mt-0.5">•</span> Sharing account credentials or download links with others.</li>
                                    <li class="flex gap-2"><span class="text-red-500 font-black mt-0.5">•</span> Claiming original authorship or ownership of any purchased asset.</li>
                                </ul>
                            </div>
                        </section>

                        <section class="space-y-4">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-sm font-black">3</span>
                                Delivery &amp; 48-Hour Window
                            </h2>
                            <div class="flex items-start gap-4 p-6 bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                                <div class="space-y-1">
                                    <p class="text-amber-800 dark:text-amber-400 font-bold text-sm">Download links are valid for exactly 48 hours after issuance.</p>
                                    <p class="text-amber-700 dark:text-amber-500 text-xs leading-relaxed">It is your sole responsibility to download and back up your files within this timeframe. We are not obligated to re-issue expired links.</p>
                                </div>
                            </div>
                        </section>

                        <section class="space-y-4">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-sm font-black">4</span>
                                No-Refund Policy
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                All sales are final. Because BKX Labs provides irrevocable digital goods, we do not issue refunds, credits, or exchanges once an order is completed and the download link has been generated.
                            </p>
                        </section>

                        <section class="pt-10 border-t border-slate-100 dark:border-slate-900">
                            <p class="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest text-center">Governing Law: Courts of Pakistan</p>
                        </section>
                    </div>
                </div>
            @endif

            @if($tab === 'privacy')
                <div class="space-y-8">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-10">
                        <section class="space-y-6">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">1. Information We Collect</h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                @foreach([
                                    ['Personal Data', 'Name, email, and billing address provided during registration.'],
                                    ['Payment Data', 'Financial information handled by secure third-party gateways (Lemon Squeezy).'],
                                    ['Usage Data', 'IP address, browser type, and access timestamps.'],
                                    ['Download Tracking', 'Specific IP-based logging to prevent unauthorized sharing of links.']
                                ] as [$title, $desc])
                                    <div class="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <p class="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wide">{{ $title }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ $desc }}</p>
                                    </div>
                                @endforeach
                            </div>
                        </section>

                        <section class="space-y-4">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">2. How We Use Information</h2>
                            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We use your data to manage account security, process orders, and enforce our 48-hour download window protections. We do not sell your information to third parties.
                            </p>
                        </section>

                        <section class="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h3 class="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">Contact Information</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                                    <p class="text-sm font-bold text-slate-900 dark:text-white">contact@bkxlabs.com</p>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                                    <p class="text-sm font-bold text-slate-900 dark:text-white">Lahore, Pakistan</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            @endif

            @if($tab === 'dmca')
                <div class="space-y-8">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">DMCA &amp; Copyright Policy</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-10">
                        <section class="space-y-4">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white">1. IP Rights Protection</h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                All digital products, software, and raw source code available on the BKX Labs store are the exclusive intellectual property of BKX Labs. Your purchase provides a limited usage license, not ownership.
                            </p>
                        </section>

                        <section class="p-8 bg-red-500 text-white rounded-3xl shadow-xl">
                            <h2 class="text-lg font-black uppercase tracking-widest mb-3">Anti-Piracy Enforcement</h2>
                            <p class="text-sm leading-relaxed font-medium opacity-90">
                                We utilize automated monitoring tools to scan for unauthorized distributions. Any user found uploading our files to nulled script directories or file-sharing networks will have their account permanently terminated without refund.
                            </p>
                        </section>

                        <section class="space-y-4">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">2. Submitting a Takedown Notice</h2>
                            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                If you believe your copyright is being infringed, please send a written notification to <strong class="text-slate-900 dark:text-white">contact@bkxlabs.com</strong> with the subject line "Urgent: Copyright Infringement Notice".
                            </p>
                        </section>
                    </div>
                </div>
            @endif
        </div>

        <!-- Navigation Sidebar -->
        <aside class="w-full lg:w-72 sticky top-24 space-y-4">
            <nav class="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-4 shadow-sm space-y-2">
                <a href="{{ route('store.terms') }}" class="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all {{ $tab === 'terms' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span class="text-sm font-bold">Terms &amp; Conditions</span>
                </a>
                <a href="{{ route('store.terms', ['tab' => 'privacy']) }}" class="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all {{ $tab === 'privacy' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <span class="text-sm font-bold">Privacy Policy</span>
                </a>
                <a href="{{ route('store.terms', ['tab' => 'dmca']) }}" class="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all {{ $tab === 'dmca' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    <span class="text-sm font-bold">DMCA / Copyright</span>
                </a>
            </nav>

            <div class="p-6 bg-slate-900 text-white rounded-3xl space-y-3">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Legal Support</p>
                <p class="text-sm font-medium leading-relaxed opacity-80">Have a legal question? Reach out to our support team.</p>
                <a href="https://bkxlabs.com/contact" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                    Contact Us →
                </a>
            </div>
        </aside>

    </div>
</div>
@endsection
