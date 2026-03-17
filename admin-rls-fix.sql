-- Run this in your Supabase SQL Editor to allow Admins to see all users

-- 1. Create a secure function that checks if you are an admin
-- (SECURITY DEFINER allows it to check the profiles table without triggering infinite loops)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Add policies allowing admins full read/update access to the dashboard tables
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can view all suspicious activity" ON suspicious_activity FOR SELECT USING (is_admin());
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (is_admin());
CREATE POLICY "Admins can view all exams" ON exams FOR SELECT USING (is_admin());
CREATE POLICY "Admins can view all exam_results" ON exam_results FOR SELECT USING (is_admin());
