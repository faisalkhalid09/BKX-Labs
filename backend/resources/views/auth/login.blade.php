@extends('store.layout')
@section('title', 'Sign In')
@section('content')
<div class="min-h-screen flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="w-full max-w-md">
        <!-- Logo/Branding -->
        <div class="text-center mb-5 sm:mb-6">
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
                            class="absolute right-1 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-2 rounded hover:bg-surface-container w-10 h-10 flex items-center justify-center"
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
