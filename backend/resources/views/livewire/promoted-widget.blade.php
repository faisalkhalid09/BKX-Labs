<div x-data="{ showWidget: true }" x-init="setTimeout(() => showWidget = false, 60000)" x-show="showWidget" x-transition.duration.500ms>
@if($product)
<div class="hidden md:block fixed bottom-5 right-5 z-50 w-56 shadow-2xl rounded-lg border border-outline-variant/30 overflow-hidden transform transition-all duration-500 hover:-translate-y-1 group bg-surface-container-lowest">
    <!-- Close Button -->
    <button @click="showWidget = false" class="absolute top-1.5 right-1.5 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-slate-900/10 hover:bg-slate-900/20 dark:bg-slate-100/10 dark:hover:bg-slate-100/20 text-slate-800 dark:text-slate-200 transition-colors" aria-label="Close promotion">
        <span class="material-symbols-outlined text-base">close</span>
    </button>

    <div class="absolute top-0 left-0 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.75 rounded-br-lg z-10 shadow-sm">
        Promoted
    </div>
    
    <a href="{{ route('store.show', $product->slug) }}" class="block w-full h-full">
        <div class="h-20 sm:h-24 w-full bg-surface-container overflow-hidden">
            @if($product->thumbnail_path)
                <img src="{{ Storage::url($product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            @else
                <div class="w-full h-full flex items-center justify-center text-outline">
                    <span class="material-symbols-outlined text-2xl">inventory_2</span>
                </div>
            @endif
        </div>
        <div class="p-2 sm:p-3 bg-white dark:bg-slate-900 border-t border-outline-variant/10">
            <h4 class="font-bold text-xs text-slate-900 dark:text-slate-100 truncate pr-6">{{ $product->name }}</h4>
            <div class="flex justify-between items-center mt-1.5 sm:mt-2">
                <span class="text-blue-700 dark:text-blue-400 font-bold text-xs sm:text-sm">${{ number_format($product->price, 2) }}</span>
                <span class="text-[8px] sm:text-[9px] text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded px-1.5 sm:px-2 py-0.75 sm:py-1 font-bold transition-colors">Details &rarr;</span>
            </div>
        </div>
    </a>
</div>
@endif
</div>
