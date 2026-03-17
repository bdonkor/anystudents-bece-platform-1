-- Add guardian_email column to profiles table for weekly parent reports
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS guardian_email TEXT;

-- Add comment for documentation
COMMENT ON COLUMN profiles.guardian_email IS 'Email address of parent/guardian to receive weekly progress reports';
