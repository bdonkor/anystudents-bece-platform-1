import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getUserExams, getUserResults, saveExam, updateProfile } from '../lib/supabase'
import { generateBECEExam, generateExamSeed, SUBJECTS } from '../lib/examGenerator'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  BookOpen, Zap, Clock, Trophy, BarChart2, ArrowRight,
  AlertTriangle, CheckCircle, History, Star, Lock,
  ChevronDown, Check
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SUBJECT_KEYS = Object.keys(SUBJECTS)

export default function StudentDashboard() {
  const { user, profile, refreshProfile, canGenerateExam, isSubscriptionActive } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('generate')
  const [selectedSubject, setSelectedSubject] = useState('mathematics')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genStatus, setGenStatus] = useState('')
  const [genError, setGenError] = useState('')
  const [examHistory, setExamHistory] = useState([])
  const [results, setResults] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false)

  useEffect(() => {
    if (user) loadDashboardData()
  }, [user])

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
    setGenError('')
    setGenStatus('Connecting to exam engine...')

    try {
      setGenStatus('Generating your BECE mock exam. This takes 30–60 seconds...')

      const { exam, attempt } = await generateBECEExam(
        SUBJECTS[selectedSubject],
        selectedSubject
      )

      setGenStatus('Validating exam quality...')

      const seed = generateExamSeed(user.id, selectedSubject)

      const { data: savedExam, error } = await saveExam({
        user_id: user.id,
        subject: SUBJECTS[selectedSubject],
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
      console.error('Generation error:', err)
      setGenError(err.message || 'Failed to generate exam. Please try again.')
    } finally {
      setGenerating(false)
      setGenStatus('')
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
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink mb-1">
              Hello, {profile?.full_name?.split(' ')[0] || 'Student'} 👋
            </h1>
            <p className="font-body text-gray-500 text-sm mb-8">
              {profile?.role === 'admin' ? (
                <span className="text-brand-600 font-semibold italic">Standard Admin Access</span>
              ) : isSubscriptionActive()
                ? `Subscription active until ${new Date(profile.subscription_expiry).toLocaleDateString('en-GH')}`
                : profile?.free_exam_used
                  ? 'Free exam used — subscribe for Standard practice'
                  : 'Welcome! Your first exam is free'}
            </p>
          </div>
          {!isSubscriptionActive() && profile?.free_exam_used && (
            <Link to="/pricing" className="btn-gold">
              <Lock size={16} /> Unlock Standard — GH₵100
            </Link>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Exams Taken',
              value: examHistory.length,
              icon: <BookOpen size={20} className="text-blue-600" />,
              bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
              iconBg: 'bg-blue-100',
              borderColor: 'border-blue-200'
            },
            {
              label: 'Avg Score',
              value: avgScore ? `${avgScore}%` : '—',
              icon: <Trophy size={20} className="text-amber-600" />,
              bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
              iconBg: 'bg-amber-100',
              borderColor: 'border-amber-200'
            },
            {
              label: 'Subjects',
              value: subjectScores.length || '—',
              icon: <Star size={20} className="text-purple-600" />,
              bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
              iconBg: 'bg-purple-100',
              borderColor: 'border-purple-200'
            },
            {
              label: 'Readiness',
              value: readiness?.level || 'Needs Work',
              icon: <CheckCircle size={20} className="text-green-600" />,
              bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
              iconBg: 'bg-green-100',
              borderColor: 'border-green-200'
            },
          ].map(stat => (
            <div key={stat.label} className={`card p-4 flex items-center gap-3 ${stat.bgColor} border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-300`}>
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                {stat.icon}
              </div>
              <div>
                <div className="font-display font-bold text-ink text-lg leading-none">{stat.value}</div>
                <div className="text-xs text-gray-600 font-body mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Message */}
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <History size={24} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-blue-900 text-base leading-relaxed">
                To revisit your previous exams taken or exams generated, click: <span className="text-blue-600 uppercase tracking-tight">Exam History</span> tab
              </p>
              <p className="font-body text-sm text-gray-600 mt-1">
                Access all your past exams, review your answers, and track your progress over time.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs - Enhanced Visibility */}
        <div className="flex gap-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-2 mb-6 w-fit border-2 border-gray-200 shadow-md">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold font-body transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 transform'
                  : 'bg-white text-gray-600 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md hover:scale-102 transform'}`}>
              {tab.icon}
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* GENERATE TAB */}
        {activeTab === 'generate' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="font-display text-xl font-bold text-ink mb-1">Generate Mock Exam</h2>
              <p className="font-body text-gray-500 text-sm mb-5">Unique official-standard BECE paper with full marking scheme</p>

              <label className="block text-sm font-semibold text-ink mb-2 font-body">Select Subject</label>
              <div className="relative mb-8">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl border-2 text-sm font-body font-semibold transition-all focus:outline-none focus:ring-4
                    ${isDropdownOpen 
                      ? 'border-brand-500 ring-brand-50 bg-white text-ink shadow-sm' 
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-white'}`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen size={16} className={isDropdownOpen ? 'text-brand-500' : 'text-gray-400'} />
                    {SUBJECTS[selectedSubject]}
                  </span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brand-500' : 'text-gray-400'}`} />
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] max-h-[280px] overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                      {SUBJECT_KEYS.map(key => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedSubject(key)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-body transition-colors mb-0.5 last:mb-0
                            ${selectedSubject === key 
                              ? 'bg-brand-50 text-brand-700 font-bold' 
                              : 'text-gray-600 font-medium hover:bg-gray-50 hover:text-ink'}`}
                        >
                          {SUBJECTS[key]}
                          {selectedSubject === key && <Check size={16} className="text-brand-600" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {genError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-sm text-red-700 font-body">
                  <AlertTriangle size={15} /> {genError}
                </div>
              )}

              {genStatus && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-4 text-sm text-blue-700 font-body">
                  <div className="spinner !w-4 !h-4 !border-2 !border-blue-600 !border-t-transparent" />
                  {genStatus}
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

            {/* Exam info */}
            <div className="space-y-4">
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

              <div className="card">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-gold-500" />
                  <span className="font-display font-semibold text-ink">Generation time</span>
                </div>
                <p className="font-body text-sm text-gray-600">
                  Your exam takes 30–60 seconds to generate. Our system creates a completely unique paper each time.
                </p>
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
                    <div className="font-body text-sm text-gray-500">BECE Readiness Score</div>
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
          </div>
        )}
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
                  <p className="font-semibold text-amber-800 mb-2">Not Official BECE Material</p>
                  <p className="text-amber-700 text-sm">
                    AnyStudents is <strong>NOT affiliated with WAEC or Ghana Education Service</strong>. Our platform is an independent study tool to help you prepare for the BECE.
                  </p>
                </div>

                <ul className="space-y-2 list-disc pl-5">
                  <li>We do not guarantee exam performance or passing scores</li>
                  <li>Questions are AI-generated practice materials, not actual BECE papers</li>
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
