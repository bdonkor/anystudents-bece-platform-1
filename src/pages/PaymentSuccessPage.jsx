import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import { CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { activateSubscription } from '../lib/supabase'

export default function PaymentSuccessPage() {
  const { user, profile, refreshProfile: refreshAuthProfile } = useAuth()
  const [searchParams] = useSearchParams()
  const [activating, setActivating] = useState(false)
  const [activated, setActivated] = useState(false)
  const [error, setError] = useState('')

  const reference = searchParams.get('reference') || searchParams.get('trxref')

  useEffect(() => {
    if (user && reference && !activated && profile?.subscription_status !== 'active') {
      handleActivation()
    }
  }, [user, reference, profile])

  async function handleActivation() {
    setActivating(true)
    setError('')
    try {
      // 1. Call the secure Edge Function to verify and activate
      const { data, error: functionError } = await translateSupabaseError(
        supabase.functions.invoke('verify-payment', {
          body: { reference, userId: user.id }
        })
      )
      
      if (functionError) throw new Error(functionError)
      if (data?.error) throw new Error(data.error)

      // 2. Refresh local auth state
      await refreshAuthProfile()
      
      setActivated(true)
    } catch (err) {
      console.error('Activation error:', err)
      setError('We could not automatically activate your account. Please contact support with your reference: ' + reference)
    } finally {
      setActivating(false)
    }
  }

  // Small helper to handle supabase function response format
  async function translateSupabaseError(promise) {
    const res = await promise
    if (res.error) return { data: null, error: res.error.message || 'Unknown error' }
    return { data: res.data, error: null }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>Payment Success | AnyStudents</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          {activating ? (
            <div className="space-y-4">
              <Loader2 size={60} className="text-brand-600 animate-spin mx-auto" />
              <h1 className="font-display text-2xl font-bold text-ink">Activating your subscription...</h1>
              <p className="font-body text-gray-500">Please wait while we unlock your Standard access.</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-blue-600" />
              </div>
              <h1 className="font-display text-3xl font-bold text-ink mb-3">
                {error ? 'Payment Received' : 'Payment Successful! 🎉'}
              </h1>
              
              {error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                  <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-red-800 text-sm">Action Required</p>
                    <p className="text-red-700 text-xs mt-1 leading-relaxed">{error}</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-body text-gray-600 text-lg mb-2">
                    Welcome to AnyStudents Standard!
                  </p>
                  <p className="font-body text-gray-500 text-sm mb-8">
                    {profile?.subscription_status === 'active'
                      ? <>Your subscription is now active until <strong>{new Date(profile.subscription_expiry).toLocaleDateString('en-GH', { dateStyle: 'long' })}</strong>.</>
                      : 'Your payment has been processed. You now have Standard access.'
                    }
                  </p>
                </>
              )}

              <div className="card mb-6 bg-brand-50 border border-brand-200 text-left shadow-sm">
                <h3 className="font-display font-semibold text-brand-800 mb-3">You now have access to:</h3>
                <ul className="space-y-2 text-sm font-body text-brand-700">
                  {[
                    'Standard mock exams for all subjects',
                    'Unique papers every time',
                    'Full marking schemes with every exam',
                    'Performance tracker and readiness score',
                    `Timed exam mode — real ${profile?.level === 'shs' ? 'WASSCE' : 'BECE'} conditions`,
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/student" className="btn-gold w-full sm:w-auto px-10 py-4 text-base justify-center">
                Go to My Dashboard
                <ArrowRight size={18} />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
