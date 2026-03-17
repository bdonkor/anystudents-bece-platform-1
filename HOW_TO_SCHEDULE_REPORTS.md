# How to Deploy automated Weekly Parent Reports

I have created an automated Supabase Edge Function to securely send emails to parents every Friday. It loops through all students with an inputted \`guardian_email\` and active subscription, calculates their weekly stats, and emails them a gorgeous progress report!

Since I don't have direct access to your Supabase keys/CLI to deploy this directly, please follow these 3 quick steps to enable the system.

### 1. Add \`guardian_email\` to your Database
Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) and run this small update to give the Profiles table the correct column to store the emails:

```sql
ALTER TABLE profiles ADD COLUMN guardian_email text;
```

### 2. Deploy the "Weekly Report" Edge Function
From this project folder in your terminal, simply deploy the function I wrote for you using the Supabase CLI:
```bash
supabase functions deploy weekly-report
```

Set up your secrets using your Resend API Key (Resend is the industry standard for sending developer emails quickly for free):
```bash
supabase secrets set RESEND_API_KEY=re_your_secret_key_here
```

### 3. Schedule the Friday Automations!
Go back to your Supabase SQL Editor and run this query utilizing \`pg_cron\` to automatically trigger the emailer to run every Friday at 4:00 PM GMT. 
*(Make sure to replace the \`project-ref\` with your actual Supabase URL and anonymous key)*

```sql
SELECT
  cron.schedule(
    'send-friday-parent-reports', 
    '0 16 * * 5', -- Every Friday at 16:00 (4:00 PM)
    $$
    SELECT
      net.http_post(
          url:='https://<your-project-ref>.supabase.co/functions/v1/weekly-report',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer <YOUR_ANON_KEY>"}'::jsonb
      ) AS request_id;
    $$
  );
```

That's it! Parents will start receiving updates automatically every week!
