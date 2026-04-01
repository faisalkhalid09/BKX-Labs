<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use Illuminate\Support\Facades\Schedule;

// Automatically fire the intelligence engine email every Monday at 8:00 AM
Schedule::command('traffic:send-weekly')->weeklyOn(1, '8:00');
