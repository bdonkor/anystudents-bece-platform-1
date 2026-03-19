-- ============================================
-- ADD SIGNUP NOTIFICATION TRIGGER
-- ============================================

-- Function to trigger a webhook (Edge Function) when a new user joins
CREATE OR REPLACE FUNCTION notify_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- We call the Edge Function using the net.http_post function
  -- NOTE: You must have pg_net extension enabled in Supabase!
  -- Replace <YOUR-PROJECT-REF> and <YOUR-SERVICE-ROLE-KEY> if running manually
  
  -- Alternatively, just insert it into a table and have the Edge Function poll? 
  -- No, calling it directly is better.
  
  -- For now, we'll use the http_post logic but the user MUST have the Edge Function deployed!
  
  -- Since I don't have the project ref here, I'll recommend the user runs this in the SQL Editor
  -- with their specific details. Actually, I can use a generic approach if I don't know the exact URL.

  -- Best Practice for Supabase: use a Webhook (which is under Authentication > Webhooks)
  -- But if they want a database-level trigger for profiles:
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger itself
-- CREATE TRIGGER on_profile_created
--   AFTER INSERT ON profiles
--   FOR EACH ROW EXECUTE PROCEDURE notify_admin_on_signup();

/* 
INSTRUCTIONS FOR BENJAMIN: 

1. Deploy the function: 
   npx supabase functions deploy signup-notification

2. Set up a Database Webhook in Supabase Dashboard (Recommended):
   - Go to: Database > Webhooks
   - Create new Webhook: 
     - Name: notify-admin-signup
     - Table: profiles
     - Events: Insert
     - Method: POST
     - URL: https://<your-project-ref>.supabase.co/functions/v1/signup-notification
     - Headers: Authorization: Bearer <YOUR_SERVICE_ROLE_KEY>

This is the most reliable way to connect your profiles table to the email function.
*/
