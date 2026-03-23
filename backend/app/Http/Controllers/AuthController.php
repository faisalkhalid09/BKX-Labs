<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\StoreOtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (RateLimiter::tooManyAttempts('otp.generate:' . $request->ip() . '|' . $request->input('email'), 3)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again in 5 minutes.'])->onlyInput('email');
        }

        if (Auth::validate($credentials)) {
            RateLimiter::hit('otp.generate:' . $request->ip() . '|' . $request->input('email'), 300);
            
            $this->generateAndSendOtp($credentials['email']);
            
            $request->session()->put('pending_login', $credentials['email']);
            $request->session()->put('pending_remember', $request->boolean('remember'));
            
            return redirect()->route('verify.otp');
        }

        return back()->withErrors(['email' => 'Invalid credentials.'])->onlyInput('email');
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'email', 'unique:users'],
            'password'              => ['required', 'min:8', 'confirmed'],
        ]);

        if (RateLimiter::tooManyAttempts('otp.generate:' . $request->ip() . '|' . $request->input('email'), 3)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again in 5 minutes.'])->onlyInput('name', 'email');
        }

        RateLimiter::hit('otp.generate:' . $request->ip() . '|' . $request->input('email'), 300);

        // Store hash so we don't store raw password in session
        $data['password'] = Hash::make($data['password']);
        
        $request->session()->put('pending_registration', $data);
        
        $this->generateAndSendOtp($data['email']);

        return redirect()->route('verify.otp');
    }

    protected function generateAndSendOtp(string $email)
    {
        $otp = (string) random_int(100000, 999999);
        Cache::put('otp_verify_' . $email, $otp, now()->addMinutes(30));
        
        dispatch(function () use ($email, $otp) {
            Mail::to($email)->send(new StoreOtpMail($otp));
        })->afterResponse();
    }

    public function showVerifyOtp(Request $request)
    {
        $email = $request->session()->get('pending_login') ?? $request->session()->get('pending_registration')['email'] ?? null;

        if (!$email) {
            return redirect()->route('login');
        }
        
        return view('auth.verify-otp', ['email' => $email]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate(['code' => ['required', 'string', 'size:6']]);

        $email = $request->session()->get('pending_login') ?? $request->session()->get('pending_registration')['email'] ?? null;

        if (!$email) {
            return redirect()->route('login')->withErrors(['email' => 'Session expired. Please try again.']);
        }

        if (RateLimiter::tooManyAttempts('otp.verify:' . $request->ip(), 5)) {
            return back()->withErrors(['code' => 'Too many attempts. Please try again in 1 minute.']);
        }

        $cachedOtp = Cache::get('otp_verify_' . $email);

        if (!$cachedOtp || $cachedOtp !== $request->code) {
            RateLimiter::hit('otp.verify:' . $request->ip(), 60);
            return back()->withErrors(['code' => 'Invalid or expired code.']);
        }

        RateLimiter::clear('otp.verify:' . $request->ip());
        Cache::forget('otp_verify_' . $email);

        if ($request->session()->has('pending_registration')) {
            $data = $request->session()->get('pending_registration');
            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => $data['password'],
            ]);
            $request->session()->forget('pending_registration');
            Auth::login($user);
        } else {
            $user = User::where('email', $email)->first();
            $remember = $request->session()->get('pending_remember', false);
            $request->session()->forget(['pending_login', 'pending_remember']);
            Auth::login($user, $remember);
        }

        $request->session()->regenerate();
        Auth::user()->update(['last_login_at' => now()]);

        return redirect()->intended(route('downloads.index'));
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('store.index');
    }
}

