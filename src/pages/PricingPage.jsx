import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { createPaymentRecord, activateSubscription } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle, Zap, Shield, BookOpen, Trophy, ArrowRight, Lock, Star } from 'lucide-react'

const BENEFITS = [
  'Standard mock exams — all 10 BECE subjects',
  'Unique exam paper every time',
  'Full official-standard marking schemes',
  'Timed exam mode (2-hour countdown)',
  'Performance tracker & weak topic analysis',
  'BECE readiness score',
  'Exam history — review past papers',
  'Print-ready exam papers (PDF)',
  'Valid for 30 days from payment date',
]

export default function PricingPage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function initializePaystack() {
    if (!user || !profile) {
      navigate('/register')
      return
    }

    setLoading(true)
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: import.meta.env.VITE_SUBSCRIPTION_AMOUNT || 10000,
      currency: 'GHS',
      ref: 'AM-' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: user.id
          },
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: profile.full_name
          }
        ]
      },
      callback: async (response) => {
        setLoading(true)
        try {
          // 1. Record payment in Supabase
          const { error: payError } = await createPaymentRecord({
            user_id: user.id,
            amount: (import.meta.env.VITE_SUBSCRIPTION_AMOUNT || 10000) / 100,
            reference: response.reference,
            status: 'success',
            payment_method: 'paystack',
            details: response
          })

          if (payError) throw payError

          // 2. Activate subscription
          const { error: actError } = await activateSubscription(user.id, 1)
          if (actError) throw actError

          // 3. Refresh and redirected
          await refreshProfile()
          navigate('/student?payment=success')
        } catch (err) {
          console.error('Payment activation error:', err)
          setError('Payment successful but activation failed. Please contact support.')
        } finally {
          setLoading(false)
        }
      },
      onClose: () => {
        setLoading(false)
      }
    })
    handler.openIframe()
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Pricing | Standard BECE Practice & Mock Exams | AnyStudents</title>
        <meta name="description" content="Affordable plans for JHS 3 students. Unlock unlimited standard BECE mock exams for all 10 subjects. Get instant marking schemes and performance tracking." />
        <link rel="canonical" href="https://anystudents.com/pricing" />
      </Helmet>
      <Navbar />

      {/* Header */}
      <section className="bg-brand-700 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Standard BECE Practice
          </h1>
          <p className="font-body text-white/70 text-lg">
            One simple plan. Full access to everything. Cancel anytime.
          </p>
        </div>
      </section>

      <div className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Pricing Card */}
          <div className="card border-2 border-brand-600 shadow-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gold-500 text-brand-800 text-xs font-bold px-4 py-1 rounded-full font-mono tracking-wide">
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-6 pt-2">
              <div className="font-display text-lg font-semibold text-brand-600 mb-1">BECE Standard Practice</div>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="font-display text-5xl font-bold text-ink">GH₵{(import.meta.env.VITE_SUBSCRIPTION_AMOUNT || 10000) / 100}</span>
                <span className="text-gray-400 font-body mb-1.5">/month</span>
              </div>
              <p className="text-sm text-gray-500 font-body">30 days from payment date</p>
            </div>

            <ul className="space-y-3 mb-8">
              {BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-2.5 text-sm font-body text-gray-700">
                  <CheckCircle size={16} className="text-brand-500 mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700 font-body mb-4">
                {error}
              </div>
            )}

            {!user ? (
              <Link to="/register" className="btn-gold w-full justify-center py-4 text-base">
                Register to Subscribe
                <ArrowRight size={18} />
              </Link>
            ) : profile?.subscription_status === 'active' ? (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <CheckCircle size={24} className="text-blue-500 mx-auto mb-2" />
                <p className="font-display font-semibold text-blue-800">You're subscribed!</p>
                <p className="text-xs text-blue-600 font-body mt-1">
                  Expires: {new Date(profile.subscription_expiry).toLocaleDateString('en-GH', { dateStyle: 'long' })}
                </p>
                <Link to="/student" className="btn-primary mt-3 w-full justify-center">Go to Dashboard</Link>
              </div>
            ) : (
              <button onClick={initializePaystack} disabled={loading}
                className="btn-gold w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-gold">
                {loading ? (
                  <><div className="spinner !w-5 !h-5 !border-2 !border-t-brand-700" /> Opening Payment...</>
                ) : (
                  <><Lock size={18} /> Unlock Standard Exams — GH₵{(import.meta.env.VITE_SUBSCRIPTION_AMOUNT || 10000) / 100}</>
                )}
              </button>
            )}

            <p className="text-center text-xs text-black font-bold mt-4 font-body flex items-center justify-center gap-1.5 uppercase tracking-wider">
              <Shield size={14} className="text-brand-500" /> Secured by Paystack · Mobile Money accepted
            </p>
          </div>

          {/* Benefits side */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-4">Why AnyStudents?</h2>
              <div className="space-y-4">
                {[
                  { icon: <Zap size={20} className="text-gold-500" />, title: 'Official-Format Mock Exams', desc: 'Every exam matches the real BECE format. Questions follow official national standards.' },
                  { icon: <Trophy size={20} className="text-gold-500" />, title: 'Track Real Progress', desc: 'See your improvement over time. Identify weak topics before it is too late.' },
                  { icon: <BookOpen size={20} className="text-gold-500" />, title: 'Never Repeat a Question', desc: 'Our uniqueness engine ensures every exam paper is different. Practice as many times as you need.' },
                  { icon: <Shield size={20} className="text-gold-500" />, title: 'Mobile Money Accepted', desc: 'Pay easily with MTN Mobile Money, Vodafone Cash, or AirtelTigo Money through Paystack.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center shrink-0 border border-brand-100">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-ink text-sm">{item.title}</div>
                      <div className="text-gray-500 text-sm font-body leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-gold-50 border-2 border-gold-500/20 shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gold-500/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex gap-4 relative z-10">
                <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center shrink-0 shadow-md border border-brand-600">
                  <Star size={24} className="text-white fill-white" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-brand-800 text-lg mb-0.5">Start Practising Today</h4>
                  <p className="font-body text-brand-700 text-sm leading-relaxed">
                    <strong className="text-brand-900">Free exam included:</strong> Every new account gets one free BECE mock exam. Try the quality first, then decide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
