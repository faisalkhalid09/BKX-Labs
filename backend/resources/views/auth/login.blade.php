@extends('store.layout')
@section('title', 'Sign In')
@section('content')
<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;background:#f8fafc;">
    <div class="card" style="width:100%;max-width:400px;padding:2.5rem;">
        <div style="margin-bottom:1.75rem;">
            <h1 style="font-size:1.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin-bottom:.25rem;">Welcome back</h1>
            <p style="font-size:.875rem;color:#64748b;">Sign in to access your downloads.</p>
        </div>

        @if ($errors->any())
            <div class="alert alert-error">{{ $errors->first() }}</div>
        @endif

        <form action="{{ route('login') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input class="form-input" type="email" id="email" name="email"
                       value="{{ old('email') }}" required autocomplete="email" placeholder="you@example.com">
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input class="form-input" type="password" id="password" name="password"
                       required autocomplete="current-password" placeholder="••••••••">
            </div>
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:1.25rem;">
                <input type="checkbox" id="remember" name="remember" style="width:16px;height:16px;accent-color:#1e3a8a;">
                <label for="remember" style="font-size:.825rem;color:#64748b;cursor:pointer;">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary btn-full" style="font-size:.95rem;padding:.7rem;">Sign In</button>
        </form>

        <hr class="divider" style="margin:1.5rem 0;">
        <p style="text-align:center;font-size:.825rem;color:#64748b;">
            Don't have an account?
            <a href="{{ route('register') }}" style="color:#1e3a8a;font-weight:600;">Create one</a>
        </p>
    </div>
</div>
@endsection
