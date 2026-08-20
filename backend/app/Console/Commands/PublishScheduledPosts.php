<?php

namespace App\Console\Commands;

use App\Jobs\GenerateAndPublishJob;
use App\Models\ScheduledPost;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PublishScheduledPosts extends Command
{
    protected $signature   = 'posts:publish-scheduled';
    protected $description = 'Dispatch GenerateAndPublishJob for any scheduled posts that are due.';

    public function handle(): void
    {
        $due = ScheduledPost::due()->get();

        if ($due->isEmpty()) {
            $this->info('No scheduled posts are due.');
            return;
        }

        foreach ($due as $post) {
            // Mark as processing immediately to prevent double-dispatch
            // if the scheduler fires again before the job completes
            $post->update(['status' => 'processing']);

            GenerateAndPublishJob::dispatch($post);

            $this->info("Dispatched job for ScheduledPost #{$post->id}");
            Log::info('PublishScheduledPosts: dispatched', ['id' => $post->id]);
        }

        $this->info("Dispatched {$due->count()} job(s).");
    }
}
