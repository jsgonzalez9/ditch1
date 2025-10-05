import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Users, MessageCircle, UserPlus, Check, X, Send, Flame, Trophy } from 'lucide-react';

interface BuddyConnection {
  id: string;
  user_id: string;
  buddy_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  initiated_by: string;
  last_interaction_at: string;
  created_at: string;
  buddy_profile?: {
    full_name: string | null;
    longest_streak: number | null;
  };
}

interface BuddyMessage {
  id: string;
  connection_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function BuddySystem() {
  const { user, profile } = useAuth();
  const [buddies, setBuddies] = useState<BuddyConnection[]>([]);
  const [pendingRequests, setPendingRequests] = useState<BuddyConnection[]>([]);
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyConnection | null>(null);
  const [messages, setMessages] = useState<BuddyMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBuddies();
      fetchPendingRequests();
    }
  }, [user]);

  useEffect(() => {
    if (selectedBuddy) {
      fetchMessages(selectedBuddy.id);
    }
  }, [selectedBuddy]);

  const fetchBuddies = async () => {
    const { data, error } = await supabase
      .from('buddy_connections')
      .select(`
        *,
        buddy_profile:buddy_id (full_name, longest_streak)
      `)
      .eq('status', 'accepted')
      .or(`user_id.eq.${user!.id},buddy_id.eq.${user!.id}`)
      .order('last_interaction_at', { ascending: false });

    if (!error && data) {
      setBuddies(data as BuddyConnection[]);
    }
    setLoading(false);
  };

  const fetchPendingRequests = async () => {
    const { data, error } = await supabase
      .from('buddy_connections')
      .select(`
        *,
        buddy_profile:user_id (full_name, longest_streak)
      `)
      .eq('status', 'pending')
      .eq('buddy_id', user!.id);

    if (!error && data) {
      setPendingRequests(data as BuddyConnection[]);
    }
  };

  const searchForBuddy = async () => {
    if (!searchEmail.trim()) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, longest_streak')
      .eq('email', searchEmail.trim())
      .maybeSingle();

    if (data && data.id !== user!.id) {
      const { data: existingConnection } = await supabase
        .from('buddy_connections')
        .select('*')
        .or(`user_id.eq.${user!.id},buddy_id.eq.${user!.id}`)
        .or(`user_id.eq.${data.id},buddy_id.eq.${data.id}`)
        .maybeSingle();

      if (existingConnection) {
        setSearchResult({ ...data, alreadyConnected: true });
      } else {
        setSearchResult(data);
      }
    } else {
      setSearchResult(null);
    }
  };

  const sendBuddyRequest = async (buddyId: string) => {
    const { error } = await supabase
      .from('buddy_connections')
      .insert({
        user_id: user!.id,
        buddy_id: buddyId,
        initiated_by: user!.id,
        status: 'pending',
      });

    if (!error) {
      setSearchEmail('');
      setSearchResult(null);
    }
  };

  const respondToRequest = async (connectionId: string, accept: boolean) => {
    const { error } = await supabase
      .from('buddy_connections')
      .update({ status: accept ? 'accepted' : 'declined' })
      .eq('id', connectionId);

    if (!error) {
      await fetchBuddies();
      await fetchPendingRequests();
    }
  };

  const fetchMessages = async (connectionId: string) => {
    const { data, error } = await supabase
      .from('buddy_messages')
      .select('*')
      .eq('connection_id', connectionId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);

      await supabase
        .from('buddy_messages')
        .update({ is_read: true })
        .eq('connection_id', connectionId)
        .neq('sender_id', user!.id);
    }
  };

  const sendMessage = async () => {
    if (!selectedBuddy || !newMessage.trim()) return;

    const { error } = await supabase
      .from('buddy_messages')
      .insert({
        connection_id: selectedBuddy.id,
        sender_id: user!.id,
        message: newMessage,
      });

    if (!error) {
      await supabase
        .from('buddy_connections')
        .update({ last_interaction_at: new Date().toISOString() })
        .eq('id', selectedBuddy.id);

      setNewMessage('');
      fetchMessages(selectedBuddy.id);
    }
  };

  const quickMessages = [
    "Keep going! You've got this! 💪",
    "Proud of your progress! 🌟",
    "Stay strong today! 🔥",
    "Thinking of you! You're doing amazing! ❤️",
    "Let's crush our goals together! 🎯"
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (selectedBuddy) {
    const buddyId = selectedBuddy.user_id === user!.id ? selectedBuddy.buddy_id : selectedBuddy.user_id;

    return (
      <div className="flex flex-col h-full">
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedBuddy(null)}
            className="text-cyan-600 hover:text-cyan-700 font-semibold"
          >
            ← Back
          </button>
          <div className="text-center flex-1">
            <p className="font-bold text-gray-800">
              {selectedBuddy.buddy_profile?.full_name || 'Buddy'}
            </p>
            {selectedBuddy.buddy_profile?.longest_streak && (
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>{selectedBuddy.buddy_profile.longest_streak} day streak</span>
              </p>
            )}
          </div>
          <div className="w-20"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => {
            const isSender = msg.sender_id === user!.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    isSender
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                      : 'bg-white text-gray-800 shadow'
                  }`}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                  <p className={`text-xs mt-1 ${isSender ? 'text-cyan-100' : 'text-gray-500'}`}>
                    {new Date(msg.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border-t p-4 space-y-3">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => {
                  setNewMessage(msg);
                }}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm whitespace-nowrap hover:bg-gray-200 transition"
              >
                {msg}
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Send encouragement..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold flex items-center space-x-2 mb-2">
          <Users className="w-7 h-7 text-cyan-600" />
          <span>Accountability Buddies</span>
        </h2>
        <p className="text-gray-600 text-sm">Connect with others on the same journey for mutual support</p>
      </div>

      {pendingRequests.length > 0 && (
        <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-orange-600" />
            <span>Pending Requests</span>
          </h3>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {request.buddy_profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">Wants to be your buddy</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => respondToRequest(request.id, true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => respondToRequest(request.id, false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="font-bold text-gray-800">Find a Buddy</h3>
        <div className="flex space-x-2">
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchForBuddy()}
            placeholder="Enter email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button
            onClick={searchForBuddy}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition"
          >
            Search
          </button>
        </div>

        {searchResult && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{searchResult.full_name || 'User'}</p>
                <p className="text-sm text-gray-600">{searchResult.email}</p>
                {searchResult.longest_streak && (
                  <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    <span>{searchResult.longest_streak} day streak</span>
                  </p>
                )}
              </div>
              {searchResult.alreadyConnected ? (
                <span className="text-sm text-gray-500">Already connected</span>
              ) : (
                <button
                  onClick={() => sendBuddyRequest(searchResult.id)}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Send Request</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {buddies.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Your Buddies</h3>
          <div className="space-y-3">
            {buddies.map((buddy) => (
              <button
                key={buddy.id}
                onClick={() => setSelectedBuddy(buddy)}
                className="w-full bg-gradient-to-r from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 border border-cyan-200 rounded-xl p-4 flex items-center justify-between transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {buddy.buddy_profile?.full_name?.[0] || 'B'}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {buddy.buddy_profile?.full_name || 'Buddy'}
                    </p>
                    {buddy.buddy_profile?.longest_streak && (
                      <p className="text-xs text-gray-600 flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{buddy.buddy_profile.longest_streak} day streak</span>
                      </p>
                    )}
                  </div>
                </div>
                <MessageCircle className="w-5 h-5 text-cyan-600" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 mb-2">No buddies yet</p>
          <p className="text-sm text-gray-500">Search for someone to start your support network</p>
        </div>
      )}
    </div>
  );
}
