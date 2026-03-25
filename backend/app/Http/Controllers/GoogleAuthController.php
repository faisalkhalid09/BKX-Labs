<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

use Laravel\Socialite\Two\InvalidStateException;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(\Illuminate\Http\Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Security check: Ensure Google email is verified
            if (!isset($googleUser->user['email_verified']) || $googleUser->user['email_verified'] !== true) {
                \Log::alert('Google Auth Attempt with unverified email: ' . $googleUser->email);
                return redirect()->route('login')->withErrors(['email' => 'Your Google account email must be verified to sign in.']);
            }
            
            // Find user by google_id OR email
            $user = User::where('google_id', $googleUser->id)
                ->orWhere('email', $googleUser->email)
                ->first();

            if ($user) {
                // Update google_id if it's missing (e.g. user previously signed up with email)
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleUser->id]);
                }
            } else {
                // Create new user
                $user = User::create([
                    'name'      => $googleUser->name,
                    'email'     => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password'  => null, // Password is not required for Google users
                ]);

                \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeMail($user));
            }

            Auth::login($user, true);
            $request->session()->regenerate();
            $user->update(['last_login_at' => now()]);

            return redirect()->intended(route('store.index'))->with('success', 'Logged in successfully with Google!');

        } catch (InvalidStateException $e) {
            \Log::warning('Google Auth State Mismatch (Session Timeout): ' . $request->ip());
            return redirect()->route('login')->withErrors(['email' => 'Login session expired. Please try again.']);
        } catch (\Exception $e) {
            \Log::error('Google Auth Critical Error: ' . $e->getMessage());
            return redirect()->route('login')->withErrors(['email' => 'Google authentication failed. Please try again.']);
        }
    }
}
