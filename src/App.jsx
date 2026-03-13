import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ExamPage from './pages/ExamPage'
import PricingPage from './pages/PricingPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import RefundPolicyPage from './pages/RefundPolicyPage'
import DisclaimerPage from './pages/DisclaimerPage'
import UserGuidePage from './pages/UserGuidePage'
import NotFoundPage from './pages/NotFoundPage'

function ProtectedRoute({ children, role }) {
  const { user, profile, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-brand-600 font-body">Loading...</p>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (role && profile?.role !== role && profile?.role !== 'admin') return <Navigate to="/" replace />

  return children
}

function AppRoutes() {
  const { user, profile, loading } = useAuth()

  function getDashboardPath() {
    if (!profile) return '/student' // safe default, ProtectedRoute will handle role check
    if (profile.role === 'admin') return '/admin'
    if (profile.role === 'teacher') return '/teacher'
    return '/student'
  }

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-brand-600 font-body">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={user ? <Navigate to={getDashboardPath()} replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to={getDashboardPath()} replace /> : <RegisterPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-use" element={<TermsOfUsePage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/user-guide" element={<UserGuidePage />} />

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
