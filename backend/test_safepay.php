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

echo "--- COMBO AUTH TEST ---\n\n";

echo "Testing Combo (API Key + Secret Key)... ";
$response = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $secretKey
])->post("$baseUrl/client/passport/v1/token");
echo $response->status() . " - " . $response->body() . "\n\n";

echo "Testing Combo (API Key + Webhook Secret)... ";
$response = Http::withHeaders([
    'X-SFPY-API-KEY' => $apiKey,
    'X-SFPY-MERCHANT-SECRET' => $webhookSecret
])->post("$baseUrl/client/passport/v1/token");
echo $response->status() . " - " . $response->body() . "\n\n";

echo "--- END ---";
