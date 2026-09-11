<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Models\ScheduledPost;
use App\Observers\ScheduledPostObserver;
use App\Models\Post;
use App\Observers\PostObserver;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }

        // Register model observers
        ScheduledPost::observe(ScheduledPostObserver::class);
        Post::observe(PostObserver::class);


        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        RateLimiter::for('otp.generate', function (Request $request) {
            return Limit::perMinutes(5, 3)->by($request->ip() . '|' . $request->input('email'));
        });
    }
}
