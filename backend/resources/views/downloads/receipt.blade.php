<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt #{{ $order->id }}</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; color: #131b2e; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
        .logo { max-width: 250px; max-height: 80px; object-fit: contain; margin-bottom: 10px; }
        .details { margin-bottom: 30px; }
        .details th { text-align: left; padding: 12px 8px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.05em; }
        .details td { padding: 16px 8px; border-bottom: 1px solid #f1f5f9; }
        .total-row td { font-weight: bold; font-size: 1.25em; border-top: 2px solid #131b2e; padding-top: 20px; color: #1e3a8a; }
        .sub-row td { padding-top: 16px; color: #64748b; font-size: 0.95em; }
        .footer { text-align: center; color: #94a3b8; font-size: 0.8em; margin-top: 60px; padding-top: 20px; border-top: 1px dashed #e2e8f0; }
    </style>
</head>
<body>
    <div class="header">
        @php
            $logoPath = public_path('logo.png');
            if (file_exists($logoPath)) {
                $type = pathinfo($logoPath, PATHINFO_EXTENSION);
                $data = file_get_contents($logoPath);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            } else {
                $base64 = '';
            }
        @endphp
        
        @if($base64)
            <img src="{{ $base64 }}" class="logo" alt="BKX Labs">
        @else
            <h1>BKX Labs</h1>
        @endif
        
        <h2 style="margin: 5px 0 0 0; color: #0f172a;">Purchase Receipt</h2>
        <p style="color: #64748b; margin: 5px 0 0 0;">Order #{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
    </div>

    <div class="details">
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong style="font-size: 1.1em; color: #0f172a;">{{ $order->product->name }}</strong><br>
                        <span style="color: #64748b; font-size: 0.9em;">Digital License - {{ ucwords(str_replace('_', ' ', $order->product->category)) }}</span><br>
                        <span style="color: #64748b; font-size: 0.85em;">Purchased: {{ $order->created_at->format('M d, Y h:i A') }}</span><br>
                        <span style="color: #64748b; font-size: 0.85em;">Billed To: {{ $order->user->email }}</span>
                    </td>
                    <td style="text-align: right; vertical-align: top; font-weight: bold; font-size: 1.1em; color: #0f172a;">
                        ${{ number_format($order->amount, 2) }}
                    </td>
                </tr>
                <tr class="sub-row">
                    <td style="text-align: right;">Subtotal</td>
                    <td style="text-align: right;">${{ number_format($order->amount, 2) }}</td>
                </tr>
                <tr style="color: #64748b; font-size: 0.95em;">
                    <td style="text-align: right; padding-top: 8px; padding-bottom: 20px;">Tax</td>
                    <td style="text-align: right; padding-top: 8px; padding-bottom: 20px;">$0.00</td>
                </tr>
                <tr class="total-row">
                    <td style="text-align: right;">Total Paid</td>
                    <td style="text-align: right;">${{ number_format($order->amount, 2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p style="margin: 0 0 5px 0;">This receipt was dynamically generated.</p>
        <p style="margin: 0;"><strong>BKX Labs</strong> &copy; {{ date('Y') }}. All rights reserved.</p>
        <p style="margin: 5px 0 0 0;"><a href="{{ url('/') }}" style="color: #1e3a8a; text-decoration: none;">www.bkxlabs.com</a></p>
    </div>
</body>
</html>
