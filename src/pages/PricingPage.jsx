import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { createPaymentRecord, activateSubscription } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  CheckCircle, Zap, Shield, BookOpen, Trophy,
  ArrowRight, Lock, Star, Clock, FileText,
  BarChart2, Smartphone, BadgeCheck, ChevronDown
} from 'lucide-react'

const BENEFITS = [
  { text: 'All JHS & SHS subjects covered', icon: <BookOpen size={15} /> },
  { text: 'Unique exam paper every time', icon: <Zap size={15} /> },
  { text: 'Full marking schemes included', icon: <FileText size={15} /> },
  { text: 'Timed exam mode (standard)', icon: <Clock size={15} /> },
  { text: 'Performance & weak topic tracker', icon: <BarChart2 size={15} /> },
  { text: 'Exam readiness score', icon: <Trophy size={15} /> },
  { text: 'Exam history & review', icon: <FileText size={15} /> },
  { text: 'Print-ready PDF papers', icon: <FileText size={15} /> },
  { text: 'Valid 30 days from payment', icon: <BadgeCheck size={15} /> },
]

const WHY_ITEMS = [
  {
    icon: <Zap size={22} className="text-gold-400" />,
    title: 'Official-Format Mock Exams',
    desc: 'Every exam matches the real WAEC format — questions follow official national standards for BECE and WASSCE.',
  },
  {
    icon: <Trophy size={22} className="text-gold-400" />,
    title: 'Track Real Progress',
    desc: 'See your improvement over time. Identify weak topics before it is too late and study smarter.',
  },
  {
    icon: <BookOpen size={22} className="text-gold-400" />,
    title: 'Never Repeat a Question',
    desc: 'Our AI engine ensures every exam paper is unique. Practice as many times as you need.',
  },
  {
    icon: <Smartphone size={22} className="text-gold-400" />,
    title: 'Mobile Money Accepted',
    desc: 'Pay easily with MTN Mobile Money, Vodafone Cash, or AirtelTigo Money through Paystack.',
  },
]

const FAQS = [
  {
    q: 'What happens after I pay?',
    a: 'Your subscription activates instantly. You can generate multiple mock exams for all subjects (BECE and WASSCE) for 30 days.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! Every new account gets one free mock exam so you can experience the quality before subscribing.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Your subscription simply expires after 30 days and you will not be charged again unless you renew.',
  },
  {
    q: 'What subjects are covered?',
    a: 'We cover all 10 BECE subjects for JHS and all Core + Elective subjects for SHS (Science, Business, Arts, etc.).',
  },
]

