<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

/**
 * Cache full HTML responses for guest store pages for 60 seconds.
 * This means 10k concurrent users hitting /store will only generate
 * 1 PHP/DB request per minute — everyone else gets the cached HTML.
 * 
 * Skips caching for: authenticated users, POST requests, pages with session flash.
 */
class StoreResponseCache
{
    public function handle(Request $request, Closure $next): Response
    {
        // Only cache GET requests for guests — authenticated users see personalised content
        if ($request->method() !== 'GET' || auth()->check()) {
            return $next($request);
        }

        // Skip if there's a session flash message (redirect responses, errors, etc.)
        if (session()->has('error') || session()->has('success') || session()->has('info')) {
            return $next($request);
        }

        // Build a cache key from the full URL (includes query params like ?tab=privacy)
        $key = 'store_page_' . md5($request->fullUrl());

        if (Cache::has($key)) {
            $cached = Cache::get($key);
            return response($cached['content'], 200)
                ->header('Content-Type', 'text/html; charset=UTF-8')
                ->header('X-Cache', 'HIT');
        }

        $response = $next($request);

        // Only cache 200 OK HTML responses
        if ($response->getStatusCode() === 200 &&
            str_contains($response->headers->get('Content-Type', ''), 'text/html')) {
            Cache::put($key, [
                'content' => $response->getContent(),
            ], 60); // 60 seconds TTL
        }

        $response->headers->set('X-Cache', 'MISS');

        return $response;
    }
}
