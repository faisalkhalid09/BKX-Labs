<div style="position:relative;">
    {{-- Cart button --}}
    <button class="cart-btn w-10 h-10 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" wire:click="toggle" aria-label="Open cart" style="display: flex; align-items: center; justify-content: center; gap: 0.4rem; color: #374151; min-width: 40px; min-height: 40px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        @if (count($this->cart) > 0)
            <span class="cart-badge" style="position: absolute; top: -6px; right: -6px; background: #1e3a8a; color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">{{ count($this->cart) }}</span>
        @endif
    </button>

    {{-- Backdrop --}}
    @if ($isOpen)
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:200;" wire:click="toggle"></div>

        {{-- Drawer --}}
        <div style="position:fixed;top:0;right:0;height:100vh;width:100%;max-width:320px;background:#fff;z-index:210;display:flex;flex-direction:column;box-shadow:-10px 0 50px rgba(0,0,0,0.15);animation: slideInRight .3s ease-out;">

            {{-- Header --}}
            <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;border-bottom:1px solid #e2e8f0;min-height:48px;">
                <div>
                    <span style="font-weight:700;font-size:0.8rem;color:#0f172a;">Shopping Cart</span>
                    <span style="font-size:0.65rem;color:#94a3b8;margin-left:.4rem;">{{ count($this->cart) }} {{ Str::plural('item', count($this->cart)) }}</span>
                </div>
                <button wire:click="toggle" style="background:none;border:none;cursor:pointer;color:#94a3b8;padding:.2rem;min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center;" aria-label="Close cart">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>

            {{-- Items --}}
            <div style="flex:1;overflow-y:auto;padding:0.75rem 1rem;-webkit-overflow-scrolling:touch;">
                @forelse ($this->cart as $productId => $item)
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid #f1f5f9;gap:0.75rem;margin-bottom:0.2rem;">
                        <div style="flex:1;min-width:0;">
                            <p style="font-weight:600;font-size:0.75rem;color:#0f172a;margin:0 0 .2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ $item['name'] }}</p>
                            <p style="color:#1e3a8a;font-weight:700;font-size:0.7rem;margin:0;">${{ number_format($item['price'], 2) }}</p>
                        </div>
                        <button wire:click="removeItem({{ $productId }})" class="px-1.5 sm:px-2 py-1 rounded-md border border-error/30 text-error hover:bg-error/10 transition-colors text-xs font-bold min-h-[36px] flex items-center justify-center" style="flex-shrink:0;white-space:nowrap;">Remove</button>
                    </div>
                @empty
                    <div class="empty-state" style="padding:1.5rem 0;text-align:center;">
                        <div class="empty-state-icon" style="margin:0 auto 0.75rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin: 0 auto;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <h3 style="font-size:0.8rem;font-weight:600;color:#0f172a;margin-bottom:.2rem;">Your cart is empty</h3>
                        <p style="font-size:0.7rem;color:#64748b;">Add products from the catalog to get started.</p>
                    </div>
                @endforelse
            </div>

            {{-- Footer --}}
            @if (count($this->cart) > 0)
                <div style="padding:0.75rem 1rem;border-top:1px solid #e2e8f0;background:#fafafa;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                        <span style="font-size:0.75rem;color:#64748b;font-weight:500;">Subtotal</span>
                        <span style="font-size:0.9rem;font-weight:800;color:#0f172a;">${{ number_format($this->total, 2) }}</span>
                    </div>
                    <a href="{{ route('checkout.create') }}" class="w-full py-2.5 rounded-lg bg-primary text-white font-bold tracking-tight text-center text-xs hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 min-h-[40px]">
                        Proceed to Checkout
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <p style="text-align:center;font-size:0.65rem;color:#94a3b8;margin-top:0.5rem;">Secure checkout via Lemon Squeezy</p>
                </div>
            @endif

    @if ($isOpen)
        <style>
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        </style>
    @endif
</div>
