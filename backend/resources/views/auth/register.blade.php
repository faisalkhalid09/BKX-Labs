@extends('store.layout')
@section('title', 'Create Account')
@section('content')
<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;background:#f8fafc;">
    <div class="card" style="width:100%;max-width:400px;padding:2.5rem;">
        <div style="margin-bottom:1.75rem;">
            <h1 style="font-size:1.5rem;font-weight:800;color:#0f172a;letter-spacing:-0.03em;margin-bottom:.25rem;">Create Account</h1>
            <p style="font-size:.875rem;color:#64748b;">Join BKX Labs to access your digital products.</p>
        </div>

        @if ($errors->any())
            <div class="alert alert-error">
                @foreach ($errors->all() as $error) <div>{{ $error }}</div> @endforeach
            </div>
        @endif

        <form action="{{ route('register') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="form-label" for="name">Full name</label>
                <input class="form-input" type="text" id="name" name="name"
                       value="{{ old('name') }}" required autocomplete="name" placeholder="Your name">
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input class="form-input" type="email" id="email" name="email"
                       value="{{ old('email') }}" required autocomplete="email" placeholder="you@example.com">
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input class="form-input" type="password" id="password" name="password"
                       required autocomplete="new-password" placeholder="Minimum 8 characters">
            </div>
            <div class="form-group">
                <label class="form-label" for="password_confirmation">Confirm password</label>
                <input class="form-input" type="password" id="password_confirmation" name="password_confirmation"
                       required autocomplete="new-password" placeholder="Repeat password">
            </div>
            <button type="submit" class="btn btn-primary btn-full" style="font-size:.95rem;padding:.7rem;margin-top:.25rem;">Create Account</button>
        </form>

        <hr class="divider" style="margin:1.5rem 0;">
        <p style="text-align:center;font-size:.825rem;color:#64748b;">
            Already have an account?
            <a href="{{ route('login') }}" style="color:#1e3a8a;font-weight:600;">Sign in</a>
        </p>
    </div>
</div>
@endsection
