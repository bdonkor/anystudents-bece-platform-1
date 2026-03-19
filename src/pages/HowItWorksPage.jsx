import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Register Free",
      description: "Create your account in 30 seconds. No credit card required."
    },
    {
      number: "02",
      title: "Choose a Subject",
      description: "Pick any of the 35+ BECE or WASSCE subjects and click Generate Exam."
    },
    {
      number: "03",
      title: "Practice & Improve",
      description: "Take the timed exam, check the marking scheme, track your progress."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>How It Works | AnyStudents Mock Exams</title>
        <meta name="description" content="Learn how to use AnyStudents to prepare for your BECE and WASSCE exams in three simple steps." />
      </Helmet>

      <Navbar />

      <main className="flex-1 flex flex-col items-center py-20 px-6">
        <section className="max-w-7xl mx-auto text-center w-full">
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-black text-brand-700 mb-6 drop-shadow-sm">
              How It Works
            </h1>
            <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full shadow-sm" />
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12 relative">
            {/* Background Accent Lines (Desktop Only) */}
            <div className="hidden md:block absolute top-32 left-1/4 right-1/4 h-0.5 bg-brand-700/5 -z-10" />
            
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center group relative">
                {/* Number Box with premium shadow and hover */}
                <div className="w-20 h-20 bg-brand-700 rounded-3xl flex items-center justify-center mb-10 shadow-[0_15px_30px_-10px_rgba(15,23,42,0.4)] group-hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.5)] group-hover:-translate-y-2 transition-all duration-500 ease-out">
                  <span className="text-gold-500 font-display text-3xl font-black tracking-tighter">{step.number}</span>
                </div>

                {/* Content with better typography spacing */}
                <h3 className="font-display text-2xl font-bold text-brand-700 mb-5 group-hover:text-gold-600 transition-colors">
                  {step.title}
                </h3>
                <p className="font-body text-gray-600 text-lg leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
                
                {/* Subtle indicator for flow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-brand-700/10 my-8" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-24">
            <Link to="/register" className="btn-gold px-14 py-4 text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-3">
              Get Started Free <ArrowRight size={22} />
            </Link>
            <p className="mt-6 text-gray-500 font-body">Join thousands of students across Ghana today.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
