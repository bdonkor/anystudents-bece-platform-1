@echo off
echo ========================================
echo Testing Weekly Report Email Function
echo ========================================
echo.
echo This will manually trigger the weekly report function to test if it works.
echo Make sure you have:
echo 1. Deployed the edge function
echo 2. Set the RESEND_API_KEY
echo 3. Added a guardian email for at least one student
echo 4. That student has taken exams in the last 7 days
echo.
pause
echo.
echo Triggering the weekly report function...
echo.

curl -X POST https://wtvdkmtmjevcimmpjcmg.supabase.co/functions/v1/weekly-report ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmRrbXRtamV2Y2ltbXBqY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMjg3MzYsImV4cCI6MjA4ODgwNDczNn0.Tl6KWb7iMCCFj0-aF9MraluxwyHSV08ZFxpKF21rTyY" ^
  -H "Content-Type: application/json"

echo.
echo.
echo ========================================
echo Check the email you configured to see if you received the report!
echo ========================================
echo.
pause
