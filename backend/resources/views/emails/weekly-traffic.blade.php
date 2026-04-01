<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1e3a8a; border-radius: 10px; }
        .header { background-color: #f1f5f9; padding: 10px 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #1e3a8a; }
        .details { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }
        .highlight { color: #1e3a8a; font-size: 42px; font-weight: bold; margin: 10px 0; line-height: 1; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h3>Weekly Traffic Intelligence</h3>
        </div>
        
        <p>Hi Faisal,</p>
        <p>Here is an automated snapshot of the traffic that passed through the main BKX Labs platform over the last 7 days.</p>

        <div class="details">
            <p style="font-size: 16px; margin: 0; color: #64748b;">Total Unique Visitors</p>
            <div class="highlight">{{ $totalVisitors }}</div>
            
            <p style="margin-top: 25px; font-size: 14px;">Your highest converting landing page was:<br><strong style="font-size: 16px;">{{ $topPage }}</strong></p>
        </div>

        <p>Log in to your Admin Dashboard to view the exact forensics of who these users were and what hardware they used.</p>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} BKX Labs Intelligence Engine. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
