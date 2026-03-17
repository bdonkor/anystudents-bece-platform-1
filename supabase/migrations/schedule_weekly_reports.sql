-- Schedule weekly parent reports to run every Friday at 4:00 PM GMT
-- This uses pg_cron to automatically trigger the edge function

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
