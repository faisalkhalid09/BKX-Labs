<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductView extends Model
{
    public $timestamps = false;

    protected $fillable = ['product_id', 'date', 'count'];

    protected $casts = ['date' => 'date'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Atomically increment the view count for a given product on today's date.
     */
    public static function track(int $productId): void
    {
        static::upsert(
            [['product_id' => $productId, 'date' => today()->toDateString(), 'count' => 1]],
            ['product_id', 'date'],
            ['count' => \DB::raw('count + 1')]
        );
    }
}
