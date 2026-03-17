-- SET USER AS ADMIN
-- User: Daniel Donkor
-- Email: calebendk1@gmail.com

UPDATE profiles 
SET role = 'admin' 
WHERE email = 'calebendk1@gmail.com';

-- Verification:
-- SELECT id, email, full_name, role FROM profiles WHERE email = 'calebendk1@gmail.com';
