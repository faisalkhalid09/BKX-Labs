<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;

class PromotedWidget extends Component
{
    public function render()
    {
        // Algorithm: Fetches exactly 1 promoted product at random. 
        // We prioritize active ones, but allow any explicitly promoted product to show up to help the Admin verify.
        $product = Product::where('is_promoted', true)
            ->orderBy('is_active', 'desc')
            ->inRandomOrder()
            ->first();

        return view('livewire.promoted-widget', [
            'product' => $product,
        ]);
    }
}
