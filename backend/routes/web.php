<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Store\StoreController;
use App\Http\Controllers\Store\CheckoutController;
use App\Http\Controllers\Store\WebhookController;
use App\Http\Controllers\Store\DownloadController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Store\LegalController;
use App\Livewire\Store\SearchPage;

// Welcome (existing)
Route::get('/', function () {
    return view('welcome');
});

// Google Auth Routes
Route::get('/login/google/redirect', [\App\Http\Controllers\GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google.redirect');
Route::get('/login/google/callback', [\App\Http\Controllers\GoogleAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// ──────────────────────────────────────
//  Auth Routes
// ──────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/login',    [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login',   [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register',[AuthController::class, 'register']);
});

Route::get('/verify-otp', [AuthController::class, 'showVerifyOtp'])->name('verify.otp');
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// ──────────────────────────────────────
//  Store Routes (public)
// ──────────────────────────────────────
Route::prefix('store')->name('store.')->group(function () {
    Route::get('/',         [StoreController::class, 'index'])->name('index')->middleware(\App\Http\Middleware\StoreResponseCache::class);
    Route::get('/search',   SearchPage::class)->name('search');
    Route::get('/terms',    [LegalController::class, 'index'])->name('terms')->middleware(\App\Http\Middleware\StoreResponseCache::class);

    Route::post('/{product:slug}/cart', [StoreController::class, 'addToCart'])->name('add_to_cart');
    Route::post('/{product:slug}/cart-only', [StoreController::class, 'addToCartOnly'])->name('add_to_cart_only');
    Route::get('/{slug}',   [StoreController::class, 'show'])->name('show')->middleware(\App\Http\Middleware\StoreResponseCache::class);
});


// ──────────────────────────────────────
//  Checkout Routes (auth required)
// ──────────────────────────────────────
Route::prefix('checkout')->name('checkout.')->middleware('auth')->group(function () {
    Route::get('/',         [CheckoutController::class, 'create'])->name('create');
    Route::post('/',        [CheckoutController::class, 'store'])->name('store')->middleware('throttle:6,1');
    Route::post('/popup-session', [CheckoutController::class, 'popupSession'])->name('popup.session')->middleware('throttle:6,1');
    Route::get('/sfpy-checkout.js', [CheckoutController::class, 'safepayScript'])->name('sfpy.script');
    Route::get('/popup-gateway', [CheckoutController::class, 'popupGateway'])->name('popup.gateway');
    Route::get('/popup-cancel', [CheckoutController::class, 'popupCancel'])->name('popup.cancel');
    Route::get('/success',  [CheckoutController::class, 'success'])->name('success');
});

// Allow checkout page to be visited before auth (redirects inside controller)
// Removed duplicate public route to ensure middleware handles redirection correctly.

// ──────────────────────────────────────
//  SafePay Webhook (no CSRF / no auth)
// ──────────────────────────────────────
Route::post('/webhook/safepay', [WebhookController::class, 'handle'])
    ->name('webhook.safepay')
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

// ──────────────────────────────────────
//  My Downloads (auth required)
// ──────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::prefix('downloads')->name('downloads.')->group(function () {
        Route::get('/',                 [DownloadController::class, 'index'])->name('index');
        Route::get('/{order}/receipt',  [DownloadController::class, 'receipt'])->name('receipt');
        Route::get('/{order}',          [DownloadController::class, 'download'])->name('download');
    });

    Route::get('/profile', \App\Livewire\ProfileSettings::class)->name('profile');
});
