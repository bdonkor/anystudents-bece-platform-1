import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Banknote } from 'lucide-react'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Helmet>
        <title>Refund Policy | AnyStudents Mock Exams</title>
        <meta name="description" content="Read our Refund Policy. Understand our policies regarding payments, cancellations, and refunds for our exam preparation platform." />
        <link rel="canonical" href="https://mockexams.anystudents.com/refund-policy" />
      </Helmet>
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Banknote className="text-gold-500" size={32} />
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-800">Return and Refund Policy</h1>
            </div>

            <p className="text-sm text-slate-600 mb-8">Last updated: March 13, 2026</p>

            <div className="prose prose-slate max-w-none space-y-6 text-slate-700 font-body">
              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">1. Overview</h2>
                <p>
                  At AnyStudents Mock Exams, we provide digital educational services to students in Ghana. This Return and Refund Policy explains our policies regarding payments, cancellations, and refunds.
                </p>
                <p>
                  <strong>Important:</strong> By subscribing to our Platform and making a payment, you agree to the terms outlined in this policy. Please read it carefully before purchasing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">2. Nature of Service - Digital Products</h2>
                <p>
                  AnyStudents Mock Exams is a digital service platform that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Instantly generated mock exam papers for BECE and WASSCE subjects</li>
                  <li>Downloadable exam papers and marking schemes</li>
                  <li>Digital study resources and materials</li>
                  <li>Online performance tracking and analytics</li>
                </ul>
                <p className="mt-4">
                  All content and services are delivered digitally and are accessible immediately upon payment and subscription activation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">3. No Refund Policy</h2>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                  <p className="font-semibold text-brand-800 mb-2">ALL SALES ARE FINAL</p>
                  <p>
                    Due to the nature of our digital services, <strong>we do not offer refunds once payment has been made and you have generated or downloaded any exam content.</strong>
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.1 Why We Don't Offer Refunds</h3>
                <p>
                  Once you subscribe and make a payment:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You gain immediate access to generate mock exams</li>
                  <li>You can download exam papers and marking schemes</li>
                  <li>Digital content, once accessed or downloaded, cannot be returned or retrieved</li>
                  <li>You have received the full value of the service at the point of download</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">3.2 No Refund After Use</h3>
                <p>
                  Refunds will <strong>NOT</strong> be issued if:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You have generated any mock exam paper</li>
                  <li>You have downloaded any exam content or marking scheme</li>
                  <li>You have accessed any study materials or resources</li>
                  <li>You have used the platform's features, even once</li>
                  <li>You change your mind after purchasing</li>
                  <li>You are unsatisfied with exam results or performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">4. Subscription Model</h2>
                <p>
                  Our Platform operates on a monthly subscription basis at GH₵100 per month.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">4.1 Subscription Duration</h3>
                <p>
                  Subscriptions are valid for a period of 30 days from the date of payment. There is no automatic renewal; after your 30-day access expires, you must manually purchase another subscription to continue using premium features.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">4.2 Renewal Reminders</h3>
                <p>We may send you a reminder email when your subscription is nearing its 30-day expiration, but the responsibility to renew rests with the user. No automatic charges will be made to your account.</p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">4.3 Access After Cancellation</h3>
                <p>
                  When you cancel your subscription:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You will continue to have access until the end of your current billing period</li>
                  <li>No refund will be issued for the remaining days in your billing cycle</li>
                  <li>No further charges will be made after the current period ends</li>
                  <li>After the billing period expires, you will lose access to premium features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">5. Payment Issues</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.1 Duplicate or Erroneous Charges</h3>
                <p>
                  If you believe you were charged twice for the same subscription or received an erroneous charge due to a technical error, please contact us immediately at <a href="mailto:info@mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@mockexams.anystudents.com</a> with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your account email address</li>
                  <li>Transaction details (date, amount, reference number)</li>
                  <li>Mobile money or payment confirmation screenshots</li>
                </ul>
                <p className="mt-4">
                  We will investigate verified duplicate charges and process a refund within 5-7 business days if confirmed.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.2 Failed Payments</h3>
                <p>
                  If your monthly renewal payment fails due to insufficient funds or payment method issues:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We will attempt to process the payment again within 3 days</li>
                  <li>You will receive a notification about the failed payment</li>
                  <li>If payment continues to fail, your subscription will be suspended</li>
                  <li>You can reactivate your subscription by updating your payment method</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">5.3 Unauthorized Charges</h3>
                <p>
                  If you believe your account was used without your authorization, contact us immediately at <a href="mailto:info@mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@mockexams.anystudents.com</a>. We will investigate and may issue a refund if we verify unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">6. Technical Issues</h2>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">6.1 Service Availability</h3>
                <p>
                  We strive to maintain 24/7 platform availability. However, temporary service interruptions may occur due to maintenance or technical issues. Brief interruptions do not qualify for refunds.
                </p>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">6.2 Extended Outages</h3>
                <p>
                  In the rare event of an extended service outage (more than 72 consecutive hours) caused by our systems, we may:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Extend your subscription by an equivalent number of days</li>
                  <li>Offer a credit for future subscriptions</li>
                </ul>

                <h3 className="text-xl font-semibold text-brand-600 mt-6 mb-3">6.3 User-Side Technical Issues</h3>
                <p>
                  We are not responsible for refunds due to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Poor internet connectivity on your end</li>
                  <li>Device incompatibility or user error</li>
                  <li>Failure to download or save content properly</li>
                  <li>Loss of downloaded files on your device</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">7. Exceptions</h2>
                <p>
                  The only circumstances under which we may consider issuing a refund are:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Change of mind before use</strong> - If you changed your mind after purchasing and have NOT generated or downloaded any exam content, you may qualify for a refund. Contact us immediately at <a href="mailto:info@mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@mockexams.anystudents.com</a></li>
                  <li><strong>Verified duplicate charges</strong> for the same subscription period</li>
                  <li><strong>Confirmed unauthorized access</strong> to your account by a third party</li>
                  <li><strong>Technical error</strong> on our part that prevented you from accessing the service despite payment</li>
                </ul>
                <p className="mt-4">
                  All refund requests must be submitted in writing to <a href="mailto:info@mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@mockexams.anystudents.com</a> and will be reviewed on a case-by-case basis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">8. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to this page with an updated "Last updated" date. Your continued use of the Platform after changes constitutes acceptance of the modified policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-semibold text-brand-700 mt-8 mb-4">9. Contact Us</h2>
                <p>
                  If you have questions about this Refund Policy or need to report a payment issue, please contact us:
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-brand-800">AnyStudents Mock Exams</p>
                  <p>Email: <a href="mailto:info@mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">info@mockexams.anystudents.com</a></p>
                  <p>Website: <a href="https://mockexams.anystudents.com" className="text-gold-600 hover:text-gold-700 underline">mockexams.anystudents.com</a></p>
                  <p className="mt-2 text-sm text-slate-600">Location: Ghana</p>
                </div>
              </section>

              <section className="mt-12 pt-8 border-t border-slate-200">
                <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
                  <h3 className="font-display font-semibold text-brand-800 mb-3">Important Reminder</h3>
                  <p className="text-sm">
                    <strong>By making a payment and subscribing to AnyStudents Mock Exams, you acknowledge and agree that:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm mt-3">
                    <li>You are purchasing access to digital services and downloadable content</li>
                    <li>All sales are final once you have generated or downloaded any exam content</li>
                    <li>No refunds will be issued after you have used the platform's services</li>
                    <li>Monthly subscription payments are non-refundable</li>
                  </ul>
                </div>
              </section>

              <section className="mt-8">
                <p className="text-sm text-slate-600 italic">
                  This policy is designed to protect the integrity of our digital services while being fair to our students. We encourage you to explore our platform features and contact us with any questions before making a purchase.
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
