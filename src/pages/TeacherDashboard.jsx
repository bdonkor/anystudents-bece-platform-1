import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { saveExam, getUserExams, updateProfile } from '../lib/supabase'
import { generateExam, generateExamSeed, JHS_SUBJECTS, SHS_SUBJECTS } from '../lib/examGenerator'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Zap, Printer, BookOpen, Users, AlertTriangle, CheckCircle, Download } from 'lucide-react'

const VERSIONS = ['A', 'B', 'C']

export default function TeacherDashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const level = profile?.level || 'jhs'
  const SUBJECTS = level === 'shs' ? SHS_SUBJECTS : JHS_SUBJECTS

  const [selectedSubject, setSelectedSubject] = useState(Object.keys(SUBJECTS)[0] || 'mathematics')
  const [selectedVersions, setSelectedVersions] = useState(['A'])
  const [generating, setGenerating] = useState(false)
  const [genStatus, setGenStatus] = useState('')
  const [genError, setGenError] = useState('')
  const [generatedExams, setGeneratedExams] = useState([])
  const [examHistory, setExamHistory] = useState([])
  const [activeTab, setActiveTab] = useState('generate')

  useEffect(() => {
    if (user) loadHistory()
  }, [user])

  async function loadHistory() {
    const { data } = await getUserExams(user.id, 50)
    if (data) setExamHistory(data)
  }

  function toggleVersion(v) {
    setSelectedVersions(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
    )
  }

  async function handleGenerate() {
    if (selectedVersions.length === 0) {
      setGenError('Please select at least one version.')
      return
    }

    setGenerating(true)
    setGenError('')
    setGeneratedExams([])

    const results = []

    for (const version of selectedVersions) {
      try {
        setGenStatus(`Generating Version ${version} of ${SUBJECTS[selectedSubject]}...`)
        const { exam } = await generateExam(SUBJECTS[selectedSubject], selectedSubject, level, version)
        const seed = generateExamSeed(user.id, selectedSubject)

        const { data: saved } = await saveExam({
          user_id: user.id,
          subject: SUBJECTS[selectedSubject],
          level: level,
          version,
          exam_content: exam,
          exam_seed: seed,
          is_validated: true
        })

        results.push({ version, exam, id: saved?.id })
        setGenStatus(`Version ${version} ready ✓`)
      } catch (err) {
        console.error(`Version ${version} failed:`, err)
        setGenError(`Version ${version} failed: ${err.message}`)
      }
    }

    setGeneratedExams(results)
    if (results.length > 0) {
      await loadHistory()
      await updateProfile(user.id, {
        exam_count_today: (profile.exam_count_today || 0) + results.length
      })
    }

    setGenerating(false)
    setGenStatus('')
  }

  const TABS = [
    { id: 'generate', label: 'Generate Exams', icon: <Zap size={15} /> },
    { id: 'history', label: 'Exam Library', icon: <BookOpen size={15} /> },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-8 w-full">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
            Teacher Dashboard
          </h1>
          <p className="font-body text-gray-500 mt-1">
            Generate multiple BECE exam versions for your class. Each version has different questions to prevent copying.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold font-body transition-all
                ${activeTab === tab.id ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'generate' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="font-display text-xl font-bold text-ink mb-1">Generate Class Test</h2>
              <p className="font-body text-gray-500 text-sm mb-6">
                Generate up to 3 different versions (A, B, C) so students cannot share answers during class exams.
              </p>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-ink mb-2 font-body">Subject</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(SUBJECTS).map(([key, name]) => (
                    <button key={key} onClick={() => setSelectedSubject(key)}
                      className={`py-2 px-3 rounded-xl border-2 text-sm font-body font-semibold text-left transition-all
                        ${selectedSubject === key
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-ink mb-2 font-body">Exam Versions</label>
                <p className="text-xs text-gray-400 font-body mb-3">Each version has completely different questions</p>
                <div className="flex gap-3">
                  {VERSIONS.map(v => (
                    <button key={v} onClick={() => toggleVersion(v)}
                      className={`w-14 h-14 rounded-xl border-2 font-display font-bold text-lg transition-all
                        ${selectedVersions.includes(v)
                          ? 'border-brand-600 bg-brand-700 text-gold-400'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {v}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-body mt-2">
                  {selectedVersions.length} version{selectedVersions.length !== 1 ? 's' : ''} selected
                  {selectedVersions.length > 1 ? ' — each will take 30–60 seconds' : ''}
                </p>
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

              <button onClick={handleGenerate} disabled={generating || selectedVersions.length === 0}
                className="btn-gold w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed">
                {generating ? (
                  <><div className="spinner !w-5 !h-5 !border-2 !border-t-brand-700" /> Generating {selectedVersions.join(', ')}...</>
                ) : (
                  <><Zap size={18} /> Generate {selectedVersions.length > 1 ? `Versions ${selectedVersions.join(', ')}` : `Version ${selectedVersions[0] || 'A'}`}</>
                )}
              </button>
            </div>

            {/* Generated results */}
            <div>
              {generatedExams.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-ink">Generated Exams Ready</h3>
                  {generatedExams.map(({ version, id }) => (
                    <div key={version} className="card flex items-center justify-between bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center font-display font-bold text-gold-400">
                          {version}
                        </div>
                        <div>
                          <div className="font-display font-semibold text-ink text-sm">{SUBJECTS[selectedSubject]}</div>
                          <div className="font-body text-xs text-blue-600 flex items-center gap-1">
                            <CheckCircle size={12} /> Version {version} ready
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/exam/${id}`} target="_blank" className="btn-outline text-xs py-1.5 px-3">
                          <Download size={13} /> View
                        </Link>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 font-body">
                    Open each version in a new tab to print or save as PDF for your students.
                  </p>
                </div>
              ) : (
                <div className="card bg-brand-50 border border-brand-100">
                  <h3 className="font-display font-semibold text-brand-800 mb-3">Why Multiple Versions?</h3>
                  <ul className="space-y-2 text-sm font-body text-brand-700">
                    {[
                      'Version A, B, C have different questions for the same topic',
                      'Students sitting together cannot copy each other\'s answers',
                      'All versions are the same difficulty level',
                      'Same marking scheme format — easy to grade',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-brand-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card">
            <h2 className="font-display text-xl font-bold text-ink mb-5">Exam Library</h2>
            {examHistory.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-body text-gray-400">No exams generated yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {examHistory.map(exam => (
                  <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-700 rounded-lg flex items-center justify-center font-mono font-bold text-gold-400 text-sm">
                        {exam.version || 'A'}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-ink text-sm">{exam.subject}</div>
                        <div className="font-body text-xs text-gray-400">
                          {new Date(exam.created_at).toLocaleDateString('en-GH', { dateStyle: 'medium' })}
                        </div>
                      </div>
                    </div>
                    <Link to={`/exam/${exam.id}`} target="_blank" className="btn-outline text-xs py-1.5 px-3">
                      <Printer size={13} /> Open
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
