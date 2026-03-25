@extends('store.layout')
@section('title', 'Verify Verification Code')
@section('content')
<div class="min-h-screen flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
        <!-- Header Section -->
        <div class="text-center space-y-2 sm:space-y-3">
            <div class="flex justify-center">
                <div class="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center shadow-md">
                    <span class="material-symbols-outlined text-blue-600 text-lg sm:text-xl">mail_lock</span>
                </div>
            </div>
            <div>
                <h1 class="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Verify your email</h1>
                <p class="text-xs sm:text-sm text-slate-600 mt-1.5">We sent a 6-digit code to <br class="sm:hidden"><strong class="text-slate-900">{{ $email }}</strong></p>
            </div>
        </div>

        <!-- Error Messages -->
        @if ($errors->any())
            <div class="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                <div class="flex gap-3 items-start">
                    <span class="material-symbols-outlined text-red-600 text-lg flex-shrink-0 mt-0.5">error</span>
                    <div class="flex-1">
                        @foreach ($errors->all() as $error)
                            <p class="text-sm text-red-700 font-medium">{{ $error }}</p>
                        @endforeach
                    </div>
                </div>
            </div>
        @endif

        <!-- OTP Form -->
        <form action="{{ route('verify.otp') }}" method="POST" id="otpForm" class="space-y-3 sm:space-y-4">
            @csrf
            
            <!-- OTP Input Field -->
            <div class="space-y-1.5">
                <label for="code" class="block text-xs font-semibold text-slate-900">Verification Code</label>
                <input 
                    type="text" 
                    id="code" 
                    name="code"
                    required 
                    autocomplete="one-time-code" 
                    placeholder="000000"
                    maxlength="6"
                    autofocus
                    class="w-full h-10 sm:h-11 px-3 sm:px-4 text-center text-lg sm:text-xl font-bold tracking-widest bg-white border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 placeholder-slate-400"
                    inputmode="numeric"
                />
                <p class="text-xs text-slate-500 text-center">Enter the 6-digit code from your email</p>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit"
                id="submitBtn"
                class="w-full h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <span id="buttonText" class="text-white">Verify & Continue</span>
            </button>
        </form>

        <!-- Resend Code Section -->
        <div class="border-t border-slate-200 pt-3 sm:pt-4 space-y-2">
            <p class="text-xs text-slate-600 text-center">
                Code didn't arrive? Check your spam folder or 
                <button 
                    type="button"
                    onclick="window.location.href='{{ route('login') }}'"
                    class="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    request a new one
                </button>
            </p>
        </div>

        <!-- Security Badge -->
        <div class="bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-lg p-2.5 sm:p-3 flex gap-2 items-start">
            <span class="material-symbols-outlined text-emerald-700 text-sm flex-shrink-0 mt-0.5">verified_user</span>
            <div class="flex-1">
                <p class="text-xs text-emerald-900 font-medium">Your email is protected with enterprise-grade encryption</p>
            </div>
        </div>

        <!-- Redirect Message (Hidden by default) -->
        <div id="redirectMessage" class="hidden">
            <div class="text-center space-y-3">
                <div class="flex justify-center">
                    <div class="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center shadow-md">
                        <span class="material-symbols-outlined text-amber-600 text-lg sm:text-xl">schedule</span>
                    </div>
                </div>
                <div>
                    <h2 class="text-base sm:text-lg font-bold text-slate-900">Session Expired</h2>
                    <p class="text-xs sm:text-sm text-slate-600 mt-2">Your session has expired. Please sign in again to continue.</p>
                </div>
                <div class="flex items-center justify-center gap-2 py-6">
                    <p class="text-base text-slate-700 font-medium">Redirecting to Sign In<span id="dots" class="inline-block w-8">.</span></p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
@keyframes dots {
    0% {
        content: '.';
    }
    33% {
        content: '..';
    }
    66% {
        content: '...';
    }
}

#dots {
    animation: 0.6s steps(4, end) infinite;
}

#dots::after {
    content: '.';
    animation: dots 1.5s steps(4, end) infinite;
}
</style>

<script>
let isAutoSubmitting = false;
let hasShownError = false;

// Check for 419 error and show custom message
function checkForExpiredSession() {
    const urlParams = new URLSearchParams(window.location.search);
    const hasError = document.querySelector('.alert.alert-error');
    const errorText = hasError ? hasError.textContent : '';
    
    // Check if error contains CSRF/token/expired related messages
    if (hasError && (errorText.includes('expired') || errorText.includes('token') || window.location.toString().includes('419'))) {
        showExpiredSessionMessage();
    }
}

function showExpiredSessionMessage() {
    if (hasShownError) return;
    hasShownError = true;
    
    const formContainer = document.querySelector('form').closest('.w-full');
    const redirectMessage = document.getElementById('redirectMessage');
    
    formContainer.style.display = 'none';
    redirectMessage.classList.remove('hidden');
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
        window.location.href = '{{ route('login') }}';
    }, 3000);
}

// Add dots animation
function animateDots() {
    const dotsElement = document.getElementById('dots');
    let dotCount = 0;
    
    setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        dotsElement.textContent = '.'.repeat(dotCount || 1);
    }, 500);
}

// Check for error on page load
window.addEventListener('load', function() {
    checkForExpiredSession();
    if (hasShownError) {
        animateDots();
    }
});

document.getElementById('otpForm').addEventListener('submit', function(e) {
    const codeInput = document.getElementById('code');
    
    // Only allow submission with 6 digits
    if (codeInput.value.length !== 6) {
        e.preventDefault();
        return;
    }
    
    // Show loading state if this is an auto-submit (6 digits entered)
    if (isAutoSubmitting) {
        const submitBtn = document.getElementById('submitBtn');
        const buttonText = document.getElementById('buttonText');
        
        submitBtn.disabled = true;
        buttonText.textContent = 'Verifying...';
    }
});

// Auto-submit when 6 digits entered
document.getElementById('code').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    
    if (this.value.length === 6) {
        // Show visual feedback
        this.classList.remove('border-slate-300');
        this.classList.add('border-green-500');
        
        // Trigger form submission
        isAutoSubmitting = true;
        setTimeout(() => {
            document.getElementById('otpForm').submit();
        }, 300);
    } else {
        // Reset styling if not 6 digits
        this.classList.remove('border-green-500');
        this.classList.add('border-slate-300');
        isAutoSubmitting = false;
    }
});
</script>
@endsection
