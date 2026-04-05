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

echo "--- ULTIMATE AUTH TEST (REFINED) ---\n\n";

$tests = [
    "X-SFPY-MERCHANT-SECRET (with Secret Key)" => ['X-SFPY-MERCHANT-SECRET' => $secretKey],
    "X-SFPY-MERCHANT-SECRET (with Webhook Secret)" => ['X-SFPY-MERCHANT-SECRET' => $webhookSecret],
    "X-SFPY-API-KEY + X-SFPY-SECRET" => ['X-SFPY-API-KEY' => $apiKey, 'X-SFPY-SECRET' => $secretKey],
    "X-SAFEPAY-SIGNATURE (with Webhook Secret)" => ['X-SAFEPAY-SIGNATURE' => $webhookSecret],
    "X-SFPY-WEBHOOK-SECRET (with Webhook Secret)" => ['X-SFPY-WEBHOOK-SECRET' => $webhookSecret],
    "X-SFPY-MERCHANT-WEBHOOK-SECRET" => ['X-SFPY-MERCHANT-WEBHOOK-SECRET' => $webhookSecret],
];

foreach ($tests as $name => $headers) {
    echo "Testing $name... ";
    $response = Http::withHeaders($headers)->post("$baseUrl/client/passport/v1/token");
    
    if ($response->successful()) {
        echo "✅ SUCCESS!\n";
        echo "Worked with headers: " . json_encode($headers) . "\n";
        exit;
    } else {
        echo "❌ Status: " . $response->status() . " - " . $response->json('status.errors.1') . "\n";
    }
}

echo "\n--- FAILED ALL ---";
