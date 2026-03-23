import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle, Zap, Trophy, Shield, BookOpen, Clock, Star, ArrowRight, ChevronDown } from 'lucide-react'

const SUBJECTS = [
  { name: 'English Language', icon: '✍️', color: 'bg-purple-50 border-purple-200 text-purple-800' },
  { name: 'Mathematics', icon: '📐', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { name: 'Integrated Science', icon: '🔬', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'Social Studies', icon: '🌍', color: 'bg-amber-50 border-amber-200 text-amber-800' },
  { name: 'Elective Mathematics', icon: '📈', color: 'bg-indigo-50 border-indigo-200 text-indigo-800' },
  { name: 'Physics', icon: '⚛️', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { name: 'Financial Accounting', icon: '📊', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  { name: 'Government', icon: '🏛️', color: 'bg-red-50 border-red-200 text-red-800' },
]

const STATS = [
  { value: '15,000+', label: 'Students Practising' },
  { value: '75,000+', label: 'Exams Generated' },
  { value: '35+', label: 'JHS / SHS Subjects' },
  { value: '100%', label: 'WAEC Standards' },
]

const FEATURES = [
  {
    icon: <Zap size={22} className="text-gold-500" />,
    title: 'Instant Exam Generation',
    desc: 'Get a full BECE or WASSCE mock exam generated in seconds. New unique paper every time.'
  },
  {
    icon: <Trophy size={22} className="text-gold-500" />,
    title: 'Highest-Quality Questions',
    desc: 'Questions follow the exact WAEC format, difficulty, and marking scheme used in the national exams.'
  },
  {
    icon: <BookOpen size={22} className="text-gold-500" />,
    title: 'Full Marking Schemes',
    desc: 'Every exam comes with a complete marking scheme so students learn from their mistakes.'
  },
  {
    icon: <Shield size={22} className="text-gold-500" />,
    title: 'Track Performance',
    desc: 'See your progress across subjects, identify weak topics, and measure exam readiness.'
  },
  {
    icon: <Clock size={22} className="text-gold-500" />,
    title: 'Timed Practice',
    desc: 'Practice under real exam conditions with a built-in 2-hour countdown timer.'
  },
  {
    icon: <Star size={22} className="text-gold-500" />,
    title: 'Unique Every Time',
    desc: 'Our system ensures no two exams are the same. Practice as many times as you need.'
  },
]

const TESTIMONIALS = [
  {
    name: 'Akosua',
    location: 'Accra',
    text: 'I practised every subject on AnyStudents and passed my exams with flying colours. The questions were exactly like the real SHS papers!',
    grade: 'Aggregate 6'
  },
  {
    name: 'Kofi',
    location: 'Kumasi',
    text: 'My teacher used AnyStudents to give us different exam versions so nobody could copy. I improved my Maths from fail to B.',
    grade: 'Aggregate 9'
  },
  {
    name: 'Ama',
    location: 'Cape Coast',
    text: 'The marking scheme helped me understand the examiners\' requirements. I could see exactly where I was losing marks.',
    grade: 'Aggregate 8'
  },
]

export default function HomePage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [user, profile, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>AnyStudents | Standard BECE & WASSCE Mock Exams Platform</title>
        <meta name="description" content="AnyStudents Mock Exams - Practice Standard BECE (JHS) and WASSCE (SHS) mock exams. Official WAEC-style questions, instant marking schemes, and performance tracking." />
        <link rel="canonical" href="https://mockexams.anystudents.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mockexams.anystudents.com/" />
        <meta property="og:title" content="AnyStudents | BECE & WASSCE Mock Exams" />
        <meta property="og:description" content="Generate unique WAEC-standard mock exams for JHS and SHS. Practice English, Maths, Science and more with full marking schemes." />
        <meta property="og:image" content="https://mockexams.anystudents.com/social-preview.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mockexams.anystudents.com/" />
        <meta property="twitter:title" content="AnyStudents | BECE & WASSCE Mock Exams" />
        <meta property="twitter:description" content="Practice for success. Unique mock exams, official WAEC standards, and performance tracking." />
        <meta property="twitter:image" content="https://mockexams.anystudents.com/social-preview.png" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section className="bg-brand-900 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/AnyStudents mock exams oficial video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-brand-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-90" />

        {/* Hero Content Layer */}
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-44 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <span className="text-gold-400 text-[10px] md:text-sm font-mono tracking-wide uppercase">Ready Mock Exams Anytime</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-8 animate-fade-up">
            <span className="text-gold-400">Generate Mock Exams.</span><br />
            Pass Your BECE & WASSCE<br />
            with Confidence
          </h1>

          <p className="font-body text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up"
             style={{ animationDelay: '0.1s' }}>
            Join thousands of smart teenage students across Ghana systematically preparing with AnyStudents tailored mock exams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up mb-12" style={{ animationDelay: '0.2s' }}>
            <Link to={user ? "/student" : "/register"} className="bg-[#f5b400] text-black font-bold px-10 py-5 rounded-lg hover:bg-[#eab308] transition-all flex items-center justify-center shadow-lg shadow-gold-500/20">
              Generate Free Mock Exam Now
            </Link>
          </div>

          <div className="flex flex-col items-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-gold-400 fill-gold-400" />
              ))}
            </div>
            <p className="text-white/60 text-sm font-body mb-2">
              Rated <span className="text-gold-400 font-bold">4.9/5</span> by 10,000+ Students
            </p>
            <p className="text-white/40 text-xs font-body italic">No credit card needed for your free exam</p>
          </div>
        </div>
      </section>

      {/* GHANA FLAG ACCENT */}

      {/* STATS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-brand-700">{stat.value}</div>
                <div className="font-body text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS dropdown */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title mb-3 text-blue-900">Select Your Subject</h2>
          <p className="font-body text-gray-600 max-w-xl mx-auto">Generate Standard mock exams for BECE and WASSCE levels. Each paper is unique, standard-aligned, and comes with a full marking scheme.</p>
        </div>
        
        <div className="max-w-xl mx-auto relative z-10" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full bg-white border-2 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-sm transition-all duration-200 
                        ${isDropdownOpen ? 'border-brand-600 shadow-md' : 'border-gray-200 hover:border-brand-400'}`}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-2xl md:text-3xl">{selectedSubject.icon}</span>
              <div className="text-left">
                <div className="font-display font-bold text-base md:text-lg text-ink">{selectedSubject.name}</div>
                <div className="text-xs text-gray-500 font-body">Official Standard Mock Exam</div>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isDropdownOpen ? 'bg-brand-50 text-brand-700 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
              <ChevronDown size={20} />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-20 animate-fade-in max-h-[400px] overflow-y-auto">
              <div className="p-2">
                {SUBJECTS.map((sub, index) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      setSelectedSubject(sub);
                      setIsDropdownOpen(false);
                    }}
                    style={{ animationDelay: `${index * 30}ms` }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left animate-fade-in hover:bg-gold-50
                      ${selectedSubject.name === sub.name
                        ? `bg-gold-50 border-2 border-gold-200 font-bold`
                        : `border border-transparent`}`}
                  >
                    <span className="text-2xl">{sub.icon}</span>
                    <span className="font-display text-[15px]">{sub.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-xl mx-auto mt-12 text-center">
          <label className="flex items-start gap-3 md:gap-4 cursor-pointer mb-8 text-left transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)',
              border: '2px solid rgba(245,180,0,0.55)',
              padding: '1.25rem 1.75rem',
              boxShadow: '0 0 32px rgba(245,180,0,0.1), 0 8px 32px rgba(0,0,0,0.3)',
            }}>
            <input
              type="checkbox"
              checked={isDisclaimerAccepted}
              onChange={(e) => setIsDisclaimerAccepted(e.target.checked)}
              className="mt-1.5 w-5 h-5 md:w-6 md:h-6 rounded border-yellow-400 text-yellow-400 focus:ring-yellow-400 focus:ring-2 shrink-0 cursor-pointer accent-yellow-400"
            />
            <div className="flex-1">
              <p className="text-xs md:text-sm font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <strong style={{ color: '#f5b400' }} className="font-display uppercase tracking-widest text-[10px] block mb-1">Disclaimer</strong>{' '}
                <span>These Mock Examinations are independently created learning resources and are not affiliated with or endorsed by any examination body, school, or educational authority, including WAEC. Use of this platform is completely voluntary and does not replace official national examinations.</span>
              </p>
            </div>
          </label>

          {isDisclaimerAccepted ? (
            <Link to={user ? "/student" : "/register"} className="btn-primary px-8 py-4 text-lg animate-pulse-gold inline-flex items-center justify-center gap-3 w-full sm:w-auto transition-all">
              <span>Start <span className="text-gold-400">{selectedSubject.name}</span> Exam</span>
              <ArrowRight size={20} />
            </Link>
          ) : (
            <button disabled className="btn-primary px-8 py-4 text-lg opacity-50 cursor-not-allowed inline-flex items-center justify-center gap-3 w-full sm:w-auto grayscale">
              <span>Start <span className="text-gold-400">{selectedSubject.name}</span> Exam</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {/* SHS PROGRAMS SHOWCASE */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl font-bold text-blue-900 mb-2">SHS Programs Supported</h3>
            <p className="font-body text-gray-500 text-sm">We cover all core and elective subjects for major SHS streams.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Science', icon: '🧪', colors: 'bg-blue-50 text-blue-700 border-blue-100' },
              { name: 'Business', icon: '📈', colors: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { name: 'General Arts', icon: '📚', colors: 'bg-purple-50 text-purple-700 border-purple-100' },
              { name: 'Visual Arts', icon: '🎨', colors: 'bg-orange-50 text-orange-700 border-orange-100' },
              { name: 'Home Econ.', icon: '🥘', colors: 'bg-pink-50 text-pink-700 border-pink-100' },
              { name: 'Technical', icon: '🛠️', colors: 'bg-slate-50 text-slate-700 border-slate-100' },
            ].map(prog => (
              <div key={prog.name} className={`p-4 rounded-2xl border-2 ${prog.colors} text-center transition-all hover:scale-105 shadow-sm`}>
                <div className="text-2xl mb-2">{prog.icon}</div>
                <div className="font-display font-bold text-xs uppercase tracking-wider">{prog.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-blue-50/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Everything You Need to Pass JHS & SHS</h2>
            <p className="font-body text-gray-600">Built specifically for Ghana students preparing for BECE and WASSCE national examinations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white border-2 border-blue-50 hover:border-blue-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-ink text-xl mb-3">{f.title}</h3>
                <p className="font-body text-gray-600 text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Register Free', desc: 'Create your account in 30 seconds. No credit card required.' },
            { step: '02', title: 'Choose a Subject', desc: 'Pick any of the 35+ BECE or WASSCE subjects and click Generate Exam.' },
            { step: '03', title: 'Practice & Improve', desc: 'Take the timed exam, check the marking scheme, track your progress.' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="font-mono font-bold text-gold-400 text-sm">{item.step}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">{item.title}</h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/register" className="btn-gold px-10 py-4 text-base justify-center">
            Get Your Free Exam Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Students Who Succeeded</h2>
            <p className="text-white/60 font-body">Real results from real BECE and WASSCE students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-brand-800/50 border border-brand-600 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-gold-400 fill-gold-400" />)}
                </div>
                <p className="font-body text-white/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-white/50 text-xs font-body">{t.location}</div>
                  </div>
                  <div className="bg-gold-500/90 text-brand-900 text-[11px] font-body px-2.5 py-0.5 rounded-full">
                    {t.grade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="section-title mb-4">Ready to Pass Your Exams?</h2>
        <p className="font-body text-gray-600 text-lg mb-8 max-w-xl mx-auto">Join thousands of students already practising with AnyStudents. Your first mock exam is completely free.</p>
        <Link to={user ? "/student" : "/register"} className="btn-gold px-12 py-4 text-lg animate-pulse-gold justify-center">
          Generate Your Free Mock Exam
        </Link>
        <p className="mt-4 text-gray-400 text-sm font-body">Standard practice from GH₵100/month after your free exam</p>
      </section>
      <Footer />
    </div>
  )
}
