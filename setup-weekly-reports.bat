@echo off
echo ========================================
echo AnyStudents - Weekly Reports Setup
echo ========================================
echo.

echo Step 1: Deploying weekly-report Edge Function...
echo.
npx supabase functions deploy weekly-report
if %errorlevel% neq 0 (
    echo [ERROR] Failed to deploy edge function
    pause
    exit /b 1
)
echo.
echo ✓ Edge function deployed successfully!
echo.

echo Step 2: Setting Resend API Key...
echo.
echo Please enter your Resend API Key (get it from resend.com):
set /p RESEND_KEY="Resend API Key: "
npx supabase secrets set RESEND_API_KEY=%RESEND_KEY%
if %errorlevel% neq 0 (
    echo [ERROR] Failed to set Resend API key
    pause
    exit /b 1
)
echo.
echo ✓ Resend API key configured!
echo.

echo Step 3: Running database migrations...
echo.
echo Please run these SQL files manually in your Supabase SQL Editor:
echo 1. supabase\migrations\add_guardian_email.sql
echo 2. supabase\migrations\schedule_weekly_reports.sql
echo.
echo Or you can copy and paste the SQL directly from those files.
echo.

echo ========================================
echo Setup Instructions:
echo ========================================
echo.
echo 1. Go to: https://supabase.com/dashboard/project/wtvdkmtmjevcimmpjcmg/sql
echo 2. Copy contents from: supabase\migrations\add_guardian_email.sql
echo 3. Paste and run in SQL Editor
echo 4. Copy contents from: supabase\migrations\schedule_weekly_reports.sql
echo 5. Paste and run in SQL Editor
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your weekly parent reports are now configured!
echo Reports will be sent every Friday at 4:00 PM GMT.
echo.
pause
