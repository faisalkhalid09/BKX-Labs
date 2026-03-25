<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <div class="flex flex-col lg:flex-row gap-12 items-start">
        
        <!-- Main Content Area (Left) -->
        <div class="flex-1 w-full bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm min-h-[600px]">
            
            @if($tab === 'terms')
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">BKX Labs Master<br>Terms & Conditions</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-12">
                        <section>
                            <p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Welcome to the BKX Labs Store. These Master Terms & Conditions ("Terms") govern your access to and use of our website, as well as the purchase, download, and use of any digital products provided by BKX Labs. By creating an account or purchasing any item from our store, you agree to be bound by these Terms.
                            </p>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black">1</span>
                                Definition of Digital Products
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                "Digital Products" refers to any and all downloadable or digitally delivered items available on the BKX Labs store. This includes, but is not limited to:
                            </p>
                            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                @foreach(['Complete software applications', 'Web & automation scripts', 'Raw source code', 'Plugins & extensions', 'UI/UX designs & assets'] as $item)
                                    <li class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <span class="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                                        {{ $item }}
                                    </li>
                                @endforeach
                            </ul>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black">2</span>
                                License & Restrictions
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Upon completing a purchase, BKX Labs grants you a revocable, non-exclusive, non-transferable, limited license to download and use the Digital Products. **Your purchase grants a usage license, not an ownership stake.**
                            </p>
                            
                            <div class="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 space-y-4">
                                <p class="text-red-600 dark:text-red-400 font-black uppercase tracking-widest text-[10px]">Strictly Prohibited Behavior</p>
                                <ul class="space-y-3">
                                    <li class="flex items-start gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <span class="text-red-500 font-bold mt-1.5">•</span>
                                        <span>**Reselling or Redistributing**: You may not sell, rent, lease, syndicate, or host the raw code on any other platform.</span>
                                    </li>
                                    <li class="flex items-start gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <span class="text-red-500 font-bold mt-1.5">•</span>
                                        <span>**Account Sharing**: Account credentials and download links are tied exclusively to the original purchaser.</span>
                                    </li>
                                    <li class="flex items-start gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <span class="text-red-500 font-bold mt-1.5">•</span>
                                        <span>**Claiming Ownership**: You may not claim original scripts or assets as your own intellectual property.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black">3</span>
                                Delivery & 48-Hour Window
                            </h2>
                            <div class="flex items-start gap-6 p-6 bg-amber-50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                                <span class="material-symbols-outlined text-[32px] text-amber-500">schedule</span>
                                <div class="space-y-2">
                                    <p class="text-amber-800 dark:text-amber-400 font-bold text-sm">Download links remain valid for exactly 48 hours.</p>
                                    <p class="text-amber-700 dark:text-amber-500 text-xs leading-relaxed font-medium">It is your sole responsibility to download and securely back up your purchased files within this timeframe. We are under no obligation to re-issue expired links.</p>
                                </div>
                            </div>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black">4</span>
                                No-Refund Policy
                            </h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                                Because BKX Labs provides irrevocable digital goods, all sales are final. We do not issue refunds, credits, or exchanges once an order is completed and the link is generated.
                            </p>
                        </section>

                        <section class="space-y-4 pt-10 border-t border-slate-100 dark:border-slate-900">
                            <p class="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest text-center">Governing Law: Courts of Pakistan</p>
                        </section>
                    </div>
                </div>
            @endif

            @if($tab === 'privacy')
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-10">
                        <section class="space-y-6">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">1. Information We Collect</h2>
                            <div class="space-y-4">
                                @foreach([
                                    ['Personal Data', 'Name, email, and billing address provided during registration.'],
                                    ['Payment Data', 'Financial information handled by secure third-party gateways.'],
                                    ['Usage Data', 'IP address, browser type, and access times.'],
                                    ['Download Tracking', 'Specific logging of IP addresses to prevent unauthorized sharing.']
                                ] as [$title, $desc])
                                    <div class="group p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-900">
                                        <p class="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-wide">{{ $title }}</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ $desc }}</p>
                                    </div>
                                @endforeach
                            </div>
                        </section>

                        <section class="space-y-6">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">2. How We Use Information</h2>
                            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                We use your data to manage account security, process orders, and enforce our 48-hour download window protections.
                            </p>
                        </section>

                        <section class="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h3 class="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">Contact Information</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <div class="flex items-start gap-4">
                                    <span class="material-symbols-outlined text-primary">mail</span>
                                    <div>
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">contact@bkxlabs.com</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-4">
                                    <span class="material-symbols-outlined text-primary">location_on</span>
                                    <div>
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</p>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">Lahore, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            @endif

            @if($tab === 'dmca')
                <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <header class="border-b border-slate-100 dark:border-slate-900 pb-10">
                        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">DMCA & Copyright Policy</h1>
                        <p class="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-4">Last Updated: March 26, 2026</p>
                    </header>

                    <div class="prose prose-slate dark:prose-invert max-w-none space-y-12">
                        <section class="space-y-6">
                            <h2 class="text-xl font-black text-slate-900 dark:text-white">1. IP Rights Protection</h2>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                                All digital products, software, and raw source code available on the BKX Labs store are the **exclusive intellectual property of BKX Labs.** Your purchase provides a limited usage license, not ownership.
                            </p>
                        </section>

                        <section class="p-8 bg-red-500 text-white rounded-3xl shadow-xl shadow-red-500/20">
                            <h2 class="text-lg font-black uppercase tracking-widest mb-4">Anti-Piracy enforcement</h2>
                            <p class="text-sm leading-relaxed font-bold opacity-90">
                                We utilize automated monitoring tools to scan for unauthorized distributions. Any user found uploading our ZIP files to "nulled" script directories or file-sharing networks will have their account terminated without refund.
                            </p>
                        </section>

                        <section class="space-y-6 pt-6">
                            <h2 class="text-lg font-black text-slate-900 dark:text-white">Submitting a Takedown Notice</h2>
                            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                If you believe your copyright is being infringed upon, please send a written notification to **legal@bkxlabs.com** with the subject line "Urgent: Copyright Infringement Notice".
                            </p>
                        </section>
                    </div>
                </div>
            @endif
        </div>

        <!-- Navigation Sidebar (Right) -->
        <aside class="w-full lg:w-72 sticky top-28 space-y-4">
            <nav class="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-4 shadow-sm">
                <button wire:click="setTab('terms')" class="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl transition-all group {{ $tab === 'terms' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-[20px] {{ $tab === 'terms' ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors' }}">gavel</span>
                        <span class="text-sm font-bold">Terms & Conditions</span>
                    </div>
                    @if($tab === 'terms')
                        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                    @endif
                </button>

                <button wire:click="setTab('privacy')" class="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl transition-all group mt-2 {{ $tab === 'privacy' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-[20px] {{ $tab === 'privacy' ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors' }}">security</span>
                        <span class="text-sm font-bold">Privacy Policy</span>
                    </div>
                    @if($tab === 'privacy')
                        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                    @endif
                </button>

                <button wire:click="setTab('dmca')" class="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl transition-all group mt-2 {{ $tab === 'dmca' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900' }}">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-[20px] {{ $tab === 'dmca' ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors' }}">copyright</span>
                        <span class="text-sm font-bold">Copyright Policy</span>
                    </div>
                    @if($tab === 'dmca')
                        <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                    @endif
                </button>
            </nav>

            <div class="p-6 bg-slate-900 dark:bg-primary text-white rounded-3xl space-y-4 shadow-xl shadow-primary/10">
                <p class="text-[10px] font-black uppercase tracking-widest opacity-60">Legal Center</p>
                <p class="text-sm font-bold leading-relaxed">Looking for something else? Reach out to our 24/7 dedicated legal support team.</p>
                <a href="https://bkxlabs.com/contact" class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                    Contact Us
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
            </div>
        </aside>

    </div>
</div>

<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
</style>
