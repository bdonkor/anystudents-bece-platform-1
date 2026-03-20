import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import { BookOpen, Eye, EyeOff, AlertCircle, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col bg-[#fafaf5]">
      <Helmet>
        <title>Login | Access Your AnyStudents Dashboard</title>
        <meta name="description" content="Login to AnyStudents to continue your BECE or WASSCE preparation. Practice with standard mock exams, view marking schemes, and track your progress." />
        <link rel="canonical" href="https://mockexams.anystudents.com/login" />
      </Helmet>
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-700 no-print" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-700 rounded-3xl shadow-xl shadow-brand-700/20 mb-6">
              <BookOpen size={40} className="text-gold-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-700 mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="font-body text-gray-500 text-lg">
              Securely access your academic portal
            </p>
          </div>

          {/* Premium Card with Outline Effect */}
          <div className="bg-white rounded-3xl p-1 shadow-2xl shadow-brand-700/10 border border-brand-700/5 overflow-hidden">
            <div className="border-2 border-brand-700/10 rounded-[1.4rem] p-8 md:p-10">
              
              {/* Official Badge */}
              <div className="flex items-center justify-center gap-2 bg-brand-700 text-gold-400 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-widest mb-10">
                <ShieldCheck size={14} />
                <span>Authorized Access Only</span>
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-8 text-red-800 text-sm animate-shake">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="kofi@example.com"
                      className="input-field pl-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 font-body text-lg transition-all"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-bold text-brand-700 uppercase tracking-wider font-display">Password</label>
                    <Link to="/forgot-password" title="Recover your access" className="text-sm text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4 transition-all">
                      Forgot Access?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="········"
                      className="input-field pl-12 pr-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 font-body text-lg transition-all"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-700 transition-colors p-2">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-[#0f172a] text-gold-500 font-display font-bold text-lg h-16 rounded-2xl shadow-xl shadow-brand-700/20 hover:bg-[#1e293b] hover:shadow-brand-700/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  {loading ? (
                    <><div className="spinner !w-6 !h-6 !border-3 !border-t-gold-500 !border-gold-500/20" /> Authorizing...</>
                  ) : (
                    <>
                      <span>Enter Academic Portal</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-500 font-body">
                  New to the platform?{' '}
                  <Link to="/register" className="text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4">Register free portal</Link>
                </p>
                
                {/* Ghana Heritage Accent */}
                <div className="flex gap-1.5 h-1">
                  <div className="w-12 bg-[#CE1126] rounded-full" />
                  <div className="w-12 bg-[#FCD116] rounded-full" />
                  <div className="w-12 bg-[#006B3C] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
