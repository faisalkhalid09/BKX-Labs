<?php
require __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Facades\Http;

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$secretKey = env('SAFEPAY_SECRET_KEY');
$webhookSecret = env('SAFEPAY_WEBHOOK_SECRET');
$baseUrl = 'https://sandbox.api.getsafepay.com';

echo "Testing Auth bearer token...\n";
$response = Http::withToken($secretKey)
    ->post("$baseUrl/client/passport/v1/token");

echo "Status: " . $response->status() . "\n";
echo "Response: " . $response->body() . "\n";
