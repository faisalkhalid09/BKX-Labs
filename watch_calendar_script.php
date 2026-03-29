<?php

/**
 * BKX Labs - Google Calendar Watch Channel Register Script (OAuth 2.0)
 * 
 * Instructions:
 * 1. Ensure you have run 'composer require google/apiclient'.
 * 2. Authenticate via https://bkxlabs.com/api/google/auth first.
 * 3. Run this script once: 'php watch_calendar_script.php'
 */

require_once __DIR__ . '/backend/vendor/autoload.php';

// Simulate Laravel bootstrap to access models/config
// In a real Laravel app, you would use an Artisan command.
// But for convenience, we can load the environment.

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Channel;

// IMPORTANT: This script assumes it's running in an environment where 
// Laravel's Eloquent and Config are available, or where you manually
// provide the refresh token.

$clientId = getenv('GOOGLE_CLIENT_ID') ?: '180015269257-i225c1doi3f46i1poja7ne1fu0i2lj6u.apps.googleusercontent.com';
$clientSecret = getenv('GOOGLE_CLIENT_SECRET');
$refreshToken = getenv('GOOGLE_REFRESH_TOKEN'); // Or fetch from DB if possible
$calendarId = getenv('GOOGLE_CALENDAR_ID') ?: 'primary';
$webhookUrl = 'https://bkxlabs.com/api/webhooks/calendar';
$webhookToken = getenv('GOOGLE_WEBHOOK_TOKEN');

if (!$clientSecret || !$refreshToken) {
    echo "Error: GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN must be set.\n";
    echo "Tip: Run 'php artisan tinker' and get the token from the settings table if needed.\n";
    exit(1);
}

try {
    $client = new Client();
    $client->setClientId($clientId);
    $client->setClientSecret($clientSecret);
    $client->refreshToken($refreshToken);

    $service = new Calendar($client);

    $channel = new Channel();
    $channel->setId(uniqid('bkx-channel-')); 
    $channel->setType('web_hook');
    $channel->setAddress($webhookUrl);
    $channel->setToken($webhookToken);
    $channel->setExpiration(time() + (30 * 24 * 60 * 60) * 1000); 

    $response = $service->events->watch($calendarId, $channel);

    echo "Successfully registered OAuth watch channel!\n";
    echo "Channel ID: " . $response->getId() . "\n";
    echo "Resource ID: " . $response->getResourceId() . "\n";
    echo "Expiration: " . date('Y-m-d H:i:s', $response->getExpiration() / 1000) . "\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
