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

        <form action="{{ route('login') }}" method="POST" onsubmit="this.querySelector('button[type=submit]').innerHTML = 'Checking details...'; this.querySelector('button[type=submit]').style.opacity = '0.7'; this.querySelector('button[type=submit]').style.cursor = 'wait';">
            @csrf
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input class="form-input" type="email" id="email" name="email"
                       value="{{ old('email') }}" required autocomplete="email" placeholder="you@example.com">
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <div style="position:relative;">
                    <input class="form-input" type="password" id="password" name="password"
                           required autocomplete="current-password" placeholder="••••••••" style="padding-right:2.5rem;width:100%;">
                    <button type="button" onclick="const p=document.getElementById('password');const isSec=p.type==='password';p.type=isSec?'text':'password';this.innerHTML=isSec?'<svg width=\'20\' height=\'20\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22\'/></svg>':'<svg width=\'20\' height=\'20\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\'/><circle cx=\'12\' cy=\'12\' r=\'3\'/></svg>';" style="position:absolute;right:.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;display:flex;align-items:center;padding:0;">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                </div>
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
