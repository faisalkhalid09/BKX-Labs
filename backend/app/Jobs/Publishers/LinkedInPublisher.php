<?php

namespace App\Jobs\Publishers;

use App\Models\ScheduledPost;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class LinkedInPublisher
{
    /**
     * Publish a post to a LinkedIn Organization page via the LinkedIn Marketing API.
     *
     * Required .env keys:
     *   LINKEDIN_ACCESS_TOKEN      - OAuth 2.0 access token with r_liteprofile, w_member_social scopes
     *   LINKEDIN_ORGANIZATION_URN  - Your org URN e.g. "urn:li:organization:12345678"
     *
     * To get these:
     *   1. Create a LinkedIn Developer App at https://www.linkedin.com/developers/apps
     *   2. Request the "Share on LinkedIn" and "Advertising API" products.
     *   3. Generate a 60-day OAuth token via the OAuth 2.0 flow (3-legged).
     *      You may want to use a refresh-token flow for long-lived access.
     *   4. Find your Organization URN: GET https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=YourCompany
     *
     * NOTE: LinkedIn access tokens expire in 60 days. You'll need to implement
     * a refresh token flow or rotate them manually.
     *
     * @throws \RuntimeException on API failure
     */
    public function publish(ScheduledPost $post): void
    {
        $accessToken      = config('services.linkedin.access_token');
        $organizationUrn  = config('services.linkedin.organization_urn');

        // TODO: Remove this guard once you have credentials set up
        if (empty($accessToken) || empty($organizationUrn)) {
            Log::warning('LinkedInPublisher: credentials not configured. Skipping.');
            return;
        }

        $caption = $post->linkedin_caption ?? $post->content_prompt;

        // Build the UGC (User Generated Content) post payload
        $payload = [
            'author'          => $organizationUrn,
            'lifecycleState'  => 'PUBLISHED',
            'specificContent' => [
                'com.linkedin.ugc.ShareContent' => [
                    'shareCommentary' => [
                        'text' => $caption,
                    ],
                    'shareMediaCategory' => 'NONE',
                ],
            ],
            'visibility' => [
                'com.linkedin.ugc.MemberNetworkVisibility' => 'PUBLIC',
            ],
        ];

        // If an image exists, upload it first and attach it
        // TODO: Implement image upload to LinkedIn via the Assets API if needed.
        // LinkedIn image upload requires a separate multi-step process (register → upload binary → post).
        // For now, posts text only. Remove the 'NONE' category and add image URN when ready.
        if (!empty($post->image_path)) {
            Log::info('LinkedInPublisher: image upload not yet implemented — posting text only.');
        }

        $response = Http::withToken($accessToken)
            ->withHeaders([
                'X-Restli-Protocol-Version' => '2.0.0',
                'Content-Type'              => 'application/json',
            ])
            ->post('https://api.linkedin.com/v2/ugcPosts', $payload);

        if ($response->failed()) {
            $error = $response->json('message', $response->body());
            Log::error('LinkedInPublisher: API error', ['error' => $error, 'status' => $response->status()]);
            throw new \RuntimeException("LinkedIn publish failed: {$error}");
        }

        Log::info('LinkedInPublisher: published successfully', [
            'post_id'     => $post->id,
            'linkedin_id' => $response->header('x-restli-id'),
        ]);
    }
}
