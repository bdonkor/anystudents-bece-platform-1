import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut(e) {
    if (e) e.preventDefault()
    try {
      await signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
    window.location.href = '/'
  }

  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)

  function getDashboardLink() {
    if (!profile) return '/login'
    if (profile.role === 'admin') return '/admin'
    if (profile.role === 'teacher') return '/teacher'
    return '/student'
  }

  // Returns classes for a desktop nav link — gold + underline when active
  function desktopLinkClass(href, exact = false) {
    const isActive = exact
      ? location.pathname === href
      : location.pathname.startsWith(href)
    return isActive
      ? 'text-gold-400 border-b-2 border-gold-400 pb-0.5 transition-colors text-base font-body'
      : 'text-white/80 hover:text-gold-400 transition-colors text-base font-body'
  }

  // Returns classes for a mobile nav link — gold background strip when active
  function mobileLinkClass(href, exact = false) {
    const isActive = exact
      ? location.pathname === href
      : location.pathname.startsWith(href)
    return isActive
      ? 'block text-gold-400 font-semibold py-2 font-body border-l-4 border-gold-400 pl-3 bg-gold-500/10 rounded-r'
      : 'block text-white/80 hover:text-gold-400 py-2 font-body pl-0'
  }

  const dashboardHref = getDashboardLink()

  return (
    <nav className="bg-brand-700/95 text-white sticky top-0 z-50 shadow-lg border-b border-gold-500/30 backdrop-blur-md" style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/anystudents official logo.png"
              alt="AnyStudents Mock Exams Logo"
              decoding="async"
              loading="lazy"
              className="h-14 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform"
            />

          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={desktopLinkClass('/', true)}>Get started</Link>
            
            {/* Resources Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className={`${desktopLinkClass('/user-guide')} flex items-center gap-1 cursor-default py-4`}>
                Resources <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-0 w-48 bg-brand-800 border border-gold-500/20 rounded-xl shadow-2xl py-2 transition-all duration-200 origin-top-left
                ${resourcesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <Link to="/user-guide" className="block px-4 py-2 text-sm text-white/80 hover:text-gold-400 hover:bg-white/5 transition-colors font-body">User Guide</Link>
                <Link to="/how-it-works" className="block px-4 py-2 text-sm text-white/80 hover:text-gold-400 hover:bg-white/5 transition-colors font-body">How It Works</Link>
                <Link to="/study-time" className="block px-4 py-2 text-sm text-white/80 hover:text-gold-400 hover:bg-white/5 transition-colors font-body">Study Timer</Link>
              </div>
            </div>

            <Link to="/pricing" className={desktopLinkClass('/pricing')}>Pricing</Link>
            <Link to="/blog" className={desktopLinkClass('/blog')}>Blog</Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to={dashboardHref} className={`flex items-center gap-2 ${desktopLinkClass(dashboardHref)}`}>
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
                <Link to="/login" className={desktopLinkClass('/login')}>Login</Link>
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
        <div className="md:hidden bg-brand-800 border-t border-brand-600 px-4 py-4 space-y-1">
          <Link to="/" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/', true)}>Get started</Link>
          
          <div className="py-1">
            <button 
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="w-full flex items-center justify-between text-gold-500/80 font-black uppercase tracking-widest text-[10px] py-2 px-0 hover:text-gold-400 transition-colors"
            >
              Resources 
              <ChevronDown size={14} className={`transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {mobileResourcesOpen && (
              <div className="space-y-1 pl-4 animate-in slide-in-from-top-1 duration-200">
                <Link to="/user-guide" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/user-guide')}>User Guide</Link>
                <Link to="/how-it-works" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/how-it-works')}>How It Works</Link>
                <Link to="/study-time" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/study-time')}>Study Timer</Link>
              </div>
            )}
          </div>

          <Link to="/pricing" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/pricing')}>Pricing</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/blog')}>Blog</Link>
          {user ? (
            <>
              <Link to={dashboardHref} onClick={() => setMenuOpen(false)} className={mobileLinkClass(dashboardHref)}>
                {profile?.role === 'admin' ? 'Admin' : profile?.role === 'teacher' ? 'Teacher Dashboard' : 'Dashboard'}
              </Link>
              <button onClick={handleSignOut} className="block w-full text-left text-red-400 py-2 font-body">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className={mobileLinkClass('/login')}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-gold w-full justify-center py-2.5 mt-2">Get Started Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
