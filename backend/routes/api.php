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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
