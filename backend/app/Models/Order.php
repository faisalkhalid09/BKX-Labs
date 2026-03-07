<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'status',
        'amount',
        'stripe_payment_intent_id',
        'download_expires_at',
    ];

    protected $casts = [
        'amount'               => 'decimal:2',
        'download_expires_at'  => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    public function canDownload(): bool
    {
        return $this->isPaid() &&
               $this->download_expires_at &&
               $this->download_expires_at->isFuture();
    }
}
