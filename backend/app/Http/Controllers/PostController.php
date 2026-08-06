<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    /**
     * GET /api/posts
     * Returns all published posts for the blog listing page.
     * Does NOT return body (heavy) — only listing data.
     */
    public function index(): JsonResponse
    {
        $posts = Post::published()
            ->select([
                'id',
                'title',
                'slug',
                'excerpt',
                'cover_image',
                'reading_time_mins',
                'published_at',
            ])
            ->get()
            ->map(function ($post) {
                return [
                    'id'               => $post->id,
                    'title'            => $post->title,
                    'slug'             => $post->slug,
                    'excerpt'          => $post->excerpt,
                    'cover_image'      => $post->cover_image
                        ? asset('storage/' . $post->cover_image)
                        : null,
                    'reading_time_mins' => $post->reading_time_mins,
                    'published_at'     => $post->published_at?->toDateString(),
                ];
            });

        return response()->json([
            'data' => $posts,
        ]);
    }

    /**
     * GET /api/posts/{slug}
     * Returns a single published post with full body for the post page.
     */
    public function show(string $slug): JsonResponse
    {
        $post = Post::published()
            ->where('slug', $slug)
            ->select([
                'id',
                'title',
                'slug',
                'excerpt',
                'body',
                'meta_title',
                'meta_description',
                'cover_image',
                'reading_time_mins',
                'published_at',
            ])
            ->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found.'], 404);
        }

        return response()->json([
            'data' => [
                'id'               => $post->id,
                'title'            => $post->title,
                'slug'             => $post->slug,
                'excerpt'          => $post->excerpt,
                'body'             => $post->body,
                'meta_title'       => $post->meta_title ?: $post->title,
                'meta_description' => $post->meta_description ?: $post->excerpt,
                'cover_image'      => $post->cover_image
                    ? asset('storage/' . $post->cover_image)
                    : null,
                'reading_time_mins' => $post->reading_time_mins,
                'published_at'     => $post->published_at?->toDateString(),
            ],
        ]);
    }
}
