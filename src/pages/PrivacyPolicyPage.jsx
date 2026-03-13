import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Helmet>
        <title>Privacy Policy | AnyStudents BECE Exam Prep</title>
        <meta name="description" content="Read the Privacy Policy of AnyStudents BECE Exam Prep. Learn how we protect your information and rights when using our platform." />
        <link rel="canonical" href="https://anystudents.com/privacy-policy" />
      </Helmet>
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-gold-500" size={32} />
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-800">Privacy Policy</h1>
            </div>

            <p className="text-sm text-slate-600 mb-8">Last updated: March 13, 2026</p>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 font-body">
              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">1. Introduction</h2>
                <p>
                  Welcome to AnyStudents Exam Prep ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our BECE preparation platform operating in Ghana.
                </p>
                <p>
                  By using our platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">2.1 Personal Information</h3>
                <p>We collect the following personal information when you register and use our platform:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Full name, email address, phone number, and password</li>
                  <li><strong>Student Information:</strong> School name, class level (JHS 3), and academic performance data</li>
                  <li><strong>Payment Information:</strong> Mobile money transaction details (processed securely through our payment provider)</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">2.2 Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Exam attempts, scores, and performance analytics</li>
                  <li>Subject preferences and study patterns</li>
                  <li>Time spent on the platform and feature usage</li>
                  <li>Device information, IP address, and browser type</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">3. How We Use Your Information</h2>
                <p>We use your personal information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Delivery:</strong> To provide access to mock exams, marking schemes, and performance tracking</li>
                  <li><strong>Account Management:</strong> To create and manage your account, process payments, and provide customer support</li>
                  <li><strong>Personalization:</strong> To customize your learning experience and recommend relevant study materials</li>
                  <li><strong>Communication:</strong> To send you important updates, exam tips, and promotional offers (you can opt-out anytime)</li>
                  <li><strong>Analytics:</strong> To improve our platform, understand user behavior, and develop new features</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable Ghanaian laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">4. Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers (payment processors, hosting services) who assist in operating our platform</li>
                  <li><strong>Teachers and Schools:</strong> If your school or teacher has enrolled you, they may access your performance data</li>
                  <li><strong>Legal Requirements:</strong> When required by Ghanaian law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our company</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure authentication and password protection</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information by authorized personnel only</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">6. Data Retention</h2>
                <p>
                  We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account at any time by contacting us. After deletion, we may retain certain information as required by law or for legitimate business purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">7. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at <a href="mailto:info@anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@anystudents.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">8. Children's Privacy</h2>
                <p>
                  Our platform is designed for JHS 3 students (typically aged 14-16 years). We recognize the importance of protecting children's privacy. For users under 18 years, we recommend parental or guardian consent before using our services. Parents and guardians have the right to review, modify, or delete their child's information by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">9. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and maintain your session. You can control cookie settings through your browser, but disabling cookies may limit platform functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the platform after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">11. Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-brand-800">AnyStudents Exam Prep</p>
                  <p>Email: <a href="mailto:info@anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@anystudents.com</a></p>
                  <p>Website: <a href="https://anystudents.com" className="text-gold-600 hover:text-gold-700 underline">www.anystudents.com</a></p>
                  <p className="mt-2 text-sm text-slate-600">Location: Ghana</p>
                </div>
              </section>

              <section className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600 italic">
                  This Privacy Policy is compliant with the Data Protection Act, 2012 (Act 843) of Ghana and other applicable data protection regulations.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
