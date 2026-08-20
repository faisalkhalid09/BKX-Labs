<?php

namespace App\Observers;

use App\Jobs\GenerateAndPublishJob;
use App\Models\ScheduledPost;
use Illuminate\Support\Facades\Log;

class ScheduledPostObserver
{
    /**
     * After a ScheduledPost is created, check if it should fire immediately.
     * "Immediately" means scheduled_at is null (the user toggled "Publish Now").
     *
     * For future-dated posts, the scheduler command picks them up at the right time.
     */
    public function created(ScheduledPost $post): void
    {
        if (is_null($post->scheduled_at)) {
            Log::info('ScheduledPostObserver: dispatching immediate job', ['id' => $post->id]);
            GenerateAndPublishJob::dispatch($post);
        }
    }
}
