@extends('store.layout')
@section('title', 'Verify Verification Code')
@section('content')
<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;background:#f8fafc;">
    <div class="card" style="width:100%;max-width:400px;padding:2.5rem;text-align:center;">
        <div style="margin-bottom:1.5rem;">
            <div style="width:48px;height:48px;background:#eff6ff;color:#1e3a8a;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:1rem;">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            </div>
            <h1 style="font-size:1.4rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;">Check your email</h1>
            <p style="font-size:.875rem;color:#64748b;margin-top:.5rem;">We've sent a 6-digit verification code to your email. Enter it below to continue.</p>
        </div>

        @if ($errors->any())
            <div class="alert alert-error" style="text-align:left;margin-bottom:1.25rem;">
                @foreach ($errors->all() as $error) <div>{{ $error }}</div> @endforeach
            </div>
        @endif

        <form action="{{ route('verify.otp') }}" method="POST">
            @csrf
            
            <div class="form-group" style="text-align:left;">
                <label class="form-label" for="code">Verification Code</label>
                <input class="form-input" type="text" id="code" name="code"
                       required autocomplete="one-time-code" placeholder="123456"
                       style="font-size:1.5rem;letter-spacing:0.25em;text-align:center;font-weight:700;padding:.75rem;"
                       maxlength="6" autofocus>
            </div>
            
            <button type="submit" class="btn btn-primary btn-full" style="font-size:.95rem;padding:.7rem;margin-top:1rem;">Verify & Continue</button>
        </form>

        <p style="font-size:.825rem;color:#64748b;margin-top:1.5rem;">
            Code didn't arrive? Please check your spam folder or return to <a href="{{ route('login') }}" style="color:#1e3a8a;font-weight:600;">Sign In</a> to request a new one.
        </p>
    </div>
</div>
@endsection
