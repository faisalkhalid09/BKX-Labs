<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eaeaea; }
        .content { padding: 20px 0; white-space: pre-wrap; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eaeaea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>VSH Message</h2>
        </div>
        <div class="content">
            {{ $bodyContent }}
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} VSH. All rights reserved.
        </div>
    </div>
</body>
</html>
