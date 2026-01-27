<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'status' => 'success',
        'timestamp' => now()
    ]);
});

Route::post('/contact', [ContactController::class, 'submit']);

Route::group(['prefix' => 'restricted'], function () {
    Route::post('/login', [App\Http\Controllers\RestrictedAccessController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/templates', [App\Http\Controllers\RestrictedAccessController::class, 'getTemplates']);
        Route::post('/send', [App\Http\Controllers\RestrictedAccessController::class, 'sendReceipt']);
    });
});

