<?php

namespace App\Jobs\Publishers;

use App\Models\ScheduledPost;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FacebookPublisher
{
    /**
     * Publish a post to a Facebook Page using the Graph API.
     *
     * Required .env keys:
     *   FACEBOOK_PAGE_ID         - Your Facebook Page ID
     *   FACEBOOK_PAGE_ACCESS_TOKEN - A never-expiring Page Access Token
     *
     * To get these:
     *   1. Go to https://developers.facebook.com and create an App (Business type).
     *   2. Add the "Pages" product.
     *   3. Generate a long-lived Page Access Token via Graph API Explorer.
     *   4. Paste the Page ID and token into your .env.
     *
     * @throws \RuntimeException on API failure
     */
    public function publish(ScheduledPost $post): void
    {
        $pageId    = config('services.facebook.page_id');
        $pageToken = config('services.facebook.page_access_token');

        // TODO: Remove this guard once you have credentials set up
        if (empty($pageId) || empty($pageToken)) {
            Log::warning('FacebookPublisher: credentials not configured. Skipping.');
            return;
        }

        $caption = $post->facebook_caption ?? $post->content_prompt;

        // If we have an image, use the photos endpoint; otherwise use the feed endpoint
        if (!empty($post->image_path) && Storage::disk('local')->exists($post->image_path)) {
            $absolutePath = Storage::disk('local')->path($post->image_path);

            $response = Http::attach(
                'source',
                file_get_contents($absolutePath),
                basename($absolutePath)
            )->post("https://graph.facebook.com/v19.0/{$pageId}/photos", [
                'message'      => $caption,
                'access_token' => $pageToken,
            ]);
        } else {
            $response = Http::post("https://graph.facebook.com/v19.0/{$pageId}/feed", [
                'message'      => $caption,
                'access_token' => $pageToken,
            ]);
        }

        if ($response->failed() || isset($response->json()['error'])) {
            $error = $response->json('error.message', $response->body());
            Log::error('FacebookPublisher: API error', ['error' => $error]);
            throw new \RuntimeException("Facebook publish failed: {$error}");
        }

        Log::info('FacebookPublisher: published successfully', [
            'post_id'   => $post->id,
            'fb_id'     => $response->json('id'),
        ]);
    }
}
