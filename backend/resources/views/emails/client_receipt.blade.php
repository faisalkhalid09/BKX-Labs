<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background-color: #1a365d; color: #ffffff; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
        .content { padding: 40px 30px; color: #4b5563; white-space: pre-wrap; font-size: 16px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 5px 0; }
        .brand-text { font-weight: bold; color: #ffffff; text-decoration: none; font-size: 28px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="brand-text">BKX Labs</div>
        </div>
        <div class="content">
            {{ $bodyContent }}
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} BKX Labs. All rights reserved.</p>
            <p>Reliable software products, delivered phase by phase</p>
        </div>
    </div>
</body>
</html>
