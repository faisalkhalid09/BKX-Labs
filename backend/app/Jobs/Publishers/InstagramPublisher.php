<?php

namespace App\Jobs\Publishers;

use App\Models\ScheduledPost;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class InstagramPublisher
{
    /**
     * Publish a post to an Instagram Business account via the Facebook Graph API.
     *
     * Instagram publishing requires a 2-step process:
     *   1. Upload media and get a "creation ID"
     *   2. Publish the creation ID
     *
     * Required .env keys:
     *   INSTAGRAM_BUSINESS_ACCOUNT_ID - Your IG Business Account ID
     *   INSTAGRAM_ACCESS_TOKEN        - A long-lived User Access Token with instagram_basic,
     *                                   instagram_content_publish, pages_read_engagement scopes
     *
     * To get these:
     *   1. Connect your Instagram Business account to a Facebook Page.
     *   2. Use Graph API Explorer to get a long-lived token with the required scopes.
     *   3. Find your IG Business Account ID: GET /me/accounts → nested ig_id field.
     *
     * NOTE: Instagram requires a publicly accessible image URL — not a local file path.
     * You will need to temporarily upload the image to a public URL (e.g. your storage disk
     * set to public, or an S3 bucket) before calling this publisher.
     *
     * @throws \RuntimeException on API failure
     */
    public function publish(ScheduledPost $post): void
    {
        $igAccountId  = config('services.instagram.business_account_id');
        $accessToken  = config('services.instagram.access_token');

        // TODO: Remove this guard once you have credentials set up
        if (empty($igAccountId) || empty($accessToken)) {
            Log::warning('InstagramPublisher: credentials not configured. Skipping.');
            return;
        }

        $caption = $post->instagram_caption ?? $post->content_prompt;

        // TODO: Replace this with your actual public image URL logic
        // Instagram requires a publicly reachable URL for the image.
        // Example: upload to S3 and get a signed URL, or move to public disk first.
        $imageUrl = null;
        if (!empty($post->image_path)) {
            // $imageUrl = Storage::disk('s3')->url($post->image_path); // Example
            Log::warning('InstagramPublisher: image URL generation not implemented. Posting text-only.');
        }

        // Step 1: Create a media container
        $containerPayload = [
            'caption'      => $caption,
            'access_token' => $accessToken,
        ];

        if ($imageUrl) {
            $containerPayload['image_url'] = $imageUrl;
            $containerPayload['media_type'] = 'IMAGE';
        } else {
            // Instagram doesn't support text-only posts via API without an image.
            // Skipping if no image is available.
            Log::info('InstagramPublisher: skipping — Instagram requires an image for API posts.');
            return;
        }

        $containerResponse = Http::post(
            "https://graph.facebook.com/v19.0/{$igAccountId}/media",
            $containerPayload
        );

        if ($containerResponse->failed() || isset($containerResponse->json()['error'])) {
            $error = $containerResponse->json('error.message', $containerResponse->body());
            throw new \RuntimeException("Instagram container creation failed: {$error}");
        }

        $creationId = $containerResponse->json('id');

        // Step 2: Publish the container
        $publishResponse = Http::post(
            "https://graph.facebook.com/v19.0/{$igAccountId}/media_publish",
            [
                'creation_id'  => $creationId,
                'access_token' => $accessToken,
            ]
        );

        if ($publishResponse->failed() || isset($publishResponse->json()['error'])) {
            $error = $publishResponse->json('error.message', $publishResponse->body());
            throw new \RuntimeException("Instagram publish failed: {$error}");
        }

        Log::info('InstagramPublisher: published successfully', [
            'post_id' => $post->id,
            'ig_id'   => $publishResponse->json('id'),
        ]);
    }
}
