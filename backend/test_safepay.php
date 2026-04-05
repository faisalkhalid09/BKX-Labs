<?php
require __DIR__ . '/vendor/autoload.php';
use Illuminate\Support\Facades\Http;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$apiKey = env('SAFEPAY_API_KEY');
$webhookSecret = env('SAFEPAY_WEBHOOK_SECRET');
$baseUrl = 'https://sandbox.api.getsafepay.com';
$caBundle = env('SAFEPAY_CA_BUNDLE');
$disableSslVerify = filter_var(env('SAFEPAY_DISABLE_SSL_VERIFY', false), FILTER_VALIDATE_BOOL);

echo "--- FINAL TEST: AI-SUGGESTED PASSPORT FLOW ---\n\n";

if (empty($apiKey) || empty($webhookSecret)) {
    echo "❌ Missing required env values.\n";
    echo "SAFEPAY_API_KEY present: " . (!empty($apiKey) ? 'yes' : 'no') . "\n";
    echo "SAFEPAY_WEBHOOK_SECRET present: " . (!empty($webhookSecret) ? 'yes' : 'no') . "\n";
    exit(1);
}

echo "SSL verify disabled: " . ($disableSslVerify ? 'yes' : 'no') . "\n";
if (!empty($caBundle)) {
    echo "CA bundle path: {$caBundle}\n";
}

// The AI says: 
// 1. Header: X-SFPY-MERCHANT-SECRET must be the WEBHOOK SECRET
// 2. Body MUST be an empty JSON object {}
// 3. Header: X-SFPY-API-KEY must be provided

echo "Testing with Webhook Secret + Empty JSON Body...\n";

$request = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $webhookSecret,
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
]);

if (!empty($caBundle)) {
    $request = $request->withOptions(['verify' => $caBundle]);
} elseif ($disableSslVerify) {
    // For local diagnostics only. Never use this in production.
    $request = $request->withOptions(['verify' => false]);
}

$response = $request
    ->withBody('{}', 'application/json')
    ->post("$baseUrl/client/passport/v1/token");

if ($response->successful()) {
    echo "✅ SUCCESS! The empty body {} was the secret.\n";
    echo "Passport Token: " . $response->json('data.token') . "\n";
} else {
    echo "❌ FAILED (Status: " . $response->status() . ")\n";
    echo "Error: " . $response->body() . "\n";
}

echo "\n--- END ---";
