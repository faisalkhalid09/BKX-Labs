<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Verification Code</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        .header {
            background-color: #1e3a8a;
            color: white;
            padding: 24px;
            text-align: center;
        }
        .content {
            padding: 28px;
        }
        .code {
            display: inline-block;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 6px;
            padding: 10px 16px;
            border-radius: 8px;
            background: #eef3ff;
            color: #1e3a8a;
            margin: 8px 0 10px;
        }
        .footer {
            padding: 16px 28px;
            background: #f8fafc;
            color: #64748b;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin:0;">Verify Your Email</h2>
        </div>
        <div class="content">
            <p>Use this 6-digit code to verify your email before booking your strategy session:</p>
            <div class="code">{{ $code }}</div>
            <p>This code expires in <strong>10 minutes</strong>.</p>
            <p>If you did not request this, you can ignore this email.</p>
        </div>
        <div class="footer">
            BKX Labs booking security verification
        </div>
    </div>
</body>
</html>
