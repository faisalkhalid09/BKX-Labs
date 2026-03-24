<div style="position:relative;">
    {{-- Cart button --}}
    <button class="cart-btn p-2 sm:p-0" wire:click="toggle" aria-label="Open cart" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: #374151; min-width: 44px; min-height: 44px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        @if (count($this->cart) > 0)
            <span class="cart-badge" style="position: absolute; top: -8px; right: -8px; background: #1e3a8a; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">{{ count($this->cart) }}</span>
        @endif
    </button>

    {{-- Backdrop --}}
    @if ($isOpen)
        <div style="position:fixed;inset:0;background:rgba(15,23,42,.35);z-index:200;backdrop-filter:blur(2px);" wire:click="toggle"></div>

        {{-- Drawer --}}
        <div style="position:fixed;top:0;right:0;height:100vh;width:100%;max-width:400px;background:#fff;z-index:300;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.12);">
            {{-- Header --}}
            <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #e2e8f0;min-height:56px;">
                <div>
                    <span style="font-weight:700;font-size:0.95rem;color:#0f172a;">Shopping Cart</span>
                    <span style="font-size:0.75rem;color:#94a3b8;margin-left:.5rem;">{{ count($this->cart) }} {{ Str::plural('item', count($this->cart)) }}</span>
                </div>
                <button wire:click="toggle" style="background:none;border:none;cursor:pointer;color:#94a3b8;padding:.25rem;min-width:44px;min-height:44px;display:flex;align-items:center;justify-content:center;" aria-label="Close cart">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>

            {{-- Items --}}
            <div style="flex:1;overflow-y:auto;padding:1rem 1.25rem;-webkit-overflow-scrolling:touch;">
                @forelse ($this->cart as $productId => $item)
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;padding:.75rem 0;border-bottom:1px solid #f1f5f9;gap:1rem;margin-bottom:0.25rem;">
                        <div style="flex:1;min-width:0;">
                            <p style="font-weight:600;font-size:0.9rem;color:#0f172a;margin:0 0 .25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ $item['name'] }}</p>
                            <p style="color:#1e3a8a;font-weight:700;font-size:0.875rem;margin:0;">${{ number_format($item['price'], 2) }}</p>
                        </div>
                        <button wire:click="removeItem({{ $productId }})" class="px-2 sm:px-3 py-1.5 rounded-lg border border-error/30 text-error hover:bg-error/10 transition-colors text-xs font-bold min-h-[44px] flex items-center justify-center" style="flex-shrink:0;white-space:nowrap;">Remove</button>
                    </div>
                @empty
                    <div class="empty-state" style="padding:2rem 0;text-align:center;">
                        <div class="empty-state-icon" style="margin:0 auto 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin: 0 auto;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <h3 style="font-size:0.95rem;font-weight:600;color:#0f172a;margin-bottom:.25rem;">Your cart is empty</h3>
                        <p style="font-size:0.825rem;color:#64748b;">Add products from the catalog to get started.</p>
                    </div>
                @endforelse
            </div>

            {{-- Footer --}}
            @if (count($this->cart) > 0)
                <div style="padding:1rem 1.25rem;border-top:1px solid #e2e8f0;background:#fafafa;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                        <span style="font-size:0.9rem;color:#64748b;font-weight:500;">Subtotal</span>
                        <span style="font-size:1.1rem;font-weight:800;color:#0f172a;">${{ number_format($this->total, 2) }}</span>
                    </div>
                    <a href="{{ route('checkout.create') }}" class="w-full py-3 rounded-xl bg-primary text-white font-bold tracking-tight text-center text-sm hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 min-h-[48px]">
                        Proceed to Checkout
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <p style="text-align:center;font-size:0.7rem;color:#94a3b8;margin-top:.75rem;">Secure checkout via Stripe</p>
                </div>
            @endif
        </div>
    @endif
</div>
