import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { AlertCircle, Clock, CheckCircle, XCircle, TrendingUp, Map, Heart, Brain } from 'lucide-react';

interface Craving {
  id: string;
  intensity: number;
  trigger_type: string | null;
  trigger_description: string | null;
  coping_strategy: string | null;
  overcame: boolean;
  duration_minutes: number | null;
  emotional_state: string | null;
  created_at: string;
}

export default function CravingTracker() {
  const { user } = useAuth();
  const [showTracker, setShowTracker] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [triggerType, setTriggerType] = useState('');
  const [triggerDescription, setTriggerDescription] = useState('');
  const [emotionalState, setEmotionalState] = useState('');
  const [recentCravings, setRecentCravings] = useState<Craving[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecentCravings();
    }
  }, [user]);

  const fetchRecentCravings = async () => {
    const { data, error } = await supabase
      .from('cravings')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentCravings(data);
    }
  };

  const logCraving = async () => {
    if (!user) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('cravings')
      .insert({
        user_id: user.id,
        intensity,
        trigger_type: triggerType || null,
        trigger_description: triggerDescription || null,
        emotional_state: emotionalState || null,
        overcame: false,
      });

    if (!error) {
      await fetchRecentCravings();
      setShowTracker(false);
      resetForm();
    }

    setIsSubmitting(false);
  };

  const markCravingOvercome = async (cravingId: string) => {
    const craving = recentCravings.find(c => c.id === cravingId);
    if (!craving) return;

    const duration = Math.floor((Date.now() - new Date(craving.created_at).getTime()) / 60000);

    await supabase
      .from('cravings')
      .update({
        overcame: true,
        duration_minutes: duration,
      })
      .eq('id', cravingId);

    await fetchRecentCravings();
  };

  const resetForm = () => {
    setIntensity(5);
    setTriggerType('');
    setTriggerDescription('');
    setEmotionalState('');
  };

  const triggerTypes = [
    'Stress',
    'Social',
    'Boredom',
    'After meals',
    'Morning routine',
    'Alcohol',
    'Break time',
    'Other'
  ];

  const emotionalStates = [
    'Anxious',
    'Stressed',
    'Happy',
    'Sad',
    'Angry',
    'Lonely',
    'Excited',
    'Tired'
  ];

  const activeCraving = recentCravings.find(c => !c.overcame);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Craving Support</h2>
        {!showTracker && !activeCraving && (
          <button
            onClick={() => setShowTracker(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Having a Craving?
          </button>
        )}
      </div>

      {activeCraving && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-800">Active Craving</h3>
              </div>
              <p className="text-gray-700">
                Intensity: <span className="font-bold text-orange-600">{activeCraving.intensity}/10</span>
              </p>
              {activeCraving.trigger_type && (
                <p className="text-gray-600 text-sm mt-1">
                  Trigger: {activeCraving.trigger_type}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Started {new Date(activeCraving.created_at).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => markCravingOvercome(activeCraving.id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Overcame It!</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowBreathingExercise(true)}
              className="bg-white border-2 border-cyan-500 text-cyan-700 px-4 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Breathing Exercise</span>
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('show-distraction'))}
              className="bg-white border-2 border-purple-500 text-purple-700 px-4 py-3 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center justify-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Distraction Tips</span>
            </button>
          </div>
        </div>
      )}

      {showTracker && !activeCraving && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Log Your Craving</h3>
            <button
              onClick={() => setShowTracker(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How intense is your craving? ({intensity}/10)
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #86efac 0%, #fef08a ${intensity * 10}%, #fca5a5 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What triggered this craving?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {triggerTypes.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => setTriggerType(trigger)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    triggerType === trigger
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={triggerDescription}
              onChange={(e) => setTriggerDescription(e.target.value)}
              placeholder="What else was happening when you felt the craving?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              How are you feeling emotionally?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {emotionalStates.map((state) => (
                <button
                  key={state}
                  onClick={() => setEmotionalState(state)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    emotionalState === state
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={logCraving}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging...' : 'Log Craving & Get Help'}
          </button>
        </div>
      )}

      {recentCravings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">Recent Cravings</h3>
          <div className="space-y-3">
            {recentCravings.map((craving) => (
              <div
                key={craving.id}
                className={`p-4 rounded-xl border-2 ${
                  craving.overcame
                    ? 'bg-green-50 border-green-200'
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {craving.overcame ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                      <span className="font-semibold text-gray-800">
                        Intensity: {craving.intensity}/10
                      </span>
                      {craving.trigger_type && (
                        <span className="text-sm text-gray-600">• {craving.trigger_type}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(craving.created_at).toLocaleString()}
                      {craving.overcame && craving.duration_minutes && (
                        <span className="ml-2 text-green-600 font-semibold">
                          Lasted {craving.duration_minutes} min
                        </span>
                      )}
                    </p>
                  </div>
                  {!craving.overcame && (
                    <button
                      onClick={() => markCravingOvercome(craving.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                    >
                      Mark Overcome
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-cyan-50 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              <span className="font-semibold text-gray-800">Your Progress</span>
            </div>
            <p className="text-sm text-gray-700">
              You've overcome{' '}
              <span className="font-bold text-cyan-600">
                {recentCravings.filter(c => c.overcame).length}
              </span>{' '}
              out of {recentCravings.length} recent cravings (
              {Math.round((recentCravings.filter(c => c.overcame).length / recentCravings.length) * 100)}%)
            </p>
          </div>
        </div>
      )}

      {showBreathingExercise && (
        <BreathingExercise onClose={() => setShowBreathingExercise(false)} />
      )}
    </div>
  );
}

function BreathingExercise({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 7;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 8;
          } else {
            setPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-cyan-400 to-blue-500';
      case 'hold': return 'from-purple-400 to-pink-500';
      case 'exhale': return 'from-green-400 to-teal-500';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">4-7-8 Breathing</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className="relative mx-auto w-64 h-64">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 ${
                isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
              }`}
              style={{
                transform: phase === 'inhale' ? 'scale(1.2)' : phase === 'exhale' ? 'scale(0.8)' : 'scale(1)',
                transition: `transform ${phase === 'inhale' ? '4s' : phase === 'hold' ? '7s' : '8s'} ease-in-out`
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-white text-5xl font-bold mb-2">{count}</p>
              <p className="text-white text-xl font-semibold">{getPhaseText()}</p>
            </div>
          </div>

          {!isActive ? (
            <button
              onClick={() => setIsActive(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Start Exercise
            </button>
          ) : (
            <button
              onClick={() => {
                setIsActive(false);
                setPhase('inhale');
                setCount(4);
              }}
              className="px-8 py-4 bg-gray-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Stop
            </button>
          )}

          <div className="text-left bg-cyan-50 rounded-xl p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              The 4-7-8 technique calms your nervous system and reduces cravings. Breathe in for 4 seconds, hold for 7, and exhale for 8. Repeat 3-4 times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
