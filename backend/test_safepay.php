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

echo "--- FINAL TEST: AI-SUGGESTED PASSPORT FLOW ---\n\n";

// The AI says: 
// 1. Header: X-SFPY-MERCHANT-SECRET must be the WEBHOOK SECRET
// 2. Body MUST be an empty JSON object {}
// 3. Header: X-SFPY-API-KEY must be provided

echo "Testing with Webhook Secret + Empty JSON Body...\n";

$response = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $webhookSecret,
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
])->withBody('{}', 'application/json')
  ->post("$baseUrl/client/passport/v1/token");

if ($response->successful()) {
    echo "✅ SUCCESS! The empty body {} was the secret.\n";
    echo "Passport Token: " . $response->json('data.token') . "\n";
} else {
    echo "❌ FAILED (Status: " . $response->status() . ")\n";
    echo "Error: " . $response->body() . "\n";
}

echo "\n--- END ---";
