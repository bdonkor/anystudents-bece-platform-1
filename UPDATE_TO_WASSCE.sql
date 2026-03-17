-- ============================================
-- ANYSTUDENTS EXPANSION: BECE & WASSCE SUPPORT
-- ============================================
-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Update Tables
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'jhs' CHECK (level IN ('jhs', 'shs'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS program TEXT;
ALTER TABLE exams ADD COLUMN IF NOT EXISTS level TEXT DEFAULT 'jhs' CHECK (level IN ('jhs', 'shs'));

-- 2. Update the Profile Creation Trigger
-- This ensures that when a new user signs up, their level and program 
-- (selected during registration) are saved to their profile.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role, level, program)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'level', 'jhs'),
    NEW.raw_user_meta_data->>'program'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. (Optional) Update existing users to JHS if they don't have a level
UPDATE profiles SET level = 'jhs' WHERE level IS NULL;
UPDATE exams SET level = 'jhs' WHERE level IS NULL;
