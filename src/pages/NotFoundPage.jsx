import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import { BookOpen } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Helmet>
        <title>404 - Page Not Found | AnyStudents BECE</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-mono text-8xl font-bold text-brand-200 mb-4">404</div>
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Page Not Found</h1>
          <p className="font-body text-gray-500 mb-6">This page doesn't exist. Let's get you back on track.</p>
          <Link to="/" className="btn-primary"><BookOpen size={16} /> Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
