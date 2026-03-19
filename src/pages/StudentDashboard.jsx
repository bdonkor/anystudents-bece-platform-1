import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserExams, getUserResults, saveExam, updateProfile, activateSubscription } from '../lib/supabase'
import { generateExam, generateExamSeed, JHS_SUBJECTS, SHS_SUBJECTS, SHS_PROGRAMS } from '../lib/examGenerator'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  BookOpen, Zap, Clock, Trophy, BarChart2, ArrowRight,
  AlertTriangle, CheckCircle, History, Star, Lock,
  ChevronDown, Check, Share2, Copy, MessageCircle,
  Play, Pause, RotateCcw, Target
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SUBJECT_STYLES = {
  // JHS & Core SHS
  mathematics: { icon: '📐', colors: 'text-blue-600 bg-blue-50 border-blue-200', gradient: 'from-blue-100 to-blue-50' },
  core_math: { icon: '📐', colors: 'text-blue-600 bg-blue-50 border-blue-200', gradient: 'from-blue-100 to-blue-50' },
  english: { icon: '✍️', colors: 'text-purple-600 bg-purple-50 border-purple-200', gradient: 'from-purple-100 to-purple-50' },
  english_shs: { icon: '✍️', colors: 'text-purple-600 bg-purple-50 border-purple-200', gradient: 'from-purple-100 to-purple-50' },
  science: { icon: '🔬', colors: 'text-sky-600 bg-sky-50 border-sky-200', gradient: 'from-sky-100 to-sky-50' },
  integrated_science: { icon: '🔬', colors: 'text-sky-600 bg-sky-50 border-sky-200', gradient: 'from-sky-100 to-sky-50' },
  social: { icon: '🌍', colors: 'text-amber-600 bg-amber-50 border-amber-200', gradient: 'from-amber-100 to-amber-50' },
  social_studies_shs: { icon: '🌍', colors: 'text-amber-600 bg-amber-50 border-amber-200', gradient: 'from-amber-100 to-amber-50' },
  
  // JHS Specific
  ict: { icon: '💻', colors: 'text-indigo-600 bg-indigo-50 border-indigo-200', gradient: 'from-indigo-100 to-indigo-50' },
  rme: { icon: '🕊️', colors: 'text-orange-600 bg-orange-50 border-orange-200', gradient: 'from-orange-100 to-orange-50' },
  career_tech: { icon: '🛠️', colors: 'text-teal-600 bg-teal-50 border-teal-200', gradient: 'from-teal-100 to-teal-50' },
  creative_arts: { icon: '🎨', colors: 'text-rose-600 bg-rose-50 border-rose-200', gradient: 'from-rose-100 to-rose-50' },
  ghanaian_language: { icon: '🗣️', colors: 'text-red-600 bg-red-50 border-red-200', gradient: 'from-red-100 to-red-50' },
  french: { icon: '🇫🇷', colors: 'text-pink-600 bg-pink-50 border-pink-200', gradient: 'from-pink-100 to-pink-50' },

  // SHS Electives
  elective_math: { icon: '🧮', colors: 'text-blue-700 bg-blue-100 border-blue-300', gradient: 'from-blue-200 to-blue-100' },
  physics: { icon: '⚛️', colors: 'text-indigo-600 bg-indigo-50 border-indigo-200', gradient: 'from-indigo-100 to-indigo-50' },
  chemistry: { icon: '🧪', colors: 'text-emerald-600 bg-emerald-50 border-emerald-200', gradient: 'from-emerald-100 to-emerald-50' },
  biology: { icon: '🧬', colors: 'text-green-600 bg-green-50 border-green-200', gradient: 'from-green-100 to-green-50' },
  fin_accounting: { icon: '📊', colors: 'text-cyan-600 bg-cyan-50 border-cyan-200', gradient: 'from-cyan-100 to-cyan-50' },
  cost_accounting: { icon: '💹', colors: 'text-teal-600 bg-teal-50 border-teal-200', gradient: 'from-teal-100 to-teal-50' },
  business_mgmt: { icon: '🏢', colors: 'text-slate-600 bg-slate-50 border-slate-200', gradient: 'from-slate-100 to-slate-50' },
  economics: { icon: '📈', colors: 'text-amber-700 bg-amber-100 border-amber-300', gradient: 'from-amber-200 to-amber-100' },
  government: { icon: '🏛️', colors: 'text-red-700 bg-red-100 border-red-300', gradient: 'from-red-200 to-red-100' },
  geography: { icon: '🗺️', colors: 'text-green-700 bg-green-100 border-green-300', gradient: 'from-green-200 to-green-100' },
  history: { icon: '📜', colors: 'text-stone-600 bg-stone-50 border-stone-200', gradient: 'from-stone-100 to-stone-50' },
  literature: { icon: '📚', colors: 'text-rose-700 bg-rose-100 border-rose-300', gradient: 'from-rose-200 to-rose-100' },
  crs: { icon: '⛪', colors: 'text-orange-700 bg-orange-100 border-orange-300', gradient: 'from-orange-200 to-orange-100' },
  irs: { icon: '🕌', colors: 'text-emerald-700 bg-emerald-100 border-emerald-300', gradient: 'from-emerald-200 to-emerald-100' },
  gka: { icon: '🎨', colors: 'text-pink-700 bg-pink-100 border-pink-300', gradient: 'from-pink-200 to-pink-100' },
  graphic_design: { icon: '🖥️', colors: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200', gradient: 'from-fuchsia-100 to-fuchsia-50' },
  picture_making: { icon: '🖼️', colors: 'text-violet-600 bg-violet-50 border-violet-200', gradient: 'from-violet-100 to-violet-50' },
  textiles: { icon: '🧶', colors: 'text-yellow-700 bg-yellow-100 border-yellow-300', gradient: 'from-yellow-200 to-yellow-100' },
  sculpture: { icon: '🗿', colors: 'text-stone-700 bg-stone-100 border-stone-300', gradient: 'from-stone-200 to-stone-100' },
  ceramics: { icon: '🏺', colors: 'text-orange-600 bg-orange-50 border-orange-200', gradient: 'from-orange-100 to-orange-50' },
  mil: { icon: '🏠', colors: 'text-blue-600 bg-blue-50 border-blue-200', gradient: 'from-blue-100 to-blue-50' },
  food_nutrition: { icon: '🍱', colors: 'text-orange-500 bg-orange-50 border-orange-200', gradient: 'from-orange-100 to-orange-50' },
  clothing_textiles: { icon: '👕', colors: 'text-indigo-500 bg-indigo-50 border-indigo-200', gradient: 'from-indigo-100 to-indigo-50' },
  tech_drawing: { icon: '📐', colors: 'text-gray-700 bg-gray-100 border-gray-300', gradient: 'from-gray-200 to-gray-100' },
  building_const: { icon: '🏗️', colors: 'text-orange-800 bg-orange-100 border-orange-400', gradient: 'from-orange-200 to-orange-100' },
  metalwork: { icon: '⛓️', colors: 'text-zinc-600 bg-zinc-50 border-zinc-200', gradient: 'from-zinc-100 to-zinc-50' },
  woodwork: { icon: '🪚', colors: 'text-amber-800 bg-amber-50 border-amber-200', gradient: 'from-amber-100 to-amber-50' },
  applied_electricity: { icon: '⚡', colors: 'text-yellow-600 bg-yellow-50 border-yellow-200', gradient: 'from-yellow-100 to-yellow-50' }
}
export default function StudentDashboard() {
  const { user, profile, refreshProfile, canGenerateExam, isSubscriptionActive } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paymentSuccess = searchParams.get('payment') === 'success'
  const paystackRef = searchParams.get('reference') || searchParams.get('trxref')

  // Determine active subjects based on student level and program
  const level = profile?.level || 'jhs'
  const program = profile?.program || ''
  
  const SUBJECTS = level === 'shs' ? SHS_SUBJECTS : JHS_SUBJECTS
  
  const studentSubjects = level === 'shs' 
    ? {
        core_math: SHS_SUBJECTS.core_math,
        english_shs: SHS_SUBJECTS.english_shs,
        integrated_science: SHS_SUBJECTS.integrated_science,
        social_studies_shs: SHS_SUBJECTS.social_studies_shs,
        ...(SHS_PROGRAMS[program] || []).reduce((acc, key) => ({ ...acc, [key]: SHS_SUBJECTS[key] }), {})
      }
    : JHS_SUBJECTS

  const SUBJECT_KEYS = Object.keys(studentSubjects)

  const [activeTab, setActiveTab] = useState('generate')
  const [selectedSubject, setSelectedSubject] = useState(null)
  
  // Set initial subject when keys are available
  useEffect(() => {
    if (!selectedSubject && SUBJECT_KEYS.length > 0) {
      setSelectedSubject(SUBJECT_KEYS[0])
    }
  }, [SUBJECT_KEYS])

  // Reset selected subject if it becomes invalid for the current level/program
  useEffect(() => {
    if (selectedSubject && !SUBJECT_KEYS.includes(selectedSubject)) {
      setSelectedSubject(SUBJECT_KEYS[0])
    }
  }, [level, program, SUBJECT_KEYS])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genStatus, setGenStatus] = useState('')
  const [genProgress, setGenProgress] = useState(0)
  const [genError, setGenError] = useState('')
  const [examHistory, setExamHistory] = useState([])
  const [results, setResults] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Guardian Report State
  const [guardianEmail, setGuardianEmail] = useState(profile?.guardian_email || '')
  const [savingGuardian, setSavingGuardian] = useState(false)
  const [guardianSaved, setGuardianSaved] = useState(false)

  // Pomodoro State
  const [pomoTimeLeft, setPomoTimeLeft] = useState(25 * 60)
  const [pomoIsActive, setPomoIsActive] = useState(false)
  const [pomoMode, setPomoMode] = useState('study') // 'study' | 'shortBreak' | 'longBreak'

  useEffect(() => {
    let interval = null
    if (pomoIsActive && pomoTimeLeft > 0) {
      interval = setInterval(() => {
        setPomoTimeLeft(time => time - 1)
      }, 1000)
    } else if (pomoTimeLeft === 0) {
      setPomoIsActive(false)
      if (pomoMode === 'study') {
        setPomoMode('shortBreak')
        setPomoTimeLeft(5 * 60)
      } else {
        setPomoMode('study')
        setPomoTimeLeft(25 * 60)
      }
    }
    return () => clearInterval(interval)
  }, [pomoIsActive, pomoTimeLeft, pomoMode])

  function formatPomoTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  useEffect(() => {
    if (user) loadDashboardData()
    
    // Auto-activate subscription if coming from an external Paystack page
    if (user && paystackRef && profile?.subscription_status !== 'active') {
      handleExternalPaymentActivation()
    }
  }, [user, paystackRef])

  async function handleExternalPaymentActivation() {
    try {
      setGenStatus('Verifying payment securely...')
      
      // 1. Call the Supabase Edge Function to verify the payment with Paystack
      // This is secure because it happens on the server, not the client!
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { 
          reference: paystackRef, 
          userId: user.id 
        }
      })

      if (error) throw new Error(error.message || 'Verification failed')
      if (data.error) throw new Error(data.error)

      console.log('Payment verified successfully:', data)
      
      // 2. Clear status and refresh profile
      await refreshProfile()
      
      // 3. Navigate to success view
      navigate('/student?payment=success', { replace: true })
    } catch (err) {
      console.error('Payment verification error:', err)
      setGenError('Security Check Failed: ' + (err.message || 'Please contact support with ref ' + paystackRef))
    } finally {
      setGenStatus('')
    }
  }

  async function loadDashboardData() {
    setLoadingData(true)
    const [examsRes, resultsRes] = await Promise.all([
      getUserExams(user.id),
      getUserResults(user.id)
    ])
    if (examsRes.data) setExamHistory(examsRes.data)
    if (resultsRes.data) setResults(resultsRes.data)
    setLoadingData(false)
  }

  async function handleGenerateExam() {
    if (!canGenerateExam()) {
      navigate('/pricing')
      return
    }

    // Show disclaimer modal for first-time users
    if (!profile.free_exam_used && profile.role !== 'admin') {
      setShowDisclaimerModal(true)
      return
    }

    proceedWithGeneration()
  }

  async function proceedWithGeneration() {
    setShowDisclaimerModal(false)

    // Check daily limit
    if (profile.exam_count_today >= 20 && profile.role !== 'admin') {
      setGenError('Daily limit reached (20 exams/day). Come back tomorrow!')
      return
    }

    // Check if user already generated this subject this week (prevent exam sharing abuse)
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const recentExams = examHistory.filter(exam => {
      const examDate = new Date(exam.created_at)
      return examDate >= sevenDaysAgo && exam.subject === SUBJECTS[selectedSubject]
    })

    if (recentExams.length >= 1 && profile.role !== 'admin') {
      const lastExamDate = new Date(recentExams[0].created_at)
      const nextAvailableDate = new Date(lastExamDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      const daysRemaining = Math.ceil((nextAvailableDate - now) / (1000 * 60 * 60 * 24))

      const formattedDate = nextAvailableDate.toLocaleDateString('en-GH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      setGenError(
        `You've already practiced ${SUBJECTS[selectedSubject]} this week. ` +
        `Please wait ${daysRemaining} more day${daysRemaining > 1 ? 's' : ''} to generate another exam. ` +
        `You'll be able to practice ${SUBJECTS[selectedSubject]} again on ${formattedDate}. ` +
        `In the meantime, feel free to try other subjects!`
      )
      return
    }

    setGenerating(true)
    setGenProgress(0)
    setGenError('')
    
    let secondsElapsed = 0
    const statusInterval = setInterval(() => {
      secondsElapsed += 1
      
      // Update progress naturally
      if (secondsElapsed < 5) {
        setGenStatus('Connecting to AI exam engine...')
        setGenProgress(Math.min(10, secondsElapsed * 2))
      } else if (secondsElapsed < 30) {
        setGenStatus(`Hand-crafting your ${level.toUpperCase()} ${SUBJECTS[selectedSubject]} questions...`)
        setGenProgress(10 + Math.floor(((secondsElapsed - 5) / 25) * 50)) // 10% to 60%
      } else if (secondsElapsed < 60) {
        setGenStatus(`Almost there! Finalizing the marking scheme...`)
        setGenProgress(60 + Math.floor(((secondsElapsed - 30) / 30) * 30)) // 60% to 90%
      } else {
        setGenStatus(`Still working! Our AI is ensuring high-quality questions. Please do not refresh.`)
        setGenProgress(Math.min(98, 90 + Math.floor(((secondsElapsed - 60) / 60) * 8))) // Slow crawl to 98%
      }
    }, 1000)

    try {
      const { exam, attempt } = await generateExam(
        SUBJECTS[selectedSubject],
        selectedSubject,
        level
      )

      clearInterval(statusInterval)
      setGenStatus('Exam ready! Redirecting...')

      const seed = generateExamSeed(user.id, selectedSubject)

      const { data: savedExam, error } = await saveExam({
        user_id: user.id,
        subject: SUBJECTS[selectedSubject],
        level: level,
        version: 'A',
        exam_content: exam,
        exam_seed: seed,
        is_validated: true
      })

      if (error) throw error

      // Update free_exam_used and daily count
      if (!profile.free_exam_used) {
        await updateProfile(user.id, {
          free_exam_used: true,
          exam_count_today: (profile.exam_count_today || 0) + 1
        })
      } else {
        await updateProfile(user.id, {
          exam_count_today: (profile.exam_count_today || 0) + 1
        })
      }

      await refreshProfile()
      setGenStatus('Exam ready!')

      // Navigate to exam page
      navigate(`/exam/${savedExam.id}`)

    } catch (err) {
      clearInterval(statusInterval)
      console.error('Generation error:', err)
      setGenError(err.message || 'Failed to generate exam. Please try again.')
    } finally {
      clearInterval(statusInterval) // Extra safety
      setGenerating(false)
      setGenProgress(100) // Complete!
      setTimeout(() => {
        setGenStatus('')
        setGenProgress(0)
      }, 2000)
    }
  }

  async function handleSaveGuardianEmail() {
    setSavingGuardian(true)
    try {
      if (!guardianEmail) return
      await updateProfile(user.id, { guardian_email: guardianEmail })
      await refreshProfile()
      setGuardianSaved(true)
      setTimeout(() => setGuardianSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save guardian email', err)
    } finally {
      setSavingGuardian(false)
    }
  }

  // Compute stats
  const avgScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length)
    : null

  const subjectScores = SUBJECT_KEYS.map(key => {
    const subResults = results.filter(r => r.subject === SUBJECTS[key])
    const avg = subResults.length
      ? Math.round(subResults.reduce((s, r) => s + (r.percentage || 0), 0) / subResults.length)
      : 0
    return { subject: SUBJECTS[key].split(' ')[0], avg, count: subResults.length }
  }).filter(s => s.count > 0)

  function getReadinessScore() {
    if (!results.length) return null
    const score = avgScore
    if (score >= 70) return { level: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-50', emoji: '🏆' }
    if (score >= 55) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', emoji: '👍' }
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50', emoji: '📚' }
    return { level: 'Needs Work', color: 'text-red-600', bg: 'bg-red-50', emoji: '💪' }
  }

  const readiness = getReadinessScore()

  const TABS = [
    { id: 'generate', label: 'Generate Exam', icon: <Zap size={16} /> },
    { id: 'history', label: 'Exam History', icon: <History size={16} /> },
    { id: 'performance', label: 'Performance', icon: <BarChart2 size={16} /> },
    { id: 'focus', label: 'Focus Timer', icon: <Target size={16} /> },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8 w-full">
        {/* Payment Success Banner */}
        {paymentSuccess && (
          <div className="mb-8 animate-in zoom-in duration-500">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-1 shadow-xl shadow-green-500/20">
              <div className="bg-white/95 backdrop-blur-sm rounded-[22px] px-6 py-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden">
                {/* Decorative background star */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full blur-2xl opacity-50"></div>
                
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shrink-0 shadow-inner border border-green-200">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">
                    Payment Successful! 🎉
                  </h2>
                  <p className="font-body text-gray-600">
                    Thank you for subscribing to the <span className="font-bold text-green-700">Standard Practice Plan</span>. 
                    Your account has been upgraded and you now have full access to all {level === 'shs' ? 'WASSCE' : 'BECE'} subjects for the next 30 days.
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/student', { replace: true })}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold font-body hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 active:scale-95"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header with Gamification */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
            <div className="flex flex-col">
              <h1 className="font-display text-3xl font-bold text-ink">
                Hello, {profile?.full_name?.split(' ')[0] || 'Student'} 👋
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest ${profile?.level === 'shs' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                  {profile?.level === 'shs' ? 'WASSCE (SHS)' : 'BECE (JHS)'}
                </span>
                {profile?.level === 'shs' && profile?.program && (
                  <span className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded text-[10px] uppercase font-black tracking-widest border border-brand-200">
                    {profile.program.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>
              {/* Gamification Badge based on exams taken */}
              {examHistory.length > 0 && (
                <div className="px-3 py-1 bg-gradient-to-r from-brand-100 to-brand-50 border border-brand-200 text-brand-700 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                  {examHistory.length >= 20 ? (
                    <><Trophy size={14} className="text-gold-500" /> {profile?.level === 'shs' ? 'WASSCE' : 'BECE'} Master</>
                  ) : examHistory.length >= 10 ? (
                    <><Star size={14} className="text-purple-500" /> Dedicated Scholar</>
                  ) : examHistory.length >= 5 ? (
                    <><Zap size={14} className="text-amber-500" /> Rising Star</>
                  ) : (
                    <><BookOpen size={14} className="text-blue-500" /> Novice Learner</>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-2 mb-8">
              <p className="font-body text-gray-500 text-sm">
                {profile?.role === 'admin' ? (
                  <span className="text-brand-600 font-semibold italic">Standard Admin Access</span>
                ) : isSubscriptionActive()
                  ? `Subscription active until ${new Date(profile.subscription_expiry).toLocaleDateString('en-GH')}`
                  : profile?.free_exam_used
                    ? 'Free exam used — subscribe for Standard practice'
                    : 'Welcome! Your first exam is free'}
              </p>
              
              {/* Daily Streak Indicator */}
              <div className="hidden sm:flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full shadow-sm pr-4">
                <span className="text-lg">🔥</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-orange-800 uppercase leading-none tracking-widest mt-0.5">Study Streak</span>
                  <span className="text-sm font-bold text-orange-700 leading-none mt-0.5">{examHistory.length > 0 ? 'Day 1' : '0 Days'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {/* Mobile Streak Indicator */}
             <div className="sm:hidden flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-base">🔥</span>
                <span className="text-xs font-bold text-orange-700 leading-none">{examHistory.length > 0 ? '1 Day' : '0 Days'}</span>
             </div>
             
            {!isSubscriptionActive() && profile?.free_exam_used && (
              <Link to="/pricing" className="btn-gold">
                <Lock size={16} /> Unlock Standard — GH₵100
              </Link>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Exams Taken',
              value: examHistory.length,
              icon: <BookOpen size={22} className="text-white" />,
              bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
              iconBg: 'bg-white/20 backdrop-blur-md',
              textColor: 'text-white',
              labelColor: 'text-blue-100',
              shadow: 'shadow-lg shadow-blue-500/30'
            },
            {
              label: 'Avg Score',
              value: avgScore ? `${avgScore}%` : '—',
              icon: <Trophy size={22} className="text-white" />,
              bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600',
              iconBg: 'bg-white/20 backdrop-blur-md',
              textColor: 'text-white',
              labelColor: 'text-amber-100',
              shadow: 'shadow-lg shadow-orange-500/30'
            },
            {
              label: 'Subjects',
              value: subjectScores.length || '—',
              icon: <Star size={22} className="text-white" />,
              bgColor: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
              iconBg: 'bg-white/20 backdrop-blur-md',
              textColor: 'text-white',
              labelColor: 'text-fuchsia-100',
              shadow: 'shadow-lg shadow-purple-500/30'
            },
            {
              label: 'Readiness',
              value: readiness?.level || 'Needs Work',
              icon: <CheckCircle size={22} className="text-white" />,
              bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
              iconBg: 'bg-white/20 backdrop-blur-md',
              textColor: 'text-white',
              labelColor: 'text-emerald-100',
              shadow: 'shadow-lg shadow-teal-500/30'
            },
          ].map(stat => (
            <div key={stat.label} className={`rounded-2xl p-5 flex items-center gap-4 ${stat.bgColor} border border-white/20 ${stat.shadow} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
              {/* Decorative background shape */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500"></div>
              
              <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-inner relative z-10 border border-white/10`}>
                {stat.icon}
              </div>
              <div className="relative z-10">
                <div className={`font-display font-bold ${stat.textColor} text-2xl leading-none tracking-tight`}>{stat.value}</div>
                <div className={`text-sm font-medium ${stat.labelColor} font-body mt-1`}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Exam Format Notice */}
        <div className="card bg-blue-50 border-2 border-blue-200 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm shrink-0 mt-0.5">
              <Zap size={18} />
            </div>
            <div>
              <p className="font-body text-sm text-blue-900 leading-relaxed font-medium">
                <strong className="font-display font-extrabold text-blue-900 text-base block mb-0.5">Important Notice:</strong>
                For both BECE and WASSCE preparations, all our practice exams are set to a <span className="font-bold underline">Standard 40 Objective Questions</span>. While this may differ slightly from some traditional Part 1 structures, it is designed to provide you with a consistent and comprehensive assessment of your knowledge across all topics.
              </p>
            </div>
          </div>
        </div>

        {/* Important Message */}
        <div className="card bg-gradient-to-r from-red-50 to-rose-50 border-2 border-black mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <History size={24} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-red-600 text-base leading-relaxed">
                To revisit your previous exams taken or exams generated, click: <span className="text-red-800 uppercase tracking-tight">Exam History</span> tab
              </p>
              <p className="font-body text-sm text-red-500/90 mt-1">
                Access all your past exams, review your answers, and track your progress over time.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs - Enhanced Visibility (Full Width Horizontally) */}
        <div className="flex gap-1.5 sm:gap-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-1.5 sm:p-2 mb-8 border-2 border-gray-200 shadow-md overflow-x-auto mx-auto w-full md:w-fit justify-start md:justify-center shrink-0">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center whitespace-nowrap gap-1.5 flex-1 md:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold font-body transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 transform'
                  : 'bg-white text-gray-600 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md transform'}`}>
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tabs & Content Grid */}
        <div className={`grid grid-cols-1 gap-8 items-start ${activeTab === 'generate' ? 'max-w-xl mx-auto w-full' : ''}`}>
          <div className="flex flex-col">

            {/* GENERATE TAB - Main Card */}
            {activeTab === 'generate' && (
              <div className="card">
                <h2 className="font-display text-xl font-bold text-ink mb-1">Generate Mock Exam</h2>
                <p className="font-body text-gray-500 text-sm mb-5">
                  Unique official-standard {level === 'shs' ? 'WASSCE' : 'BECE'} paper with full marking scheme
                </p>

                <label className="block text-sm font-semibold text-ink mb-2 font-body">Select Subject</label>
                <div className="relative mb-8">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                     className={`w-full flex items-center justify-between py-4 px-5 rounded-2xl border-2 text-sm font-body font-bold transition-all duration-300 focus:outline-none focus:ring-4
                      ${isDropdownOpen 
                        ? 'border-brand-500 ring-brand-50 bg-white text-ink shadow-md scale-[1.01]' 
                        : selectedSubject ? `${SUBJECT_STYLES[selectedSubject]?.colors} hover:border-brand-300 hover:shadow-sm` : 'bg-gray-100 text-gray-400'}`}
                  >
                     <div className="flex items-center gap-3">
                      <span className="text-2xl transform transition-transform group-hover:scale-110">
                        {selectedSubject ? SUBJECT_STYLES[selectedSubject]?.icon : '📚'}
                      </span>
                      <div className="text-left">
                        <div className="text-xs uppercase tracking-widest opacity-60 mb-0.5">Selected Subject</div>
                        <div className="text-base">{selectedSubject ? SUBJECTS[selectedSubject] : 'Select a subject...'}</div>
                      </div>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brand-500' : 'text-gray-400'}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute z-20 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] max-h-[320px] overflow-y-auto p-2 animate-in fade-in slide-in-from-top-3 duration-300">
                        <div className="grid grid-cols-1 gap-1">
                          {SUBJECT_KEYS.map(key => (
                            <button
                              key={key}
                              onClick={() => {
                                setSelectedSubject(key)
                                setIsDropdownOpen(false)
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 group
                                ${selectedSubject === key 
                                  ? `bg-gradient-to-r ${SUBJECT_STYLES[key].gradient} ${SUBJECT_STYLES[key].colors} font-bold shadow-sm` 
                                  : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-ink hover:pl-5'}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl group-hover:scale-110 transition-transform">
                                  {SUBJECT_STYLES[key].icon}
                                </span>
                                {SUBJECTS[key]}
                              </div>
                              {selectedSubject === key && <Check size={18} className="text-brand-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {genError && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-sm text-red-700 font-body">
                    <AlertTriangle size={15} /> {genError}
                  </div>
                )}

                {(generating || genProgress === 100) && (
                  <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-brand-600 uppercase tracking-widest font-body">Generation Progress</span>
                       <span className={`text-xs font-black font-mono ${genProgress === 100 ? 'text-green-600' : 'text-brand-700'}`}>{genProgress}%</span>
                    </div>
                    
                    {/* The Download-style Progress Bar */}
                    <div className="h-4 w-full bg-gray-100 rounded-full border border-gray-200 p-1 flex items-center shadow-inner overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative shadow-sm
                          ${genProgress < 30 ? 'bg-blue-500' : 
                            genProgress < 70 ? 'bg-amber-500' : 
                            genProgress < 100 ? 'bg-emerald-500' : 'bg-green-600'}`}
                        style={{ width: `${genProgress}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-shimmer" 
                             style={{ animation: 'shimmer 2s infinite' }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 bg-white border border-brand-100 rounded-xl px-4 py-3 shadow-sm">
                      <div className={`spinner !w-4 !h-4 !border-2 ${genProgress === 100 ? '!border-green-600' : '!border-brand-600'} !border-t-transparent`} />
                      <span className={`text-sm font-body font-bold leading-tight ${genProgress === 100 ? 'text-green-700' : 'text-brand-800'}`}>
                        {genProgress === 100 ? 'Success! Redirecting to your exam...' : genStatus}
                      </span>
                    </div>
                  </div>
                )}

                <button onClick={handleGenerateExam} disabled={generating}
                  className="btn-gold w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed">
                  {generating ? (
                    <><div className="spinner !w-5 !h-5 !border-2 !border-t-brand-700" /> Generating...</>
                  ) : (
                    <><Zap size={18} /> Generate {SUBJECTS[selectedSubject]} Exam</>
                  )}
                </button>

                {!isSubscriptionActive() && !profile?.free_exam_used && (
                  <p className="text-center text-xs text-gray-400 mt-2 font-body flex items-center justify-center gap-1">
                    <CheckCircle size={12} className="text-blue-500" /> First exam is free
                  </p>
                )}

                {!isSubscriptionActive() && profile?.free_exam_used && (
                  <p className="text-center text-xs text-red-500 mt-2 font-body flex items-center justify-center gap-1">
                    <Lock size={12} /> Subscribe for GH₵100/month to continue
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Exam info Cards (Generate Tab Only) */}
            {activeTab === 'generate' && (
              <div className="flex flex-col gap-2.5">
                <div className="card bg-brand-50 border border-brand-100">
                  <h3 className="font-display font-semibold text-brand-800 mb-3">What you'll get</h3>
                  <ul className="space-y-2 text-sm font-body text-brand-700">
                    {[
                      '40 multiple choice questions (Section A)',
                      '5 structured theory questions (Section B)',
                      'Full marking scheme with explanations',
                      '2-hour timed exam mode',
                      'Printable PDF format',
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card border-l-4 border-amber-400">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-amber-500" />
                    <span className="font-display font-semibold text-ink">Generation time & Policy</span>
                  </div>
                  <p className="font-body text-xs text-gray-600 leading-relaxed">
                    Your exam takes <strong className="text-ink">30–60 seconds</strong> to generate. Our AI engine literally "writes" a unique paper each time just for you.
                  </p>
                  <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertTriangle size={10} /> Important: Do Not Refresh
                    </p>
                    <p className="text-[10px] text-red-600 font-medium">
                      Refreshing or leaving while generating will cancel the unique paper being built for you.
                    </p>
                  </div>
                </div>

                {/* SHARE CARD */}
                <div className="card bg-indigo-50 border-2 border-dashed border-indigo-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-indigo-900 leading-tight">Study with Friends</h3>
                      <p className="text-xs text-indigo-600 font-body">Get others to join you!</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        const message = encodeURIComponent(`I'm practicing for my ${level === 'shs' ? 'WASSCE' : 'BECE'} on AnyStudents! 🎓 Join me: https://mockexams.anystudents.com`)
                        window.open(`https://wa.me/?text=${message}`, '_blank')
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.98]"
                    >
                      <MessageCircle size={18} fill="white" /> Share on WhatsApp
                    </button>

                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText("https://mockexams.anystudents.com")
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white text-indigo-700 hover:bg-indigo-50 border-2 border-indigo-100 rounded-xl font-bold transition-all active:scale-[0.98]"
                    >
                      <Copy size={18} /> {copied ? 'Copied Link!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* HISTORY TAB */}
            {activeTab === 'history' && (
              <div className="card">
                <h2 className="font-display text-xl font-bold text-ink mb-5">Exam History</h2>
                {loadingData ? (
                  <div className="flex justify-center py-10"><div className="spinner" /></div>
                ) : examHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="font-body text-gray-400">No exams yet. Generate your first mock exam!</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary mt-4">
                      Generate Exam <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {examHistory.map(exam => (
                      <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <div className="font-display font-semibold text-ink text-sm">{exam.subject}</div>
                          <div className="font-body text-xs text-gray-400 mt-0.5">
                            {new Date(exam.created_at).toLocaleDateString('en-GH', { dateStyle: 'medium' })}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {exam.score && (
                            <span className="font-mono text-sm font-bold text-brand-600">{exam.score}%</span>
                          )}
                          <Link to={`/exam/${exam.id}`} className="btn-outline text-xs py-1.5 px-3">
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PERFORMANCE TAB */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {readiness && (
                  <div className={`card ${readiness.bg} border-0`}>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{readiness.emoji}</div>
                      <div>
                        <div className="font-body text-sm text-gray-500">{level === 'shs' ? 'WASSCE' : 'BECE'} Readiness Score</div>
                        <div className={`font-display text-3xl font-bold ${readiness.color}`}>
                          {avgScore}% — {readiness.level}
                        </div>
                        <div className="font-body text-sm text-gray-600 mt-1">
                          Based on {results.length} exam{results.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {subjectScores.length > 0 ? (
                  <div className="card">
                    <h3 className="font-display font-semibold text-ink mb-5">Performance by Subject</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={subjectScores} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="subject" tick={{ fontSize: 12, fontFamily: 'Source Serif 4' }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(val) => `${val}%`} />
                        <Bar dataKey="avg" fill="#0a4a2e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="card text-center py-12">
                    <BarChart2 size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="font-body text-gray-400">Complete exams to see your performance data.</p>
                    <button onClick={() => setActiveTab('generate')} className="btn-primary mt-4">
                      Generate Your First Exam <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {/* Guardian Weekly Reports Settings */}
                <div className="card bg-indigo-50 border-2 border-indigo-200 shadow-sm mt-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
                          <MessageCircle size={18} />
                        </span>
                        <h3 className="font-display font-bold text-indigo-900 text-lg">Parent/Guardian Reports</h3>
                      </div>
                      <p className="font-body text-sm text-indigo-700 leading-relaxed max-w-lg">
                        We can automatically email a weekly progress report to your parent or guardian every Friday. 
                        It includes exams taken, your average score, and subjects we recommend focusing on next!
                        This keeps whoever is paying for your subscription updated on your hard work.
                      </p>
                    </div>
                    <div className="w-full md:w-80 shrink-0">
                      <label className="block text-xs font-bold text-indigo-800 uppercase tracking-widest mb-1.5 pl-1">Guardian's Email</label>
                      <div className="flex flex-col gap-2">
                        <input 
                          type="email" 
                          value={guardianEmail}
                          onChange={(e) => setGuardianEmail(e.target.value)}
                          placeholder="parent@email.com"
                          className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 text-sm font-body bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                        />
                        <button 
                          onClick={handleSaveGuardianEmail}
                          disabled={savingGuardian || !guardianEmail.includes('@')}
                          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white w-full py-3 rounded-xl font-bold font-body text-sm flex justify-center items-center gap-2 transition-all shadow-md active:scale-95"
                        >
                          {savingGuardian ? (
                            <><div className="spinner !w-4 !h-4 !border-t-transparent !border-white" /> Saving...</>
                          ) : guardianSaved ? (
                            <><CheckCircle size={16} /> Saved Successfully!</>
                          ) : (
                            'Enable Weekly Reports'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FOCUS TAB */}
            {activeTab === 'focus' && (
              <div className="card text-center py-10">
                <h2 className="font-display text-2xl font-bold text-ink mb-2">Focus Mode</h2>
                <p className="font-body text-gray-500 mb-8 max-w-md mx-auto">Use the Pomodoro technique. 25 minutes of intense focus, followed by a short break. Stay sharp!</p>
                
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
                  <button 
                    onClick={() => {setPomoMode('study'); setPomoTimeLeft(25*60); setPomoIsActive(false)}}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${pomoMode === 'study' ? 'bg-red-100 text-red-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    🚀 Study (25m)
                  </button>
                  <button 
                    onClick={() => {setPomoMode('shortBreak'); setPomoTimeLeft(5*60); setPomoIsActive(false)}}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${pomoMode === 'shortBreak' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    ☕ Short Break (5m)
                  </button>
                  <button 
                    onClick={() => {setPomoMode('longBreak'); setPomoTimeLeft(15*60); setPomoIsActive(false)}}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${pomoMode === 'longBreak' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    🛌 Long Break (15m)
                  </button>
                </div>
                
                <div className={`mx-auto w-full max-w-sm rounded-[2rem] border-8 flex items-center justify-center py-12 px-4 mb-10 shadow-inner transition-colors duration-500
                  ${pomoMode === 'study' ? 'border-red-500 bg-red-50/50' : 
                    pomoMode === 'shortBreak' ? 'border-green-500 bg-green-50/50' : 
                    'border-blue-500 bg-blue-50/50'}`}>
                  <div className={`font-mono font-bold tabular-nums text-7xl sm:text-8xl tracking-tight
                    ${pomoMode === 'study' ? 'text-red-600' : 
                    pomoMode === 'shortBreak' ? 'text-green-600' : 
                    'text-blue-600'}`}>
                    {formatPomoTime(pomoTimeLeft)}
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setPomoIsActive(!pomoIsActive)}
                    className={`flex items-center justify-center gap-2 w-48 py-4 rounded-2xl font-bold text-white shadow-lg transition-transform active:scale-95 text-lg
                      ${pomoIsActive ? 'bg-gray-800 hover:bg-gray-900' : 'bg-brand-600 hover:bg-brand-700'}`}
                    >
                    {pomoIsActive ? <><Pause size={20}/> Pause</> : <><Play size={20}/> Start Timer</>}
                  </button>
                  
                  <button 
                    onClick={() => {
                      setPomoIsActive(false)
                      setPomoTimeLeft(pomoMode === 'study' ? 25*60 : pomoMode === 'shortBreak' ? 5*60 : 15*60)
                    }}
                    className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw size={22}/>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber-500" size={32} />
                <h2 className="font-display text-2xl font-bold text-brand-800">Important Disclaimer</h2>
              </div>

              <div className="space-y-4 text-gray-700 font-body text-sm mb-6">
                <p className="font-semibold text-brand-700">
                  Before you generate your first exam, please read and understand the following:
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="font-semibold text-amber-800 mb-2">Not Official {level.toUpperCase()} Material</p>
                  <p className="text-amber-700 text-sm">
                    AnyStudents is <strong>NOT affiliated with WAEC or Ghana Education Service</strong>. Our platform is an independent study tool to help you prepare for the {level.toUpperCase()}.
                  </p>
                </div>

                <ul className="space-y-2 list-disc pl-5">
                  <li>We do not guarantee exam performance or passing scores</li>
                  <li>Questions are AI-generated practice materials, not actual {level.toUpperCase()} papers</li>
                  <li>Content may contain errors - report any issues to us</li>
                  <li>Use this platform alongside official materials and classroom instruction</li>
                  <li>Once you generate or download an exam, <strong>no refunds will be issued</strong></li>
                </ul>

                <p className="text-xs text-gray-500 italic">
                  By proceeding, you acknowledge that you have read our{' '}
                  <Link to="/disclaimer" target="_blank" className="text-brand-600 underline hover:text-brand-700">
                    full Disclaimer
                  </Link>
                  {' '}and{' '}
                  <Link to="/terms-of-use" target="_blank" className="text-brand-600 underline hover:text-brand-700">
                    Terms of Use
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDisclaimerModal(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={proceedWithGeneration}
                  className="btn-primary flex-1 justify-center"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
