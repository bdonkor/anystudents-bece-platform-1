import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getProfile } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    let authInitialized = false

    const timeout = setTimeout(() => {
      if (isMounted && !authInitialized) {
        console.warn('Auth: System check timed out')
        setLoading(false)
      }
    }, 8000)

    async function handleAuthStateChange(event, session) {
      if (!isMounted) return
      console.log(`Auth Event [${event}]:`, session?.user?.email)

      const currentUser = session?.user ?? null
      setUser(currentUser)

      if (currentUser) {
        // Fetch profile
        try {
          const { data, error } = await getProfile(currentUser.id)
          if (isMounted) {
            setProfile(data || null)
            if (error) console.error('Auth: Profile error:', error)
          }
        } catch (err) {
          console.error('Auth: Profile catch:', err)
        }
      } else {
        if (isMounted) setProfile(null)
      }

      if (isMounted && !authInitialized) {
        authInitialized = true
        setLoading(false)
        console.log('Auth: Initialized')
      }
    }

    // Try to get initial session manually first as it's often faster
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!authInitialized) {
        handleAuthStateChange('MANUAL_INIT', session)
      }
    })

    // Listen for all future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Skip INITIAL_SESSION if we already manually initialized
        if (event === 'INITIAL_SESSION' && authInitialized) return
        handleAuthStateChange(event, session)
      }
    )

    return () => {
      isMounted = false
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  async function refreshProfile() {
    if (!user) return
    const { data } = await getProfile(user.id)
    setProfile(data || null)
  }

  async function signUp(email, password, fullName, role = 'student') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role }
      }
    })
    return { data, error }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signOut() {
    // Clear state FIRST so UI updates immediately
    setUser(null)
    setProfile(null)
    setLoading(false)
    try {
      await supabase.auth.signOut({ scope: 'local' })
    } catch (err) {
      console.error('Error during sign out:', err)
    }
  }

  function isSubscriptionActive() {
    if (!profile) return false
    if (profile.role === 'admin') return true // Admins always active
    if (profile.subscription_status !== 'active') return false
    if (!profile.subscription_expiry) return false
    return new Date(profile.subscription_expiry) > new Date()
  }

  function canGenerateExam() {
    if (!profile) return false
    if (profile.role === 'admin') return true // Admins have Standard access
    if (profile.is_suspended) return false
    if (!profile.free_exam_used) return true
    return isSubscriptionActive()
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    isSubscriptionActive,
    canGenerateExam,
    isAdmin: profile?.role === 'admin',
    isTeacher: profile?.role === 'teacher',
    isStudent: profile?.role === 'student',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
