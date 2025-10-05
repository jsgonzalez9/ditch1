import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Droplets, Brain, Activity, Eye, Smile, Wind, CheckCircle, Lock } from 'lucide-react';

interface Milestone {
  days: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  category: 'respiratory' | 'cardiovascular' | 'sensory' | 'mental';
}

const healthMilestones: Milestone[] = [
  {
    days: 1,
    title: 'Oxygen Levels Normalizing',
    description: 'Your blood oxygen levels begin to return to normal, improving energy.',
    icon: Droplets,
    color: 'blue',
    category: 'respiratory'
  },
  {
    days: 2,
    title: 'Nicotine Elimination',
    description: 'Nicotine is nearly eliminated from your body. Cravings may peak.',
    icon: Activity,
    color: 'purple',
    category: 'mental'
  },
  {
    days: 3,
    title: 'Breathing Easier',
    description: 'Lung function begins to improve. Breathing feels easier.',
    icon: Wind,
    color: 'cyan',
    category: 'respiratory'
  },
  {
    days: 5,
    title: 'Taste & Smell Returning',
    description: 'Your sense of taste and smell start to recover and enhance.',
    icon: Smile,
    color: 'pink',
    category: 'sensory'
  },
  {
    days: 7,
    title: 'Circulation Boost',
    description: 'Blood circulation to hands and feet improves significantly.',
    icon: Heart,
    color: 'red',
    category: 'cardiovascular'
  },
  {
    days: 14,
    title: 'Mental Clarity',
    description: 'Brain fog lifts. Concentration and mental focus improve.',
    icon: Brain,
    color: 'indigo',
    category: 'mental'
  },
  {
    days: 21,
    title: 'Skin Improvement',
    description: 'Skin tone and texture improve due to better circulation.',
    icon: Smile,
    color: 'orange',
    category: 'sensory'
  },
  {
    days: 30,
    title: 'Lung Capacity Increase',
    description: 'Lung capacity increases by up to 30%. Exercise feels easier.',
    icon: Wind,
    color: 'green',
    category: 'respiratory'
  },
  {
    days: 90,
    title: 'Complete Lung Recovery',
    description: 'Lung function is significantly improved. Coughing reduced.',
    icon: Wind,
    color: 'teal',
    category: 'respiratory'
  },
  {
    days: 180,
    title: 'Heart Health Restored',
    description: 'Risk of heart disease drops dramatically.',
    icon: Heart,
    color: 'rose',
    category: 'cardiovascular'
  },
  {
    days: 365,
    title: 'One Year Milestone',
    description: 'Major health improvements. Long-term health risks significantly reduced.',
    icon: CheckCircle,
    color: 'emerald',
    category: 'cardiovascular'
  }
];

