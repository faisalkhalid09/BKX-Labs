<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'price',
        'category',
        'private_file_path',
        'thumbnail_path',
        'images',
        'is_active',
    ];

    protected $casts = [
        'price'     => 'decimal:2',
        'is_active' => 'boolean',
        'images'    => 'array',
    ];

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });

        static::deleting(function (Product $product) {
            if ($product->thumbnail_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->thumbnail_path);
            }
            if (!empty($product->images)) {
                foreach ($product->images as $image) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($image);
                }
            }
            if ($product->private_file_path) {
                \Illuminate\Support\Facades\Storage::disk('private')->delete($product->private_file_path);
            }
        });
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function productViews(): HasMany
    {
        return $this->hasMany(ProductView::class);
    }

    public function getThumbnailUrlAttribute(): string
    {
        if ($this->thumbnail_path) {
            return asset('storage/thumbnails/' . $this->thumbnail_path);
        }
        return asset('images/store/default-product.png');
    }

    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }
}
