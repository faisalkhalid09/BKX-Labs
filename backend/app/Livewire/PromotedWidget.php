<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;

class PromotedWidget extends Component
{
    public function render()
    {
        // Algorithm: Fetches exactly 1 promoted, active product at random on each page load.
        $product = Product::where('is_promoted', true)
            ->where('is_active', true)
            ->inRandomOrder()
            ->first();

        return view('livewire.promoted-widget', [
            'product' => $product,
        ]);
    }
}
