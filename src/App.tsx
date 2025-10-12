import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SubscriptionProvider, useSubscription } from './contexts/SubscriptionContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import Counter from './components/Counter';
import Statistics from './components/Statistics';
import Goals from './components/Goals';
import Profile from './components/Profile';
import Premium from './components/Premium';
import Upgrade from './components/Upgrade';
import Notifications from './components/Notifications';
import CravingTracker from './components/CravingTracker';
import CommunityFeed from './components/CommunityFeed';
import HealthTimeline from './components/HealthTimeline';
import BuddySystem from './components/BuddySystem';
import { Pricing } from './pages/Pricing';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ImprovedNavigation from './components/ImprovedNavigation';
import { supabase } from './lib/supabase';

type Tab = 'counter' | 'stats' | 'goals' | 'notifications' | 'premium' | 'profile' | 'upgrade' | 'pricing' | 'checkout-success' | 'cravings' | 'community' | 'health' | 'buddies' | 'privacy' | 'terms';

function MainApp() {
  const { user, profile, loading } = useAuth();
  const { isPremium } = useSubscription();
  const { isDayTime } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('counter');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleNavigateToUpgrade = () => {
      setActiveTab('upgrade');
    };
    const handleNavigateToPrivacy = () => {
      setActiveTab('privacy');
    };
    const handleNavigateToTerms = () => {
      setActiveTab('terms');
    };

    window.addEventListener('navigate-to-upgrade', handleNavigateToUpgrade);
    window.addEventListener('navigate-to-privacy', handleNavigateToPrivacy);
    window.addEventListener('navigate-to-terms', handleNavigateToTerms);
    return () => {
      window.removeEventListener('navigate-to-upgrade', handleNavigateToUpgrade);
      window.removeEventListener('navigate-to-privacy', handleNavigateToPrivacy);
      window.removeEventListener('navigate-to-terms', handleNavigateToTerms);
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user!.id)
      .eq('is_read', false);

    setUnreadCount(count || 0);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDayTime ? 'bg-gradient-to-br from-cyan-50 to-teal-50' : 'bg-slate-950'
      }`}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!profile?.onboarding_completed) {
    return <Onboarding />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDayTime ? 'bg-gradient-to-br from-cyan-50 to-teal-50' : 'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto">
        <ImprovedNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unreadCount={unreadCount}
          setUnreadCount={setUnreadCount}
        />

        <main className="py-8 pb-20 md:pb-8 min-h-[calc(100vh-88px)] md:min-h-0">
          {activeTab === 'counter' && <Counter />}
          {activeTab === 'stats' && <Statistics />}
          {activeTab === 'goals' && <Goals />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'cravings' && <CravingTracker />}
          {activeTab === 'community' && <CommunityFeed />}
          {activeTab === 'health' && <HealthTimeline />}
          {activeTab === 'buddies' && <BuddySystem />}
          {activeTab === 'premium' && <Premium />}
          {activeTab === 'upgrade' && <Upgrade />}
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'pricing' && <Pricing />}
          {activeTab === 'checkout-success' && <CheckoutSuccess />}
          {activeTab === 'privacy' && <PrivacyPolicy onBack={() => setActiveTab('profile')} />}
          {activeTab === 'terms' && <TermsOfService onBack={() => setActiveTab('profile')} />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <MainApp />
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;