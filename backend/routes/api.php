<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GPUPricingController;
use App\Http\Controllers\BlackwellPUEController;
use App\Http\Controllers\PostController;
// use App\Http\Controllers\Api\RezgoDemoController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'status' => 'success',
        'timestamp' => now()
    ]);
});

// Blog posts — public, no auth required
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);



Route::post('/website/track', [App\Http\Controllers\WebsiteTrafficController::class, 'track'])->middleware('throttle:60,1');

// Contact form — 5 submissions per IP per 10 minutes
Route::post('/contact', [ContactController::class, 'submit'])->middleware('throttle:5,10');

Route::post('/webhooks/calendar', [App\Http\Controllers\GoogleCalendarWebhookController::class, 'handle']);

// Google OAuth Authorization
Route::get('/google/auth', [App\Http\Controllers\GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/google/callback', [App\Http\Controllers\GoogleAuthController::class, 'handleGoogleCallback']);

// Booking Routes — strict IP-based rate limiting to stop OTP bombing bots
// send-code: max 3 requests per IP per 15 minutes (also has per-email DB cooldown inside controller)
Route::get('/booking/slots', [App\Http\Controllers\BookingController::class, 'getAvailableSlots']);
Route::post('/booking/email/send-code', [App\Http\Controllers\BookingController::class, 'sendEmailVerificationCode'])->middleware('throttle:3,15');
Route::post('/booking/email/verify-code', [App\Http\Controllers\BookingController::class, 'verifyEmailCode'])->middleware('throttle:10,15');
Route::post('/booking/create', [App\Http\Controllers\BookingController::class, 'createBooking'])->middleware('throttle:5,10');
Route::get('/booking/success/{token}', [App\Http\Controllers\BookingController::class, 'getBookingSuccess']);
// Route::get('/rezgo-demo/prices', [RezgoDemoController::class, 'getPrices']);

// GPU Pricing & Cost Comparison API (April 2026)
Route::prefix('gpu')->group(function () {
    Route::get('/pricing', [GPUPricingController::class, 'getPricing'])
        ->name('gpu.pricing');
    
    Route::post('/calculate-cost', [GPUPricingController::class, 'calculateCost'])
        ->name('gpu.calculate-cost');
    
    Route::post('/recommendations', [GPUPricingController::class, 'getRecommendations'])
        ->name('gpu.recommendations');
});

// Blackwell PUE & Energy Calculator API (April 2026)
Route::prefix('blackwell')->group(function () {
    Route::get('/specifications', [BlackwellPUEController::class, 'getSpecifications'])
        ->name('blackwell.specifications');
    
    Route::post('/calculate-pue', [BlackwellPUEController::class, 'calculatePUE'])
        ->name('blackwell.calculate-pue');
    
    Route::post('/provider-comparison', [BlackwellPUEController::class, 'getProviderComparison'])
        ->name('blackwell.provider-comparison');
    
    Route::get('/tco-analysis', [BlackwellPUEController::class, 'getTCOAnalysis'])
        ->name('blackwell.tco-analysis');
});

Route::group(['prefix' => 'restricted'], function () {
    Route::post('/login', [App\Http\Controllers\RestrictedAccessController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/templates', [App\Http\Controllers\RestrictedAccessController::class, 'getTemplates']);
        Route::post('/send', [App\Http\Controllers\RestrictedAccessController::class, 'sendReceipt']);
        
        // Contact management routes
        Route::get('/contacts', [ContactController::class, 'index']);
        Route::get('/contacts/{id}', [ContactController::class, 'show']);
        Route::get('/contacts/export/excel', [ContactController::class, 'export']);
        Route::delete('/contacts/clear', [ContactController::class, 'clear']);
    });
});

Route::get('/glossary-registry', function () {
    $registryPath = public_path('data/glossary-registry.json');

    if (!file_exists($registryPath)) {
        return response()->json([
            'message' => 'Glossary registry not found.',
        ], 404);
    }

    $json = file_get_contents($registryPath);
    $decoded = json_decode($json, true);

    if (!is_array($decoded)) {
        return response()->json([
            'message' => 'Glossary registry is invalid JSON.',
        ], 500);
    }

    return response()->json($decoded);
});

