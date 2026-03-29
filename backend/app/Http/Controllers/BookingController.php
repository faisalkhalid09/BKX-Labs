<?php

namespace App\Http\Controllers;

use App\Mail\BookingEmailVerificationCode;
use App\Models\BookingEmailVerification;
use App\Models\Lead;
use App\Models\Setting;
use Carbon\Carbon;
use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\FreeBusyRequest;
use Google\Service\Calendar\FreeBusyRequestItem;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function sendEmailVerificationCode(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $email = strtolower(trim($validated['email']));
        $now = now();

        $verification = BookingEmailVerification::firstOrNew(['email' => $email]);
        if ($verification->last_sent_at && $verification->last_sent_at->gt($now->copy()->subSeconds(45))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please wait a few seconds before requesting another code.',
            ], 429);
        }

        $code = (string) random_int(100000, 999999);

        $verification->fill([
            'code_hash' => Hash::make($code),
            'code_expires_at' => $now->copy()->addMinutes(10),
            'verified_at' => null,
            'session_token_hash' => null,
            'session_expires_at' => null,
            'attempts' => 0,
            'last_sent_at' => $now,
        ]);
        $verification->save();

        Mail::to($email)->send(new BookingEmailVerificationCode($code));

        return response()->json([
            'status' => 'success',
            'message' => 'Verification code sent to your email.',
        ]);
    }

    public function verifyEmailCode(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'code' => 'required|digits:6',
        ]);

        $email = strtolower(trim($validated['email']));
        $code = trim($validated['code']);
        $verification = BookingEmailVerification::where('email', $email)->first();

        if (! $verification || ! $verification->code_hash || ! $verification->code_expires_at) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please request a verification code first.',
            ], 422);
        }

        if ($verification->code_expires_at->isPast()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Verification code expired. Please request a new code.',
            ], 422);
        }

        if ($verification->attempts >= 5) {
            return response()->json([
                'status' => 'error',
                'message' => 'Too many failed attempts. Request a new code.',
            ], 429);
        }

        if (! Hash::check($code, $verification->code_hash)) {
            $verification->increment('attempts');

            return response()->json([
                'status' => 'error',
                'message' => 'Invalid verification code.',
            ], 422);
        }

        $sessionToken = Str::random(64);
        $verification->fill([
            'verified_at' => now(),
            'session_token_hash' => hash('sha256', $sessionToken),
            'session_expires_at' => now()->addMinutes(30),
            'code_hash' => null,
            'code_expires_at' => null,
            'attempts' => 0,
        ]);
        $verification->save();

        $secureCookies = config('session.secure_cookie', app()->environment('production'));

        return response()->json([
            'status' => 'success',
            'message' => 'Email verified successfully.',
        ])->cookie(
            'bkx_booking_email_session',
            $sessionToken,
            30,
            '/',
            null,
            $secureCookies,
            true,
            false,
            'Strict'
        );
    }

    public function getBookingSuccess(Request $request, string $token)
    {
        $cookieToken = (string) $request->cookie('bkx_booking_access', '');
        if ($cookieToken === '') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized success page access.',
            ], 403);
        }

        $lead = Lead::where('success_access_token_hash', hash('sha256', $token))
            ->where('success_access_expires_at', '>=', now())
            ->first();

        if (! $lead) {
            return response()->json([
                'status' => 'error',
                'message' => 'Success session expired or invalid.',
            ], 404);
        }

        if (! hash_equals((string) $lead->success_cookie_hash, hash('sha256', $cookieToken))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Access mismatch for this success session.',
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'first_name' => $lead->first_name,
                'meeting_time' => optional($lead->meeting_time)?->toIso8601String(),
                'meet_link' => $lead->meet_link,
            ],
        ])->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Pragma', 'no-cache');
    }

    protected function getGoogleClient()
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');
        $client->setScopes([
            Calendar::CALENDAR,
            Calendar::CALENDAR_EVENTS,
            Calendar::CALENDAR_READONLY,
        ]);

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
        $busyTimes = Cache::remember('google_slots', 300, function () use ($timezone) {
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
            return $query->getCalendars()[config('services.google.calendar_id', 'primary')]->getBusy();
        });

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
        try {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'start_time' => 'required|date',
                'website_url' => 'required|string|max:1000', 
                'codebase_state' => 'nullable|string',
            ]);

            $email = strtolower(trim($request->email));
            $emailSessionToken = (string) $request->cookie('bkx_booking_email_session', '');

            if ($emailSessionToken === '') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please verify your email before booking.',
                ], 403);
            }

            $verification = BookingEmailVerification::where('email', $email)->first();
            $isVerified = $verification
                && $verification->verified_at
                && $verification->session_expires_at
                && $verification->session_expires_at->isFuture()
                && hash_equals((string) $verification->session_token_hash, hash('sha256', $emailSessionToken));

            if (! $isVerified) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email verification is required before booking.',
                ], 403);
            }

            $client = $this->getGoogleClient();
            $service = new Calendar($client);

            $startTime = Carbon::parse($request->start_time);
            $endTime = $startTime->copy()->addMinutes(15);

            $event = new Event([
                'summary' => 'Strategy Call: ' . $request->first_name . ' ' . $request->last_name,
                'description' => "Lead Email: {$request->email}\nWebsite/Codebase State: " . $request->website_url . "\nCodebase Notes: " . ($request->codebase_state ?? ''),
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
            $meetLink = $createdEvent->getHangoutLink();
            $successToken = Str::random(64);
            $successCookie = Str::random(64);

            try {
                $lead = Lead::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $email,
                    'meeting_time' => $startTime,
                    'website_url' => $request->website_url,
                    'codebase_state' => $request->codebase_state,
                    'google_event_id' => $createdEvent->getId(),
                    'meet_link' => $meetLink,
                    'success_access_token_hash' => hash('sha256', $successToken),
                    'success_cookie_hash' => hash('sha256', $successCookie),
                    'success_access_expires_at' => now()->addMinutes(45),
                ]);

                try {
                    Mail::to($lead->email)
                        ->send(new \App\Mail\BookingConfirmation($lead, $meetLink));

                    Mail::to(config('mail.contact_recipient', 'contact@bkxlabs.com'))
                        ->send(new \App\Mail\BookingNotification($lead, $meetLink));
                } catch (\Throwable $e) {
                    Log::error('Booking email error: ' . $e->getMessage());
                }
            } catch (QueryException $e) {
                Log::error('Lead save failed after successful calendar booking: ' . $e->getMessage());

                return response()->json([
                    'status' => 'error',
                    'message' => 'Booking created but confirmation storage failed. Please contact support with your email.',
                ], 500);
            }

            $verification->fill([
                'session_token_hash' => null,
                'session_expires_at' => null,
            ]);
            $verification->save();

            $secureCookies = config('session.secure_cookie', app()->environment('production'));

            return response()->json([
                'status' => 'success',
                'message' => 'Meeting booked successfully! Please check your email.',
                'success_token' => $successToken,
                'event_id' => $createdEvent->getId(),
            ])
                ->cookie(
                    'bkx_booking_access',
                    $successCookie,
                    45,
                    '/',
                    null,
                    $secureCookies,
                    true,
                    false,
                    'Strict'
                )
                ->withoutCookie('bkx_booking_email_session');
        } catch (\Exception $e) {
            Log::error('Booking error: ' . $e->getMessage());

            $publicMessage = 'An error occurred while booking your session. Please try again later or contact us directly.';
            $httpStatus = 500;

            if (str_contains($e->getMessage(), 'Google Calendar not authenticated')) {
                $publicMessage = 'Scheduling is temporarily unavailable. Please contact us directly while we reconnect calendar access.';
                $httpStatus = 503;
            }

            if (str_contains($e->getMessage(), 'ACCESS_TOKEN_SCOPE_INSUFFICIENT') || str_contains($e->getMessage(), 'insufficient authentication scopes')) {
                $publicMessage = 'Scheduling permissions expired. Please reconnect Google Calendar authorization and try again.';
                $httpStatus = 503;
            }

            return response()->json([
                'status' => 'error',
                'message' => $publicMessage,
                'error' => config('app.debug') ? $e->getMessage() : 'Booking failed'
            ], $httpStatus);
        }
    }
}
