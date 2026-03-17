@echo off
echo ========================================
echo Debug Weekly Report Feature
echo ========================================
echo.
echo Checking Supabase Edge Function logs...
echo.
echo Opening Supabase Dashboard - Edge Function Logs
echo Please check the logs manually for any errors.
echo.
start https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/logs/edge-functions
echo.
echo ========================================
echo What to check in the logs:
echo ========================================
echo 1. Look for "weekly-report" function calls
echo 2. Check for any error messages
echo 3. Verify the function is finding students with guardian emails
echo 4. Check if Resend API is responding
echo.
pause
