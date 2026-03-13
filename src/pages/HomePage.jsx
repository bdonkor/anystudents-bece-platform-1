import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle, Zap, Trophy, Shield, BookOpen, Clock, Star, ArrowRight, ChevronDown } from 'lucide-react'

const SUBJECTS = [
  { name: 'English Language', icon: '✍️', color: 'bg-purple-50 border-purple-200 text-purple-800', gradient: 'from-purple-100 to-purple-50', hoverBorder: 'hover:border-purple-400', ringColor: 'focus:ring-purple-300' },
  { name: 'Mathematics', icon: '📐', color: 'bg-blue-50 border-blue-200 text-blue-800', gradient: 'from-blue-100 to-blue-50', hoverBorder: 'hover:border-blue-400', ringColor: 'focus:ring-blue-300' },
  { name: 'Integrated Science', icon: '🔬', color: 'bg-sky-50 border-sky-200 text-sky-800', gradient: 'from-sky-100 to-sky-50', hoverBorder: 'hover:border-sky-400', ringColor: 'focus:ring-sky-300' },
  { name: 'Social Studies', icon: '🌍', color: 'bg-amber-50 border-amber-200 text-amber-800', gradient: 'from-amber-100 to-amber-50', hoverBorder: 'hover:border-amber-400', ringColor: 'focus:ring-amber-300' },
  { name: 'RME', icon: '🕊️', color: 'bg-orange-50 border-orange-200 text-orange-800', gradient: 'from-orange-100 to-orange-50', hoverBorder: 'hover:border-orange-400', ringColor: 'focus:ring-orange-300' },
  { name: 'Ghanaian Language and Culture', icon: '🗣️', color: 'bg-red-50 border-red-200 text-red-800', gradient: 'from-red-100 to-red-50', hoverBorder: 'hover:border-red-400', ringColor: 'focus:ring-red-300' },
  { name: 'French', icon: '🇫🇷', color: 'bg-pink-50 border-pink-200 text-pink-800', gradient: 'from-pink-100 to-pink-50', hoverBorder: 'hover:border-pink-400', ringColor: 'focus:ring-pink-300' },
  { name: 'ICT', icon: '💻', color: 'bg-indigo-50 border-indigo-200 text-indigo-800', gradient: 'from-indigo-100 to-indigo-50', hoverBorder: 'hover:border-indigo-400', ringColor: 'focus:ring-indigo-300' },
  { name: 'Career Technology', icon: '🛠️', color: 'bg-teal-50 border-teal-200 text-teal-800', gradient: 'from-teal-100 to-teal-50', hoverBorder: 'hover:border-teal-400', ringColor: 'focus:ring-teal-300' },
  { name: 'Creative Arts and Design', icon: '🎨', color: 'bg-rose-50 border-rose-200 text-rose-800', gradient: 'from-rose-100 to-rose-50', hoverBorder: 'hover:border-rose-400', ringColor: 'focus:ring-rose-300' },
]

const STATS = [
  { value: '10,000+', label: 'Students Practising' },
  { value: '50,000+', label: 'Exams Generated' },
  { value: '10', label: 'BECE Subjects' },
  { value: '100%', label: 'Official Standard' },
]

