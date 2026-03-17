import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AlertTriangle } from 'lucide-react'

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Helmet>
        <title>Disclaimer | Important Notice | AnyStudents</title>
        <meta name="description" content="Read our disclaimer. AnyStudents is an independent study tool for BECE and WASSCE preparation and is not affiliated with official examination bodies." />
        <link rel="canonical" href="https://mockexams.anystudents.com/disclaimer" />
      </Helmet>
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-gold-500" size={32} />
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-800">Disclaimer</h1>
            </div>

            <p className="text-sm text-slate-600 mb-8">Last updated: March 13, 2026</p>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 font-body">
              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">1. General Information</h2>
                <p>
                  The information provided by AnyStudents Mock Exams ("we," "us," or "our") on our platform is for general educational purposes only. All information on the platform is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">2. Educational Tool - Not Official WAEC Material</h2>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                  <p className="font-semibold text-brand-800 mb-2">IMPORTANT NOTICE</p>
                  <p>
                    AnyStudents Mock Exams is <strong>NOT affiliated with, endorsed by, or officially connected to</strong> the West African Examinations Council (WAEC), Ghana Education Service (GES), or any government educational body in Ghana.
                  </p>
                </div>

                <p>
                  Our platform is an independent study tool designed to help students prepare for the Basic Education Certificate Examination (BECE) and West African Senior School Certificate Examination (WASSCE). We are not the official examination body and do not have access to actual examination papers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">3. No Guarantee of Exam Performance</h2>
                <p>
                  We make no guarantees or warranties regarding:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your performance on the actual national examinations</li>
                  <li>Passing scores or specific grades on the BECE or WASSCE</li>
                  <li>That any questions on our platform will appear on the actual exam</li>
                  <li>Admission to higher institutions based on use of our platform</li>
                  <li>That our content matches exactly with the current exam syllabus or format</li>
                </ul>
                <p className="mt-4">
                  Student success depends on many factors including individual effort, school instruction, prior knowledge, and examination conditions beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">4. Content Accuracy</h2>
                <p>
                  While we strive to provide high-quality educational content:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our exam questions are AI-generated and created to simulate BECE and WASSCE-style questions</li>
                  <li>We cannot guarantee that all content is 100% error-free or accurate</li>
                  <li>Marking schemes and explanations reflect our understanding of correct answers but may contain errors</li>
                  <li>Content may not always reflect the most current syllabus changes</li>
                  <li>Questions are practice materials, not actual past papers</li>
                </ul>
                <p className="mt-4">
                  If you identify errors or inaccuracies, please report them to <a href="mailto:info@anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@anystudents.com</a> so we can review and improve our content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">5. Supplementary Study Tool</h2>
                <p>
                  Our platform should be used as a <strong>supplementary study tool</strong> alongside:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Official national past questions and materials</li>
                  <li>Classroom instruction from qualified teachers</li>
                  <li>Approved textbooks and study guides</li>
                  <li>School-based mock examinations</li>
                  <li>Other recommended educational resources</li>
                </ul>
                <p className="mt-4">
                  Do not rely solely on our platform for BECE preparation. We recommend combining our practice exams with comprehensive study from multiple sources.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">6. Technical Availability</h2>
                <p>
                  We strive to maintain platform availability 24/7, however:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We do not guarantee uninterrupted access to the platform</li>
                  <li>Technical issues, maintenance, or updates may cause temporary service interruptions</li>
                  <li>Internet connectivity issues on your end may affect your ability to access content</li>
                  <li>We are not liable for any loss or inconvenience due to platform downtime</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">7. User Responsibility</h2>
                <p>
                  Students and parents/guardians are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verifying that content aligns with current national syllabus requirements</li>
                  <li>Consulting with teachers and schools regarding exam preparation</li>
                  <li>Using the platform ethically and for personal study purposes only</li>
                  <li>Ensuring account security and preventing unauthorized access</li>
                  <li>Backing up or saving any downloaded content</li>
                  <li>Understanding that we are a practice tool, not a replacement for formal education</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">8. External Links</h2>
                <p>
                  Our platform may contain links to external websites or resources. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The content, accuracy, or opinions expressed on external websites</li>
                  <li>Privacy practices of third-party sites</li>
                  <li>Any products or services offered by external links</li>
                </ul>
                <p className="mt-4">
                  Inclusion of any links does not necessarily imply endorsement or recommendation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">9. No Professional Advice</h2>
                <p>
                  The content on our platform is for educational and informational purposes only and should not be considered:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Professional educational counseling or tutoring advice</li>
                  <li>Official guidance from WAEC or Ghana Education Service</li>
                  <li>A substitute for qualified classroom instruction</li>
                  <li>Career or academic planning advice</li>
                </ul>
                <p className="mt-4">
                  For personalized educational advice, consult with qualified teachers, educational counselors, or school administrators.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">10. Limitation of Liability</h2>
                <p>
                  Under no circumstances shall AnyStudents Mock Exams be liable for any direct, indirect, incidental, consequential, or special damages arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use or inability to use our platform</li>
                  <li>Exam performance or results</li>
                  <li>Errors, omissions, or inaccuracies in content</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Reliance on information provided on the platform</li>
                  <li>Loss of data or downloaded content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">11. Changes to Content</h2>
                <p>
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify, update, or remove content at any time without notice</li>
                  <li>Change the format, structure, or delivery of exam questions</li>
                  <li>Discontinue certain features or subjects</li>
                  <li>Update content to reflect changes in BECE syllabus or examination format</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">12. Ghana Jurisdiction</h2>
                <p>
                  This disclaimer is governed by the laws of the Republic of Ghana. Our services are primarily intended for students preparing for the BECE in Ghana, though students from other locations may use the platform at their own discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">13. Updates to This Disclaimer</h2>
                <p>
                  We may update this disclaimer from time to time. Any changes will be posted on this page with an updated "Last updated" date. Continued use of the platform after changes constitutes acceptance of the updated disclaimer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">14. Contact Us</h2>
                <p>
                  If you have questions or concerns about this disclaimer, please contact us:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-brand-800">AnyStudents Mock Exams</p>
                  <p>Email: <a href="mailto:info@anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@anystudents.com</a></p>
                  <p>Website: <a href="https://mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">mockexams.anystudents.com</a></p>
                  <p className="mt-2 text-sm text-slate-600">Location: Ghana</p>
                </div>
              </section>

              <section className="mt-12 pt-8 border-t border-slate-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-display font-semibold text-brand-800 mb-3">Acknowledgment</h3>
                  <p className="text-sm">
                    By using AnyStudents Mock Exams, you acknowledge that you have read this disclaimer and agree to its terms. You understand that this platform is a practice tool and not a guarantee of exam success.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
