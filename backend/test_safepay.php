<?php
require __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Facades\Http;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$apiKey = env('SAFEPAY_API_KEY');
$secretKey = env('SAFEPAY_SECRET_KEY');
$webhookSecret = env('SAFEPAY_WEBHOOK_SECRET');
$baseUrl = 'https://sandbox.api.getsafepay.com';

echo "--- STARTING EXHAUSTIVE AUTH TEST ---\n\n";

// Test 1: X-SFPY-MERCHANT-SECRET using Secret Key (eae...)
echo "Test 1: X-SFPY-MERCHANT-SECRET (using Secret Key)\n";
$response = Http::withHeaders(['X-SFPY-MERCHANT-SECRET' => $secretKey])->post("$baseUrl/client/passport/v1/token");
echo "Status: " . $response->status() . "\nBody: " . $response->body() . "\n\n";

// Test 2: X-SFPY-MERCHANT-SECRET using Webhook Secret (6eb...)
// This is because the error specifically said "merchant webhook secret not found"
echo "Test 2: X-SFPY-MERCHANT-SECRET (using Webhook Secret)\n";
$response = Http::withHeaders(['X-SFPY-MERCHANT-SECRET' => $webhookSecret])->post("$baseUrl/client/passport/v1/token");
echo "Status: " . $response->status() . "\nBody: " . $response->body() . "\n\n";

// Test 3: Standard Bearer Token (what failed before)
echo "Test 3: Authorization Bearer (using Secret Key)\n";
$response = Http::withToken($secretKey)->post("$baseUrl/client/passport/v1/token");
echo "Status: " . $response->status() . "\nBody: " . $response->body() . "\n\n";

// Test 4: Both API Key and Merchant Secret headers
echo "Test 4: X-SFPY-API-KEY + X-SFPY-MERCHANT-SECRET (Secret Key)\n";
$response = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $secretKey
])->post("$baseUrl/client/passport/v1/token");
echo "Status: " . $response->status() . "\nBody: " . $response->body() . "\n\n";

echo "--- TEST COMPLETE ---\n";
