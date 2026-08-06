<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'meta_title',
        'meta_description',
        'cover_image',
        'reading_time_mins',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Auto-generate slug and reading time before saving.
     */
    protected static function booted(): void
    {
        static::saving(function (Post $post) {
            // Auto-generate slug from title if not set
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }

            // Auto-calculate reading time from body (avg 200 words per minute)
            if (!empty($post->body)) {
                $wordCount = str_word_count(strip_tags($post->body));
                $post->reading_time_mins = (int) max(1, ceil($wordCount / 200));
            }

            // Set published_at timestamp when first published
            if ($post->is_published && is_null($post->published_at)) {
                $post->published_at = now();
            }

            // Clear published_at if unpublished
            if (!$post->is_published) {
                $post->published_at = null;
            }
        });
    }

    /**
     * Scope: only published posts, newest first.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                     ->orderBy('published_at', 'desc');
    }
}
