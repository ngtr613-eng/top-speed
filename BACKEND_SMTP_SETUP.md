# Backend SMTP Configuration Guide

This guide explains how to configure email sending for password reset, OTP, and notification emails in the TOP_SPEED backend.

## Overview

The backend now includes:
- **Connection pooling**: Handles multiple concurrent emails
- **Automatic retries**: 3 attempts with exponential backoff (2s, 4s, 8s) to handle temporary failures
- **Graceful degradation**: If email fails, the API still responds with success (so frontend shows success messages)
- **High throughput**: Pool of 5 connections, max 100 messages per connection

## Required Environment Variables

Add these to your Vercel backend deployment settings:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TEAM_EMAIL=admin@yourdomain.com
FRONTEND_URL=https://topspeed.vercel.app

# Optional (for high-volume scenarios):
SMTP_MAX_CONNECTIONS=10
SMTP_MAX_MESSAGES=200
EMAIL_RETRY_COUNT=5
```

## Setup Steps

### Option A: Gmail SMTP (Recommended for Quick Setup)

1. **Create a Gmail App Password** (requires 2-Step Verification):
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled
   - Go to "App passwords"
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

2. **Add to Vercel**:
   - Project → Settings → Environment Variables
   - Add:
     ```
     SMTP_HOST = smtp.gmail.com
     SMTP_PORT = 587
     SMTP_USER = your-email@gmail.com
     SMTP_PASS = (paste 16-char app password here)
     TEAM_EMAIL = your-email@gmail.com
     FRONTEND_URL = https://topspeed.vercel.app
     ```

3. **Redeploy**: Projects → Deployments → select latest → click "Redeploy"

### Option B: SendGrid (Better for Production)

1. **Create SendGrid Account**:
   - Sign up at https://sendgrid.com
   - Go to Settings → API Keys
   - Create a new key with Mail Send permission
   - Copy the key

2. **Add to Vercel**:
   ```
   SMTP_HOST = smtp.sendgrid.net
   SMTP_PORT = 587
   SMTP_USER = apikey
   SMTP_PASS = SG.xxxxxxxxxxxxx (your SendGrid API key)
   TEAM_EMAIL = noreply@topspeed.app
   FRONTEND_URL = https://topspeed.vercel.app
   ```

3. **Verify Sender**: SendGrid requires verification of your sender email. Follow the verification link sent to your inbox.

### Option C: Mailgun

```
SMTP_HOST = smtp.mailgun.org
SMTP_PORT = 587
SMTP_USER = postmaster@mail.yourdomain.com
SMTP_PASS = (your Mailgun SMTP password)
TEAM_EMAIL = noreply@yourdomain.com
FRONTEND_URL = https://topspeed.vercel.app
```

## Testing

After deployment, test the endpoint:

```bash
curl -X POST https://backend-url.vercel.app/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response (regardless of email outcome):
```json
{
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

Check backend logs for email delivery status:
- ✅ means email was sent
- 📧 Retry means connection was retried
- ⚠️ means error was logged but not exposed to user

## Performance Tuning

For high-volume email scenarios (1000+ emails/day):

1. Increase connection pool:
   ```
   SMTP_MAX_CONNECTIONS = 20
   SMTP_MAX_MESSAGES = 500
   EMAIL_RETRY_COUNT = 5
   ```

2. Consider dedicated email service (SendGrid, Mailgun) with higher throughput limits

3. Monitor Vercel logs for bottlenecks

## Troubleshooting

### "Failed to send reset email"
- Check that `SMTP_USER` and `SMTP_PASS` are correct
- Verify the sending email is verified in the service (Gmail, SendGrid, etc.)
- Check Vercel logs for detailed error messages

### Emails not arriving
- Check TEAM_EMAIL and user emails are not marked as spam
- Verify `FRONTEND_URL` matches the actual frontend domain
- Test with a known email address to debug

### "SMTP connection failed"
- Ensure `SMTP_HOST` and `SMTP_PORT` are correct
- Verify firewall/network allows outbound SMTP (port 587)
- Try increasing timeouts: `SMTP_CONN_TIMEOUT=30000`

## Features in This Update

✅ **Connection pooling** - Handle 100+ concurrent emails  
✅ **Automatic retries** - Recovers from transient failures  
✅ **Graceful degradation** - Frontend UX always works even if email fails  
✅ **Detailed logging** - Track delivery status in backend logs  
✅ **High concurrency** - 5 connections × 100 messages per connection  

## API Endpoints Using Email

- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/register` - OTP verification email
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/service/send-modification-request` - Modification request notification
- `POST /api/service/send-maintenance-request` - Maintenance request notification

All endpoints now handle SMTP failures gracefully and respond with success.
