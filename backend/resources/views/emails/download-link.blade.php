<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Download Link</title>
    <style>
        body { font-family: 'Inter', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 40px 16px; color: #0f172a; }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 520px; margin: 0 auto; padding: 40px; }
        .logo { font-size: 1.2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin-bottom: 28px; }
        .logo span { color: #1e3a8a; }
        h1 { font-size: 1.25rem; font-weight: 700; margin: 0 0 12px; }
        p { font-size: 0.9rem; color: #475569; line-height: 1.7; margin: 0 0 20px; }
        .btn { display: inline-block; background: #1e3a8a; color: #fff; border-radius: 8px; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        .note { font-size: 0.8rem; color: #94a3b8; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
        .product-chip { display: inline-block; background: #eff6ff; color: #1e3a8a; font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 4px; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">BKX<span>Labs</span></div>

        <div class="product-chip">{{ ucwords(str_replace('_', ' ', $order->product->category)) }}</div>

        <h1>Your download is ready</h1>
        <p>Hi {{ $order->user->name }},</p>
        <p>Here is your secure download link for <strong>{{ $order->product->name }}</strong>. This link is valid for <strong>48 hours</strong> from the time this email was sent.</p>

        <a href="{{ $downloadUrl }}" class="btn">Download Now</a>

        <p class="note">
            Order #{{ $order->id }} &nbsp;&middot;&nbsp; ${{ number_format($order->amount, 2) }}<br>
            If you have trouble, reply to this email or visit your
            <a href="{{ url('/downloads') }}" style="color:#1e3a8a;">My Downloads</a> page.
        </p>
    </div>
</body>
</html>
