import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [linkError, setLinkError] = useState(null)

  useEffect(() => {
    // 1. Check the URL hash for Supabase error params (expired/invalid links)
    const hash = window.location.hash.substring(1) // remove the #
    if (hash) {
      const params = new URLSearchParams(hash)
      const errorCode = params.get('error_code')
      const errorDescription = params.get('error_description')

      if (errorCode || params.get('error')) {
        // Supabase sent back an error — link is expired or invalid
        const friendlyMessage =
          errorCode === 'otp_expired'
            ? 'This password reset link has expired. Please request a new one.'
            : errorDescription
              ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
              : 'This reset link is invalid. Please request a new one.'
        setLinkError(friendlyMessage)
        return // don't try to listen for auth events
      }
    }

    // 2. Listen for Supabase PASSWORD_RECOVERY event (valid link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setSessionReady(true)
        }
      }
    )

    // 3. Also check if user already has a session (e.g., page refresh)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true)
    })

    // 4. Timeout — if nothing happens after 10s, suggest requesting a new link
    const timeout = setTimeout(() => {
      setSessionReady(prev => {
        if (!prev) setLinkError('Could not verify your reset link. It may have expired. Please request a new one.')
        return prev
      })
    }, 10000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: form.password,
      })
      if (error) throw error
      setSuccess(true)
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Reset Password | AnyStudents</title>
        <meta name="description" content="Set a new password for your AnyStudents account." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={28} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-1">
              {linkError ? 'Link Expired' : 'Set New Password'}
            </h1>
            <p className="font-body text-gray-500">
              {linkError ? 'Your reset link is no longer valid' : 'Choose a strong password for your account'}
            </p>
          </div>

          <div className="card shadow-md">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm font-body">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {linkError ? (
              /* ──── Expired / Invalid Link State ──── */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <h2 className="font-display text-lg font-bold text-ink mb-2">Reset Link Expired</h2>
                <p className="font-body text-gray-500 text-sm mb-6">
                  {linkError}
                </p>
                <Link to="/forgot-password"
                  className="btn-primary inline-flex items-center justify-center py-3 px-6 gap-2">
                  Request a New Link
                </Link>
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <ArrowLeft size={14} className="text-gray-400" />
                  <Link to="/login" className="text-sm text-brand-600 font-semibold hover:underline font-body">
                    Back to Login
                  </Link>
                </div>
              </div>
            ) : success ? (
              /* ──── Success State ──── */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="font-display text-xl font-bold text-ink mb-2">Password Updated!</h2>
                <p className="font-body text-gray-500 text-sm mb-4">
                  Your password has been successfully reset. Redirecting you to login...
                </p>
                <div className="spinner mx-auto" />
              </div>
            ) : !sessionReady ? (
              /* ──── Verifying State ──── */
              <div className="text-center py-8">
                <div className="spinner mx-auto mb-4" />
                <p className="font-body text-gray-500 text-sm">Verifying your reset link...</p>
                <p className="font-body text-gray-400 text-xs mt-2">
                  If this takes too long, please request a{' '}
                  <Link to="/forgot-password" className="text-brand-600 font-semibold hover:underline">new reset link</Link>.
                </p>
              </div>
            ) : (
              /* ──── Password Form ──── */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5 font-body">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      className="input-field pr-10"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Confirm your new password"
                      className="input-field pr-10"
                      value={form.confirmPassword}
                      onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><div className="spinner !w-5 !h-5 !border-2" /> Updating password...</>
                  ) : 'Reset Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
