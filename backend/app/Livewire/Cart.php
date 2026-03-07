<?php

namespace App\Livewire;

use Livewire\Component;

class Cart extends Component
{
    public bool $isOpen = false;

    protected $listeners = ['cart-updated' => 'refresh'];

    public function toggle(): void
    {
        $this->isOpen = !$this->isOpen;
    }

    public function removeItem(int $productId): void
    {
        $cart = session()->get('cart', []);
        unset($cart[$productId]);
        session()->put('cart', $cart);
        $this->dispatch('cart-updated', count($cart));
    }

    public function getCartProperty(): array
    {
        return session()->get('cart', []);
    }

    public function getTotalProperty(): float
    {
        return collect($this->cart)->sum('price');
    }

    public function refresh(): void
    {
        // Triggers re-render with updated session data
    }

    public function render()
    {
        return view('livewire.cart');
    }
}
