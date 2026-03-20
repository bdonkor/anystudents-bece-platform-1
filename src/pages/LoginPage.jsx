import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import { BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data, error } = await signIn(form.email, form.password)
      if (error) throw error
      // The redirect is now primarily handled by the Auth state change in App.jsx,
      // but we'll trigger a navigation to ensure the user lands on their dashboard.
      // App.jsx will handle any deeper role-based routing.
      navigate('/student')
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Login | Access Your AnyStudents Dashboard</title>
        <meta name="description" content="Login to AnyStudents to continue your BECE or WASSCE preparation. Practice with standard mock exams, view marking schemes, and track your progress." />
        <link rel="canonical" href="https://mockexams.anystudents.com/login" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-gold-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-1">Welcome Back</h1>
            <p className="font-body text-gray-500">Login to your AnyStudents account</p>
          </div>

          <div className="card shadow-md">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm font-body">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="kofi@example.com"
                  className="input-field"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5 font-body">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="Your password"
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

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-brand-600 font-semibold hover:underline font-body">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <><div className="spinner !w-5 !h-5 !border-2" /> Logging in...</>
                ) : 'Login to Dashboard'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5 font-body">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-600 font-semibold hover:underline">
                Register free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
