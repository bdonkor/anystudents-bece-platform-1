import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getAllUsers, getSuspiciousActivity, getRevenueData, suspendUser } from '../lib/supabase'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import {
  Users, DollarSign, AlertTriangle, BookOpen,
  CheckCircle, XCircle, Shield, Eye, TrendingUp, Mail
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const { profile } = useAuth()
  const [users, setUsers] = useState([])
  const [suspicious, setSuspicious] = useState([])
  const [revenue, setRevenue] = useState([])
  const [exams, setExams] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionMsg, setActionMsg] = useState('')
  const [loadingSteps, setLoadingSteps] = useState({
    auth: 'pending',
    users: 'pending',
    alerts: 'pending',
    revenue: 'pending',
    exams: 'pending'
  })
  const [emailModal, setEmailModal] = useState({ show: false, user: null, subject: '', message: '' })

  useEffect(() => {
    if (profile) {
      if (profile.role === 'admin') {
        setLoadingSteps(prev => ({ ...prev, auth: 'complete' }))
        loadAll()
      } else {
        setError('Access Denied: You must be an administrator to view this page.')
        setLoading(false)
      }
    }
  }, [profile])

  async function loadAll() {
    const loadTimeout = setTimeout(() => {
      if (loading) {
        setError('Connection Timeout: The database is taking too long to respond. Please check your internet connection or Supabase status.')
        setLoading(false)
      }
    }, 15000)

    try {
      setLoading(true)
      setError(null)

      // Fetch Users
      setLoadingSteps(prev => ({ ...prev, users: 'loading' }))
      const usersRes = await getAllUsers()
      if (usersRes.error) throw usersRes.error
      setUsers(usersRes.data || [])
      setLoadingSteps(prev => ({ ...prev, users: 'complete' }))

      // Fetch Alerts
      setLoadingSteps(prev => ({ ...prev, alerts: 'loading' }))
      const suspRes = await getSuspiciousActivity()
      if (suspRes.error) throw suspRes.error
      setSuspicious(suspRes.data || [])
      setLoadingSteps(prev => ({ ...prev, alerts: 'complete' }))

      // Fetch Revenue
      setLoadingSteps(prev => ({ ...prev, revenue: 'loading' }))
      const revRes = await getRevenueData()
      if (revRes.error) throw revRes.error
      setRevenue(revRes.data || [])
      setLoadingSteps(prev => ({ ...prev, revenue: 'complete' }))

      // Fetch Exams
      setLoadingSteps(prev => ({ ...prev, exams: 'loading' }))
      const { data: examData, error: examError } = await supabase
        .from('exams')
        .select('id, subject, created_at')
        .order('created_at', { ascending: false })
        .limit(50)
      if (examError) throw examError
      setExams(examData || [])
      setLoadingSteps(prev => ({ ...prev, exams: 'complete' }))

    } catch (err) {
      console.error('Admin Load Error:', err)
      setError(`Database Error: ${err.message || 'Unknown connection error'}`)
    } finally {
      clearTimeout(loadTimeout)
      setLoading(false)
    }
  }

  async function handleSuspend(userId) {
    if (!confirm('Suspend this user? They will be logged out immediately.')) return
    const { error } = await suspendUser(userId)
    if (!error) {
      setActionMsg('User suspended successfully.')
      await loadAll()
      setTimeout(() => setActionMsg(''), 3000)
    }
  }

  async function handleUnsuspend(userId) {
    await supabase.from('profiles').update({ is_suspended: false, subscription_status: 'inactive' }).eq('id', userId)
    await loadAll()
  }

  function handleOpenEmail(user) {
    setEmailModal({
      show: true,
      user,
      subject: `Important update from AnyStudents`,
      message: `Hi ${user.full_name || 'there'},\n\n`
    })
  }

  function sendEmail() {
    const { user, subject, message } = emailModal
    const mailtoUrl = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    
    // Create a temporary link and click it - more reliable than window.location.href
    const link = document.createElement('a')
    link.href = mailtoUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setEmailModal({ ...emailModal, show: false })
  }

  // Stats
  const totalRevenue = revenue.reduce((sum, p) => sum + (p.amount || 0), 0) / 100
  const activeSubCount = users.filter(u => u.subscription_status === 'active').length
  const studentCount = users.filter(u => u.role === 'student').length
  const teacherCount = users.filter(u => u.role === 'teacher').length

  // Revenue chart data
  const revenueByDay = revenue.reduce((acc, p) => {
    const date = new Date(p.created_at).toLocaleDateString('en-GH', { month: 'short', day: 'numeric' })
    acc[date] = (acc[date] || 0) + (p.amount / 100)
    return acc
  }, {})
  const chartData = Object.entries(revenueByDay).slice(-14).map(([date, amount]) => ({ date, amount }))

  const TABS = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={15} /> },
    { id: 'users', label: 'Users', icon: <Users size={15} /> },
    { id: 'suspicious', label: `Alerts ${suspicious.length ? `(${suspicious.length})` : ''}`, icon: <AlertTriangle size={15} /> },
    { id: 'exams', label: 'Exam Logs', icon: <BookOpen size={15} /> },
  ]

  const StepIcon = ({ status }) => {
    if (status === 'complete') return <CheckCircle size={16} className="text-blue-500" />
    if (status === 'loading') return <div className="w-4 h-4 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    if (status === 'error') return <XCircle size={16} className="text-red-500" />
    return <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <div className="card max-w-sm w-full shadow-xl border-t-4 border-brand-600">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-brand-700" size={24} />
            <h2 className="font-display font-bold text-ink">Admin System Check</h2>
          </div>
          <div className="space-y-4 mb-8">
            {[
              { id: 'auth', label: 'Verifying Admin Identity' },
              { id: 'users', label: 'Loading User Database' },
              { id: 'alerts', label: 'Checking Security Alerts' },
              { id: 'revenue', label: 'Syncing Revenue Data' },
              { id: 'exams', label: 'Fetching Recent Logs' },
            ].map(step => (
              <div key={step.id} className="flex items-center justify-between group">
                <span className={`text-sm font-body ${loadingSteps[step.id] === 'complete' ? 'text-gray-400' : 'text-gray-700'}`}>
                  {step.label}
                </span>
                <StepIcon status={loadingSteps[step.id]} />
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 font-mono uppercase tracking-widest">
            Connecting to AnyStudents Secure Core...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
        <div className="card max-w-md w-full text-center shadow-2xl border-t-4 border-red-500">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-ink mb-2">System Access Error</h2>
          <p className="font-body text-gray-600 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()} className="btn-primary w-full justify-center">
              Retry Connection
            </button>
            <button onClick={() => window.location.href = '/'} className="btn-outline w-full justify-center">
              Return Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">

        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Admin Dashboard</h1>
            <p className="font-body text-gray-500 text-sm">AnyStudents BECE Platform Management</p>
          </div>
          <Link to="/student" className="btn-brand text-xs px-4 py-2 flex items-center gap-2 w-fit">
            <BookOpen size={14} />
            Switch to Practice Mode
          </Link>
        </div>

        {actionMsg && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-4 text-blue-700 text-sm font-body">
            <CheckCircle size={15} /> {actionMsg}
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: `GH₵${totalRevenue.toFixed(0)}`, icon: <DollarSign size={20} className="text-gold-500" />, sub: `${revenue.length} payments` },
            { label: 'Active Subs', value: activeSubCount, icon: <CheckCircle size={20} className="text-blue-500" />, sub: 'Paying users' },
            { label: 'Students', value: studentCount, icon: <Users size={20} className="text-brand-500" />, sub: `${teacherCount} teachers` },
            { label: 'Exams Generated', value: exams.length, icon: <BookOpen size={20} className="text-purple-500" />, sub: 'All time' },
          ].map(s => (
            <div key={s.label} className="card p-4">
              <div className="flex items-start justify-between mb-1">
                <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">{s.icon}</div>
              </div>
              <div className="font-display text-2xl font-bold text-ink">{s.value}</div>
              <div className="font-body text-xs text-gray-500">{s.label}</div>
              <div className="font-body text-xs text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit flex-wrap">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-body transition-all
                ${activeTab === tab.id ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {chartData.length > 0 && (
              <div className="card">
                <h3 className="font-display font-semibold text-ink mb-4">Revenue (Last 14 Days)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={v => `GH₵${v}`} />
                    <Line type="monotone" dataKey="amount" stroke="#0a4a2e" strokeWidth={2} dot={{ r: 4, fill: '#f5b400' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {suspicious.length > 0 && (
              <div className="card border border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={18} className="text-red-500" />
                  <h3 className="font-display font-semibold text-red-800">
                    {suspicious.length} Suspicious Activity Alert{suspicious.length !== 1 ? 's' : ''}
                  </h3>
                </div>
                {suspicious.slice(0, 3).map(a => (
                  <div key={a.id} className="bg-white rounded-lg px-3 py-2 mb-2 text-sm font-body text-gray-700">
                    <strong>{a.profiles?.email}</strong> — {a.activity_type.replace(/_/g, ' ')}
                    <span className="text-gray-400 ml-2">{new Date(a.created_at).toLocaleString('en-GH')}</span>
                  </div>
                ))}
                <button onClick={() => setActiveTab('suspicious')} className="text-xs text-red-600 font-semibold hover:underline">
                  View all alerts →
                </button>
              </div>
            )}
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 className="font-display font-semibold text-ink mb-4">All Users ({users.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-gray-500 font-semibold">Name</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-semibold">Role</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-semibold">Status</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-semibold">Joined</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-ink">{u.full_name || '—'}</div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                          ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {u.is_suspended ? (
                          <span className="badge-inactive text-red-600 bg-red-50">Suspended</span>
                        ) : u.subscription_status === 'active' ? (
                          <span className="badge-active">Active</span>
                        ) : (
                          <span className="badge-inactive">Free</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-gray-400 text-xs">
                        {new Date(u.created_at).toLocaleDateString('en-GH')}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleOpenEmail(u)}
                            className="text-brand-600 hover:text-brand-800 transition-colors"
                            title="Contact User">
                            <Mail size={16} />
                          </button>
                          
                          {u.role !== 'admin' && (
                            u.is_suspended ? (
                              <button onClick={() => handleUnsuspend(u.id)}
                                className="text-xs text-blue-600 hover:underline font-semibold">
                                Unsuspend
                              </button>
                            ) : (
                              <button onClick={() => handleSuspend(u.id)}
                                className="text-xs text-red-500 hover:underline font-semibold">
                                Suspend
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUSPICIOUS */}
        {activeTab === 'suspicious' && (
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-brand-600" />
              <h3 className="font-display font-semibold text-ink">Suspicious Activity Monitor</h3>
            </div>
            {suspicious.length === 0 ? (
              <div className="text-center py-10">
                <CheckCircle size={36} className="text-blue-400 mx-auto mb-3" />
                <p className="font-body text-gray-400">No suspicious activity detected.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {suspicious.map(a => (
                  <div key={a.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-red-800 text-sm">
                          {a.profiles?.email || a.user_id}
                        </div>
                        <div className="font-body text-sm text-red-700 mt-0.5">
                          {a.activity_type.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        {a.details && (
                          <pre className="text-xs text-gray-500 mt-1 font-mono bg-white rounded p-2 overflow-auto">
                            {JSON.stringify(a.details, null, 2)}
                          </pre>
                        )}
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(a.created_at).toLocaleString('en-GH')}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <button onClick={() => handleOpenEmail({ email: a.profiles?.email, full_name: a.profiles?.full_name })}
                          className="btn-outline text-xs py-1.5 px-3 flex items-center justify-center gap-2">
                          <Mail size={14} /> Contact
                        </button>
                        <button onClick={() => handleSuspend(a.user_id)}
                          className="btn-outline text-xs py-1.5 px-3 border-red-300 text-red-600 hover:bg-red-600 hover:text-white">
                          Suspend
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXAM LOGS */}
        {activeTab === 'exams' && (
          <div className="card">
            <h3 className="font-display font-semibold text-ink mb-4">Recent Exam Generations ({exams.length})</h3>
            <div className="space-y-2">
              {exams.map(exam => (
                <div key={exam.id} className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-lg text-sm font-body">
                  <span className="text-ink font-semibold">{exam.subject}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(exam.created_at).toLocaleString('en-GH', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMAIL MODAL */}
        {emailModal.show && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-700/40 backdrop-blur-sm animate-fade-in">
            <div className="card max-w-lg w-full shadow-2xl animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink">Contact User</h3>
                    <p className="text-xs text-gray-500 font-body">Sending to: {emailModal.user.email}</p>
                  </div>
                </div>
                <button onClick={() => setEmailModal({ ...emailModal, show: false })} className="text-gray-400 hover:text-gray-600">
                  <XCircle size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-1">Subject</label>
                  <input 
                    type="text" 
                    value={emailModal.subject}
                    onChange={(e) => setEmailModal({ ...emailModal, subject: e.target.value })}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 px-1">Message Content</label>
                  <textarea 
                    rows={6}
                    value={emailModal.message}
                    onChange={(e) => setEmailModal({ ...emailModal, message: e.target.value })}
                    className="input-field resize-none py-3"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setEmailModal({ ...emailModal, show: false })} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={sendEmail} className="btn-primary flex-1 justify-center gap-2">
                  <Mail size={18} /> Open Email Client
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-4 font-body">
                This will open your default email application (Outlook, Gmail, etc.)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
