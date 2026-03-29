# Google Cloud Console Setup Guide (OAuth 2.0)

Follow these steps to configure your Google Cloud Project for the Calendar Webhook integration using OAuth 2.0.

## 1. Enable APIs
- Go to [Google Cloud Console](https://console.cloud.google.com/).
- Select your project.
- Navigate to **APIs & Services > Library**.
- Search for and **Enable** the **Google Calendar API**.

## 2. Configure OAuth Consent Screen
- Navigate to **APIs & Services > OAuth consent screen**.
- Choose **Internal** (if within Google Workspace) or **External**.
- Fill in the required App Information.
- **Scopes**: Add `.../auth/calendar.readonly`.
- **Test Users**: If using "External" and "Testing" mode, add your email address here.

## 3. Create OAuth 2.0 Credentials
- Navigate to **APIs & Services > Credentials**.
- Click **Create Credentials > OAuth client ID**.
- Select **Web application**.
- **Name**: `BKX Website Calendar Integration`.
- **Authorized redirect URIs**: Add `https://bkxlabs.com/api/google/callback`.
- Click **Create** and download the JSON file (keep it safe).

## 4. Register Verified Domain
- Navigate to **APIs & Services > Domain Verification**.
- Click **Add Domain** and enter `https://bkxlabs.com`.
- **Note**: This domain must be verified in your Google Search Console.

## 5. Update Environment Variables (.env)
Add the following to your server's `.env` file:
```env
GOOGLE_CLIENT_ID=180015269257-i225c1doi3f46i1poja7ne1fu0i2lj6u.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_from_json
GOOGLE_REDIRECT_URL=https://bkxlabs.com/api/google/callback
GOOGLE_WEBHOOK_TOKEN=your_random_secure_token
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
```

## 6. Authenticate One-Time
After deploying the code:
1. Visit `https://bkxlabs.com/api/google/auth`.
2. Login with your Google account and grant permissions.
3. You will see a success message. The `refresh_token` is now stored in your database.

## 7. Start Watching
Run the `watch_calendar_script.php` once to start receiving notifications.
