<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Payment Cancelled</title>
</head>
<body>
<script>
    (function() {
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ type: 'safepay:cancelled' }, window.location.origin);
        }
        window.close();
    })();
</script>
<p style="font-family: Arial, sans-serif; text-align:center; margin-top:2rem;">
    Payment was cancelled. You can close this window.
</p>
</body>
</html>
