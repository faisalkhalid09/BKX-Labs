<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Security Headers definition to prevent basic web exploitation algorithms
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        
        // Content Security Policy (CSP)
        $csp = "default-src 'self' https://*.getsafepay.com; " .
               "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.getsafepay.com https://accounts.google.com; " .
               "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " .
               "font-src 'self' https://fonts.gstatic.com data:; " .
               "img-src 'self' data: https://lh3.googleusercontent.com https://*.getsafepay.com https://ui-avatars.com; " .
               "frame-src https://*.getsafepay.com https://accounts.google.com; " .
               "connect-src 'self' https://*.getsafepay.com;";
        $response->headers->set('Content-Security-Policy', $csp);

        // Permissions Policy
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

        return $response;
    }
}
