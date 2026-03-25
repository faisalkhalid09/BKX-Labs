@extends('store.layout')
@section('title', 'Create Account')
@section('content')
<div class="min-h-screen flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="w-full max-w-md">
        <!-- Logo/Branding -->
        <div class="text-center mb-5 sm:mb-6">
            <h1 class="text-lg sm:text-xl font-black text-on-surface mb-1.5 tracking-tight">Create Account</h1>
            <p class="text-xs sm:text-sm text-on-surface-variant">Join BKX Labs to access exclusive digital products</p>
        </div>

        <!-- Card -->
        <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 sm:p-5 shadow-lg">
            <!-- Error Messages -->
            @if ($errors->any())
                <div class="mb-4 p-3 bg-error/10 border border-error/30 rounded-lg">
                    <div class="flex gap-3 mb-2">
                        <span class="material-symbols-outlined text-error text-xl flex-shrink-0">error</span>
                        <div class="flex-1">
                            <p class="font-bold text-error text-sm mb-2">Registration failed</p>
                            <ul class="text-error text-sm space-y-1">
                                @foreach ($errors->all() as $error)
                                    <li class="flex items-start gap-2">
                                        <span class="text-xs mt-1">•</span>
                                        <span>{{ $error }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

            <form action="{{ route('register') }}" method="POST" class="space-y-3 sm:space-y-4">
                @csrf
                
                <!-- Full Name Field -->
                <div>
                    <label for="name" class="block text-xs font-bold text-on-surface mb-1 sm:mb-1.5">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value="{{ old('name') }}" 
                        required 
                        autocomplete="name" 
                        placeholder="John Doe"
                        class="w-full px-3 py-2 sm:py-2.5 rounded-lg border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-xs sm:text-sm placeholder-on-surface-variant/50 min-h-[40px]"
                    >
                    @error('name')
                        <p class="text-error text-xs sm:text-sm mt-1.5">{{ $message }}</p>
                    @enderror
                </div>

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
                        <p class="text-error text-xs sm:text-sm mt-1.5">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password Field -->
                <div>
                    <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                        <label for="password" class="block text-xs sm:text-sm font-bold text-on-surface">Password</label>
                        <span class="text-xs text-on-surface-variant">Minimum 8 characters</span>
                    </div>
                    <div class="relative group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            required 
                            autocomplete="new-password" 
                            placeholder="••••••••"
                            class="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-lg border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base placeholder-on-surface-variant/50 min-h-[44px]"
                        >
                        <button 
                            type="button" 
                            onclick="togglePasswordVisibility('password', 'toggleBtn1')"
                            id="toggleBtn1"
                            class="absolute right-1 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-2 rounded hover:bg-surface-container w-10 h-10 flex items-center justify-center"
                            aria-label="Show password"
                        >
                            <svg id="toggleBtn1-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                    @error('password')
                        <p class="text-error text-xs sm:text-sm mt-1.5">{{ $message }}</p>
                    @enderror
                    <!-- Password Strength Indicator -->
                    <div class="mt-2 sm:mt-3 space-y-2">
                        <div class="flex gap-1">
                            <div id="strength-1" class="h-1 flex-1 rounded-full bg-outline-variant/20 transition-colors"></div>
                            <div id="strength-2" class="h-1 flex-1 rounded-full bg-outline-variant/20 transition-colors"></div>
                            <div id="strength-3" class="h-1 flex-1 rounded-full bg-outline-variant/20 transition-colors"></div>
                        </div>
                        <p id="strength-text" class="text-xs text-on-surface-variant">Password strength</p>
                    </div>
                </div>

                <!-- Confirm Password Field -->
                <div>
                    <label for="password_confirmation" class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5 sm:mb-2">Confirm Password</label>
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password_confirmation" 
                            name="password_confirmation"
                            required 
                            autocomplete="new-password" 
                            placeholder="••••••••"
                            class="w-full px-4 py-3 sm:py-3.5 pr-12 rounded-lg border border-outline-variant/30 bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface text-sm sm:text-base placeholder-on-surface-variant/50 min-h-[44px]"
                        >
                        <button 
                            type="button" 
                            onclick="togglePasswordVisibility('password_confirmation', 'toggleBtn2')"
                            id="toggleBtn2"
                            class="absolute right-1 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-2 rounded hover:bg-surface-container w-10 h-10 flex items-center justify-center"
                            aria-label="Show password"
                        >
                            <svg id="toggleBtn2-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>
                    @error('password_confirmation')
                        <p class="text-error text-xs sm:text-sm mt-1.5">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Submit Button -->
                <button 
                    type="submit" 
                    class="w-full mt-6 sm:mt-8 py-3 sm:py-4 px-4 bg-primary text-on-primary font-bold rounded-lg text-sm sm:text-base hover:bg-primary-container active:scale-[0.98] transition-all shadow-lg shadow-primary/20 min-h-[48px] flex items-center justify-center gap-2"
                >
                    <span>Create Account</span>
                    <span id="submit-icon" class="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </form>

            <!-- Divider -->
            <div class="my-6 sm:my-8 relative">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-outline-variant/20"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                    <span class="px-3 bg-surface-container-lowest text-on-surface-variant">Already have an account?</span>
                </div>
            </div>

            <!-- Sign In Link -->
            <a 
                href="{{ route('login') }}" 
                class="block w-full text-center py-3 sm:py-3.5 px-4 border border-primary/30 text-primary font-bold rounded-lg text-sm sm:text-base hover:bg-primary/5 transition-all min-h-[48px] flex items-center justify-center"
            >
                Sign In Instead
            </a>
        </div>

        <!-- Security Note -->
        <div class="mt-6 sm:mt-8 flex items-start gap-2 p-4 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <span class="material-symbols-outlined text-primary text-xl flex-shrink-0 mt-0.5">verified_user</span>
            <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Your information is encrypted and secure. We never share your data with third parties.
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

// Password strength indicator
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/) || password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength++;
    
    const colors = ['bg-outline-variant/20', 'bg-red-500', 'bg-amber-500', 'bg-emerald-500'];
    const labels = ['Password strength', 'Weak', 'Good', 'Strong'];
    
    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById('strength-' + i);
        el.className = 'h-1.5 flex-1 rounded-full transition-all duration-300 ' + (i <= strength ? colors[strength] : 'bg-outline-variant/20');
    }
    
    const strengthText = document.getElementById('strength-text');
    strengthText.textContent = labels[strength];
    strengthText.className = 'text-xs font-bold transition-colors duration-300 ' + 
        (strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : strength === 3 ? 'text-emerald-500' : 'text-on-surface-variant');
});

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
