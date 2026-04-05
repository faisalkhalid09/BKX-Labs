<?php
require __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Facades\Http;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Testing Auth with X-SFPY-MERCHANT-SECRET (Secret Key)...\n";
$response = Http::withHeaders([
    'X-SFPY-MERCHANT-SECRET' => $secretKey
])->post("$baseUrl/client/passport/v1/token");
echo "Status (X-SFPY-MERCHANT-SECRET): " . $response->status() . " - " . $response->body() . "\n\n";

echo "Testing Auth with X-SFPY-API-KEY + X-SFPY-MERCHANT-SECRET...\n";
$response = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $secretKey
])->post("$baseUrl/client/passport/v1/token");
echo "Status (Both): " . $response->status() . " - " . $response->body() . "\n\n";

echo "Testing Auth with X-SFPY-WEBHOOK-SECRET (just in case)...\n";
$response = Http::withHeaders([
    'X-SFPY-WEBHOOK-SECRET' => $webhookSecret
])->post("$baseUrl/client/passport/v1/token");
echo "Status (Webhook Secret): " . $response->status() . " - " . $response->body() . "\n\n";
