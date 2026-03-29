<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Setting;
use Carbon\Carbon;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\FreeBusyRequest;
use Google\Service\Calendar\FreeBusyRequestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    protected function getGoogleClient()
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');

        $refreshToken = Setting::get('google_calendar_refresh_token');

        if (!$refreshToken) {
            throw new \Exception('Google Calendar not authenticated. Please visit /api/google/auth/');
        }

        $client->refreshToken($refreshToken);

        return $client;
    }

    public function getAvailableSlots(Request $request)
    {
        $timezone = $request->query('timezone', 'Asia/Karachi');
        $startDate = Carbon::now($timezone)->startOfDay();
        $endDate = Carbon::now($timezone)->addDays(7)->endOfDay();

        $client = $this->getGoogleClient();
        $service = new Calendar($client);

        $freeBusyRequest = new FreeBusyRequest();
        $freeBusyRequest->setTimeMin($startDate->toRfc3339String());
        $freeBusyRequest->setTimeMax($endDate->toRfc3339String());
        $freeBusyRequest->setTimeZone($timezone);

        $item = new FreeBusyRequestItem();
        $item->setId(config('services.google.calendar_id', 'primary'));
        $freeBusyRequest->setItems([$item]);

        $query = $service->freebusy->query($freeBusyRequest);
        $busyTimes = $query->getCalendars()[config('services.google.calendar_id', 'primary')]->getBusy();

        $availableSlots = [];
        
        // Define working hours (10:00 AM to 7:30 PM PKT)
        $startHour = 10;
        $startMinute = 0;
        $endHour = 19;
        $endMinute = 30;
        $duration = 15; // minutes
        $buffer = 60;   // minutes

        for ($i = 0; $i < 7; $i++) {
            $day = Carbon::now($timezone)->addDays($i);
            
            // Skip weekends
            if ($day->isWeekend()) continue;

            $slotStart = $day->copy()->setTime($startHour, $startMinute);
            $dayEnd = $day->copy()->setTime($endHour, $endMinute);

            while ($slotStart->copy()->addMinutes($duration)->lte($dayEnd)) {
                $slotEnd = $slotStart->copy()->addMinutes($duration);
                
                // Do not show past slots (give 1 hour lead time)
                if ($slotStart->lte(Carbon::now($timezone)->addHour())) {
                    $slotStart->addMinutes($duration + $buffer);
                    continue;
                }

                $isBusy = false;
                foreach ($busyTimes as $busy) {
                    $busyStart = Carbon::parse($busy->getStart());
                    $busyEnd = Carbon::parse($busy->getEnd());

                    // Check for overlap
                    if ($slotStart->lt($busyEnd) && $slotEnd->gt($busyStart)) {
                        $isBusy = true;
                        break;
                    }
                }

                if (!$isBusy) {
                    $availableSlots[$day->format('Y-m-d')][] = [
                        'start' => $slotStart->toIso8601String(),
                        'end' => $slotEnd->toIso8601String(),
                        'time_label' => $slotStart->format('h:i A'),
                    ];
                }

                $slotStart->addMinutes($duration + $buffer); 
            }
        }

        return response()->json([
            'slots' => $availableSlots,
            'timezone' => $timezone
        ]);
    }

    public function createBooking(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'start_time' => 'required|date',
            'codebase_state' => 'nullable|string',
        ]);

        $client = $this->getGoogleClient();
        $service = new Calendar($client);

        $startTime = Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addMinutes(30);

        $event = new Event([
            'summary' => 'Strategy Call: ' . $request->first_name . ' ' . $request->last_name,
            'description' => "Lead Email: {$request->email}\nCodebase State: " . ($request->codebase_state ?? 'N/A'),
            'start' => [
                'dateTime' => $startTime->toRfc3339String(),
                'timeZone' => config('app.timezone', 'Asia/Karachi'),
            ],
            'end' => [
                'dateTime' => $endTime->toRfc3339String(),
                'timeZone' => config('app.timezone', 'Asia/Karachi'),
            ],
            'attendees' => [
                ['email' => $request->email],
            ],
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => Str::uuid()->toString(),
                    'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
                ],
            ],
        ]);

        $optParams = ['conferenceDataVersion' => 1];
        $createdEvent = $service->events->insert(config('services.google.calendar_id', 'primary'), $event, $optParams);

        // Save lead to DB
        Lead::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'meeting_time' => $startTime,
            'codebase_state' => $request->codebase_state,
            'google_event_id' => $createdEvent->getId(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Meeting booked successfully!',
            'meet_link' => $createdEvent->getHangoutLink(),
            'event_id' => $createdEvent->getId(),
        ]);
    }
}
