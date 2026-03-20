import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import { 
  BookOpen, Eye, EyeOff, AlertCircle, CheckCircle, 
  User, Home, Mail, Lock, ShieldCheck, ChevronDown, 
  Zap, ArrowRight 
} from 'lucide-react'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    role: 'student', school: '', level: 'jhs', program: ''
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
      const { error } = await signUp(form.email, form.password, form.fullName, form.role, form.level, form.program)
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
    <div className="min-h-screen flex flex-col bg-[#fafaf5]">
      <Helmet>
        <title>Register | Join AnyStudents for BECE & WASSCE Success</title>
        <meta name="description" content="Create your AnyStudents account today. Access official-standard BECE (JHS) and WASSCE (SHS) mock exams. Start with your first mock exam for completely free." />
        <link rel="canonical" href="https://mockexams.anystudents.com/register" />
      </Helmet>
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-700 no-print" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-700 rounded-3xl shadow-xl shadow-brand-700/20 rotate-3 transform transition-transform hover:rotate-0 duration-500 mb-6">
              <BookOpen size={40} className="text-gold-400 -rotate-3 transition-transform duration-500 hover:rotate-0" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-700 mb-2 tracking-tight">
              Create Your Account
            </h1>
            <p className="font-body text-gray-500 text-lg">
              Join the official platform for Standard Mock Examinations
            </p>
          </div>

          {/* Premium Card with Outline Effect */}
          <div className="bg-white rounded-3xl p-1 shadow-2xl shadow-brand-700/10 border border-brand-700/5 overflow-hidden">
            <div className="border-2 border-brand-700/10 rounded-[1.4rem] p-8 md:p-10">
              
              {/* Official Badge */}
              <div className="flex items-center justify-center gap-2 bg-brand-700 text-gold-400 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
                <CheckCircle size={14} />
                <span>Standardized Academic Portal</span>
              </div>

              {/* Free exam alert */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 mb-8 flex items-center gap-3 text-blue-800 text-sm font-medium">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Zap size={16} className="text-blue-600" />
                </div>
                <span>Your first official-standard mock is <strong>completely free</strong></span>
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-8 text-red-800 text-sm animate-shake">
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-brand-700 mb-3 uppercase tracking-wider font-display">I am a...</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['student', 'teacher'].map(r => (
                        <button key={r} type="button"
                          onClick={() => setForm({ ...form, role: r })}
                          className={`relative py-4 px-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center gap-3
                            ${form.role === r
                              ? 'border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-700/20'
                              : 'border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200 hover:bg-white'}`}>
                          <span className="text-xl">{r === 'student' ? '🎓' : '📚'}</span>
                          <span className="font-bold font-display capitalize">{r}</span>
                          {form.role === r && <div className="absolute -top-2 -right-2 bg-gold-400 text-brand-900 rounded-full p-1 border-2 border-white shadow-sm"><CheckCircle size={12} /></div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Education Level */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-brand-700 mb-3 uppercase tracking-wider font-display">Education Level</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['jhs', 'shs'].map(lvl => (
                        <button key={lvl} type="button" onClick={() => setForm({ ...form, level: lvl })}
                          className={`relative py-4 px-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center
                            ${form.level === lvl
                              ? 'border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-700/20'
                              : 'border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200 hover:bg-white'}`}>
                          <span className="font-bold font-display uppercase text-lg">{lvl}</span>
                          <span className="text-[10px] font-medium opacity-70 uppercase tracking-widest">{lvl === 'jhs' ? 'BECE Standard' : 'WASSCE Standard'}</span>
                          {form.level === lvl && <div className="absolute -top-2 -right-2 bg-gold-400 text-brand-900 rounded-full p-1 border-2 border-white shadow-sm"><CheckCircle size={12} /></div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                        <User size={18} />
                      </div>
                      <input type="text" required placeholder="Kofi Mensah" className="input-field pl-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 transition-all font-body text-lg"
                        value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
                    </div>
                  </div>

                  {/* School Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">
                      School Name <span className="font-normal text-gray-400 text-xs lowercase italic">(optional)</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                        <Home size={18} />
                      </div>
                      <input type="text" placeholder="e.g. Achimota School" className="input-field pl-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 transition-all font-body text-lg"
                        value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} />
                    </div>
                  </div>

                  {/* Program Selection - Highers Priority for SHS */}
                  {form.level === 'shs' && (
                    <div className="md:col-span-2 animate-fade-down">
                      <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Academic Program</label>
                      <div className="relative">
                        <select required className="input-field h-14 !rounded-2xl border-gray-100 focus:border-brand-700 appearance-none font-body text-lg bg-white" 
                          value={form.program} onChange={e => setForm({ ...form, program: e.target.value })}>
                          <option value="">Select your program...</option>
                          <option value="Science">General Science</option>
                          <option value="Business">Business</option>
                          <option value="General Arts">General Arts</option>
                          <option value="Visual Arts">Visual Arts</option>
                          <option value="Home Economics">Home Economics</option>
                          <option value="Technical">Technical/Vocational</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <ChevronDown size={20} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email & Password Section */}
                  <div className="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display text-center flex items-center justify-center gap-2">
                      <div className="h-[2px] w-12 bg-gray-100" />
                      Login Credentials
                      <div className="h-[2px] w-12 bg-gray-100" />
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input type="email" required placeholder="kofi@example.com" className="input-field pl-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 font-body text-lg"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input type={showPass ? 'text' : 'password'} required placeholder="········" className="input-field pl-12 pr-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 font-body text-lg"
                        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-700 transition-colors p-2">
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-700 mb-2 uppercase tracking-wider font-display">Confirm</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-700 transition-colors">
                        <ShieldCheck size={18} />
                      </div>
                      <input type="password" required placeholder="········" className="input-field pl-12 h-14 !rounded-2xl border-gray-100 focus:border-brand-700 font-body text-lg"
                        value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
                    </div>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="bg-cream/50 p-4 rounded-2xl border border-gold-500/10">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-6 h-6 text-brand-700 border-gray-200 rounded-lg focus:ring-brand-700 cursor-pointer transition-all"
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-body leading-relaxed">
                      I solemnly agree to the{' '}
                      <Link to="/terms-of-use" target="_blank" className="text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4">
                        Terms of Use
                      </Link>
                      ,{' '}
                      <Link to="/privacy-policy" target="_blank" className="text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4">
                        Privacy Policy
                      </Link>
                      , and{' '}
                      <Link to="/refund-policy" target="_blank" className="text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4">
                        Refund Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={loading || !acceptedTerms}
                  className="w-full bg-gold-500 text-brand-900 font-display font-bold text-lg h-16 rounded-2xl shadow-xl shadow-gold-500/20 hover:bg-[#eab308] hover:shadow-gold-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  {loading ? (
                    <><div className="spinner !w-6 !h-6 !border-3 !border-t-brand-700 !border-brand-700/20" /> Initializing Portal...</>
                  ) : (
                    <>
                      <span>Generate My Portal Account</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-500 font-body">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-700 font-bold hover:underline decoration-gold-500 underline-offset-4">Secure Login</Link>
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
