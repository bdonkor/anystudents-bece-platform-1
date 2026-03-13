import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  UserPlus, 
  Search, 
  Zap, 
  Clock, 
  FileText, 
  BarChart, 
  CheckCircle,
  ArrowRight,
  HelpCircle,
  BookOpen
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserGuidePage() {
  const steps = [
    {
      icon: <UserPlus className="text-blue-600" size={24} />,
      title: "1. Create Your Account",
      description: "Start by registering with your name, email, and role (Student or Teacher). Your first mock exam is completely free—no credit card required!",
      link: "/register",
      linkText: "Register Free"
    },
    {
      icon: <Search className="text-purple-600" size={24} />,
      title: "2. Choose a Subject",
      description: "From your dashboard, select any of the 10 BECE subjects including Mathematics, Integrated Science, English, Social Studies, and more.",
    },
    {
      icon: <Zap className="text-gold-600" size={24} />,
      title: "3. Generate Your Exam",
      description: "Click 'Generate Exam'. Our AI engine creates a unique, official-standard BECE paper for you in less than 60 seconds.",
    },
    {
      icon: <Clock className="text-green-600" size={24} />,
      title: "4. Take the Timed Mock",
      description: "Practice under real exam conditions. Click the 'Start Timed Exam' button to begin your 2-hour practice session. This helps you master time management before the actual BECE.",
    },
    {
      icon: <FileText className="text-orange-600" size={24} />,
      title: "5. Review Marking Scheme",
      description: "Once finished, immediately access the full marking scheme with detailed explanations to see exactly where you can improve.",
    },
    {
      icon: <BarChart className="text-indigo-600" size={24} />,
      title: "6. Track Your Progress",
      description: "Use your performance tracker to see your score trends and readiness score for each subject.",
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>User Guide | How to Use AnyStudents BECE Platform</title>
        <meta name="description" content="Learn how to use AnyStudents to pass your BECE. Step-by-step guide on generating mock exams, timed practice, and performance tracking." />
        <link rel="canonical" href="https://anystudents.com/user-guide" />
      </Helmet>
      
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-brand-700 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <HelpCircle size={16} className="text-gold-400" />
              <span className="text-gold-400 text-xs md:text-sm font-mono tracking-wide font-bold uppercase">Platform Walkthrough</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              How to Master the BECE with <span className="text-gold-400">AnyStudents</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-body max-w-2xl mx-auto">
              Welcome to the simplest way to prepare for your final exams. Follow this guide to get the most out of our standard mock system.
            </p>
          </div>
        </section>

        {/* Steps Grid */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group border-2 border-blue-200 hover:border-blue-500 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 relative bg-white overflow-hidden">
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-blue-600 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
                  <span className="text-4xl font-display font-black text-white ml-[-8px] mt-[8px]">{index + 1}</span>
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 border-2 border-blue-100 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{step.title}</h3>
                <p className="font-body text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                {step.link && (
                  <Link to={step.link} className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline">
                    {step.linkText} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-blue-50/50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Frequently Asked Questions</h2>
              <p className="font-body text-gray-600">Quick answers to help you get started.</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Is the first exam really free?",
                  a: "Yes! Every new user gets one full mock exam generation for free. You can choose any of the 10 subjects and experience the full platform before subscribing."
                },
                {
                  q: "How many questions are in each mock?",
                  a: "Our exams follow the official BECE structure: 40 Multiple Choice questions (Section A) and detailed structured Theory questions (Section B)."
                },
                {
                  q: "Can I print the exams?",
                  a: "Absolutely. Each exam has a 'Print' and 'Download PDF' option so you can practice on paper if you prefer."
                },
                {
                  q: "What is Standard / Standard Access?",
                  a: "Standard Access unlocks unlimited exam generations for 30 days. This allows you to practice as many unique papers as you need to perfect your score."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white border-2 border-blue-50 hover:border-blue-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <h4 className="font-display font-bold text-blue-900 mb-3 flex items-center gap-3 text-lg">
                    <div className="bg-gold-100 p-1.5 rounded-lg">
                      <CheckCircle size={20} className="text-gold-600" />
                    </div>
                    {faq.q}
                  </h4>
                  <p className="font-body text-gray-600 text-base leading-relaxed pl-11">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center px-6">
          <div className="max-w-3xl mx-auto card bg-brand-700 text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BookOpen size={120} />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4 relative z-10">Start Your Success Journey Today</h2>
            <p className="text-white/70 font-body mb-8 relative z-10">Join 10,000+ Ghanaian students already preparing with AnyStudents.</p>
            <Link to="/register" className="btn-gold px-12 py-4 text-base relative z-10 shadow-xl inline-flex">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
