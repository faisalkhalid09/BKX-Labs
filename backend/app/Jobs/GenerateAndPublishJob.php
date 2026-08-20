<?php

namespace App\Jobs;

use App\Jobs\Publishers\FacebookPublisher;
use App\Jobs\Publishers\InstagramPublisher;
use App\Jobs\Publishers\LinkedInPublisher;
use App\Models\ScheduledPost;
use App\Services\GeminiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GenerateAndPublishJob implements ShouldQueue
{
    use Queueable;

    /**
     * Number of times the job may be attempted.
     * Keep at 1 to avoid double-posting on retry.
     */
    public int $tries = 1;

    /**
     * Timeout in seconds. Gemini image generation can be slow.
     */
    public int $timeout = 300;

    public function __construct(public readonly ScheduledPost $post)
    {
    }

    public function handle(GeminiService $gemini): void
    {
        $post = $this->post->fresh(); // Ensure we have latest state

        // Guard: skip if already processed (prevents double-runs from scheduler)
        if ($post->status !== 'pending') {
            Log::info('GenerateAndPublishJob: skipping, status is not pending.', ['id' => $post->id]);
            return;
        }

        try {
            // ─────────────────────────────────────────────────────
            // 1. Mark as processing
            // ─────────────────────────────────────────────────────
            $post->update(['status' => 'processing']);

            // ─────────────────────────────────────────────────────
            // 2. Generate platform-specific captions via Gemini
            // ─────────────────────────────────────────────────────
            Log::info('GenerateAndPublishJob: generating captions', ['id' => $post->id]);

            $captions = $gemini->generateSocialCaptions($post->content_prompt);

            $post->update([
                'facebook_caption'  => $captions['facebook'] ?? null,
                'instagram_caption' => $captions['instagram'] ?? null,
                'linkedin_caption'  => $captions['linkedin'] ?? null,
            ]);

            // ─────────────────────────────────────────────────────
            // 3. Generate image via Gemini (if a prompt was provided)
            // ─────────────────────────────────────────────────────
            $imagePath = null;
            if (!empty($post->image_prompt)) {
                Log::info('GenerateAndPublishJob: generating image', ['id' => $post->id]);
                $imagePath = $gemini->generateImage($post->image_prompt);
                $post->update(['image_path' => $imagePath]);
            }

            // ─────────────────────────────────────────────────────
            // 4. Mark as generated
            // ─────────────────────────────────────────────────────
            $post->update(['status' => 'generated']);

            // ─────────────────────────────────────────────────────
            // 5. Publish to each selected platform
            // ─────────────────────────────────────────────────────
            $platforms = $post->platforms ?? [];

            foreach ($platforms as $platform) {
                try {
                    match ($platform) {
                        'facebook'  => (new FacebookPublisher())->publish($post),
                        'instagram' => (new InstagramPublisher())->publish($post),
                        'linkedin'  => (new LinkedInPublisher())->publish($post),
                        default     => Log::warning("GenerateAndPublishJob: unknown platform '{$platform}'"),
                    };
                } catch (\Throwable $e) {
                    // Log individual platform failures but continue with others
                    Log::error("GenerateAndPublishJob: failed on platform '{$platform}'", [
                        'id'    => $post->id,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            // ─────────────────────────────────────────────────────
            // 6. Clean up temp image file
            // ─────────────────────────────────────────────────────
            if ($imagePath && Storage::disk('local')->exists($imagePath)) {
                Storage::disk('local')->delete($imagePath);
                Log::info('GenerateAndPublishJob: temp image deleted', ['path' => $imagePath]);
            }

            // ─────────────────────────────────────────────────────
            // 7. Mark as published
            // ─────────────────────────────────────────────────────
            $post->update([
                'status'       => 'published',
                'image_path'   => null, // Clear after deletion
                'published_at' => now(),
            ]);

            Log::info('GenerateAndPublishJob: completed', ['id' => $post->id]);

        } catch (\Throwable $e) {
            // Clean up image if it was saved before the failure
            if (!empty($post->image_path) && Storage::disk('local')->exists($post->image_path)) {
                Storage::disk('local')->delete($post->image_path);
            }

            $post->markFailed($e->getMessage());

            Log::error('GenerateAndPublishJob: failed', [
                'id'    => $post->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw so the job is marked as failed in the jobs table
            throw $e;
        }
    }
}
