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

echo "--- BRUTE FORCE HEADER TEST ---\n\n";

$variants = [
    'X-SFPY-MERCHANT-WEBHOOK-SECRET',
    'X-SFPY-WEBHOOK-SECRET',
    'X-SFPY-MERCHANT-SECRET',  // Already tried, but testing again with Webhook Secret
    'X-SFPY-SECRET-KEY',
    'X-SFPY-API-SECRET',
    'X-SAFEPAY-WEBHOOK-SECRET',
    'X-SAFEPAY-MERCHANT-SECRET',
    'Merchant-Webhook-Secret',
    'x-merchant-webhook-secret',
    'X-SFPY-SIGNATURE',
];

$secrets = [
    'Secret Key' => $secretKey,
    'Webhook Secret' => $webhookSecret
];

foreach ($variants as $header) {
    foreach ($secrets as $name => $val) {
        echo "Testing: $header ($name)... ";
        $response = Http::withHeaders([$header => $val])
            ->post("$baseUrl/client/passport/v1/token");
        
        if ($response->successful()) {
            echo "✅ SUCCESS! Header: $header, Value: $name\n";
            exit;
        } else {
            echo "❌ " . $response->status() . "\n";
        }
    }
}

echo "\n--- ALL FAILED ---";
