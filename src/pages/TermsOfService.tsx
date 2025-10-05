import { useTheme } from '../contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  const { isDayTime } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${isDayTime ? 'bg-gradient-to-br from-cyan-50 to-teal-50' : 'bg-slate-950'}`}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 mb-6 ${isDayTime ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-white'}`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className={`rounded-xl p-8 shadow-lg ${isDayTime ? 'bg-white' : 'bg-slate-800'}`}>
          <h1 className={`text-3xl font-bold mb-6 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>Terms of Service</h1>

          <div className={`space-y-6 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
            <p className="text-sm text-gray-500">Last Updated: October 5, 2025</p>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>1. Acceptance of Terms</h2>
              <p>By accessing and using Ditch, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>2. Description of Service</h2>
              <p>Ditch is a mobile application designed to help users track and reduce their vaping habits. The app provides:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Usage tracking and statistics</li>
                <li>Health milestone tracking</li>
                <li>Community support features</li>
                <li>Craving management tools</li>
                <li>Buddy accountability system</li>
                <li>Premium features via subscription</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>3. Age Requirement</h2>
              <p>You must be at least 18 years old to use Ditch. By using the app, you represent and warrant that you are at least 18 years of age.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>4. Medical Disclaimer</h2>
              <p className="mb-2">Ditch is a tracking and support tool, not medical advice. Important points:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The app does not provide medical advice, diagnosis, or treatment</li>
                <li>Consult with healthcare professionals for medical guidance</li>
                <li>Health timelines are based on general research, not personalized medical advice</li>
                <li>We are not responsible for any health outcomes related to app use</li>
                <li>If you experience medical issues, seek professional help immediately</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>5. User Accounts</h2>
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>6. Subscriptions and Payments</h2>
              <p className="mb-2">Premium subscriptions are processed through Apple In-App Purchases:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Monthly subscription: $2.99/month, auto-renewable</li>
                <li>Yearly subscription: $25.00/year, auto-renewable</li>
                <li>Subscriptions automatically renew unless canceled</li>
                <li>Cancel anytime through your Apple ID settings</li>
                <li>Refunds are subject to Apple's refund policy</li>
                <li>Prices may vary by region</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>7. Community Guidelines</h2>
              <p className="mb-2">When using community features, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Be respectful and supportive to other users</li>
                <li>Not post offensive, abusive, or inappropriate content</li>
                <li>Not share personal information of others</li>
                <li>Not use the platform for spam or commercial purposes</li>
                <li>Not impersonate others</li>
                <li>Report inappropriate content or behavior</li>
              </ul>
              <p className="mt-2">We reserve the right to remove content and suspend accounts that violate these guidelines.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>8. Intellectual Property</h2>
              <p>All content, features, and functionality of Ditch are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our content without permission.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>9. User-Generated Content</h2>
              <p>By posting content in Ditch, you grant us a non-exclusive, worldwide license to use, display, and distribute your content within the app. You retain ownership of your content.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>10. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of Ditch.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>11. Termination</h2>
              <p>We reserve the right to suspend or terminate your access to Ditch at any time for violations of these terms or for any other reason, without prior notice.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>12. Changes to Terms</h2>
              <p>We may modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>13. Governing Law</h2>
              <p>These terms are governed by the laws of the United States. Any disputes will be resolved in the courts of the United States.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>14. Contact</h2>
              <p>For questions about these terms, please contact us through the app's support feature.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
