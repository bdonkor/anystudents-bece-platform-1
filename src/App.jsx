import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { fbq } from './lib/pixel'

// Lazy load all pages for maximum performance
const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'))
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const ExamPage = lazy(() => import('./pages/ExamPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'))
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'))
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'))
const UserGuidePage = lazy(() => import('./pages/UserGuidePage'))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const StudyTimePage = lazy(() => import('./pages/StudyTimePage'))
const DistinctionHubPage = lazy(() => import('./pages/DistinctionHubPage'))
const SubjectGamePage = lazy(() => import('./pages/SubjectGamePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/**
 * PixelTracker - Triggers a Facebook Pixel PageView on every route change
 */
function PixelTracker() {
  const location = useLocation();

  useEffect(() => {
    // Standard PageView for every route change
    fbq('track', 'PageView');
  }, [location]);

  return null;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-brand-600 font-body">Loading AnyStudents...</p>
      </div>
    </div>
  )
}

function ProtectedRoute({ children, role }) {
  const { user, profile, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (role && profile?.role !== role && profile?.role !== 'admin') return <Navigate to="/" replace />

  return children
}

function AppRoutes() {
  const { user, profile, loading } = useAuth()

  function getDashboardPath() {
    if (!profile) return '/student'
    if (profile.role === 'admin') return '/admin'
    if (profile.role === 'teacher') return '/teacher'
    return '/student'
  }

  if (loading) return <LoadingScreen />

  return (
    <Suspense fallback={<LoadingScreen />}>
      <PixelTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to={getDashboardPath()} replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to={getDashboardPath()} replace /> : <RegisterPage />} />
        <Route path="/forgot-password" element={user ? <Navigate to={getDashboardPath()} replace /> : <ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password/" element={<ResetPasswordPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/user-guide" element={<UserGuidePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/study-time" element={<StudyTimePage />} />
        <Route path="/distinction-hub" element={<DistinctionHubPage />} />
        <Route path="/subject-game" element={<SubjectGamePage />} />

        <Route path="/student" element={
          <ProtectedRoute><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/exam/:examId" element={
          <ProtectedRoute><ExamPage /></ProtectedRoute>
        } />
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        } />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
