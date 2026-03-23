<x-mail::message>
# Your Verification Code

Please use the following 6-digit code to verify your email address and securely log in to your BKX Labs account.

<div style="background:#f1f5f9;border-radius:8px;padding:1.5rem;text-align:center;margin:2rem 0;">
<span style="font-size:2.5rem;font-weight:800;letter-spacing:0.25em;color:#0f172a;">{{ $otp }}</span>
</div>

**This code will expire in 30 minutes.** 
Do not share this code with anyone. Our team will never ask you for your verification code.

If you didn't request this login, you can safely ignore this email.

Thanks,<br>
{{ config('app.name') }} Security Team
</x-mail::message>
