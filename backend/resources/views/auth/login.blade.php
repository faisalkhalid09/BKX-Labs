@extends('store.layout')
@section('title', 'Sign In')
@section('content')
<div class="min-h-screen flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="w-full max-w-md">
        <!-- Logo/Branding -->
        <div class="text-center mb-5 sm:mb-6">
            <a href="{{ url('/store') }}" class="inline-flex justify-center mb-4 hover:opacity-85 transition-opacity" aria-label="Go to BKX Labs Store">
                <img src="/brand-logo.png" alt="BKX Labs" class="h-[2.875rem] sm:h-[3.45rem] w-auto object-contain">
            </a>
            <h1 class="text-lg sm:text-xl font-black text-on-surface mb-1.5 tracking-tight">Welcome Back</h1>
            <p class="text-xs sm:text-sm text-on-surface-variant">Sign in to access your downloads and purchases</p>
        </div>

        <!-- Card -->
        <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 sm:p-5 shadow-lg">
            <!-- Error Messages -->
            @if ($errors->any())
                <div class="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
                    <div class="flex gap-3">
                        <span class="material-symbols-outlined text-error text-xl flex-shrink-0">error</span>
                        <div class="flex-1">
                            <p class="font-bold text-error text-sm">{{ $errors->first() }}</p>
                        </div>
                    </div>
                </div>
            @endif

            <form action="{{ route('login') }}" method="POST" class="space-y-3 sm:space-y-4">
                @csrf
                
                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-xs font-bold text-on-surface mb-1 sm:mb-1.5">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value="{{ old('email') }}" 
                        required 
                        autocomplete="email" 
                        placeholder="you@example.com"
                        class="w-full px-3 py-2 sm:py-2.5 rounded-lg border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-xs sm:text-sm placeholder-on-surface-variant/50 min-h-[40px]"
                    >
                    @error('email')
                        <p class="text-error text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password Field -->
                <div>
                    <div class="flex items-center justify-between mb-1 sm:mb-1.5">
                        <label for="password" class="block text-xs font-bold text-on-surface">Password</label>
                    </div>
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            required 
                            autocomplete="current-password" 
                            placeholder="••••••••"
                            class="w-full px-3 py-2 sm:py-2.5 pr-12 rounded-lg border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-xs sm:text-sm placeholder-on-surface-variant/50 min-h-[40px]"
                        >
                        <button 
                            type="button" 
                            onclick="togglePasswordVisibility('password', 'toggleBtn')"
                            id="toggleBtn"
                            class="absolute right-1 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-container w-8 h-8 flex items-center justify-center"
                            aria-label="Show password"
                        >
                            <svg id="toggleBtn-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                    @error('password')
                        <p class="text-error text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between gap-2">
                    <label class="flex items-center gap-2 cursor-pointer min-h-[36px]">
                        <input 
                            type="checkbox" 
                            name="remember" 
                            id="remember"
                            class="w-4 h-4 rounded border border-outline-variant/40 accent-primary cursor-pointer"
                        >
                        <span class="text-xs text-on-surface-variant">Remember for 30 days</span>
                    </label>
                    <a 
                        href="#" 
                        class="text-xs text-primary font-semibold hover:text-primary-container transition-colors whitespace-nowrap"
                    >Forgot password?</a>
                </div>

                <!-- Submit Button -->
                <button 
                    type="submit" 
                    class="w-full mt-4 sm:mt-5 py-2.5 sm:py-3 px-3 bg-primary text-on-primary font-bold rounded-lg text-xs sm:text-sm hover:bg-primary-container active:scale-[0.98] transition-all shadow-lg shadow-primary/20 min-h-[40px] flex items-center justify-center gap-2"
                >
                    <span>Sign In</span>
                    <span id="submit-icon" class="material-symbols-outlined text-lg">login</span>
                </button>

                <!-- Google Sign In Button -->
                <a href="{{ route('auth.google.redirect') }}" 
                   class="w-full mt-3 py-2.5 sm:py-3 px-3 bg-white dark:bg-slate-900 border border-outline-variant/30 text-on-surface font-bold rounded-lg text-xs sm:text-sm hover:bg-surface-container transition-all min-h-[40px] flex items-center justify-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Sign in with Google</span>
                </a>
            </form>

            <!-- Divider -->
            <div class="my-4 sm:my-5 relative">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-outline-variant/20"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                    <span class="px-2 bg-surface-container-lowest text-on-surface-variant">New to BKX Labs?</span>
                </div>
            </div>

            <!-- Sign Up Link -->
            <a 
                href="{{ route('register') }}" 
                class="block w-full text-center py-2.5 sm:py-3 px-3 border border-primary/30 text-primary font-bold rounded-lg text-xs sm:text-sm hover:bg-primary/5 transition-all min-h-[40px] flex items-center justify-center"
            >
                Create Account
            </a>
        </div>

        <!-- Security Note -->
        <div class="mt-4 sm:mt-5 flex items-start gap-2 p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <span class="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">verified_user</span>
            <p class="text-xs text-on-surface-variant leading-relaxed">
                Your account is protected with industry-standard encryption and security protocols.
            </p>
        </div>
    </div>
</div>

@push('scripts')
<script>
function togglePasswordVisibility(fieldId, buttonId) {
    const field = document.getElementById(fieldId);
    const button = document.getElementById(buttonId);
    const icon = document.getElementById(buttonId + '-icon');
    const isPassword = field.type === 'password';
    
    field.type = isPassword ? 'text' : 'password';
    button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    
    if (isPassword) {
        // Show icon
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>';
    } else {
        // Hide icon
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
}

// Form submission loading state
document.querySelector('form').addEventListener('submit', function() {
    const button = this.querySelector('button[type=submit]');
    const icon = button.querySelector('.material-symbols-outlined');
    button.disabled = true;
    button.style.opacity = '0.7';
    button.style.cursor = 'not-allowed';
    icon.innerHTML = 'hourglass_empty';
    icon.classList.add('animate-spin');
});
</script>
@endpush
@endsection
