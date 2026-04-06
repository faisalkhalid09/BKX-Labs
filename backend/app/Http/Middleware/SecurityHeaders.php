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
         $safepayHosts = "https://*.getsafepay.com https://api.getsafepay.com https://sandbox.api.getsafepay.com https://getsafepay.pk https://*.getsafepay.pk";

         $csp = "default-src 'self' {$safepayHosts}; " .
             "script-src 'self' 'unsafe-inline' 'unsafe-eval' {$safepayHosts} https://accounts.google.com; " .
               "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " .
               "font-src 'self' https://fonts.gstatic.com data:; " .
             "img-src 'self' data: https://lh3.googleusercontent.com {$safepayHosts} https://ui-avatars.com; " .
             "frame-src {$safepayHosts} https://accounts.google.com; " .
             "connect-src 'self' {$safepayHosts};";
        $response->headers->set('Content-Security-Policy', $csp);

        // Permissions Policy
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

        return $response;
    }
}
