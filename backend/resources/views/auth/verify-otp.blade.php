@extends('store.layout')
@section('title', 'Verify Verification Code')
@section('content')
<div class="min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-7">
        <!-- Header Section -->
        <div class="text-center space-y-3 sm:space-y-4">
            <div class="flex justify-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-md">
                    <span class="material-symbols-outlined text-blue-600 text-2xl sm:text-3xl">mail_lock</span>
                </div>
            </div>
            <div>
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Verify your email</h1>
                <p class="text-sm sm:text-base text-slate-600 mt-2">We sent a 6-digit code to <br class="sm:hidden"><strong class="text-slate-900">{{ $email }}</strong></p>
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
        <form action="{{ route('verify.otp') }}" method="POST" id="otpForm" class="space-y-5 sm:space-y-6">
            @csrf
            
            <!-- OTP Input Field -->
            <div class="space-y-2">
                <label for="code" class="block text-sm font-semibold text-slate-900">Verification Code</label>
                <input 
                    type="text" 
                    id="code" 
                    name="code"
                    required 
                    autocomplete="one-time-code" 
                    placeholder="000000"
                    maxlength="6"
                    autofocus
                    class="w-full h-14 sm:h-16 px-4 sm:px-5 text-center text-2xl sm:text-4xl font-bold tracking-widest bg-white border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all duration-200 placeholder-slate-400"
                    inputmode="numeric"
                />
                <p class="text-xs sm:text-sm text-slate-500 text-center">Enter the 6-digit code from your email</p>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit"
                id="submitBtn"
                class="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
                <span id="buttonText" class="text-white">Verify & Continue</span>
                <span id="spinnerIcon" class="material-symbols-outlined text-base hidden animate-spin">sync</span>
            </button>
        </form>

        <!-- Resend Code Section -->
        <div class="border-t border-slate-200 pt-5 sm:pt-6 space-y-3">
            <p class="text-sm text-slate-600 text-center">
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
        <div class="bg-gradient-to-r from-emerald-50 to-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4 flex gap-3 items-start">
            <span class="material-symbols-outlined text-emerald-700 text-lg flex-shrink-0">verified_user</span>
            <div class="flex-1">
                <p class="text-xs sm:text-sm text-emerald-900 font-medium">Your email is protected with enterprise-grade encryption</p>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('otpForm').addEventListener('submit', function(e) {
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = document.getElementById('buttonText');
    const spinnerIcon = document.getElementById('spinnerIcon');
    
    submitBtn.disabled = true;
    buttonText.textContent = 'Verifying...';
    spinnerIcon.classList.remove('hidden');
});

// Auto-focus next field when 6 digits entered
document.getElementById('code').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    
    if (this.value.length === 6) {
        // Auto-submit when 6 digits entered
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        const buttonText = document.getElementById('buttonText');
        const spinnerIcon = document.getElementById('spinnerIcon');
        buttonText.textContent = 'Verifying...';
        spinnerIcon.classList.remove('hidden');
        
        // Show visual feedback
        this.classList.remove('border-slate-300');
        this.classList.add('border-green-500');
    } else {
        // Reset styling if not 6 digits
        this.classList.remove('border-green-500');
        this.classList.add('border-slate-300');
    }
});
</script>
@endsection
