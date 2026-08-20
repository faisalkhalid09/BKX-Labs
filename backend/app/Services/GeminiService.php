<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GeminiService
{
    private string $apiKey;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    /**
     * Generate platform-specific social media captions from a content prompt.
     *
     * Returns an array with keys: 'facebook', 'instagram', 'linkedin'.
     * Each value is a ready-to-post caption string.
     *
     * @throws \RuntimeException on API failure or unexpected response format
     */
    public function generateSocialCaptions(string $contentPrompt): array
    {
        $systemInstruction = <<<SYSTEM
You are a professional social media copywriter. When given a topic or idea, you MUST respond
with a valid JSON object and nothing else (no markdown, no backticks, no explanation).

The JSON must have exactly these three keys:
- "facebook": A conversational, engaging caption (max 3 short paragraphs). Include 2-3 relevant hashtags at the end.
- "instagram": A punchy, visual caption (1-2 lines + 8-12 relevant hashtags on new lines).
- "linkedin": A professional, value-driven post (3-5 lines, first-person, no hashtags unless truly relevant).

All captions must be complete and ready to post. Do not include placeholder text.
SYSTEM;

        $payload = [
            'system_instruction' => [
                'parts' => [['text' => $systemInstruction]],
            ],
            'contents' => [
                [
                    'role'  => 'user',
                    'parts' => [['text' => $contentPrompt]],
                ],
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'temperature'      => 0.8,
                'maxOutputTokens'  => 2048,
            ],
        ];

        $response = Http::withoutVerifying()
            ->timeout(60)
            ->post("{$this->baseUrl}/models/gemini-2.0-flash:generateContent?key={$this->apiKey}", $payload);

        if ($response->failed()) {
            Log::error('Gemini text generation failed', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);
            throw new \RuntimeException('Gemini text generation failed: ' . $response->status());
        }

        $text = $response->json('candidates.0.content.parts.0.text');

        if (empty($text)) {
            throw new \RuntimeException('Gemini returned an empty text response.');
        }

        $captions = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE || !isset($captions['facebook'], $captions['instagram'], $captions['linkedin'])) {
            Log::error('Gemini returned malformed caption JSON', ['raw' => $text]);
            throw new \RuntimeException('Gemini returned malformed JSON for captions.');
        }

        return $captions;
    }

    /**
     * Generate an image from an image prompt using Gemini's native image generation.
     *
     * Saves the generated image to storage/app/temp/{uuid}.png and returns the path.
     *
     * @throws \RuntimeException on API failure or missing image in response
     */
    public function generateImage(string $imagePrompt): string
    {
        $payload = [
            'contents' => [
                [
                    'role'  => 'user',
                    'parts' => [['text' => $imagePrompt]],
                ],
            ],
            'generationConfig' => [
                'responseModalities' => ['TEXT', 'IMAGE'],
                'temperature'        => 1.0,
            ],
        ];

        $response = Http::withoutVerifying()
            ->timeout(120)
            ->post("{$this->baseUrl}/models/gemini-2.0-flash-preview-image-generation:generateContent?key={$this->apiKey}", $payload);

        if ($response->failed()) {
            Log::error('Gemini image generation failed', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);
            throw new \RuntimeException('Gemini image generation failed: ' . $response->status());
        }

        // Find the image part in the response
        $parts = $response->json('candidates.0.content.parts') ?? [];
        $imageData = null;
        $mimeType  = 'image/png';

        foreach ($parts as $part) {
            if (isset($part['inlineData']['data'])) {
                $imageData = $part['inlineData']['data'];
                $mimeType  = $part['inlineData']['mimeType'] ?? 'image/png';
                break;
            }
        }

        if (empty($imageData)) {
            throw new \RuntimeException('Gemini did not return an image in its response.');
        }

        // Determine file extension from mime type
        $ext  = match ($mimeType) {
            'image/jpeg' => 'jpg',
            'image/webp' => 'webp',
            default      => 'png',
        };

        $filename = Str::uuid() . '.' . $ext;
        $path     = 'temp/' . $filename;

        // Ensure temp directory exists
        Storage::disk('local')->makeDirectory('temp');

        // Save decoded image to storage/app/temp/
        Storage::disk('local')->put($path, base64_decode($imageData));

        Log::info('Gemini image saved', ['path' => $path]);

        return $path;
    }
}
