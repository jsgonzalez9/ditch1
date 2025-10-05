import { useState } from 'react';
import {
  Activity,
  BarChart3,
  Target,
  Bell,
  Crown,
  User,
  AlertCircle,
  Heart,
  Users,
  Sparkles,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { PremiumBadge } from './PremiumGate';

type Tab = 'counter' | 'stats' | 'goals' | 'notifications' | 'premium' | 'profile' | 'upgrade' | 'pricing' | 'checkout-success' | 'cravings' | 'community' | 'health' | 'buddies' | 'privacy' | 'terms';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
  badgeCount?: number;
  group: 'primary' | 'support' | 'account';
  mobileVisible?: boolean;
}

export default function ImprovedNavigation({ activeTab, setActiveTab, unreadCount, setUnreadCount }: NavigationProps) {
  const { isDayTime } = useTheme();
  const { isPremium } = useSubscription();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'counter',
      label: 'Track',
      icon: Activity,
      group: 'primary',
      mobileVisible: true
    },
    {
      id: 'cravings',
      label: 'Cravings',
      icon: AlertCircle,
      group: 'primary',
      mobileVisible: true
    },
    {
      id: 'health',
      label: 'Health',
      icon: Heart,
      group: 'primary',
      mobileVisible: true
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: BarChart3,
      group: 'primary',
      mobileVisible: false
    },
    {
      id: 'goals',
      label: 'Goals',
      icon: Target,
      group: 'primary',
      mobileVisible: false
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      group: 'support',
      mobileVisible: false
    },
    {
      id: 'buddies',
      label: 'Buddies',
      icon: Users,
      group: 'support',
      mobileVisible: false
    },
    {
      id: 'notifications',
      label: 'Alerts',
      icon: Bell,
      badge: true,
      badgeCount: unreadCount,
      group: 'account',
      mobileVisible: false
    },
    {
      id: 'premium',
      label: 'Premium',
      icon: Sparkles,
      badge: !isPremium,
      group: 'account',
      mobileVisible: false
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      group: 'account',
      mobileVisible: true
    },
  ];

  const primaryItems = navItems.filter(item => item.group === 'primary');
  const supportItems = navItems.filter(item => item.group === 'support');
  const accountItems = navItems.filter(item => item.group === 'account');
  const mobileVisibleItems = navItems.filter(item => item.mobileVisible);

  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'notifications') {
      setUnreadCount(0);
    }
    setMobileMenuOpen(false);
  };

  const NavButton = ({ item, isMobile = false }: { item: NavItem; isMobile?: boolean }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    if (isMobile) {
      return (
        <button
          onClick={() => handleNavClick(item.id)}
          className={`flex flex-col items-center justify-center py-2 px-1 transition-colors relative ${
            isActive
              ? 'text-cyan-500'
              : isDayTime ? 'text-gray-600 active:text-cyan-500' : 'text-slate-400 active:text-cyan-400'
          }`}
        >
          <Icon className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] font-medium leading-tight">{item.label}</span>
          {item.badge && item.badgeCount && item.badgeCount > 0 && (
            <span className="absolute top-0 right-1 bg-red-500 text-white text-[9px] rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
              {item.badgeCount > 9 ? '9+' : item.badgeCount}
            </span>
          )}
          {item.badge && !item.badgeCount && item.id === 'premium' && (
            <span className="absolute top-0 right-1">
              <Crown className="w-3 h-3 text-orange-500" />
            </span>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={() => handleNavClick(item.id)}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 relative ${
          isActive
            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
            : isDayTime
            ? 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="whitespace-nowrap">{item.label}</span>
        {item.badge && item.badgeCount && item.badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center font-semibold">
            {item.badgeCount > 9 ? '9+' : item.badgeCount}
          </span>
        )}
        {item.badge && !item.badgeCount && item.id === 'premium' && !isPremium && (
          <span className="absolute -top-1 -right-1">
            <PremiumBadge />
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header className={`hidden md:block shadow-md sticky top-0 z-20 ${
        isDayTime ? 'bg-white' : 'bg-slate-800 border-b border-slate-700'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logo-wordmark.svg"
              alt="Ditch"
              className="object-contain h-[60px] w-[60px]"
            />
          </div>

          {/* Navigation Groups */}
          <div className="space-y-2">
            {/* Primary Actions */}
            <div className="flex items-center justify-center">
              <div className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg ${
                isDayTime ? 'bg-gray-50' : 'bg-slate-900'
              }`}>
                <span className={`text-xs font-semibold uppercase tracking-wider mr-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Track
                </span>
                {primaryItems.map(item => (
                  <NavButton key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Secondary Navigation */}
            <div className="flex items-center justify-center gap-6">
              {/* Support */}
              <div className="flex items-center space-x-1">
                <span className={`text-xs font-semibold uppercase tracking-wider mr-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Connect
                </span>
                {supportItems.map(item => (
                  <NavButton key={item.id} item={item} />
                ))}
              </div>

              {/* Account */}
              <div className="flex items-center space-x-1">
                <span className={`text-xs font-semibold uppercase tracking-wider mr-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Account
                </span>
                {accountItems.map(item => (
                  <NavButton key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-20 border-t shadow-lg ${
        isDayTime ? 'bg-white' : 'bg-slate-800 border-slate-700'
      }`}>
        <div className="grid grid-cols-5 h-16">
          {mobileVisibleItems.map(item => (
            <NavButton key={item.id} item={item} isMobile={true} />
          ))}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-colors relative ${
              isDayTime ? 'text-gray-600 active:text-cyan-500' : 'text-slate-400 active:text-cyan-400'
            }`}
          >
            <Menu className="w-6 h-6 mb-0.5" />
            <span className="text-[10px] font-medium leading-tight">More</span>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className={`absolute bottom-0 left-0 right-0 rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto ${
            isDayTime ? 'bg-white' : 'bg-slate-800'
          }`}>
            {/* Header */}
            <div className={`sticky top-0 px-6 py-4 border-b flex items-center justify-between ${
              isDayTime ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'
            }`}>
              <h3 className={`text-lg font-semibold ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                More Options
              </h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-lg ${
                  isDayTime ? 'hover:bg-gray-100' : 'hover:bg-slate-700'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-6">
              {/* Stats & Goals */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Progress
                </h4>
                <div className="space-y-1">
                  {[...primaryItems.filter(item => !item.mobileVisible)].map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                            : isDayTime
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Community */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Support Network
                </h4>
                <div className="space-y-1">
                  {supportItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                            : isDayTime
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Account Items */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${
                  isDayTime ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Account
                </h4>
                <div className="space-y-1">
                  {accountItems.filter(item => !item.mobileVisible).map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors relative ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                            : isDayTime
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && item.badgeCount && item.badgeCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center font-semibold">
                              {item.badgeCount > 9 ? '9+' : item.badgeCount}
                            </span>
                          )}
                          {item.badge && item.id === 'premium' && !isPremium && (
                            <span className="bg-orange-100 text-orange-600 text-xs rounded-full px-2 py-0.5 font-semibold">
                              Upgrade
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Safe area spacing for devices with notch */}
            <div className="h-8"></div>
          </div>
        </div>
      )}
    </>
  );
}
