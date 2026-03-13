import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import { BookOpen, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    role: 'student', school: ''
  })
  const [showPass, setShowPass] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!acceptedTerms) {
      return setError('You must accept the Terms of Use and Privacy Policy to continue.')
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.')
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.')
    }
    setLoading(true)
    try {
      const { error } = await signUp(form.email, form.password, form.fullName, form.role)
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-blue-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Check Your Email!</h2>
            <p className="font-body text-gray-600 mb-6">
              We sent a confirmation link to <strong>{form.email}</strong>.
              Click the link to activate your account, then login.
            </p>
            <Link to="/login" className="btn-primary">Go to Login</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Register | Get Started Free | AnyStudents BECE</title>
        <meta name="description" content="Create your AnyStudents account today. Get your first BECE mock exam for free. Join thousands of JHS 3 students preparing for their final exams." />
        <link rel="canonical" href="https://anystudents.com/register" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-1">Get Started Free</h1>
            <p className="font-body text-gray-500">Create your account today</p>
          </div>

          <div className="card shadow-md">
            {/* Free exam badge */}
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-5 text-blue-700 text-sm font-body">
              <CheckCircle size={15} />
              <span>Your first mock exam is <strong>completely free</strong> — no card needed</span>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm font-body">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Full Name</label>
                <input type="text" required placeholder="Kofi Mensah" className="input-field"
                  value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  {['student', 'teacher'].map(r => (
                    <button key={r} type="button"
                      onClick={() => setForm({ ...form, role: r })}
                      className={`py-2.5 px-4 rounded-lg border-2 text-sm font-semibold font-body transition-all capitalize
                        ${form.role === r
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {r === 'student' ? '🎓 Student' : '📚 Teacher'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">
                  School Name <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input type="text" placeholder="e.g. Achimota Junior High School" className="input-field"
                  value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Email Address</label>
                <input type="email" required placeholder="kofi@example.com" className="input-field"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} required
                    placeholder="At least 6 characters" className="input-field pr-10"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Confirm Password</label>
                <input type="password" required placeholder="Repeat your password" className="input-field"
                  value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-600 font-body">
                    I agree to the{' '}
                    <Link to="/terms-of-use" target="_blank" className="text-brand-600 font-semibold hover:underline">
                      Terms of Use
                    </Link>
                    ,{' '}
                    <Link to="/privacy-policy" target="_blank" className="text-brand-600 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    , and{' '}
                    <Link to="/refund-policy" target="_blank" className="text-brand-600 font-semibold hover:underline">
                      Refund Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button type="submit" disabled={loading || !acceptedTerms}
                className="btn-gold w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <><div className="spinner !w-5 !h-5 !border-2 !border-t-brand-700" /> Creating Account...</>
                ) : 'Create Free Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5 font-body">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-600 font-semibold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