export default function PricingPage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const amount = (import.meta.env.VITE_SUBSCRIPTION_AMOUNT || 10000) / 100

  async function handlePaymentSuccess(response, amountInKobo) {
    console.log('Paystack: Payment successful, reference:', response.reference)
    setLoading(true)
    try {
      // We must match the column names in your Supabase 'payments' table exactly
      const { error: payError } = await createPaymentRecord({
        user_id: user.id,
        amount: amountInKobo / 100, // Store as GHS amount (e.g., 2 or 100)
        paystack_reference: response.reference, // Matches 'paystack_reference' in schema.sql
        status: 'success'
      })
      if (payError) throw payError
      const { error: actError } = await activateSubscription(user.id, 1)
      if (actError) throw actError
      await refreshProfile()
      navigate('/student?payment=success')
    } catch (err) {
      console.error('Paystack success handler error:', err)
      setError('Payment successful but activation failed. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  function initializePaystack() {
    console.log('Redirecting to Paystack Shop...')
    
    if (!user || !profile) {
      console.warn('Paystack: No user or profile found.')
      navigate('/register')
      return
    }

    // Direct redirect to Paystack Shop as requested
    window.location.href = 'https://paystack.shop/pay/mockexams'
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0b1120' }}>
      <Helmet>
        <title>Pricing | Standard BECE & WASSCE Mock Exams | AnyStudents</title>
        <meta name="description" content="Affordable plans for JHS and SHS students. Unlock standard mock exams for all BECE and WASSCE subjects. Get instant marking schemes and performance tracking." />
        <link rel="canonical" href="https://mockexams.anystudents.com/pricing" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AnyStudents Pricing - Standard Mock Exams" />
        <meta property="og:description" content="Start your 30-day standard mock exam access for only GH₵100. Best preparation for BECE and WASSCE." />
        <meta property="og:image" content="https://mockexams.anystudents.com/social-preview.png" />
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 md:py-28 text-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          borderBottom: '1px solid rgba(245,180,0,0.15)',
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,180,0,0.08) 0%, transparent 70%)', transform: 'translate(-50%,-50%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', transform: 'translate(50%,50%)' }}
        />

        <div className="relative max-w-3xl mx-auto px-6">
          <span
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(245,180,0,0.12)', color: '#f5b400', border: '1px solid rgba(245,180,0,0.3)' }}
          >
            <Star size={12} className="fill-current" /> Simple, transparent pricing
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
            Invest in Your <span style={{ color: '#f5b400' }}>Academic Success</span>
          </h1>
          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            One plan, full access, every subject. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full py-16">

        {/* ── Pricing + Why grid ── */}
        <div className="grid md:grid-cols-5 gap-8 items-start mb-20">

          {/* Pricing card — 2 cols */}
          <div
            className="md:col-span-2 relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              border: '1.5px solid rgba(245,180,0,0.4)',
              boxShadow: '0 0 60px rgba(245,180,0,0.12), 0 24px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/* Top glow bar */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #f5b400, #fbbf24, #f5b400)' }}
            />

            {/* Most popular badge */}
            <div className="flex justify-center pt-6 pb-2">
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: 'rgba(245,180,0,0.15)', color: '#f5b400', border: '1px solid rgba(245,180,0,0.35)' }}
              >
                <div className="flex items-center -ml-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold-400 text-gold-400" />)}
                </div>
                Most Popular
              </span>
            </div>

            <div className="px-7 pt-4 pb-8">
              {/* Plan name */}
              <p className="font-body text-sm text-center mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Standard Practice Plan
              </p>

              {/* Price */}
              <div className="text-center mb-7">
                <div className="flex items-end justify-center gap-1">
                  <span className="font-display text-6xl font-bold text-white leading-none">GH₵{amount}</span>
                  <span className="font-body mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>/month</span>
                </div>
                <p className="text-xs mt-2 font-mono tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  30 days from payment · no auto-renewal
                </p>
              </div>

              {/* Divider */}
              <div className="h-px mb-7" style={{ background: 'rgba(255,255,255,0.08)' }} />

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {BENEFITS.map(b => (
                  <li key={b.text} className="flex items-center gap-3 text-sm font-body" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(245,180,0,0.15)', color: '#f5b400' }}
                    >
                      <CheckCircle size={13} />
                    </span>
                    {b.text}
                  </li>
                ))}
              </ul>

              {/* Error */}
              {error && (
                <div className="rounded-xl px-4 py-3 text-sm font-body mb-4" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </div>
              )}

              {/* CTA */}
              {!user ? (
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base font-body transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #f5b400, #d97706)', color: '#0f172a', boxShadow: '0 8px 32px rgba(245,180,0,0.35)' }}
                >
                  Register to Subscribe <ArrowRight size={18} />
                </Link>
              ) : profile?.subscription_status === 'active' ? (
                <div className="rounded-2xl p-5 text-center" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <CheckCircle size={28} className="mx-auto mb-2" style={{ color: '#4ade80' }} />
                  <p className="font-display font-bold text-white text-lg">You're subscribed!</p>
                  <p className="text-xs mt-1 font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Expires: {new Date(profile.subscription_expiry).toLocaleDateString('en-GH', { dateStyle: 'long' })}
                  </p>
                  <Link
                    to="/student"
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold font-body transition-all"
                    style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
                  >
                    Go to Dashboard <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={initializePaystack}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base font-body transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, #f5b400, #d97706)', color: '#0f172a', boxShadow: '0 8px 32px rgba(245,180,0,0.35)', animation: loading ? 'none' : undefined }}
                >
                  {loading ? (
                    <><div className="spinner !w-5 !h-5 !border-2 !border-t-brand-700" /> Opening Payment...</>
                  ) : (
                    <><Lock size={18} /> Unlock Standard Exams — GH₵{amount}</>
                  )}
                </button>
              )}

              {/* Paystack badge */}
              <div className="flex items-center justify-center mt-5 text-[11px] font-mono font-bold tracking-tight md:tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <span className="text-center">Secured by Paystack · Mobile Money Accepted</span>
              </div>
            </div>
          </div>

          {/* Why column — 3 cols */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Why <span style={{ color: '#f5b400' }}>AnyStudents?</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Built specifically for Ghana JHS and SHS students preparing for national exams. Practice smarter, not harder.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {WHY_ITEMS.map(item => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 group"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 group-hover:scale-110"
                    style={{ background: 'rgba(245,180,0,0.12)', border: '1px solid rgba(245,180,0,0.2)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="font-display font-bold text-white text-base mb-1.5">{item.title}</div>
                  <div className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Free exam CTA banner */}
            <div
              className="rounded-2xl p-6 flex items-start gap-4 mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(245,180,0,0.1) 0%, rgba(245,180,0,0.05) 100%)',
                border: '1px solid rgba(245,180,0,0.25)',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: '#0f172a', border: '1.5px solid rgba(245,180,0,0.4)' }}
              >
                <Star size={22} style={{ color: '#f5b400' }} className="fill-current" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-lg mb-1">Start Practising Today — Free</h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Every new account gets <strong className="text-white">one free mock exam</strong>. Try the quality first, then decide whether to subscribe.
                </p>
                {!user && (
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold font-body transition-colors hover:opacity-80"
                    style={{ color: '#f5b400' }}
                  >
                    Create free account <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          className="rounded-3xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x mb-20"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', '--tw-divide-opacity': '0.08' }}
        >
          {[
            { value: '35+', label: 'Subjects Covered' },
            { value: '40', label: 'Objective Questions' },
            { value: '30', label: 'Days of Access' },
            { value: '100%', label: 'Unique Questions' },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="font-display text-4xl font-bold mb-1" style={{ color: '#f5b400' }}>{stat.value}</div>
              <div className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-center mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Everything you need to know before subscribing.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: openFaq === i ? 'rgba(245,180,0,0.06)' : 'rgba(255,255,255,0.03)',
                  border: openFaq === i ? '1px solid rgba(245,180,0,0.3)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-white text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: '#f5b400',
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-20 rounded-3xl py-14 px-6 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1.5px solid rgba(245,180,0,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,180,0,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Pass Your Exams?
            </h2>
            <p className="font-body text-lg mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Join students already practising with AnyStudents. Start with a free exam today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-body text-base transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f5b400, #d97706)', color: '#0f172a', boxShadow: '0 8px 32px rgba(245,180,0,0.3)' }}
                  >
                    <Zap size={18} /> Get Started Free
                  </Link>
                  <button
                    onClick={initializePaystack}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-body text-base transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <Lock size={18} /> Subscribe Now — GH₵{amount}
                  </button>
                </>
              ) : profile?.subscription_status === 'active' ? (
                <Link
                  to="/student"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-body text-base transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f5b400, #d97706)', color: '#0f172a', boxShadow: '0 8px 32px rgba(245,180,0,0.3)' }}
                >
                  <Zap size={18} /> Go to Dashboard
                </Link>
              ) : (
                <button
                  onClick={initializePaystack}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold font-body text-base transition-all hover:scale-105 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #f5b400, #d97706)', color: '#0f172a', boxShadow: '0 8px 32px rgba(245,180,0,0.3)' }}
                >
                  <Lock size={18} /> Unlock Standard Exams — GH₵{amount}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
