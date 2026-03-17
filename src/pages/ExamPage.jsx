import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase, saveExamResult, trackExamDownload } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { Clock, Printer, ChevronDown, ChevronUp, ArrowLeft, CheckCircle, XCircle, Eye, EyeOff, Download, Zap } from 'lucide-react'

export default function ExamPage() {
  const { examId } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [exam, setExam] = useState(null)
  const [examRecord, setExamRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('read') // 'read' | 'timed' | 'results'
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(7200) // 2 hours
  const [showScheme, setShowScheme] = useState(false)
  const [showSectionB, setShowSectionB] = useState(true)
  const [score, setScore] = useState(null)
  const [activeTab, setActiveTab] = useState('questions') // 'questions' | 'scheme'
  const timerRef = useRef(null)
  const printRef = useRef(null)

  useEffect(() => {
    loadExam()
    return () => clearInterval(timerRef.current)
  }, [examId])

  async function loadExam() {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', examId)
      .single()

    if (error || !data) {
      navigate('/student')
      return
    }
    setExamRecord(data)
    setExam(data.exam_content)
    setLoading(false)
  }

  function startTimedExam() {
    setMode('timed')
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  function getGrade(percentage, level) {
    if (level === 'shs') {
      if (percentage >= 75) return { grade: 'A1', label: 'Excellent' }
      if (percentage >= 70) return { grade: 'B2', label: 'Very Good' }
      if (percentage >= 65) return { grade: 'B3', label: 'Good' }
      if (percentage >= 60) return { grade: 'C4', label: 'Credit' }
      if (percentage >= 55) return { grade: 'C5', label: 'Credit' }
      if (percentage >= 50) return { grade: 'C6', label: 'Credit' }
      if (percentage >= 45) return { grade: 'D7', label: 'Pass' }
      if (percentage >= 40) return { grade: 'E8', label: 'Pass' }
      return { grade: 'F9', label: 'Fail' }
    }
    // BECE Standard (1-9)
    if (percentage >= 90) return { grade: '1', label: 'Highest' }
    if (percentage >= 80) return { grade: '2', label: 'Higher' }
    if (percentage >= 70) return { grade: '3', label: 'High' }
    if (percentage >= 60) return { grade: '4', label: 'Credit' }
    if (percentage >= 55) return { grade: '5', label: 'Credit' }
    if (percentage >= 50) return { grade: '6', label: 'Credit' }
    if (percentage >= 45) return { grade: '7', label: 'Pass' }
    if (percentage >= 40) return { grade: '8', label: 'Pass' }
    return { grade: '9', label: 'Fail' }
  }

  async function handleSubmit() {
    clearInterval(timerRef.current)

    if (!exam?.markingScheme?.sectionA) {
      setMode('results')
      return
    }

    let correct = 0
    const schemeA = exam.markingScheme.sectionA
    schemeA.forEach(item => {
      if (answers[item.number] === item.answer) correct++
    })

    const totalQuestions = exam.sectionA?.questions?.length || 40
    const pct = Math.round((correct / totalQuestions) * 100)
    setScore({ correct, total: totalQuestions, percentage: pct })

    // Save result
    await saveExamResult({
      exam_id: examId,
      student_id: user.id,
      subject: exam.subject,
      score: correct,
      total_marks: totalQuestions,
      percentage: pct
    })

    setMode('results')
  }

  function handlePrint() {
    window.print()
  }

  async function handleDownloadPDF() {
    // Track download attempt (silent - don't block on errors)
    try {
      if (examId && user?.id) {
        await trackExamDownload(examId, user.id)
      }
    } catch (err) {
      console.error('Download tracking error:', err)
    }

    // Trigger browser's print function cleanly for the exam paper specifically
    const printWindow = window.open('', '', 'width=800,height=900')
    const content = printRef.current?.innerHTML || ''

    printWindow.document.write(`
      <html>
        <head>
          <title>${exam.subject} - AnyStudents Mock ${String(examRecord.level).toLowerCase() === 'shs' ? 'WASSCE' : 'BECE'}</title>
          <style>
            @page { margin: 20mm; }
            body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #000; padding: 20px; }
            .no-print { display: none !important; }
            h1, h2, h3 { font-family: ui-sans-serif, system-ui; text-align: center; }
            h1 { font-size: 18px; margin-bottom: 5px; }
            h2 { font-size: 20px; font-weight: bold; margin-bottom: 15px; }
            .question-container { margin-bottom: 15px; page-break-inside: avoid; }
            .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px; }
            .border-b-2 { border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
            .text-center { text-align: center; }
            .flex { display: flex; }
            .justify-center { justify-content: center; }
            .gap-8 { gap: 32px; }
            .mb-8 { margin-bottom: 30px; }
            .italic { font-style: italic; }
            .font-bold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-3" />
            <p className="font-body text-gray-500">Loading exam...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!exam) return null

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <div className="no-print">
        <Navbar />
      </div>

      {/* Timed exam top bar */}
      {mode === 'timed' && (
        <div className="no-print sticky top-0 z-40 bg-brand-700 text-white px-6 py-3 flex items-center justify-between shadow-md">
          <span className="font-display font-semibold text-sm">{exam.subject} — {exam.version}</span>
          <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 600 ? 'text-red-400' : 'text-gold-400'}`}>
            <Clock size={18} />
            {formatTime(timeLeft)}
          </div>
          <button onClick={handleSubmit} className="btn-gold text-sm py-1.5 px-4">Submit Exam</button>
        </div>
      )}

      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Exam Format Notice */}
        {mode === 'read' && (
          <div className="no-print mb-6 card bg-blue-50 border-2 border-blue-200 flex items-start gap-3 py-4 px-4 shadow-sm animate-pulse">
            <div className="bg-blue-600 text-white rounded-lg p-1.5 shrink-0 mt-0.5">
              <Zap size={18} />
            </div>
            <div>
              <p className="font-body text-sm text-blue-900 leading-relaxed font-medium">
                <strong className="font-display font-extrabold text-blue-900 text-base block mb-0.5">Note on Exam Format:</strong>
                For both BECE and WASSCE preparations, all our practice exams are set to a <span className="font-bold underline">Standard 40 Objective Questions</span>. While this may differ slightly from some traditional structures, it ensures a consistent and comprehensive practice across all topics.
              </p>
            </div>
          </div>
        )}

        {/* Instruction Alert */}
        {mode === 'read' && (
          <div className="no-print mb-6 card bg-amber-50 border-2 border-amber-100 flex items-center gap-3 py-3 px-4 shadow-sm">
            <div className="bg-blue-600 text-white rounded-full p-1">
              <Clock size={16} />
            </div>
            <p className="font-display font-bold text-blue-900 text-sm">
              Ready? Click the <span className="text-blue-700 uppercase tracking-tight">"Start"</span> button below to begin your practice session.
            </p>
          </div>
        )}

        {/* Action bar */}
        {mode === 'read' && (
          <div className="no-print flex flex-col sm:flex-row gap-4 mb-8 items-center">
            <Link to="/student" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-bold uppercase tracking-wider mr-auto">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button onClick={handlePrint} className="btn-outline text-xs sm:text-sm py-2.5 px-4 flex-1 sm:flex-none justify-center rounded-xl">
                <Printer size={16} /> Print
              </button>
              <button onClick={handleDownloadPDF} className="btn-outline text-xs sm:text-sm py-2.5 px-4 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 flex-1 sm:flex-none justify-center rounded-xl">
                <Download size={16} /> <span className="hidden xs:inline">PDF</span>
              </button>
              <button onClick={startTimedExam} className="btn-gold text-xs sm:text-sm py-3 px-6 sm:px-8 flex-[2] sm:flex-none justify-center rounded-xl shadow-lg ring-4 ring-yellow-400/20 active:scale-95 transition-all">
                <Clock size={18} /> <span>Start Timed Exam</span>
              </button>
            </div>
          </div>
        )}

        {/* Results banner */}
        {mode === 'results' && score && (
          <div className={`card mb-6 no-print border-2 ${score.percentage >= 50 ? 'border-blue-300 bg-blue-50' : 'border-red-200 bg-red-50'}`}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{score.percentage >= 70 ? '🏆' : score.percentage >= 50 ? '👍' : '💪'}</div>
              <div>
                <div className="font-display text-2xl font-bold text-ink">
                  {score.correct} / {score.total} correct — {score.percentage}%
                  <span className="ml-3 px-3 py-1 bg-white rounded-lg border border-current text-sm align-middle">
                    Grade: {getGrade(score.percentage, examRecord.level || profile?.level)?.grade}
                  </span>
                </div>
                <div className="font-body text-gray-600 text-sm mt-1">
                  {getGrade(score.percentage, examRecord.level || profile?.level)?.label}! 
                  {score.percentage >= 50 ? ' Good work! Review your weaker areas below.' : ' Keep practicing! Consistency is key to passing.'}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowScheme(!showScheme)} className="btn-primary text-sm py-2">
                {showScheme ? <EyeOff size={15} /> : <Eye size={15} />}
                {showScheme ? 'Hide' : 'Show'} Marking Scheme
              </button>
              <Link to="/student" className="btn-outline text-sm py-2">Back to Dashboard</Link>
            </div>
          </div>
        )}

        {/* EXAM PAPER */}
        <div ref={printRef} className="exam-paper bg-white rounded-2xl shadow-sm border border-gray-100 p-5 xs:p-8 md:p-12">

          {/* Exam header */}
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <div className="font-mono text-xs tracking-widest text-gray-500 mb-2">GHANA</div>
            <h1 className="font-display text-lg font-bold text-ink mb-1">
              {(String(examRecord.level || profile?.level)).toLowerCase() === 'shs' 
                ? 'WEST AFRICAN SENIOR SCHOOL CERTIFICATE EXAMINATION' 
                : 'BASIC EDUCATION CERTIFICATE EXAMINATION'}
            </h1>
            <h2 className="font-display text-xl font-bold text-brand-700 mb-3">MOCK {exam.subject.toUpperCase()}</h2>
            <div className="flex justify-center gap-8 text-sm font-body text-gray-600 mt-3">
              <span>Version: <strong>{exam.version}</strong></span>
              <span>Duration: <strong>{exam.duration}</strong></span>
              <span>Total Marks: <strong>{exam.totalMarks}</strong></span>
            </div>
          </div>

          {/* General instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
            <div className="font-display font-semibold text-ink mb-1 text-sm">INSTRUCTIONS TO CANDIDATES</div>
            <p className="font-body text-sm text-gray-700 mb-3">{exam.instructions}</p>
            <div className="border-t border-gray-300 pt-3 mt-3">
              <p className="font-body text-xs text-gray-500 italic leading-relaxed">
                <strong className="text-gray-600">Disclaimer:</strong> This is an independently created mock examination for practice purposes only. It is not affiliated with or endorsed by any official examination body.
              </p>
            </div>
          </div>

          {/* Tab Navigation - Only show in read mode */}
          {mode === 'read' && (
            <div className="no-print flex gap-2 mb-8 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('questions')}
                className={`font-display font-semibold px-6 py-3 text-sm transition-all rounded-t-xl border-b-2 -mb-0.5
                  ${activeTab === 'questions'
                    ? 'border-brand-600 text-brand-700 bg-brand-50/50'
                    : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
              >
                📝 Exam Questions
              </button>
              <button
                onClick={() => setActiveTab('scheme')}
                className={`font-display font-semibold px-6 py-3 text-sm transition-all rounded-t-xl border-b-2 -mb-0.5
                  ${activeTab === 'scheme'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg z-10'
                    : 'bg-blue-50 text-blue-600 border-transparent hover:bg-blue-100 font-bold'}`}
              >
                ✅ Marking Scheme
              </button>
            </div>
          )}

          {/* QUESTIONS TAB CONTENT */}
          {(mode !== 'read' || activeTab === 'questions') && (
            <>
          {/* SECTION A */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-display text-lg font-bold text-ink">{exam.sectionA?.title}</h3>
            </div>
            <p className="font-body text-sm text-gray-600 mb-6 italic">{exam.sectionA?.instructions}</p>
            <p className="font-body text-xs text-gray-400 mb-5 font-mono">[{exam.sectionA?.marks}]</p>

            <div className="space-y-6">
              {exam.sectionA?.questions?.map((q, i) => (
                <div key={q.number} className="flex gap-3">
                  <span className="question-number font-mono text-sm shrink-0">{q.number}.</span>
                  <div className="flex-1">
                    <p className="font-body text-sm text-ink mb-3 leading-relaxed">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(q.options || {}).map(([letter, text]) => (
                        <label key={letter} className={`flex items-start gap-2 cursor-pointer rounded-lg px-3 py-2 border transition-all text-sm font-body
                          ${mode === 'read' ? 'border-gray-100 hover:bg-gray-50' :
                            answers[q.number] === letter
                              ? mode === 'results'
                                ? exam.markingScheme?.sectionA?.find(s => s.number === q.number)?.answer === letter
                                  ? 'border-blue-400 bg-blue-50 text-blue-800'
                                  : 'border-red-300 bg-red-50 text-red-800'
                                : 'border-brand-500 bg-brand-50 text-brand-800'
                              : mode === 'results' && exam.markingScheme?.sectionA?.find(s => s.number === q.number)?.answer === letter
                                ? 'border-blue-300 bg-blue-50/50'
                                : 'border-gray-100 hover:bg-gray-50'
                          }`}>
                          <input type="radio" name={`q${q.number}`} value={letter}
                            disabled={mode === 'read' || mode === 'results'}
                            checked={answers[q.number] === letter}
                            onChange={() => setAnswers({ ...answers, [q.number]: letter })}
                            className="mt-0.5 accent-brand-600 shrink-0" />
                          <span><strong>{letter}.</strong> {text}</span>
                        </label>
                      ))}
                    </div>

                    {/* Show answer in results mode */}
                    {mode === 'results' && showScheme && (
                      <div className="mt-2 text-xs font-body text-gray-500 flex items-center gap-1.5">
                        {answers[q.number] === exam.markingScheme?.sectionA?.find(s => s.number === q.number)?.answer
                          ? <CheckCircle size={12} className="text-blue-500" />
                          : <XCircle size={12} className="text-red-400" />}
                        Answer: <strong>{exam.markingScheme?.sectionA?.find(s => s.number === q.number)?.answer}</strong>
                        {' — '}{exam.markingScheme?.sectionA?.find(s => s.number === q.number)?.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B */}
          <div>
            <button className="flex items-center gap-2 mb-4 no-print" onClick={() => setShowSectionB(!showSectionB)}>
              <h3 className="font-display text-lg font-bold text-ink">{exam.sectionB?.title}</h3>
              {showSectionB ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <h3 className="font-display text-lg font-bold text-ink mb-2 print-only">{exam.sectionB?.title}</h3>

            {showSectionB && (
              <>
                <p className="font-body text-sm text-gray-600 mb-2 italic">{exam.sectionB?.instructions}</p>
                <p className="font-body text-xs text-gray-400 mb-6 font-mono">[{exam.sectionB?.marks}]</p>
                <div className="space-y-8">
                  {exam.sectionB?.questions?.map(q => (
                    <div key={q.number} className="border-l-4 border-brand-600 pl-4">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="font-mono text-sm font-bold text-brand-600 shrink-0">{q.number}.</span>
                        <p className="font-body text-sm text-ink leading-relaxed">{q.question}</p>
                      </div>
                      {q.parts?.map(part => (
                        <div key={part.part} className="ml-4 mb-2">
                          <p className="font-body text-sm text-gray-700">
                            <strong className="font-mono text-brand-600">({part.part})</strong> {part.question}
                            <span className="text-gray-400 font-mono text-xs ml-2">[{part.marks} marks]</span>
                          </p>
                          {mode !== 'read' && (
                            <textarea rows={3} placeholder="Write your answer here..."
                              className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-2 text-sm font-body
                                         focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                              disabled={mode === 'results'} />
                          )}
                        </div>
                      ))}
                      <p className="font-mono text-xs text-gray-400 mt-1">[Total: {q.totalMarks} marks]</p>

                      {/* Section B marking scheme */}
                      {(mode === 'results' && showScheme) && (
                        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="font-mono text-xs font-bold text-amber-800 mb-2">MARKING SCHEME</div>
                          {exam.markingScheme?.sectionB?.find(s => s.number === q.number)?.answers?.map(a => (
                            <div key={a.part} className="text-xs font-body text-amber-900 mb-1.5">
                              <strong>({a.part})</strong> {a.answer} <span className="text-amber-600">[{a.marks} marks]</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
            </>
          )}

          {/* MARKING SCHEME TAB CONTENT */}
          {mode === 'read' && activeTab === 'scheme' && (
            <div className="space-y-8">
              {/* Section A Marking Scheme */}
              <div>
                <h3 className="font-display text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Section A - Marking Scheme
                </h3>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exam.markingScheme?.sectionA?.map((item) => (
                      <div key={item.number} className="bg-white border border-purple-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <span className="font-mono font-bold text-purple-600 shrink-0">Q{item.number}.</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-display font-bold text-lg text-purple-700">Answer: {item.answer}</span>
                              <CheckCircle size={16} className="text-green-500" />
                            </div>
                            <p className="text-xs font-body text-gray-600 leading-relaxed">{item.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section B Marking Scheme */}
              <div>
                <h3 className="font-display text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📝</span> Section B - Marking Scheme
                </h3>
                <div className="space-y-6">
                  {exam.markingScheme?.sectionB?.map((item) => (
                    <div key={item.number} className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                      <div className="font-display font-bold text-amber-800 mb-3 flex items-center gap-2">
                        <span className="text-lg">Question {item.number}</span>
                      </div>
                      <div className="space-y-3">
                        {item.answers?.map((ans) => (
                          <div key={ans.part} className="bg-white border border-amber-100 rounded-lg p-4">
                            <div className="font-mono font-bold text-amber-700 mb-2">
                              Part ({ans.part}) - {ans.marks} marks
                            </div>
                            <p className="font-body text-sm text-gray-700 leading-relaxed">{ans.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom actions */}
        {mode === 'timed' && (
          <div className="no-print flex justify-center mt-6">
            <button onClick={handleSubmit} className="btn-gold px-10 py-3.5 text-base">
              Submit Exam &amp; See Results
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
