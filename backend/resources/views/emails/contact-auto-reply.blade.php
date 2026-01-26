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
            border-radius: 4px;
            padding: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 30px;
            border-radius: 4px 4px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        .message-content {
            font-size: 15px;
            line-height: 1.8;
            color: #555;
        }
        .message-content p {
            margin-bottom: 15px;
        }
        .highlight-box {
            background-color: #f8f9fa;
            border-left: 3px solid #2c3e50;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .highlight-box strong {
            color: #2c3e50;
            display: block;
            margin-bottom: 10px;
        }
        .highlight-box ul {
            margin: 10px 0 0 0;
            padding-left: 20px;
        }
        .contact-info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
            font-size: 14px;
        }
        .contact-info a {
            color: #2c3e50;
            text-decoration: none;
        }
        .footer {
            padding: 20px 30px;
            background-color: #f8f9fa;
            border-top: 1px solid #eee;
            text-align: center;
            color: #888;
            font-size: 12px;
            border-radius: 0 0 4px 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Message Received</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hi {{ $customerName }},
            </div>
            
            <div class="message-content">
                <p>Thank you for reaching out to <strong>BKX Labs</strong>. We have received your message and our team has been notified.</p>
                
                <div class="highlight-box">
                    <strong>What happens next?</strong>
                    Our technical team will review your project brief and get back to you within <strong>24 hours</strong> with:
                    <ul>
                        <li>Initial technical assessment</li>
                        <li>Preliminary timeline estimate</li>
                        <li>Next steps for consultation</li>
                    </ul>
                </div>

                <p>If your inquiry is urgent, feel free to reach out to us directly:</p>
                
                <div class="contact-info">
                    <strong>Email:</strong> <a href="mailto:contact@bkxlabs.com">contact@bkxlabs.com</a><br>
                    <strong>Website:</strong> <a href="https://bkxlabs.com">bkxlabs.com</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <strong>BKX Labs</strong><br>
            Engineering Enterprise-Grade Software<br>
            <br>
            This is an automated confirmation email.
        </div>
    </div>
</body>
</html>
