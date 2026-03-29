<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { text-align: center; margin-bottom: 30px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #1e3a8a; color: white; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; }
        .details { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h2>Strategy Session Confirmed</h2>
            <p>Hi {{ $lead->first_name }}, your meeting with BKX Labs is all set!</p>
        </div>
        
        <div className="details">
            <p><strong>Date:</strong> {{ $lead->meeting_time->format('F j, Y') }}</p>
            <p><strong>Time:</strong> {{ $lead->meeting_time->format('h:i A') }} (PKT)</p>
        </div>

        <p>You can join the meeting using the button below:</p>
        <div style="text-align: center;">
            <a href="{{ $meetLink }}" className="button">Join Google Meet</a>
        </div>

        <p>A calendar invitation has also been sent to your email address. We look forward to discussing your project!</p>
        
        <div className="footer">
            <p>&copy; {{ date('Y') }} BKX Labs. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
