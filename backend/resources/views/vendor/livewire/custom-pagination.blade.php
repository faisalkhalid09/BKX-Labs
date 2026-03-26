@if ($paginator->hasPages())
<nav aria-label="Pagination" class="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800/60">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">

        {{-- Result count (Premium styled) --}}
        <div class="order-2 sm:order-1 flex items-center gap-3">
            <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Showing
                <span class="text-slate-900 dark:text-slate-100">{{ $paginator->firstItem() }}–{{ $paginator->lastItem() }}</span>
                of
                <span class="text-slate-900 dark:text-slate-100">{{ number_format($paginator->total()) }}</span>
                results
            </p>
        </div>

        {{-- Pagination controls (Modern & Functional) --}}
        <div class="flex items-center gap-2 order-1 sm:order-2" wire:loading.class="opacity-40 scale-95" style="transition: all 0.3s ease;">

            {{-- Previous --}}
            @if ($paginator->onFirstPage())
                <span class="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-100 dark:border-slate-800/40 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none transition-all" aria-disabled="true">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </span>
            @else
                <button wire:click="previousPage" wire:loading.attr="disabled"
                    class="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 transition-all duration-200 font-bold group"
                    aria-label="Previous page">
                    <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
            @endif

            {{-- Page Numbers (Glassmorphism inspired) --}}
            <div class="flex items-center bg-slate-50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800/40 gap-1">
                @foreach ($elements as $element)
                    @if (is_string($element))
                        <span class="w-9 h-9 flex items-center justify-center text-slate-400 text-xs font-black select-none tracking-widest">•••</span>
                    @endif

                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <span class="w-8 h-8 flex items-center justify-center rounded-xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/30 select-none scale-110" aria-current="page">
                                    {{ $page }}
                                </span>
                            @else
                                <button wire:click="gotoPage({{ $page }})" wire:loading.attr="disabled"
                                    class="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition-all font-bold text-xs"
                                    aria-label="Page {{ $page }}">
                                    {{ $page }}
                                </button>
                            @endif
                        @endforeach
                    @endif
                @endforeach
            </div>

            {{-- Next --}}
            @if ($paginator->hasMorePages())
                <button wire:click="nextPage" wire:loading.attr="disabled"
                    class="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-95 transition-all duration-200 font-bold group"
                    aria-label="Next page">
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>
            @else
                <span class="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-slate-100 dark:border-slate-800/40 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none transition-all" aria-disabled="true">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </span>
            @endif

        </div>
    </div>
</nav>
@endif
