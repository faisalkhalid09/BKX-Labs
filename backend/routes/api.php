<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
// use App\Http\Controllers\Api\RezgoDemoController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'status' => 'success',
        'timestamp' => now()
    ]);
});

Route::post('/website/track', [App\Http\Controllers\WebsiteTrafficController::class, 'track']);

Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/webhooks/calendar', [App\Http\Controllers\GoogleCalendarWebhookController::class, 'handle']);

// Google OAuth Authorization
Route::get('/google/auth', [App\Http\Controllers\GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/google/callback', [App\Http\Controllers\GoogleAuthController::class, 'handleGoogleCallback']);

// Custom Booking Routes
Route::get('/booking/slots', [App\Http\Controllers\BookingController::class, 'getAvailableSlots']);
Route::post('/booking/create', [App\Http\Controllers\BookingController::class, 'createBooking']);
// Route::get('/rezgo-demo/prices', [RezgoDemoController::class, 'getPrices']);

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

