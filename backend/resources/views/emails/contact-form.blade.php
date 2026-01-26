<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
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
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #667eea;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .value {
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #667eea;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📩 New Contact Form Submission</h1>
        </div>
        
        <div class="field">
            <div class="label">Name</div>
            <div class="value">{{ $contactName }}</div>
        </div>
        
        <div class="field">
            <div class="label">Email</div>
            <div class="value">
                <a href="mailto:{{ $contactEmail }}">{{ $contactEmail }}</a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">Message</div>
            <div class="message-box">
                {!! nl2br(e($contactMessage)) !!}
            </div>
        </div>
        
        <div class="footer">
            This email was sent from the BKX Labs website contact form.<br>
            Submitted on {{ now()->format('F j, Y \a\t g:i A') }}
        </div>
    </div>
</body>
</html>
