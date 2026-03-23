import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Clock, Play, Pause, RotateCcw, Target, BookOpen, 
  Zap, Brain, Sparkles, Sun, Moon, Coffee, 
  Lightbulb, CheckCircle, AlertCircle
} from 'lucide-react'

export default function StudyTimePage() {
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('study') // 'study' | 'shortBreak' | 'longBreak'

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Notification sound or visual could go here
      if (mode === 'study') {
        const nextMode = 'shortBreak'
        setMode(nextMode)
        setTimeLeft(5 * 60)
      } else {
        setMode('study')
        setTimeLeft(25 * 60)
      }
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, mode])

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const switchMode = (newMode, time) => {
    setMode(newMode)
    setTimeLeft(time * 60)
    setIsActive(false)
  }

  const getModeStyles = () => {
    switch(mode) {
      case 'shortBreak': return { 
        bg: 'bg-emerald-50', 
        border: 'border-emerald-200', 
        accent: 'bg-emerald-600', 
        text: 'text-emerald-700',
        title: 'Calm Focus',
        tagline: 'Short break. Stretch and hydration time.'
      }
      case 'longBreak': return { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        accent: 'bg-blue-600', 
        text: 'text-blue-700',
        title: 'Deep Recovery',
        tagline: 'Longer break. Step away from the screen.'
      }
      default: return { 
        bg: 'bg-rose-50', 
        border: 'border-rose-200', 
        accent: 'bg-rose-600', 
        text: 'text-rose-700',
        title: 'Deep Work',
        tagline: 'Intense study. No distractions allowed.'
      }
    }
  }

  const styles = getModeStyles()

  return (
    <div className="min-h-screen flex flex-col bg-cream/40">
      <Helmet>
        <title>Study Time & Focus Engine | AnyStudents</title>
        <meta name="description" content="Optimize your study sessions with our Pomodoro timer and research-backed learning techniques." />
      </Helmet>
      
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Page Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-sm border border-rose-200">
            <Clock size={14} /> The 25/5 Strategy
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-black text-ink mb-4 tracking-tight">
            The <span className="text-rose-600">Pomodoro</span> Technique
          </h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            The world's most effective time-management system for high-performance students. 
            Master your focus in 25-minute sprints and conquer the <span className="font-bold text-ink">BECE & WASSCE</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          <div className="xl:col-span-12 flex justify-center mb-12">
            <div className={`w-full max-w-2xl p-6 sm:p-10 rounded-[2.5rem] border-2 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-colors duration-700 ${styles.bg} ${styles.border} relative overflow-hidden`}>
               {/* Background Decorative patterns */}
               <div className="absolute top-0 right-0 p-32 bg-white/40 rounded-full blur-3xl -mr-16 -mt-16"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm mb-8 border border-white/50">
                    <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'animate-pulse' : ''} ${styles.accent}`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${styles.text}`}>Pomodoro {styles.title}</span>
                  </div>

                  <div className={`font-mono font-bold tabular-nums text-7xl sm:text-8xl md:text-9xl tracking-tighter leading-none mb-4 ${styles.text} drop-shadow-sm`}>
                    {formatTime(timeLeft)}
                  </div>
                  
                  <p className="font-body font-medium text-gray-500 mb-8 max-w-xs uppercase tracking-tight opacity-70 text-xs">
                    {styles.tagline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-8 w-full max-w-md">
                    <button onClick={() => switchMode('study', 25)} className={`px-4 py-2.5 rounded-xl font-bold transition-all text-[10px] sm:text-xs flex items-center justify-center gap-2 ${mode === 'study' ? 'bg-white text-rose-700 shadow-sm border border-rose-100' : 'text-gray-500 hover:bg-white/50'}`}>
                      <Zap size={14} /> 25m Pomodoro
                    </button>
                    <button onClick={() => switchMode('shortBreak', 5)} className={`px-4 py-2.5 rounded-xl font-bold transition-all text-[10px] sm:text-xs flex items-center justify-center gap-2 ${mode === 'shortBreak' ? 'bg-white text-emerald-700 shadow-sm border border-emerald-100' : 'text-gray-500 hover:bg-white/50'}`}>
                      <Coffee size={14} /> 5m Break
                    </button>
                    <button onClick={() => switchMode('longBreak', 15)} className={`px-4 py-2.5 rounded-xl font-bold transition-all text-[10px] sm:text-xs flex items-center justify-center gap-2 ${mode === 'longBreak' ? 'bg-white text-blue-700 shadow-sm border border-blue-100' : 'text-gray-500 hover:bg-white/50'}`}>
                      <Moon size={14} /> 15m Long Break
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsActive(!isActive)}
                      className={`h-16 w-48 rounded-2xl font-black text-base text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${isActive ? 'bg-slate-900 shadow-slate-200 hover:bg-black' : `${styles.accent} shadow-${styles.accent}/30 hover:opacity-90`}`}
                    >
                      {isActive ? <><Pause size={20} /> Stop Sprint</> : <><Play size={20} /> Start Sprint</>}
                    </button>
                    <button 
                      onClick={() => {
                        setIsActive(false)
                        setTimeLeft(mode === 'study' ? 25*60 : mode === 'shortBreak' ? 5*60 : 15*60)
                      }}
                      className="h-16 w-16 bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-200 rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-95"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>
               </div>
            </div>
          </div>

          {/* New 5-Step Pomodoro Guide */}
          <div className="xl:col-span-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
               {[
                 { step: '01', title: 'Pick a Topic', desc: 'Choose ONE subject (like Core Math or Integrated Science).' },
                 { step: '02', title: 'Start Sprint', desc: 'Set your Pomodoro to 25 minutes and work with NO distractions.' },
                 { step: '03', title: 'Five-Min Break', desc: 'When the timer hits zero, stop. Stretch, hydrate, and breathe.' },
                 { step: '04', title: 'Repeat Cycles', desc: 'Complete 4 Pomodoros before taking a longer recovery break.' },
                 { step: '05', title: 'Pass Exams', desc: 'Mastery is about consistency. Repeat daily for A1 results.' },
               ].map((s) => (
                 <div key={s.step} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="text-rose-600 font-display font-black text-2xl mb-2 opacity-30">{s.step}</div>
                    <div className="font-display font-bold text-sm text-ink mb-2 uppercase tracking-tight">{s.title}</div>
                    <div className="font-body text-slate-500 text-xs leading-relaxed">{s.desc}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Side: Learning Intelligence Modules */}
          {/* Deep Work Science Module */}
          <div className="xl:col-span-12 mt-12 mb-16">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden relative group">
               {/* Accent Gradient */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"></div>
               
               <div className="p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-rose-100">
                      <Zap size={14} /> The Science of Success
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-ink mb-6 tracking-tight leading-[1.1]">
                      Intense Study: <span className="text-rose-600">No Distractions Allowed</span>
                    </h2>
                    <div className="space-y-6">
                      <p className="font-body text-slate-600 text-lg leading-relaxed">
                        To pass the <span className="font-bold text-ink">BECE & WASSCE</span> with grade A1, standard preparation is not enough. You need <span className="italic">Deep Work</span>. This is the ability to focus without distraction on a cognitively demanding task.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                        <div className="flex flex-col gap-3">
                           <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center font-black">01</div>
                           <h4 className="font-display font-bold text-ink uppercase tracking-tight">The Myth of Multi-tasking</h4>
                           <p className="font-body text-slate-500 text-sm leading-relaxed">
                             Checking WhatsApp "for just a second" creates <strong>Attention Residue</strong>. Your brain takes 20+ minutes to return to full focus capacity after one distraction.
                           </p>
                        </div>
                        <div className="flex flex-col gap-3">
                           <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center font-black">02</div>
                           <h4 className="font-display font-bold text-ink uppercase tracking-tight">Neural Deep Coding</h4>
                           <p className="font-body text-slate-500 text-sm leading-relaxed">
                             Maximum focus triggers <strong>Myelination</strong> — a process where your neurons wrap themselves in "insulation," allowing signals to travel faster and making memory recall effortless.
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2">
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 relative">
                       <h3 className="font-display font-bold text-xl text-ink mb-6 flex items-center gap-2">
                         <Target size={24} className="text-rose-600" /> Exam Impact Strategy
                       </h3>
                       <div className="space-y-6">
                          <div className="flex gap-4">
                             <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                                <CheckCircle size={18} />
                             </div>
                             <div>
                                <div className="font-bold text-sm text-ink mb-1">Building Exam Stamina</div>
                                <div className="text-slate-500 text-xs leading-relaxed font-body">Actually focusing for 25-50 minute blocks trains your brain for the 2-hour BECE/WASSCE pressure. It builds "focus muscles."</div>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                                <CheckCircle size={18} />
                             </div>
                             <div>
                                <div className="font-bold text-sm text-ink mb-1">Pattern Recognition</div>
                                <div className="text-slate-500 text-xs leading-relaxed font-body">Deep work allows you to see the "hidden patterns" in Elective Math and Core Science questions that distracted students miss entirely.</div>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                                <CheckCircle size={18} />
                             </div>
                             <div>
                                <div className="font-bold text-sm text-ink mb-1">Standardized Mastery</div>
                                <div className="text-slate-500 text-xs leading-relaxed font-body">1 Hour of Deep Study is more effective than 4 hours of "light" study with music and talking. Study less, but study 10X harder.</div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Active Recall Module */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 border border-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Brain size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3 uppercase tracking-tight">Active Recall</h3>
              <p className="font-body text-slate-500 text-sm leading-relaxed mb-6">
                Instead of re-reading your notes, close the book and try to write down everything you remember. This "testing effect" forces your brain to build stronger neural pathways.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-2">
                 <CheckCircle size={14} className="text-brand-500" /> Research-Backed
              </div>
            </div>

            {/* Spaced Repetition Module */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Clock size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3 uppercase tracking-tight">Spaced Repetition</h3>
              <p className="font-body text-slate-500 text-sm leading-relaxed mb-6">
                Don't cram. Review materials in expanding intervals: Day 1, Day 3, Day 10, then Day 30. This battles the "forgetting curve" and cements info in long-term memory.
              </p>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] uppercase font-black tracking-widest text-indigo-400 flex items-center gap-2">
                 <Target size={14} className="text-indigo-500" /> Strategic timing
              </div>
            </div>

            {/* Feynman Technique Module */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Lightbulb size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3 uppercase tracking-tight">The Feynman Method</h3>
              <p className="font-body text-slate-500 text-sm leading-relaxed mb-6">
                If you can't explain a concept to a JHS 1 student, you don't understand it yet. Teach a hypothetical student to find the gaps in your knowledge.
              </p>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] uppercase font-black tracking-widest text-amber-400 flex items-center gap-2">
                 <Sparkles size={14} className="text-amber-500" /> Mastery Check
              </div>
            </div>

            {/* Deep Focus Protocol */}
            <div className="lg:col-span-3 bg-brand-900 p-10 rounded-[3.5rem] text-white flex flex-col lg:flex-row gap-10 items-center overflow-hidden relative shadow-2xl shadow-brand-900/30">
               <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20"></div>
               
               <div className="flex-1 relative z-10">
                  <div className="text-brand-300 text-xs font-black uppercase tracking-[0.2em] mb-4">Focus Protocol v1.0</div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-tight">Environmental Hygiene</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                           <Sun size={20} className="text-orange-400" />
                        </div>
                        <div>
                           <div className="font-bold text-sm mb-1">Natural Lighting</div>
                           <div className="text-brand-200 text-xs tracking-tight">Study near windows. Sunlight boosts serotonin and improves focus.</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                           <Zap size={20} className="text-yellow-400" />
                        </div>
                        <div>
                           <div className="font-bold text-sm mb-1">Analog Only</div>
                           <div className="text-brand-200 text-xs tracking-tight">Keep phones in another room. A visible phone reduces cognitive capacity.</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                           <Moon size={20} className="text-blue-300" />
                        </div>
                        <div>
                           <div className="font-bold text-sm mb-1">Sleep Architecture</div>
                           <div className="text-brand-200 text-xs tracking-tight">Memories are consolidated during REM sleep. Study, then sleep.</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                           <AlertCircle size={20} className="text-emerald-400" />
                        </div>
                        <div>
                           <div className="font-bold text-sm mb-1">Hydration Baseline</div>
                           <div className="text-brand-200 text-xs tracking-tight">Dehydration of just 2% significantly lowers cognitive output.</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="w-full lg:w-72 p-8 bg-black/20 backdrop-blur-sm rounded-[2.5rem] border border-white/10">
                  <div className="text-center">
                     <div className="text-[10px] font-black uppercase tracking-widest text-brand-300 mb-6">Expert Advice</div>
                     <p className="font-body text-sm italic text-white/90 leading-relaxed">
                        "The ability to stay focused is the competitive advantage of the 21st century. Those who master their attention master their future."
                     </p>
                      <div className="mt-6 flex items-center justify-center gap-3">
                         <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-xs">AS</div>
                         <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest">AnyStudents</div>
                            <div className="text-[9px] text-brand-300">Lead Educator</div>
                         </div>
                      </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
