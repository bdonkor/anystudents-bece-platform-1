import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut(e) {
    if (e) e.preventDefault()
    try {
      await signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
    // Hard redirect to fully clear any stale state
    window.location.href = '/'
  }

  function getDashboardLink() {
    if (!profile) return '/login'
    if (profile.role === 'admin') return '/admin'
    if (profile.role === 'teacher') return '/teacher'
    return '/student'
  }

  return (
    <nav className="bg-brand-700/95 text-white sticky top-0 z-50 shadow-lg border-b border-gold-500/30 backdrop-blur-md" style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/anystudents official logo.png"
              alt="AnyStudents BECE Exam Prep Logo"
              decoding="async"
              className="h-20 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <div className="text-gold-400 text-sm font-mono tracking-wide font-bold">Exam Prep</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/80 hover:text-gold-400 transition-colors text-base font-body">Get started</Link>
            <Link to="/user-guide" className="text-white/80 hover:text-gold-400 transition-colors text-base font-body">User Guide</Link>
            <Link to="/pricing" className="text-white/80 hover:text-gold-400 transition-colors text-base font-body">Pricing</Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-white/80 hover:text-gold-400 transition-colors text-base font-body">
                  <LayoutDashboard size={18} />
                  {profile?.role === 'admin' ? 'Admin' : profile?.role === 'teacher' ? 'Teacher Dashboard' : 'Dashboard'}
                </Link>
                <div className="h-5 w-px bg-white/20" />
                <span className="text-white/60 text-base font-body">{profile?.full_name?.split(' ')[0] || 'User'}</span>
                <button onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-red-400/80 hover:text-red-400 transition-colors text-base font-semibold ml-2">
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-white/80 hover:text-white transition-colors text-base font-body">Login</Link>
                <Link to="/register" className="btn-gold text-base py-2.5 px-6">Get Started Free</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden bg-gold-500 text-brand-800 p-2 rounded-lg hover:bg-gold-400 transition-colors shadow-sm" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-800 border-t border-brand-600 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-gold-400 py-2 font-body">Get started</Link>
          <Link to="/user-guide" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-gold-400 py-2 font-body">User Guide</Link>
          <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-gold-400 py-2 font-body">Pricing</Link>
          {user ? (
            <>
              <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-gold-400 py-2 font-body">
                {profile?.role === 'admin' ? 'Admin' : profile?.role === 'teacher' ? 'Teacher Dashboard' : 'Dashboard'}
              </Link>
              <button onClick={handleSignOut} className="block w-full text-left text-red-400 py-2 font-body">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-white/80 hover:text-gold-400 py-2 font-body">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-gold w-full justify-center py-2.5">Get Started Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
