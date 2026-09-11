<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PostObserver
{
    /**
     * Triggered after a Post is created or updated.
     *
     * When a post is saved with is_published = true, we fire a rebuild
     * of the frontend SSG so the new post's static HTML is generated
     * and served to bots instantly without any manual intervention.
     */
    public function saved(Post $post): void
    {
        if (!$post->is_published) {
            return;
        }

        $this->triggerRebuild($post->slug, 'PostObserver@saved');
    }

    /**
     * Triggered when a post is deleted.
     * Rebuilds so the static HTML for the deleted post is removed.
     */
    public function deleted(Post $post): void
    {
        $this->triggerRebuild($post->slug, 'PostObserver@deleted');
    }

    /**
     * Fire the rebuild webhook to the local API endpoint.
     */
    protected function triggerRebuild(string $slug, string $triggeredBy): void
    {
        $secret = env('REBUILD_SECRET');

        if (empty($secret)) {
            Log::warning('PostObserver: REBUILD_SECRET is not set. Skipping rebuild trigger.');
            return;
        }

        try {
            // We call our own API endpoint — the request goes through loopback (127.0.0.1)
            // so no external network call leaves the server
            $response = Http::timeout(5)
                ->withHeaders([
                    'X-Rebuild-Token'   => $secret,
                    'X-Triggered-By'    => $triggeredBy . ':post=' . $slug,
                    'Accept'            => 'application/json',
                ])
                ->post('http://127.0.0.1/api/internal/rebuild');

            if ($response->successful()) {
                Log::info("PostObserver: Rebuild triggered for post [{$slug}].");
            } else {
                Log::warning("PostObserver: Rebuild request returned HTTP {$response->status()} for post [{$slug}].");
            }
        } catch (\Exception $e) {
            // Never let a rebuild failure break the save operation
            Log::error("PostObserver: Failed to trigger rebuild for post [{$slug}]: {$e->getMessage()}");
        }
    }
}
