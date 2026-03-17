# 📧 Weekly Parent/Guardian Reports - Complete Setup Guide

Your Parent/Guardian Reports feature is **fully implemented** in the codebase! This guide will help you deploy it to production.

## 🎯 What This Feature Does

- **Automatically emails parents/guardians every Friday at 4:00 PM GMT**
- Includes weekly statistics: exams taken, average score, weak subjects
- Beautiful HTML email template with your branding
- Only sends to students with active subscriptions and a guardian email set

---

## ✅ Pre-Deployment Checklist

### What's Already Done:
- ✅ Frontend UI in Student Dashboard (Performance tab)
- ✅ Save guardian email functionality
- ✅ Edge function code (`supabase/functions/weekly-report/index.ts`)
- ✅ SQL migration files created
- ✅ Updated schema.sql with guardian_email column

### What You Need:
- [ ] Resend API Key (free at [resend.com](https://resend.com))
- [ ] Supabase CLI installed (or use npx)
- [ ] 5 minutes to run deployment commands

---

## 🚀 Quick Setup (3 Steps)

### Option A: Automated Setup (Windows)

1. **Get your Resend API Key** from [resend.com](https://resend.com/api-keys)
2. **Run the setup script:**
   ```bash
   setup-weekly-reports.bat
   ```
3. **Follow the prompts** and paste your Resend API key when asked

### Option B: Manual Setup

#### Step 1: Add Database Column

Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/sql) and run:

```sql
-- Add guardian_email column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS guardian_email TEXT;

COMMENT ON COLUMN profiles.guardian_email IS 'Email address of parent/guardian to receive weekly progress reports';
```

Or simply run the migration file:
```bash
# Copy and paste contents from:
supabase/migrations/add_guardian_email.sql
```

#### Step 2: Deploy Edge Function

```bash
# Deploy the function
npx supabase functions deploy weekly-report

# Set your Resend API key (get from resend.com)
npx supabase secrets set RESEND_API_KEY=re_your_actual_key_here
```

#### Step 3: Schedule Friday Automation

Go back to your [Supabase SQL Editor](https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/sql) and run:

```sql
SELECT
  cron.schedule(
    'send-friday-parent-reports',
    '0 16 * * 5', -- Every Friday at 16:00 (4:00 PM GMT)
    $$
    SELECT
      net.http_post(
          url:='https://wtvdkmtmjevcimmpjcmg.supabase.co/functions/v1/weekly-report',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmRrbXRtamV2Y2ltbXBqY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMjg3MzYsImV4cCI6MjA4ODgwNDczNn0.Tl6KWb7iMCCFj0-aF9MraluxwyHSV08ZFxpKF21rTyY"}'::jsonb
      ) AS request_id;
    $$
  );
```

Or run the migration file:
```bash
# Copy and paste contents from:
supabase/migrations/schedule_weekly_reports.sql
```

---

## 🧪 Testing the Feature

### Before Testing:
1. Make sure you've completed all 3 setup steps above
2. Log into your platform as a student
3. Go to the **Performance** tab in Student Dashboard
4. Enter a test email address (like your own email)
5. Take at least 1 practice exam so there's data to report

### Manual Test (Don't Wait for Friday!):

**Option A: Use the test script (Windows)**
```bash
test-weekly-report.bat
```

**Option B: Manual curl command**
```bash
curl -X POST https://wtvdkmtmjevcimmpjcmg.supabase.co/functions/v1/weekly-report \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmRrbXRtamV2Y2ltbXBqY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMjg3MzYsImV4cCI6MjA4ODgwNDczNn0.Tl6KWb7iMCCFj0-aF9MraluxwyHSV08ZFxpKF21rTyY" \
  -H "Content-Type: application/json"
```

**What to expect:**
- If successful, you'll get: `{"success":true,"emailsSent":1}`
- Check your email inbox for the weekly report!
- The email will have a beautiful design with stats and recommendations

---

## 📊 How It Works

1. **Every Friday at 4 PM GMT**, the cron job triggers the edge function
2. The function queries all profiles with:
   - `guardian_email` not null
   - `subscription_status = 'active'`
3. For each student, it:
   - Gets exam results from the last 7 days
   - Calculates average score and exams taken
   - Identifies weakest subject for recommendations
   - Sends a beautiful HTML email to the guardian
4. Parents receive an email like this:

```
┌─────────────────────────────────────┐
│   AnyStudents Weekly Progress       │
│                                     │
│   Exams Taken: 5                    │
│   Average Score: 72%                │
│                                     │
│   💡 Recommendation:                │
│   Focus more on Mathematics         │
└─────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### Edge function deployment fails
```bash
# Make sure Supabase CLI is working
npx supabase --version

# Try with debug mode
npx supabase functions deploy weekly-report --debug
```

### No emails being sent
1. Check Resend API key is set: Go to Supabase Dashboard → Edge Functions → weekly-report → Secrets
2. Verify at least one student has `guardian_email` set and `subscription_status = 'active'`
3. Check the student has taken exams in the last 7 days
4. Test manually using `test-weekly-report.bat`

### Cron job not running
1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/sql)
2. Check scheduled jobs: `SELECT * FROM cron.job;`
3. If not found, re-run `schedule_weekly_reports.sql`

### Email looks wrong
The email template is in `supabase/functions/weekly-report/index.ts` lines 73-117. You can customize:
- Colors and styling
- Logo URL (currently points to your production site)
- Text content and messaging

---

## 🎨 Customization

### Change Email Frequency
Edit the cron schedule in `schedule_weekly_reports.sql`:
```sql
'0 16 * * 5'  -- Every Friday at 4 PM
'0 16 * * 1'  -- Every Monday at 4 PM
'0 9 * * 1,5' -- Monday and Friday at 9 AM
```

### Change Email Template
Edit `supabase/functions/weekly-report/index.ts` starting at line 73.

### Change "From" Email
You need to verify a domain in Resend, then update line 127:
```typescript
from: 'AnyStudents Reports <reports@anystudents.com>',
```

---

## 📝 Files Created/Modified

- ✅ `supabase/schema.sql` - Added guardian_email column
- ✅ `supabase/migrations/add_guardian_email.sql` - Migration to add column
- ✅ `supabase/migrations/schedule_weekly_reports.sql` - Cron job setup
- ✅ `setup-weekly-reports.bat` - Automated setup script
- ✅ `test-weekly-report.bat` - Manual testing script
- ✅ `WEEKLY_REPORTS_SETUP_GUIDE.md` - This guide!

---

## ✨ You're All Set!

Once deployed:
- Students can add guardian emails in the Performance tab
- Parents automatically receive updates every Friday
- You can test anytime with `test-weekly-report.bat`

**Questions?** Check the edge function logs in your [Supabase Dashboard](https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/logs/edge-functions).
