<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1e3a8a; border-radius: 10px; }
        .header { background-color: #f1f5f9; padding: 10px 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #1e3a8a; }
        .details { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }
        .link { color: #1e3a8a; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>New Strategy Session Booked!</h3>
        </div>
        
        <div class="details">
            <p><strong>Lead Name:</strong> {{ $lead->first_name }} {{ $lead->last_name }}</p>
            <p><strong>Email:</strong> {{ $lead->email }}</p>
            <p><strong>Meeting Time:</strong> {{ $lead->meeting_time->format('F j, Y \a\t h:i A') }} ({{ config('app.timezone', 'Asia/Karachi') }})</p>
            <p><strong>Website/Codebase State:</strong></p>
            <p>{{ $lead->website_url ?? 'N/A' }}</p>
        </div>

        <p>A Google Calendar event has been created. You can find the direct Google Meet link here:</p>
        <p><a href="{{ $meetLink }}" class="link">Join Strategy Session</a></p>
        <p><strong>Meet Link:</strong> {{ $meetLink }}</p>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} BKX Labs Admin. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
