import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { KeyRound, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_APP_URL || window.location.origin}/reset-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Forgot Password | AnyStudents</title>
        <meta name="description" content="Reset your AnyStudents account password. Enter your email to receive a password reset link." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound size={28} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-1">Forgot Password?</h1>
            <p className="font-body text-gray-500">No worries, we'll send you a reset link</p>
          </div>

          <div className="card shadow-md">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm font-body">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="font-display text-xl font-bold text-ink mb-2">Check Your Email</h2>
                <p className="font-body text-gray-500 text-sm mb-1">
                  We've sent a password reset link to
                </p>
                <p className="font-body text-brand-600 font-semibold text-sm mb-4">{email}</p>
                <p className="font-body text-gray-400 text-xs mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => { setSuccess(false); setEmail('') }}
                  className="text-brand-600 font-semibold text-sm hover:underline font-body"
                >
                  Try a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="kofi@example.com"
                      className="input-field pl-10"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><div className="spinner !w-5 !h-5 !border-2" /> Sending link...</>
                  ) : 'Send Reset Link'}
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-5">
              <ArrowLeft size={14} className="text-gray-400" />
              <Link to="/login" className="text-sm text-brand-600 font-semibold hover:underline font-body">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
