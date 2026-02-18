import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - Diego Rodriguez"
        description="Privacy policy for Diego Rodriguez's website. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, GDPR, cookie policy"
        noIndex={true}
      />

      <div className="min-h-full bg-primary/30 py-36">
        <Circles />
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-12"
          >
            <h1 className="h2 mb-6">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-white/70">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fill out our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Interact with our website</li>
                  <li>Communicate with us via email</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you updates about our services</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage and performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Necessary Cookies:</strong> Essential for website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to show relevant advertisements</li>
                </ul>
                <p className="mt-4">
                  You can control cookie preferences through our cookie consent banner or your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist in operating our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                <p className="mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your data</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
                <p className="mb-4">
                  Our website may use third-party services including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Resend:</strong> For email communication</li>
                  <li><strong>Vercel:</strong> For website hosting</li>
                </ul>
                <p className="mt-4">
                  These services have their own privacy policies governing their use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your own.
                  We ensure appropriate safeguards are in place to protect your data during such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Children&apos;s Privacy</h2>
                <p>
                  Our website is not intended for children under 13 years of age. We do not knowingly
                  collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any
                  changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p><strong>Email:</strong> diegorodriguezpaiva1993@gmail.com</p>
                  <p><strong>Website:</strong> www.diego-rodriguez.work</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default PrivacyPolicy;
