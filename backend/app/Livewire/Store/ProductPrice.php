<?php

namespace App\Livewire\Store;

use App\Models\Product;
use Livewire\Component;

class ProductPrice extends Component
{
    public Product $product;

    public function render()
    {
        // Ensure price is always the absolute latest from the DB during the poll
        $this->product->refresh();

        return view('livewire.store.product-price');
    }
}
