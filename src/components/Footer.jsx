import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-800 text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/anystudents official logo.png"
                alt="AnyStudents BECE Exam Practice Platform"
                loading="lazy"
                decoding="async"
                className="h-20 w-auto object-contain"
              />
                <div className="text-gold-400 text-sm font-mono tracking-wide font-bold">Exam Prep</div>
            </div>
            <p className="text-sm font-body leading-relaxed">
              Ghana's leading BECE preparation platform. Helping JHS 3 students excel in the national examination.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-3">Platform</h4>
            <div className="space-y-2 text-sm font-body">
              <Link to="/" className="block hover:text-gold-400 transition-colors">Get started</Link>
              <Link to="/user-guide" className="block hover:text-gold-400 transition-colors">User Guide</Link>
              <Link to="/pricing" className="block hover:text-gold-400 transition-colors">Pricing — GH₵100/month</Link>
              <Link to="/register" className="block hover:text-gold-400 transition-colors">Free Mock Exam</Link>
              <Link to="/login" className="block hover:text-gold-400 transition-colors">Login</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-3">Legal</h4>
            <div className="space-y-2 text-sm font-body">
              <Link to="/privacy-policy" className="block hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="block hover:text-gold-400 transition-colors">Terms of Use</Link>
              <Link to="/refund-policy" className="block hover:text-gold-400 transition-colors">Return and Refund Policy</Link>
              <Link to="/disclaimer" className="block hover:text-gold-400 transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-body">
          <p>© {new Date().getFullYear()} AnyStudents.com — All rights reserved</p>
          <p>Exam Prep Platform · Ghana · Powered by <a href="https://conversingai.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 hover:underline transition-color">ConversingAI</a></p>
        </div>
      </div>
    </footer>
  )
}
