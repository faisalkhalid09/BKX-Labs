<div style="position:relative;">
    {{-- Cart button --}}
    <button class="cart-btn" wire:click="toggle" aria-label="Open cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        @if (count($this->cart) > 0)
            <span class="cart-badge">{{ count($this->cart) }}</span>
        @endif
    </button>

    {{-- Backdrop --}}
    @if ($isOpen)
        <div style="position:fixed;inset:0;background:rgba(15,23,42,.35);z-index:200;backdrop-filter:blur(2px);" wire:click="toggle"></div>

        {{-- Drawer --}}
        <div style="position:fixed;top:0;right:0;height:100vh;width:min(100%,400px);background:#fff;z-index:300;display:flex;flex-direction:column;box-shadow:-8px 0 40px rgba(0,0,0,.12);">
            {{-- Header --}}
            <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid #e2e8f0;">
                <div>
                    <span style="font-weight:700;font-size:1rem;color:#0f172a;">Shopping Cart</span>
                    <span style="font-size:0.8rem;color:#94a3b8;margin-left:.5rem;">{{ count($this->cart) }} {{ Str::plural('item', count($this->cart)) }}</span>
                </div>
                <button wire:click="toggle" style="background:none;border:none;cursor:pointer;color:#94a3b8;padding:.25rem;" aria-label="Close cart">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>

            {{-- Items --}}
            <div style="flex:1;overflow-y:auto;padding:1.25rem 1.5rem;">
                @forelse ($this->cart as $productId => $item)
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;padding:.875rem 0;border-bottom:1px solid #f1f5f9;gap:1rem;">
                        <div style="flex:1;min-width:0;">
                            <p style="font-weight:600;font-size:.9rem;color:#0f172a;margin:0 0 .25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ $item['name'] }}</p>
                            <p style="color:#1e3a8a;font-weight:700;font-size:.875rem;margin:0;">${{ number_format($item['price'], 2) }}</p>
                        </div>
                        <button wire:click="removeItem({{ $productId }})" class="px-3 py-1.5 rounded-lg border border-error/30 text-error hover:bg-error/10 transition-colors text-xs font-bold" style="flex-shrink:0;">Remove</button>
                    </div>
                @empty
                    <div class="empty-state" style="padding:3rem 0;">
                        <div class="empty-state-icon" style="margin:0 auto 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </div>
                        <h3 style="font-size:.95rem;font-weight:600;color:#0f172a;margin-bottom:.25rem;">Your cart is empty</h3>
                        <p style="font-size:.825rem;color:#64748b;">Add products from the catalog to get started.</p>
                    </div>
                @endforelse
            </div>

            {{-- Footer --}}
            @if (count($this->cart) > 0)
                <div style="padding:1.25rem 1.5rem;border-top:1px solid #e2e8f0;background:#fafafa;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.125rem;">
                        <span style="font-size:.9rem;color:#64748b;font-weight:500;">Subtotal</span>
                        <span style="font-size:1.2rem;font-weight:800;color:#0f172a;">${{ number_format($this->total, 2) }}</span>
                    </div>
                    <a href="{{ route('checkout.create') }}" class="w-full py-3.5 mt-2 rounded-xl bg-primary text-white font-bold tracking-tight text-center text-sm hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                        Proceed to Checkout
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <p style="text-align:center;font-size:.75rem;color:#94a3b8;margin-top:.75rem;">Secure checkout via Stripe</p>
                </div>
            @endif
        </div>
    @endif
</div>
