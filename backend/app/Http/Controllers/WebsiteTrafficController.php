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
            // Use dispatch to track after response for better performance
            dispatch(function () use ($validated) {
                try {
                    WebsitePageView::track($validated['page'] ?? 'home');
                } catch (\Throwable $e) {
                    \Log::error('Failed to track website page view: ' . $e->getMessage());
                }
            })->afterResponse();

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
