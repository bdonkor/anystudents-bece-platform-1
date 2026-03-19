import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import { getAllUsers, getSuspiciousActivity, getRevenueData, suspendUser } from '../lib/supabase'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import {
  Users, DollarSign, AlertTriangle, BookOpen, Clock,
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
  const [userModal, setUserModal] = useState({ show: false, user: null, exams: [], payments: [], loading: false })

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

      // Fetch Exams (Increased limit for better analysis)
      setLoadingSteps(prev => ({ ...prev, exams: 'loading' }))
      const { data: examData, error: examError } = await supabase
        .from('exams')
        .select('id, subject, level, created_at')
        .order('created_at', { ascending: false })
        .limit(200)
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
    
    window.location.href = mailtoUrl

    setEmailModal({ ...emailModal, show: false })
  }

  async function handleViewUser(user) {
    setUserModal({ show: true, user, exams: [], payments: [], loading: true })
    
    try {
      // Fetch user's exams
      const { data: userExams } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        
      // Fetch user's payments
      const { data: userPayments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        
      setUserModal({
        show: true,
        user,
        exams: userExams || [],
        payments: userPayments || [],
        loading: false
      })
    } catch (err) {
      console.error(err)
      setUserModal(prev => ({ ...prev, loading: false }))
    }
  }

  // Stats
  const totalRevenue = revenue.reduce((sum, p) => sum + (p.amount || 0), 0)
  const activeSubCount = users.filter(u => u.subscription_status === 'active').length
  const studentCount = users.filter(u => u.role === 'student').length
  const teacherCount = users.filter(u => u.role === 'teacher').length
  const jhsCount = users.filter(u => u.level === 'jhs').length
  const shsCount = users.filter(u => u.level === 'shs').length
  const jhsSubscribers = users.filter(u => u.level === 'jhs' && u.subscription_status === 'active').length
  const shsSubscribers = users.filter(u => u.level === 'shs' && u.subscription_status === 'active').length

  // Revenue chart data
  const revenueByDay = revenue.reduce((acc, p) => {
    const date = new Date(p.created_at).toLocaleDateString('en-GH', { month: 'short', day: 'numeric' })
    acc[date] = (acc[date] || 0) + (p.amount || 0)
    return acc
  }, {})
  const chartData = Object.entries(revenueByDay).slice(-14).map(([date, amount]) => ({ date, amount }))

  // Subject Popularity Analysis
  const subjectDistribution = exams.reduce((acc, e) => {
    acc[e.subject] = (acc[e.subject] || 0) + 1
    return acc
  }, {})
  const subjectChartData = Object.entries(subjectDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([subject, count]) => ({ subject, count }))

  const TABS = [
    { id: 'overview', label: 'Systems Overview', icon: <TrendingUp size={15} /> },
    { id: 'users', label: `Identity Vault (${users.length})`, icon: <Users size={15} /> },
    { id: 'suspicious', label: `Threat Monitor ${suspicious.length ? `(${suspicious.length})` : ''}`, icon: <Shield size={16} /> },
    { id: 'exams', label: 'Intelligence Logs', icon: <BookOpen size={15} /> },
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
      <Helmet>
        <title>Admin Dashboard | AnyStudents</title>
      </Helmet>
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">

        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-brand-950 p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
          {/* Animated background pulse */}
          <div className="absolute inset-0 bg-brand-600/10 animate-pulse mix-blend-overlay"></div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/20 rounded-full blur-[100px] group-hover:bg-brand-500/30 transition-all duration-700"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-brand-400 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-all">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="font-display text-3xl font-black text-white tracking-tight">Command Center</h1>
              <p className="font-body text-brand-300 text-sm font-bold uppercase tracking-widest mt-0.5 opacity-80">AnyStudents Alpha-Core Dashboard</p>
            </div>
          </div>
          <Link to="/student" className="btn-gold text-xs px-8 py-3.5 flex items-center gap-2 w-fit rounded-2xl shadow-xl hover:shadow-brand-500/20 transition-all relative z-10 font-black uppercase tracking-tighter">
            <BookOpen size={18} />
            Enter Intelligence Portal
          </Link>
        </div>

        {actionMsg && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-4 text-blue-700 text-sm font-body">
            <CheckCircle size={15} /> {actionMsg}
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'JHS Registrations',
              value: jhsCount,
              icon: <div className="font-display font-black text-[10px] text-white">BECE</div>,
              sub: `${jhsSubscribers} Active Gold Subs`,
              bg: 'bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-800',
              iconBg: 'bg-white/10 border-white/20'
            },
            {
              label: 'SHS Registrations',
              value: shsCount,
              icon: <div className="font-display font-black text-[10px] text-white">WASSCE</div>,
              sub: `${shsSubscribers} Active Gold Subs`,
              bg: 'bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800',
              iconBg: 'bg-white/10 border-white/20'
            },
            {
              label: 'Market Conversion',
              value: `${users.length > 0 ? Math.round((activeSubCount / users.length) * 100) : 0}%`,
              icon: <TrendingUp size={20} className="text-white" />,
              sub: `${activeSubCount} Gold memberships`,
              bg: 'bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-800',
              iconBg: 'bg-white/10 border-white/20'
            },
            {
              label: 'Lifetime Revenue',
              value: `GH₵${totalRevenue.toFixed(0)}`,
              icon: <DollarSign size={20} className="text-white" />,
              sub: `${revenue.length} successful GH payments`,
              bg: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-700',
              iconBg: 'bg-white/10 border-white/20'
            },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl p-5 flex items-center gap-4 text-white shadow-lg ${s.bg} border border-white/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
              {/* Decorative background shape */}
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500"></div>
              
              <div className={`w-12 h-12 rounded-xl backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner relative z-10 border border-white/10 ${s.iconBg}`}>
                {s.icon}
              </div>
              <div className="relative z-10">
                <div className="font-display font-black text-2xl leading-none tracking-tight mb-1">{s.value}</div>
                <div className="text-[10px] font-black font-body uppercase tracking-widest text-white/80 leading-none mb-0.5">{s.label}</div>
                <div className="text-[9px] font-medium font-body text-white/50 italic">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-2 mb-8 shadow-sm border border-gray-100 w-fit flex-wrap">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200/50' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
              <div className={activeTab === tab.id ? "text-brand-600" : "text-gray-400"}>{tab.icon}</div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {chartData.length > 0 && (
              <div className="lg:col-span-2 card p-6 border-none rounded-3xl shadow-xl overflow-hidden relative group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' }}>
                <div className="absolute top-0 right-0 p-32 bg-emerald-400/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 p-32 bg-blue-400/5 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-100">
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-slate-800 text-xl tracking-tight">Revenue Performance</h3>
                        <p className="text-[10px] text-slate-400 font-bold font-body uppercase tracking-[0.2em] mt-0.5">Live Transaction Flow</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[10px] font-black font-body text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-widest shadow-sm">
                        Real-time
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: '#64748b', fontWeight: 800 }} 
                          dy={15}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: '#64748b', fontWeight: 800 }}
                          tickFormatter={(v) => `GH₵${v}`}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            borderRadius: '20px', 
                            border: '1px solid #e2e8f0', 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                            padding: '12px 16px'
                          }}
                          itemStyle={{ color: '#059669', fontWeight: 800, fontSize: '15px' }}
                          labelStyle={{ color: '#64748b', marginBottom: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          formatter={v => [`GH₵${v}`, 'Revenue']} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#10b981" 
                          strokeWidth={4} 
                          dot={{ r: 6, fill: '#f5b400', strokeWidth: 3, stroke: '#ffffff' }} 
                          activeDot={{ r: 8, fill: '#10b981', strokeWidth: 4, stroke: '#ffffff' }}
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

              {/* Level Distribution Card */}
              <div className="card p-8 border-none bg-white rounded-[32px] shadow-2xl border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-24 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-black text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2">
                       <Shield size={20} className="text-blue-600" /> Human Capital
                    </h3>
                    <span className="text-[10px] font-black font-body text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">Demographics</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-widest text-slate-800">
                        <span>JHS Elite (BECE)</span>
                        <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-black">{jhsCount}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-200">
                        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 h-full rounded-full transition-all duration-[2000ms] ease-out shadow-md" style={{ width: `${users.length > 0 ? (jhsCount / users.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-widest text-slate-800">
                        <span>SHS Vanguard (WASSCE)</span>
                        <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 font-black">{shsCount}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-200">
                        <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 h-full rounded-full transition-all duration-[2000ms] ease-out shadow-md shadow-brand-500/20" style={{ width: `${users.length > 0 ? (shsCount / users.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-4">
                      <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-widest text-slate-800">
                        <span>Educators</span>
                        <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-black">{teacherCount}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 border border-slate-200">
                        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-800 h-full rounded-full transition-all duration-[2000ms] ease-out shadow-md" style={{ width: `${users.length > 0 ? (teacherCount / users.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Popularity Card */}
              <div className="card p-8 border-none bg-slate-900 rounded-[32px] shadow-2xl relative overflow-hidden group">
                {/* Neon glow effects */}
                <div className="absolute top-0 right-0 p-24 bg-brand-500/10 rounded-full blur-[80px] -mr-10 -mt-10 group-hover:bg-brand-500/20 transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 p-16 bg-gold-400/5 rounded-full blur-[60px] -ml-10 -mb-10"></div>

                <div className="relative z-10 text-white">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-display font-black text-white text-lg uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp size={18} className="text-brand-400" /> Platform Demand
                    </h3>
                    <Link to="/exams" className="text-[10px] font-black text-brand-300 hover:text-white transition-colors uppercase tracking-[0.2em] relative group">
                      Review Metrics
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {subjectChartData.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group/item cursor-default overflow-hidden relative">
                        {/* Progress bar background in card */}
                        <div className="absolute left-0 bottom-0 h-[2px] bg-brand-500/40 transition-all duration-1000" style={{ width: `${(s.count / subjectChartData[0]?.count) * 100}%` }}></div>
                        
                        <div className="flex items-center gap-4">
                           <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] ${idx === 0 ? 'bg-gold-500/20 text-gold-400 border border-gold-400/30' : 'bg-white/10 text-brand-300 border border-white/10'}`}>
                             {idx + 1}
                           </div>
                           <span className="text-xs font-bold text-white/90 group-hover/item:text-white transition-colors">{s.subject}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-brand-400 px-3 py-1.5 rounded-xl bg-brand-400/10 border border-brand-400/20 group-hover/item:scale-110 transition-transform">
                             {s.count}
                           </span>
                        </div>
                      </div>
                    ))}
                    {subjectChartData.length === 0 && (
                       <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                         <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-3">
                           <BookOpen size={16} />
                         </div>
                         <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Metric Stream...</p>
                       </div>
                    )}
                  </div>
                </div>
              </div>

              {suspicious.length > 0 && (
                <div className="card p-8 border-none bg-gradient-to-br from-red-600 to-rose-800 rounded-[32px] shadow-2xl relative overflow-hidden group border-none">
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                  <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-[60px] -mr-10 -mt-10"></div>
                  
                  <div className="relative z-10 text-white">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center shadow-lg">
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-lg uppercase tracking-wider">Intercepted Threats</h3>
                          <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">Active Security Protocol</p>
                        </div>
                      </div>
                      <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-black px-4 py-1.5 rounded-full border border-white/20 uppercase">
                        {suspicious.length} Alert{suspicious.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {suspicious.slice(0, 3).map(a => (
                        <div key={a.id} className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-sm group/log hover:bg-black/30 transition-all">
                          <div className="flex justify-between items-start mb-2">
                             <div className="font-bold text-white text-xs truncate max-w-[150px]">{a.profiles?.email}</div>
                             <div className="text-[9px] text-white/50 font-mono">
                               {new Date(a.created_at).toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })}
                             </div>
                          </div>
                          <div className="text-[10px] text-red-100 font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 w-fit">
                            {a.activity_type.replace(/_/g, ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button onClick={() => setActiveTab('suspicious')} className="w-full mt-6 text-xs text-white uppercase tracking-[0.2em] font-black bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-2xl transition-all border border-white/10 shadow-lg">
                      Enter Security Vault →
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 className="font-display font-semibold text-ink mb-4">All Users ({users.length})</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Name & Email</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Role</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Current Status</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Level</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Join Date</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-bold tracking-wider uppercase text-xs">Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 px-3">
                        <button 
                          onClick={() => handleViewUser(u)}
                          className="font-semibold text-brand-700 hover:text-brand-900 hover:underline text-left"
                        >
                          {u.full_name || '—'}
                        </button>
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
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${u.level === 'shs' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'}`}>
                          {u.level?.toUpperCase() || 'JHS'}
                        </span>
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
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg text-xs font-bold transition-colors">
                                Unsuspend
                              </button>
                            ) : (
                              <button onClick={() => handleSuspend(u.id)}
                                className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">
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
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ink">Security & Integrity Monitor</h3>
                  <p className="text-xs text-gray-400 font-body">Detecting automated activity and potential fraud</p>
                </div>
              </div>
            </div>

            {suspicious.length === 0 ? (
              <div className="card p-12 text-center bg-white border border-gray-100 rounded-3xl shadow-sm">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle size={40} />
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-2">Platform is Secure</h3>
                <p className="font-body text-gray-500 max-w-sm mx-auto">No suspicious activities or automated patterns detected across all active accounts.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suspicious.map(a => (
                  <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <AlertTriangle size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm mb-0.5 mt-0.5 leading-none">
                            {a.profiles?.email || a.user_id}
                          </div>
                          <div className="inline-block mt-1 bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-red-200">
                            {a.activity_type.replace(/_/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-gray-400 font-mono">
                        {new Date(a.created_at).toLocaleString('en-GH', { timeStyle: 'short', dateStyle: 'short' })}
                      </div>
                    </div>
                    
                    {a.details && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100 overflow-hidden">
                        <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest px-1">Evidence Payload</div>
                        <pre className="text-[11px] text-gray-600 font-mono whitespace-pre-wrap break-all leading-relaxed">
                          {JSON.stringify(a.details, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button onClick={() => handleOpenEmail({ email: a.profiles?.email, full_name: a.profiles?.full_name })}
                        className="flex-1 bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-brand-100">
                        <Mail size={14} /> Contact User
                      </button>
                      <button onClick={() => handleSuspend(a.user_id)}
                        className="flex-1 bg-white border border-red-100 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all px-4">
                        Suspend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXAM LOGS */}
        {activeTab === 'exams' && (
          <div className="animate-fade-in">
             <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-ink flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                    <BookOpen size={20} />
                  </div>
                  System Learning activity
                </h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.length > 0 ? (
                exams.map(exam => (
                  <div key={exam.id || Math.random()} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-purple-50 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border border-purple-100">
                          Exam Session
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                           #{String(exam.id || '').slice(0, 8)}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-ink mb-1">{exam.subject || 'Unknown Subject'}</h4>
                      <p className="text-xs text-gray-400 font-body">
                        Generated {String(exam.level || 'BECE').toUpperCase()} mock exam
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-gray-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-medium tracking-wide">
                        {exam.created_at ? new Date(exam.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date unknown'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 italic text-gray-400">
                  No exam logs found in the database.
                </div>
              )}
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

              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <a 
                    href={`mailto:${emailModal.user?.email}?subject=${encodeURIComponent(emailModal.subject)}&body=${encodeURIComponent(emailModal.message)}`}
                    onClick={() => setEmailModal({ ...emailModal, show: false })}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-center no-underline"
                  >
                    <Mail size={18} /> Open Mail App
                  </a>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(emailModal.user?.email || '')
                      setActionMsg('Email address copied to clipboard!')
                      setEmailModal({ ...emailModal, show: false })
                    }} 
                    className="btn-outline flex-1 justify-center font-semibold"
                  >
                    Copy Email
                  </button>
                </div>
                <button onClick={() => setEmailModal({ ...emailModal, show: false })} className="text-gray-400 text-xs mt-1 hover:underline text-center">
                  Cancel and Close
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-4 font-body">
                If the Mail App doesn't open, your computer may lack a default email application.
              </p>
            </div>
          </div>
        )}

        {/* USER PROFILE MODAL */}
        {userModal.show && userModal.user && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="card max-w-2xl w-full shadow-2xl animate-fade-up my-auto max-h-[90vh] flex flex-col bg-cream/95 border border-white/50 overflow-hidden rounded-3xl">
              
              {/* Profile Header Card */}
              <div className="bg-white p-8 border-b border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 relative shrink-0">
                <div className="absolute top-0 right-0 p-4">
                   <button onClick={() => setUserModal({ show: false, user: null, exams: [], payments: [], loading: false })} 
                     className="w-10 h-10 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-all shadow-sm">
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="w-24 h-24 bg-gradient-to-tr from-brand-600 to-indigo-600 text-white rounded-3xl flex items-center justify-center font-display font-black text-4xl shadow-lg ring-4 ring-white">
                  {(userModal.user.full_name || userModal.user.email || '?').charAt(0).toUpperCase()}
                </div>
                
                <div className="text-center md:text-left pt-2">
                  <h3 className="font-display font-black text-3xl text-ink leading-none mb-2">{userModal.user.full_name || 'Anonymous Student'}</h3>
                  <p className="text-gray-500 font-body mb-4 flex items-center justify-center md:justify-start gap-2">
                     <Mail size={14} className="text-brand-400" /> {userModal.user.email}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="bg-brand-100 text-brand-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-brand-200">
                      {userModal.user.role}
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                      {userModal.user.level?.toUpperCase() || 'JHS'}
                    </span>
                    {userModal.user.program && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200">
                        {userModal.user.program}
                      </span>
                    )}
                    {userModal.user.is_suspended ? (
                      <span className="bg-red-100 text-red-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-red-200">
                        Suspended
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">
                         {userModal.user.subscription_status === 'active' ? 'Gold Member' : 'Free Entry'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Member Since</div>
                    <div className="text-lg font-bold text-ink">{new Date(userModal.user.created_at).toLocaleDateString('en-GH', { month: 'long', year: 'numeric' })}</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Investment</div>
                    <div className="text-lg font-bold text-gold-600">GH₵{(userModal.payments.reduce((sum, p) => sum + p.amount, 0)).toFixed(2)}</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Academics</div>
                    <div className="text-lg font-bold text-purple-600">{userModal.exams.length} Exams</div>
                  </div>
                </div>

                {userModal.loading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin mb-4" />
                    <p className="font-bold text-brand-700 text-sm animate-pulse">Syncing student profile...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Exams Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-purple-50 px-5 py-4 border-b border-purple-100 flex items-center justify-between">
                        <h4 className="font-display font-bold text-purple-900 text-sm flex items-center gap-2">
                          <BookOpen size={16} /> Exam History
                        </h4>
                        <span className="bg-purple-200 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {userModal.exams.length}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                        {userModal.exams.length === 0 ? (
                          <div className="p-8 text-center text-gray-400 italic text-xs">No records found.</div>
                        ) : (
                          userModal.exams.map(ex => (
                            <div key={ex.id} className="px-5 py-3 hover:bg-gray-50 flex justify-between items-center transition-colors">
                              <span className="font-bold text-xs text-ink">{ex.subject}</span>
                              <span className="text-[10px] text-gray-400 font-mono">{new Date(ex.created_at).toLocaleDateString()}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Payments Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-gold-50 px-5 py-4 border-b border-gold-100 flex items-center justify-between">
                        <h4 className="font-display font-bold text-gold-900 text-sm flex items-center gap-2">
                          <DollarSign size={16} /> Payment Logs
                        </h4>
                        <span className="bg-gold-200 text-gold-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {userModal.payments.length}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                        {userModal.payments.length === 0 ? (
                          <div className="p-8 text-center text-gray-400 italic text-xs">No records found.</div>
                        ) : (
                          userModal.payments.map(pay => (
                            <div key={pay.id} className="px-5 py-3 hover:bg-gray-50 flex justify-between items-center transition-colors">
                              <div>
                                <div className="font-black text-xs text-emerald-600">GH₵{Number(pay.amount).toFixed(2)}</div>
                                <div className="text-[9px] text-gray-400 uppercase font-black">{pay.status}</div>
                              </div>
                              <span className="text-[10px] text-gray-400 font-mono">{new Date(pay.created_at).toLocaleDateString()}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 shrink-0">
                <button 
                  onClick={() => {
                    setUserModal({ show: false, user: null, exams: [], payments: [], loading: false })
                    handleOpenEmail(userModal.user)
                  }}
                  className="bg-brand-700 text-white hover:bg-brand-800 px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 transition-all active:scale-95 flex-1"
                >
                  <Mail size={18} /> Compose Direct message
                </button>
                {userModal.user.role !== 'admin' && (
                  userModal.user.is_suspended ? (
                    <button onClick={() => {
                        handleUnsuspend(userModal.user.id)
                        setUserModal({ show: false, user: null, exams: [], payments: [], loading: false })
                      }}
                      className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-2xl font-black text-sm flex-1 transition-all">
                      Re-activate Account
                    </button>
                  ) : (
                    <button onClick={() => {
                        handleSuspend(userModal.user.id)
                        setUserModal({ show: false, user: null, exams: [], payments: [], loading: false })
                      }}
                      className="bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 px-6 py-4 rounded-2xl font-black text-sm flex-1 transition-all">
                      Suspend Account
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
