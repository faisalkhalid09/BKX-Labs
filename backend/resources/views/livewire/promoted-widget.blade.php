<div>
@if($product)
<div class="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-72 shadow-2xl rounded-xl border border-outline-variant/30 overflow-hidden transform transition-all duration-500 hover:-translate-y-1 group bg-surface-container-lowest">
    <div class="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg z-10 shadow-sm">
        Promoted
    </div>
    
    <a href="{{ route('store.show', $product->slug) }}" class="block w-full h-full">
        <div class="h-36 w-full bg-surface-container overflow-hidden">
            @if($product->thumbnail_path)
                <img src="{{ Storage::url($product->thumbnail_path) }}" alt="{{ $product->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            @else
                <div class="w-full h-full flex items-center justify-center text-outline">
                    <span class="material-symbols-outlined text-4xl">inventory_2</span>
                </div>
            @endif
        </div>
        <div class="p-4 bg-white dark:bg-slate-900 border-t border-outline-variant/10">
            <h4 class="font-bold text-sm text-slate-900 dark:text-slate-100 truncate pr-6">{{ $product->name }}</h4>
            <div class="flex justify-between items-center mt-3">
                <span class="text-blue-700 dark:text-blue-400 font-bold text-base">${{ number_format($product->price, 2) }}</span>
                <span class="text-[11px] text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded px-3 py-1.5 font-bold transition-colors">Details &rarr;</span>
            </div>
        </div>
    </a>
</div>
@endif
</div>