const FEATURES = [
  {
    icon: <Zap size={22} className="text-gold-500" />,
    title: 'Instant Exam Generation',
    desc: 'Get a full 40-question BECE mock exam generated in seconds. New unique paper every time.'
  },
  {
    icon: <Trophy size={22} className="text-gold-500" />,
    title: 'Highest-Quality Questions',
    desc: 'Questions follow the exact BECE format, difficulty, and marking scheme used in the national exams.'
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
    name: 'Akosua Mensah',
    school: 'Achimota Junior High, Accra',
    text: 'I practised every subject on AnyStudents and passed my BECE with flying colours. The questions were exactly like the real exam!',
    grade: 'Aggregate 6'
  },
  {
    name: 'Kofi Asante',
    school: 'Kumasi Methodist JHS',
    text: 'My teacher used AnyStudents to give us different exam versions so nobody could copy. I improved my Maths from fail to B.',
    grade: 'Aggregate 9'
  },
  {
    name: 'Ama Boateng',
    school: 'Cape Coast RC JHS',
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

    // Redirect logged-in users to their dashboard
    if (user) {
      const path = profile?.role === 'admin' ? '/admin' : 
                   profile?.role === 'teacher' ? '/teacher' : '/student';
      navigate(path);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [user, profile, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>AnyStudents BECE | Standard Mock Exams for Ghana JHS 3</title>
        <meta name="description" content="AnyStudents BECE Exam Platform - Practice Standard BECE mock exams for Ghana JHS 3 students. Official WAEC-style questions, instant marking schemes, and performance tracking." />
        <link rel="canonical" href="https://anystudents.com/" />
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section className="bg-brand-700 text-white relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f5b400 0%, transparent 60%), radial-gradient(circle at 70% 20%, #334155 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="text-gold-400 text-[10px] md:text-sm font-mono tracking-wide">Generate Any BECE Mock Exam Questions Anytime</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up">
            Pass Your BECE With<br />
            <span className="text-gold-400">Standard Mock Exams</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up"
             style={{ animationDelay: '0.1s' }}>
            Practice Official-Standard BECE questions instantly. Unique papers, full marking schemes, and real-time performance tracking for all 10 subjects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link to={user ? "/student" : "/register"} className="btn-gold text-base px-8 py-4 animate-pulse-gold justify-center">
              Generate Your Free Mock Exam
              <ArrowRight size={18} />
            </Link>
            <Link to="/pricing" className="btn-outline border-white/40 text-white hover:bg-white hover:text-brand-700 text-base px-8 py-4 justify-center">
              View Pricing — GH₵100/month
            </Link>
          </div>

          <p className="mt-4 text-white/50 text-sm font-body">No credit card needed for your free exam</p>
        </div>
      </section>

      {/* GHANA FLAG ACCENT */}

      {/* STATS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
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
          <p className="font-body text-gray-600 max-w-xl mx-auto">Generate Standard mock exams for every subject in the BECE. Each paper is unique, standard-aligned, and comes with a full marking scheme.</p>
        </div>
        
        <div className="max-w-xl mx-auto relative z-10" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full bg-white border-2 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-sm transition-all duration-200 
                        ${isDropdownOpen ? 'border-brand-600 shadow-md' : 'border-gray-200 hover:border-brand-400'}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{selectedSubject.icon}</span>
              <div className="text-left">
                <div className="font-display font-bold text-lg text-ink">{selectedSubject.name}</div>
                <div className="text-xs text-gray-500 font-body">BECE Standard Mock Exam</div>
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
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left animate-fade-in transform hover:scale-[1.02] hover:shadow-md
                      ${selectedSubject.name === sub.name
                        ? `bg-gradient-to-r ${sub.gradient} border-2 ${sub.color.split(' ')[1]} ${sub.color.split(' ')[2]} scale-[0.98] shadow-sm`
                        : `border border-transparent ${sub.hoverBorder} hover:bg-gradient-to-r hover:${sub.gradient}`}`}
                  >
                    <span className="text-2xl transform transition-transform duration-300 hover:scale-110">{sub.icon}</span>
                    <span className="font-display font-semibold text-[15px]">{sub.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-xl mx-auto mt-12 text-center">
          <label className="flex items-start gap-3 md:gap-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6 rounded-2xl border-2 border-purple-200 cursor-pointer mb-8 text-left hover:border-purple-400 hover:shadow-lg transition-all duration-300 shadow-md">
            <input
              type="checkbox"
              checked={isDisclaimerAccepted}
              onChange={(e) => setIsDisclaimerAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-2 shrink-0 cursor-pointer"
            />
            <p className="text-xs md:text-sm text-gray-700 font-body leading-relaxed flex-1">
              <strong className="text-purple-700 font-bold">Disclaimer:</strong> <span className="text-gray-600">These BECE Mock Examinations are independently created learning resources and are not affiliated with or endorsed by any examination body, school, or educational authority, including the West African Examinations Council. I understand that use of this platform is completely voluntary and does not replace official BECE examinations.</span>
            </p>
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
      </section>

      {/* FEATURES */}
      <section className="bg-blue-50/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Everything You Need to Pass BECE</h2>
            <p className="font-body text-gray-600">Built specifically for Ghana JHS 3 students preparing for the national examination.</p>
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
            { step: '02', title: 'Choose a Subject', desc: 'Pick any of the 10 BECE subjects and click Generate Exam.' },
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
            <h2 className="font-display text-3xl font-bold text-white mb-3">Students Who Passed BECE</h2>
            <p className="text-white/60 font-body">Real results from real Ghanaian students</p>
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
                    <div className="text-white/50 text-xs font-body">{t.school}</div>
                  </div>
                  <div className="bg-gold-500 text-brand-800 text-xs font-bold px-2.5 py-1 rounded-full font-mono">
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
        <h2 className="section-title mb-4">Ready to Pass Your BECE?</h2>
        <p className="font-body text-gray-600 text-lg mb-8 max-w-xl mx-auto">Join thousands of JHS 3 students already practising with AnyStudents. Your first mock exam is completely free.</p>
        <Link to={user ? "/student" : "/register"} className="btn-gold px-12 py-4 text-lg animate-pulse-gold justify-center">
          Generate Your Free Mock Exam
          <ArrowRight size={20} />
        </Link>
        <p className="mt-4 text-gray-400 text-sm font-body">Standard practice from GH₵100/month after your free exam</p>
      </section>
      <Footer />
    </div>
  )
}