export default function HealthTimeline() {
  const { profile } = useAuth();
  const [daysClean, setDaysClean] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (profile?.quit_date) {
      const today = new Date();
      const quitDate = new Date(profile.quit_date);
      const days = Math.floor((today.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysClean(Math.max(0, days));
    }
  }, [profile]);

  const getColorClasses = (color: string, achieved: boolean) => {
    if (!achieved) {
      return {
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        icon: 'bg-gray-300 text-gray-500',
        text: 'text-gray-500'
      };
    }

    const colors: any = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        icon: 'bg-blue-500 text-white',
        text: 'text-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-300',
        icon: 'bg-purple-500 text-white',
        text: 'text-purple-700'
      },
      cyan: {
        bg: 'bg-cyan-50',
        border: 'border-cyan-300',
        icon: 'bg-cyan-500 text-white',
        text: 'text-cyan-700'
      },
      pink: {
        bg: 'bg-pink-50',
        border: 'border-pink-300',
        icon: 'bg-pink-500 text-white',
        text: 'text-pink-700'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-300',
        icon: 'bg-red-500 text-white',
        text: 'text-red-700'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-300',
        icon: 'bg-indigo-500 text-white',
        text: 'text-indigo-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-300',
        icon: 'bg-orange-500 text-white',
        text: 'text-orange-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-300',
        icon: 'bg-green-500 text-white',
        text: 'text-green-700'
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-300',
        icon: 'bg-teal-500 text-white',
        text: 'text-teal-700'
      },
      rose: {
        bg: 'bg-rose-50',
        border: 'border-rose-300',
        icon: 'bg-rose-500 text-white',
        text: 'text-rose-700'
      },
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-300',
        icon: 'bg-emerald-500 text-white',
        text: 'text-emerald-700'
      }
    };

    return colors[color] || colors.blue;
  };

  const categories = [
    { id: 'all', label: 'All', icon: Activity },
    { id: 'respiratory', label: 'Breathing', icon: Wind },
    { id: 'cardiovascular', label: 'Heart', icon: Heart },
    { id: 'sensory', label: 'Senses', icon: Eye },
    { id: 'mental', label: 'Mental', icon: Brain }
  ];

  const filteredMilestones = selectedCategory === 'all'
    ? healthMilestones
    : healthMilestones.filter(m => m.category === selectedCategory);

  const achievedCount = filteredMilestones.filter(m => daysClean >= m.days).length;
  const nextMilestone = filteredMilestones.find(m => daysClean < m.days);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Health Recovery Timeline</h2>
        <p className="text-gray-600">Track your body's healing journey</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-cyan-100 text-sm mb-1">Days Clean</p>
            <p className="text-5xl font-bold">{daysClean}</p>
          </div>
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
            <Activity className="w-12 h-12" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Milestones Achieved</p>
            <p className="text-2xl font-bold">{achievedCount} / {filteredMilestones.length}</p>
          </div>
          <div className="w-full max-w-xs bg-white bg-opacity-20 rounded-full h-3 ml-4">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(achievedCount / filteredMilestones.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {nextMilestone && (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <nextMilestone.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-semibold text-orange-700">Next Milestone</span>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-semibold">
                  {nextMilestone.days - daysClean} days to go
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{nextMilestone.title}</h3>
              <p className="text-sm text-gray-700">{nextMilestone.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredMilestones.map((milestone, index) => {
          const achieved = daysClean >= milestone.days;
          const colors = getColorClasses(milestone.color, achieved);
          const Icon = milestone.icon;

          return (
            <div
              key={index}
              className={`relative pl-12 pb-8 ${
                index === filteredMilestones.length - 1 ? 'pb-0' : ''
              }`}
            >
              {index < filteredMilestones.length - 1 && (
                <div
                  className={`absolute left-6 top-12 bottom-0 w-0.5 ${
                    achieved ? 'bg-gradient-to-b from-cyan-500 to-teal-500' : 'bg-gray-300'
                  }`}
                />
              )}

              <div className="absolute left-0 top-0">
                <div className={`w-12 h-12 rounded-full ${colors.icon} flex items-center justify-center shadow-lg relative`}>
                  {achieved ? (
                    <Icon className="w-6 h-6" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>
              </div>

              <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 transition-all duration-300 ${
                achieved ? 'shadow-lg' : 'opacity-60'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{milestone.title}</h3>
                      {achieved && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{milestone.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs font-semibold text-gray-600">
                    Day {milestone.days}
                  </span>
                  {achieved ? (
                    <span className="text-xs font-semibold text-green-600 flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Achieved</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500">
                      {milestone.days - daysClean} days remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {daysClean >= 365 && (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-2xl p-8 text-center text-white">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
          <p className="text-xl opacity-90 mb-4">One Year Smoke-Free</p>
          <p className="text-emerald-100 leading-relaxed max-w-md mx-auto">
            You've achieved incredible health improvements. Your body has healed significantly,
            and your long-term health risks have been dramatically reduced. Keep going strong!
          </p>
        </div>
      )}
    </div>
  );
}
