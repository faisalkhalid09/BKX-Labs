<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Us</title>
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
            padding: 30px 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 20px;
        }
        .message-content {
            font-size: 16px;
            line-height: 1.8;
            color: #555;
        }
        .message-content p {
            margin-bottom: 15px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            border-left: 4px solid #667eea;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #888;
            font-size: 13px;
        }
        .contact-info {
            margin-top: 20px;
            font-size: 14px;
        }
        .contact-info a {
            color: #667eea;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Message Received</h1>
        </div>
        
        <div class="greeting">
            Hi {{ $customerName }},
        </div>
        
        <div class="message-content">
            <p>Thank you for reaching out to <strong>BKX Labs</strong>! We've received your message and our team has been notified.</p>
            
            <div class="highlight-box">
                <strong>📋 What happens next?</strong><br>
                Our technical team will review your project brief and get back to you within <strong>24 hours</strong> with:
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    <li>Initial technical assessment</li>
                    <li>Preliminary timeline estimate</li>
                    <li>Next steps for consultation</li>
                </ul>
            </div>

            <p>If your inquiry is urgent, feel free to reach out to us directly:</p>
            
            <div class="contact-info">
                📧 <strong>Email:</strong> <a href="mailto:contact@bkxlabs.com">contact@bkxlabs.com</a><br>
                🌐 <strong>Website:</strong> <a href="https://bkxlabs.com">bkxlabs.com</a>
            </div>
        </div>
        
        <div class="footer">
            <strong>BKX Labs</strong><br>
            Engineering Enterprise-Grade Software<br>
            <br>
            This is an automated confirmation email. Please do not reply to this message.
        </div>
    </div>
</body>
</html>
