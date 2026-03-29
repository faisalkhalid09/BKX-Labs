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
        $summary = $event->summary ?? '';
        $meetLink = $event->getHangoutLink();
        
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

        // Prefer attendee name, then summary name, and only then fallback placeholder.
        $fullName = trim($leadAttendee->displayName ?? '');
        if ($fullName === '' && str_starts_with($summary, 'Strategy Call:')) {
            $fullName = trim(substr($summary, strlen('Strategy Call:')));
        }
        if (
            $fullName === ''
            || strtolower($fullName) === 'valued lead'
            || strtolower($fullName) === 'guest'
        ) {
            $localPart = strtolower((string) strtok($email, '@'));
            $tokens = preg_split('/[._\-]+/', $localPart);
            $tokens = array_values(array_filter($tokens, static fn ($token) => $token !== ''));
            if (!empty($tokens)) {
                $first = ucfirst($tokens[0]);
                $last = isset($tokens[1]) ? ucfirst($tokens[1]) : '';
                $fullName = trim($first . ' ' . $last);
            }
        }
        if ($fullName === '') {
            $fullName = 'Valued Lead';
        }

        $nameParts = preg_split('/\s+/', $fullName, 2);
        $firstName = $nameParts[0] ?? 'Valued';
        $lastName = $nameParts[1] ?? 'Lead';

        $meetingTime = Carbon::parse($event->start->dateTime ?? $event->start->date);
        $websiteUrl = null;
        $codebaseState = null;

        if (preg_match('/Website\/Codebase State:\s*(.*)/i', $description, $websiteMatch) === 1) {
            $websiteUrl = trim($websiteMatch[1]);
        }

        if (preg_match('/Codebase Notes:\s*(.*)/i', $description, $codebaseMatch) === 1) {
            $codebaseState = trim($codebaseMatch[1]);
        }

        $lead = Lead::firstOrNew(['google_event_id' => $eventId]);
        $lead->email = $email;
        $lead->meeting_time = $meetingTime;

        // Do not overwrite existing real names with fallback values from attendee metadata.
        if (blank($lead->first_name) || in_array(strtolower((string) $lead->first_name), ['valued'], true)) {
            $lead->first_name = $firstName;
        }
        if (blank($lead->last_name) || in_array(strtolower((string) $lead->last_name), ['lead'], true)) {
            $lead->last_name = $lastName;
        }

        if (!blank($websiteUrl) && blank($lead->website_url)) {
            $lead->website_url = $websiteUrl;
        }
        if (!blank($codebaseState) && blank($lead->codebase_state)) {
            $lead->codebase_state = $codebaseState;
        }
        if (!blank($meetLink)) {
            $lead->meet_link = $meetLink;
        }

        $lead->save();
    }
}
