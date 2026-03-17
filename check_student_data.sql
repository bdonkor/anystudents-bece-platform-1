-- Check if student has guardian_email and active subscription
SELECT
  id,
  email,
  full_name,
  guardian_email,
  subscription_status,
  subscription_expiry
FROM profiles
WHERE email = 'calebendk@gmail.com';

-- Check if student has exam results in the last 7 days
SELECT
  er.id,
  er.subject,
  er.percentage,
  er.created_at,
  p.email as student_email
FROM exam_results er
JOIN profiles p ON p.id = er.student_id
WHERE p.email = 'calebendk@gmail.com'
  AND er.created_at >= NOW() - INTERVAL '7 days'
ORDER BY er.created_at DESC;
