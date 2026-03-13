import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    lock: false
  }
})

// ============ PROFILE HELPERS ============

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// ============ EXAM HELPERS ============

export async function saveExam(examData) {
  const { data, error } = await supabase
    .from('exams')
    .insert(examData)
    .select()
    .single()
  return { data, error }
}

export async function getUserExams(userId, limit = 20) {
  const { data, error } = await supabase
    .from('exams')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

export async function checkExamSeedExists(seed) {
  const { data, error } = await supabase
    .from('exams')
    .select('id')
    .eq('exam_seed', seed)
    .maybeSingle()
  return { exists: !!data, error }
}

export async function trackExamDownload(examId, userId) {
  // Track exam download by updating metadata
  const { data, error } = await supabase
    .from('exams')
    .update({
      download_count: supabase.raw('download_count + 1'),
      last_downloaded_at: new Date().toISOString()
    })
    .eq('id', examId)
    .eq('user_id', userId)
    .select()
    .single()
  return { data, error }
}

// ============ RESULTS HELPERS ============

export async function saveExamResult(resultData) {
  const { data, error } = await supabase
    .from('exam_results')
    .insert(resultData)
    .select()
    .single()
  return { data, error }
}

export async function getUserResults(userId) {
  const { data, error } = await supabase
    .from('exam_results')
    .select('*, exams(subject, created_at)')
    .eq('student_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ============ PAYMENT HELPERS ============

export async function createPaymentRecord(paymentData) {
  const { data, error } = await supabase
    .from('payments')
    .insert(paymentData)
    .select()
    .single()
  return { data, error }
}

export async function activateSubscription(userId, months = 1) {
  const expiryDate = new Date()
  expiryDate.setMonth(expiryDate.getMonth() + months)

  const { data, error } = await supabase
    .from('profiles')
    .update({
      subscription_status: 'active',
      subscription_expiry: expiryDate.toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// ============ DEVICE SESSION HELPERS ============

export async function registerDeviceSession(userId, fingerprint, ipAddress, userAgent) {
  // Count existing active sessions
  const { count } = await supabase
    .from('device_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_active', true)

  if (count >= 2) {
    // Log suspicious activity
    await logSuspiciousActivity(userId, 'multiple_devices', {
      fingerprint,
      ip: ipAddress,
      existing_sessions: count
    })
    return { error: 'MAX_DEVICES_REACHED', count }
  }

  const sessionToken = crypto.randomUUID()
  const { data, error } = await supabase
    .from('device_sessions')
    .insert({
      user_id: userId,
      session_token: sessionToken,
      browser_fingerprint: fingerprint,
      ip_address: ipAddress,
      user_agent: userAgent
    })
    .select()
    .single()

  return { data, error, sessionToken }
}

export async function invalidateOtherSessions(userId, currentToken) {
  const { error } = await supabase
    .from('device_sessions')
    .update({ is_active: false })
    .eq('user_id', userId)
    .neq('session_token', currentToken)
  return { error }
}

// ============ SUSPICIOUS ACTIVITY ============

export async function logSuspiciousActivity(userId, activityType, details) {
  await supabase
    .from('suspicious_activity')
    .insert({
      user_id: userId,
      activity_type: activityType,
      details
    })
}

// ============ ADMIN HELPERS ============

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function suspendUser(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_suspended: true, subscription_status: 'suspended' })
    .eq('id', userId)
    .select()
    .single()

  // Invalidate all sessions
  await supabase
    .from('device_sessions')
    .update({ is_active: false })
    .eq('user_id', userId)

  return { data, error }
}

export async function getSuspiciousActivity() {
  const { data, error } = await supabase
    .from('suspicious_activity')
    .select('*, profiles(email, full_name)')
    .eq('resolved', false)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getRevenueData() {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('status', 'success')
    .order('created_at', { ascending: false })
  return { data, error }
}
