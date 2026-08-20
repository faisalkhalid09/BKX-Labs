<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledPost extends Model
{
    protected $fillable = [
        'content_prompt',
        'image_prompt',
        'platforms',
        'scheduled_at',
        'status',
        'facebook_caption',
        'instagram_caption',
        'linkedin_caption',
        'image_path',
        'error_message',
        'published_at',
    ];

    protected $casts = [
        'platforms'    => 'array',
        'scheduled_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    /**
     * Returns true if the post is ready to be dispatched.
     * A null scheduled_at means "publish immediately".
     */
    public function isDue(): bool
    {
        return is_null($this->scheduled_at) || $this->scheduled_at->isPast();
    }

    /**
     * Scope: all posts that are pending and ready to fire.
     */
    public function scopeDue($query)
    {
        return $query->where('status', 'pending')
                     ->where(function ($q) {
                         $q->whereNull('scheduled_at')
                           ->orWhere('scheduled_at', '<=', now());
                     });
    }

    /**
     * Mark this post as failed and store the reason.
     */
    public function markFailed(string $reason): void
    {
        $this->update([
            'status'        => 'failed',
            'error_message' => $reason,
        ]);
    }
}
