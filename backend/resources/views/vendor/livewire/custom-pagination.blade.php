@if ($paginator->hasPages())
<nav aria-label="Pagination" class="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/60">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">

        {{-- Result count --}}
        <p class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest order-2 sm:order-1">
            Showing
            <span class="text-slate-700 dark:text-slate-200">{{ $paginator->firstItem() }}–{{ $paginator->lastItem() }}</span>
            of
            <span class="text-slate-700 dark:text-slate-200">{{ number_format($paginator->total()) }}</span>
            results
        </p>

        {{-- Pagination controls --}}
        <div class="flex items-center gap-1.5 order-1 sm:order-2" wire:loading.class="opacity-50">

            {{-- Previous --}}
            @if ($paginator->onFirstPage())
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none" aria-disabled="true">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </span>
            @else
                <button wire:click="previousPage" wire:loading.attr="disabled"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-150 font-bold group"
                    aria-label="Previous page">
                    <svg class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
            @endif

            {{-- Page Numbers --}}
            @foreach ($elements as $element)
                @if (is_string($element))
                    <span class="inline-flex items-center justify-center w-9 h-9 text-slate-300 dark:text-slate-700 text-sm font-bold select-none">···</span>
                @endif

                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white text-sm font-black shadow-md shadow-primary/25 select-none" aria-current="page">
                                {{ $page }}
                            </span>
                        @else
                            <button wire:click="gotoPage({{ $page }})" wire:loading.attr="disabled"
                                class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-150 text-sm font-bold"
                                aria-label="Page {{ $page }}">
                                {{ $page }}
                            </button>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next --}}
            @if ($paginator->hasMorePages())
                <button wire:click="nextPage" wire:loading.attr="disabled"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-150 font-bold group"
                    aria-label="Next page">
                    <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>
            @else
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed select-none" aria-disabled="true">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </span>
            @endif

        </div>
    </div>
</nav>
@endif
