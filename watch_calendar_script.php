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

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Channel;
use Dotenv\Dotenv;

// Load .env from the backend directory
if (file_exists(__DIR__ . '/backend/.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/backend');
    $dotenv->load();
}

$clientId = env('GOOGLE_CLIENT_ID', '180015269257-i225c1doi3f46i1poja7ne1fu0i2lj6u.apps.googleusercontent.com');
$clientSecret = env('GOOGLE_CLIENT_SECRET');
$refreshToken = env('GOOGLE_REFRESH_TOKEN'); 
$calendarId = env('GOOGLE_CALENDAR_ID', 'primary');
$webhookUrl = 'https://bkxlabs.com/api/webhooks/calendar';
$webhookToken = env('GOOGLE_WEBHOOK_TOKEN');

// Helper function to simulate Laravel's env() if not available
if (!function_exists('env')) {
    function env($key, $default = null) {
        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
        return $value === false ? $default : $value;
    }
}

if (!$clientSecret || !$refreshToken) {
    echo "Error: GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN must be set in backend/.env\n";
    echo "Current Secret: " . ($clientSecret ? 'SET' : 'MISSING') . "\n";
    echo "Current Token: " . ($refreshToken ? 'SET' : 'MISSING') . "\n";
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
