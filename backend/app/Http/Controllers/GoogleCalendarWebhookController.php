<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Setting;
use Google\Client;
use Google\Service\Calendar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GoogleCalendarWebhookController extends Controller
{
    /**
     * Handle the incoming Google Calendar webhook.
     */
    public function handle(Request $request)
    {
        // 1. Acknowledge the request immediately
        
        // 2. Verify the request
        $channelToken = $request->header('X-Goog-Channel-Token');
        if ($channelToken !== config('services.google.webhook_token')) {
            Log::warning('Unauthorized Google Calendar Webhook attempt.', [
                'headers' => $request->headers->all(),
                'ip' => $request->ip()
            ]);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // 3. Fetch the latest events from Google Calendar API using OAuth 2.0
        try {
            $client = $this->getGoogleClient();
            $service = new Calendar($client);
            $calendarId = config('services.google.calendar_id');

            $optParams = [
                'maxResults' => 10,
                'orderBy' => 'startTime',
                'singleEvents' => true,
                'timeMin' => Carbon::now()->subMinutes(5)->toRfc3339String(),
            ];

            $results = $service->events->listEvents($calendarId, $optParams);
            $events = $results->getItems();

            if (empty($events)) {
                return response()->json(['message' => 'No recent events found'], 200);
            }

            foreach ($events as $event) {
                $this->processEvent($event);
            }

            return response()->json(['message' => 'Webhook processed successfully'], 200);

        } catch (\Exception $e) {
            Log::error('Google Calendar Webhook Error: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            return response()->json(['error' => 'Processing failed'], 200);
        }
    }

    /**
     * Initialize the Google API Client using stored OAuth Refresh Token.
     */
    private function getGoogleClient()
    {
        $refreshToken = Setting::get('google_calendar_refresh_token');

        if (!$refreshToken) {
            throw new \Exception('Google Calendar Refresh Token is missing. Please authenticate via the auth route.');
        }

        $client = new Client();
        $client->setApplicationName('BKX Labs Lead Capture');
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setAccessType('offline');
        
        $client->refreshToken($refreshToken);
        
        // If the access token has expired, refreshing it here will populate the internal token state
        if ($client->isAccessTokenExpired()) {
            $newToken = $client->fetchAccessTokenWithRefreshToken($refreshToken);
            
            // If the refresh token itself has changed (not usual but possible), update it
            if (isset($newToken['refresh_token'])) {
                Setting::set('google_calendar_refresh_token', $newToken['refresh_token']);
            }
        }

        return $client;
    }

    /**
     * Parse and Store the Lead Data.
     */
    private function processEvent($event)
    {
        $eventId = $event->id;
        $attendees = $event->getAttendees();
        $description = $event->description ?? '';
        
        if (empty($attendees)) {
            return;
        }

        $leadAttendee = null;
        foreach ($attendees as $attendee) {
            if (!$attendee->self) {
                $leadAttendee = $attendee;
                break;
            }
        }

        if (!$leadAttendee) {
            return;
        }

        $email = $leadAttendee->email;
        $fullName = $leadAttendee->displayName ?? 'Valued Lead';
        
        $nameParts = explode(' ', $fullName, 2);
        $firstName = $nameParts[0];
        $lastName = $nameParts[1] ?? '';

        $meetingTime = Carbon::parse($event->start->dateTime ?? $event->start->date);
        $codebaseState = trim($description);

        Lead::updateOrCreate(
            ['google_event_id' => $eventId],
            [
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'meeting_time' => $meetingTime,
                'codebase_state' => $codebaseState,
            ]
        );
    }
}
