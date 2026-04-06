<?php
putenv('SAFEPAY_DISABLE_SSL_VERIFY=true');
$_ENV['SAFEPAY_DISABLE_SSL_VERIFY'] = 'true';
$_SERVER['SAFEPAY_DISABLE_SSL_VERIFY'] = 'true';
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$svc = $app->make(App\Services\SafePayService::class);
echo $svc->createCheckoutUrl(10.00, 'ORD-DEBUG456', 'USD', 'state-debug-456') . PHP_EOL;
