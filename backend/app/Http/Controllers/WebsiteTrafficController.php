<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WebsiteVisitor;

class WebsiteTrafficController extends Controller
{
    /**
     * Track a page view from the main website.
     * Returns 204 immediately — DB write happens after response is sent.
     */
    public function track(Request $request)
    {
        // Capture data before response is sent
        $page      = $request->input('page', 'home');
        $page      = substr(preg_replace('/[^a-z0-9\-_\/]/', '', strtolower($page)), 0, 100) ?: 'home';
        $ip        = $request->ip();
        $userAgent = $request->userAgent();

        // Write to DB AFTER the HTTP response is sent (zero latency for client)
        app()->terminating(function () use ($page, $ip, $userAgent) {
            try {
                WebsiteVisitor::create([
                    'page'       => $page,
                    'ip_address' => $ip,
                    'user_agent' => $userAgent,
                ]);
            } catch (\Exception) {
                // Silently swallow — analytics write never affects users
            }
        });

        // 204 No Content — sendBeacon doesn't need a response body
        return response()->noContent();
    }
}
