<div wire:poll.3s class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1.5 sm:gap-3 transition-all duration-300">
    <div class="flex items-end gap-2">
        <span class="text-3xl sm:text-4xl font-black leading-none text-on-surface">${{ number_format($product->price, 2) }}</span>
        <span class="text-xs sm:text-sm text-on-surface-variant font-semibold pb-0.5">USD</span>
    </div>
    <span class="text-[11px] sm:text-xs text-on-surface-variant font-medium uppercase tracking-wide">Single License</span>
</div>
