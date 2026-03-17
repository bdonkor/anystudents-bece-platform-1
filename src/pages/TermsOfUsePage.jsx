import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FileText } from 'lucide-react'

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Helmet>
        <title>Terms of Use | AnyStudents Mock Exams</title>
        <meta name="description" content="Read the Terms of Use for AnyStudents Mock Exams. Understand the rules and guidelines for using our platform." />
        <link rel="canonical" href="https://mockexams.anystudents.com/terms-of-use" />
      </Helmet>
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-gold-500" size={32} />
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-800">Terms of Use</h1>
            </div>

            <p className="text-sm text-slate-600 mb-8">Last updated: March 13, 2026</p>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 font-body">
              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>
                  Welcome to AnyStudents Mock Exams. These Terms of Use ("Terms") govern your access to and use of our online exam preparation platform, including our website, mobile applications, and all related services (collectively, the "Platform").
                </p>
                <p>
                  By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">2. Eligibility and Account Registration</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">2.1 Eligibility</h3>
                <p>
                  Our Platform is designed primarily for JHS and SHS students in Ghana preparing for national examinations (BECE and WASSCE). Users under 18 years of age should obtain parental or guardian consent before using the Platform.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">2.2 Account Registration</h3>
                <p>To access certain features, you must create an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Maintain the security and confidentiality of your password</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">2.3 Account Types</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Student Accounts:</strong> Individual accounts for students to access mock exams and track performance</li>
                  <li><strong>Teacher Accounts:</strong> Accounts for teachers to monitor student progress and generate exams</li>
                  <li><strong>Admin Accounts:</strong> Platform administration accounts (by invitation only)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">3. Subscription and Payment</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.1 Subscription Plans</h3>
                <p>
                  We offer Standard Practice plans. Your subscription provides 30 days of access to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Multiple mock exam generation for BECE and WASSCE subjects</li>
                  <li>Complete marking schemes and detailed explanations</li>
                  <li>Performance tracking and analytics</li>
                  <li>Access to study resources and materials</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.2 Payment</h3>
                <p>
                  Payments are processed securely through our payment provider. We accept Mobile Money (MTN, Vodafone, AirtelTigo) and other electronic payment methods available in Ghana. By subscribing, you agree to the one-time fee for 30 days of standard access.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.3 Free Trial</h3>
                <p>
                  We may offer a free trial or free mock exam to new users. Free trial usage is subject to the same Terms, and we reserve the right to modify or discontinue free trials at any time.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.4 Subscription Duration</h3>
                <p>
                  Each subscription period is valid for 30 days from the date of payment. There is no automatic renewal; you will need to manually renew your subscription to maintain access after it expires.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">4. Acceptable Use</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">4.1 Permitted Use</h3>
                <p>You may use the Platform for lawful educational purposes only, specifically to prepare for national examinations (BECE and WASSCE).</p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">4.2 Prohibited Activities</h3>
                <p>You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Share your account credentials with others or allow multiple users to access one account</li>
                  <li>Copy, reproduce, distribute, or publicly display any content from the Platform without authorization</li>
                  <li>Use automated tools (bots, scrapers) to access or download content from the Platform</li>
                  <li>Reverse engineer, decompile, or attempt to extract source code from the Platform</li>
                  <li>Remove, obscure, or alter any copyright, trademark, or proprietary notices</li>
                  <li>Upload or transmit viruses, malware, or any harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Use the Platform for any commercial purpose without our written permission</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Violate any applicable laws or regulations of Ghana</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">5. Intellectual Property Rights</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.1 Our Content</h3>
                <p>
                  All content on the Platform, including exam questions, marking schemes, study materials, software, designs, text, graphics, logos, and trademarks, are owned by or licensed to AnyStudents and are protected by Ghanaian and international copyright, trademark, and intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.2 Limited License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal educational use only. This license does not permit you to download, copy, or redistribute any content except for your personal study purposes.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.3 User Content</h3>
                <p>
                  By submitting any content to the Platform (e.g., feedback, questions), you grant us a worldwide, royalty-free license to use, reproduce, and display such content for the purpose of operating and improving the Platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">6. Exam Content Accuracy</h2>
                <p>
                  While we strive to provide high-quality exam questions that mirror official examination formats and standards, we make no guarantees that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Questions on our Platform will appear on the actual national examinations</li>
                  <li>Our content is error-free or completely aligned with current syllabus requirements</li>
                  <li>Use of our Platform guarantees passing scores or specific results on the exams</li>
                </ul>
                <p className="mt-4">
                  Our Platform is a supplementary study tool and should be used alongside official study materials and classroom instruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">7. Disclaimers and Limitation of Liability</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">7.1 "As Is" Service</h3>
                <p>
                  The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">7.2 Limitation of Liability</h3>
                <p>
                  To the fullest extent permitted by Ghanaian law, AnyStudents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use or inability to use the Platform</li>
                  <li>Any unauthorized access to or use of our servers or your personal information</li>
                  <li>Any errors, mistakes, or inaccuracies in content</li>
                  <li>Any interruption or cessation of service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">8. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account and access to the Platform at any time, with or without notice, for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Non-payment of subscription fees</li>
                  <li>Any conduct that we deem harmful to the Platform or other users</li>
                </ul>
                <p className="mt-4">
                  Upon termination, your right to use the Platform will immediately cease. You may terminate your account at any time by contacting us or through your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">9. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless AnyStudents, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including legal fees, arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your infringement of any intellectual property or other rights of any third party.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">10. Governing Law and Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana, without regard to its conflict of law provisions.
                </p>
                <p className="mt-4">
                  Any disputes arising out of or relating to these Terms or the Platform shall be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved in the courts of Ghana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">11. Changes to These Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">12. Severability</h2>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">13. Entire Agreement</h2>
                <p>
                  These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and AnyStudents regarding the use of the Platform and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">14. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-brand-800">AnyStudents Mock Exams</p>
                  <p>Email: <a href="mailto:info@anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@anystudents.com</a></p>
                  <p>Website: <a href="https://mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">mockexams.anystudents.com</a></p>
                  <p className="mt-2 text-sm text-slate-600">Location: Ghana</p>
                </div>
              </section>

              <section className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-600 italic">
                  By using the AnyStudents Mock Exams Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
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
