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
            border-radius: 4px;
            padding: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            border-radius: 4px 4px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #2c3e50;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            display: block;
        }
        .value {
            font-size: 16px;
            color: #333;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 3px solid #2c3e50;
        }
        .footer {
            padding: 20px 30px;
            background-color: #f8f9fa;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #888;
            text-align: center;
            border-radius: 0 0 4px 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">Name</span>
                <div class="value">{{ $contactName }}</div>
            </div>
            
            <div class="field">
                <span class="label">Email</span>
                <div class="value">
                    <a href="mailto:{{ $contactEmail }}" style="color: #2c3e50; text-decoration: none;">{{ $contactEmail }}</a>
                </div>
            </div>
            
            <div class="field">
                <span class="label">Message</span>
                <div class="message-box">
                    {!! nl2br(e($contactMessage)) !!}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <strong>BKX Labs</strong><br>
            Submitted on {{ now()->format('F j, Y \a\t g:i A') }}
        </div>
    </div>
</body>
</html>
