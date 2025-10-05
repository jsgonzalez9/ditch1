import { useTheme } from '../contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
          <h1 className={`text-3xl font-bold mb-6 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>Privacy Policy</h1>

          <div className={`space-y-6 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
            <p className="text-sm text-gray-500">Last Updated: October 5, 2025</p>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>1. Information We Collect</h2>
              <p className="mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email address and authentication credentials</li>
                <li>Usage tracking data (puff counts, quit dates, milestones)</li>
                <li>Profile information (age, gender, vaping history)</li>
                <li>Health milestone achievements and progress data</li>
                <li>Community posts and buddy system messages</li>
                <li>Craving logs and trigger information</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>2. How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Track your progress toward quitting vaping</li>
                <li>Send you notifications and reminders</li>
                <li>Enable community features and buddy system</li>
                <li>Process your subscription through Apple In-App Purchases</li>
                <li>Analyze usage patterns to improve the app experience</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>3. Data Storage and Security</h2>
              <p>Your data is securely stored using Supabase, a secure cloud database service. We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Row-level security policies to protect your data</li>
                <li>Regular security audits and updates</li>
                <li>Secure authentication via Supabase Auth</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>4. Data Sharing</h2>
              <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in operating our app (Supabase, Apple)</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>5. Community Features</h2>
              <p>When you use community features:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Posts can be made anonymously or with your profile</li>
                <li>Anonymous posts do not reveal your identity</li>
                <li>Buddy messages are private between connected users</li>
                <li>You can delete your posts and messages at any time</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>6. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt out of notifications</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>7. Children's Privacy</h2>
              <p>Ditch is intended for users 18 years and older. We do not knowingly collect information from anyone under 18.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>8. Apple In-App Purchases</h2>
              <p>When you make purchases through Apple In-App Purchases, Apple processes your payment information. We do not have access to your payment details. Your purchase is governed by Apple's privacy policy and terms of service.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>9. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app.</p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>10. Contact Us</h2>
              <p>If you have questions about this privacy policy, please contact us through the app's support feature.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
