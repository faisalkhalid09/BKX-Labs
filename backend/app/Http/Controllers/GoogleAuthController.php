<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Google\Client;
use Google\Service\Calendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google's OAuth 2.0 consent screen.
     */
    public function redirectToGoogle()
    {
        $client = $this->getGoogleClient();
        
        // Force approval prompt to ensure we receive a refresh token
        $authUrl = $client->createAuthUrl();

        return redirect()->away($authUrl);
    }

    /**
     * Handle the Google OAuth callback.
     */
    public function handleGoogleCallback(Request $request)
    {
        if ($request->has('error')) {
            return response()->json(['error' => 'Authentication failed: ' . $request->get('error')], 400);
        }

        if (!$request->has('code')) {
            return response()->json(['error' => 'No authorization code provided'], 400);
        }

        try {
            $client = $this->getGoogleClient();
            $token = $client->fetchAccessTokenWithAuthCode($request->get('code'));

            if (isset($token['error'])) {
                throw new \Exception('Error fetching access token: ' . $token['error_description']);
            }

            // We MUST have a refresh token to perform background tasks
            if (isset($token['refresh_token'])) {
                Setting::set('google_calendar_refresh_token', $token['refresh_token']);
                
                return response()->json([
                    'message' => 'Successfully authenticated with Google!',
                    'refresh_token_stored' => true,
                    'status' => 'success'
                ]);
            } else {
                return response()->json([
                    'message' => 'Authenticated, but no refresh token received. Try revoking access and authenticating again.',
                    'refresh_token_stored' => false,
                    'status' => 'warning'
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Google Auth Callback Error: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred during authentication.'], 500);
        }
    }

    /**
     * Initialize the Google API Client for OAuth.
     */
    private function getGoogleClient()
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setRedirectUri(config('services.google.redirect'));
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');
        $client->setIncludeGrantedScopes(true);
        $client->setScopes([
            Calendar::CALENDAR,
            Calendar::CALENDAR_EVENTS,
            Calendar::CALENDAR_READONLY,
        ]);

        return $client;
    }
}
