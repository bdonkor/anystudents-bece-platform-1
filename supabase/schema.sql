-- ============================================
-- ANYSTUDENTS BECE PLATFORM - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ PROFILES TABLE ============
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  school TEXT,
  level TEXT DEFAULT 'jhs' CHECK (level IN ('jhs', 'shs')),
  program TEXT,
  free_exam_used BOOLEAN DEFAULT false,
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('inactive', 'active', 'suspended')),
  subscription_expiry TIMESTAMPTZ,
  exam_count_today INTEGER DEFAULT 0,
  exam_count_reset_date DATE DEFAULT CURRENT_DATE,
  is_suspended BOOLEAN DEFAULT false,
  guardian_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ DEVICE SESSIONS TABLE ============
CREATE TABLE device_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  browser_fingerprint TEXT,
  ip_address TEXT,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ EXAMS TABLE ============
CREATE TABLE exams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  level TEXT DEFAULT 'jhs' CHECK (level IN ('jhs', 'shs')),
  version TEXT DEFAULT 'A',
  exam_content JSONB NOT NULL,
  exam_seed TEXT UNIQUE NOT NULL,
  is_validated BOOLEAN DEFAULT false,
  score INTEGER,
  time_taken INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ EXAM RESULTS TABLE ============
CREATE TABLE exam_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_marks INTEGER NOT NULL DEFAULT 50,
  percentage NUMERIC(5,2),
  weak_topics TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ PAYMENTS TABLE ============
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  paystack_reference TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'GHS',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  subscription_months INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ SUSPICIOUS ACTIVITY TABLE ============
CREATE TABLE suspicious_activity (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ CLASS ASSIGNMENTS TABLE ============
CREATE TABLE class_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  assigned_to UUID[] DEFAULT '{}',
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============ ROW LEVEL SECURITY ============
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE suspicious_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_assignments ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Exams: users can only see their own exams
CREATE POLICY "Users can read own exams"
  ON exams FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exams"
  ON exams FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Results: students see own results
CREATE POLICY "Users can read own results"
  ON exam_results FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Users can insert own results"
  ON exam_results FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Payments: users see own payments
CREATE POLICY "Users can read own payments"
  ON payments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============ FUNCTIONS ============

-- Auto-create profile on user signup
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Reset daily exam count
CREATE OR REPLACE FUNCTION reset_daily_exam_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.exam_count_reset_date < CURRENT_DATE THEN
    NEW.exam_count_today := 0;
    NEW.exam_count_reset_date := CURRENT_DATE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_daily_reset
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE reset_daily_exam_count();

-- ============ INDEXES ============
CREATE INDEX idx_exams_user_id ON exams(user_id);
CREATE INDEX idx_exams_subject ON exams(subject);
CREATE INDEX idx_exam_results_student_id ON exam_results(student_id);
CREATE INDEX idx_device_sessions_user_id ON device_sessions(user_id);
CREATE INDEX idx_suspicious_activity_user_id ON suspicious_activity(user_id);
