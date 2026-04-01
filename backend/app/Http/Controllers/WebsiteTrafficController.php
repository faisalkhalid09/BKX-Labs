<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WebsitePageView;

class WebsiteTrafficController extends Controller
{
    /**
     * Track a page view from the main website.
     */
    public function track(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string|max:100',
        ]);

        try {
            // Write direct to the new telemetry db (approx ~1ms latency) immediately 
            // bypassing the unstable afterResponse queue hooks.
            \App\Models\WebsiteVisitor::create([
                'page' => $validated['page'] ?? 'home',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
