import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Heart, Flame, Star, Zap, MessageCircle, Trophy, TrendingUp, Users, Plus, X } from 'lucide-react';

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  post_type: 'milestone' | 'story' | 'encouragement' | 'tip';
  milestone_data: any;
  is_anonymous: boolean;
  reaction_count: number;
  created_at: string;
  profiles?: {
    full_name: string | null;
  };
  user_reaction?: {
    reaction_type: string;
  }[];
}

export default function CommunityFeed() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<'milestone' | 'story' | 'encouragement' | 'tip'>('story');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles:user_id (full_name),
        user_reaction:post_reactions!inner(reaction_type)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setPosts(data as CommunityPost[]);
    }
    setLoading(false);
  };

  const createPost = async () => {
    if (!user || !newPostContent.trim()) return;

    setIsSubmitting(true);

    let milestoneData = null;
    if (newPostType === 'milestone') {
      const today = new Date();
      const quitDate = profile?.quit_date ? new Date(profile.quit_date) : today;
      const daysClean = Math.floor((today.getTime() - quitDate.getTime()) / (1000 * 60 * 60 * 24));

      milestoneData = {
        days_clean: daysClean,
        puffs_avoided: profile?.current_daily_puffs ? profile.current_daily_puffs * daysClean : 0,
      };
    }

    const { error } = await supabase
      .from('community_posts')
      .insert({
        user_id: user.id,
        content: newPostContent,
        post_type: newPostType,
        is_anonymous: isAnonymous,
        milestone_data: milestoneData,
      });

    if (!error) {
      await fetchPosts();
      setShowCreatePost(false);
      setNewPostContent('');
      setNewPostType('story');
      setIsAnonymous(false);
    }

    setIsSubmitting(false);
  };

  const addReaction = async (postId: string, reactionType: string) => {
    if (!user) return;

    const post = posts.find(p => p.id === postId);
    const hasReacted = post?.user_reaction && post.user_reaction.length > 0;

    if (hasReacted) {
      await supabase
        .from('post_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      await supabase
        .from('community_posts')
        .update({ reaction_count: (post?.reaction_count || 1) - 1 })
        .eq('id', postId);
    } else {
      await supabase
        .from('post_reactions')
        .insert({
          post_id: postId,
          user_id: user.id,
          reaction_type: reactionType,
        });

      await supabase
        .from('community_posts')
        .update({ reaction_count: (post?.reaction_count || 0) + 1 })
        .eq('id', postId);
    }

    await fetchPosts();
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'story': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'encouragement': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'tip': return <Star className="w-5 h-5 text-purple-500" />;
      default: return <MessageCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'milestone': return 'Milestone';
      case 'story': return 'Story';
      case 'encouragement': return 'Encouragement';
      case 'tip': return 'Tip';
      default: return 'Post';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Users className="w-7 h-7 text-cyan-600" />
            <span>Community</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">Share your journey and support others</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {showCreatePost && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border-2 border-cyan-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Create Post</h3>
            <button
              onClick={() => setShowCreatePost(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex space-x-2">
            {(['milestone', 'story', 'encouragement', 'tip'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setNewPostType(type)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  newPostType === type
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getTypeLabel(type)}
              </button>
            ))}
          </div>

          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={`Share your ${getTypeLabel(newPostType).toLowerCase()}...`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows={4}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">Post anonymously</span>
            </label>

            <button
              onClick={createPost}
              disabled={isSubmitting || !newPostContent.trim()}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-semibold shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-2">No posts yet</p>
            <p className="text-sm text-gray-500">Be the first to share your journey!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {post.is_anonymous ? '?' : (post.profiles?.full_name?.[0] || 'U')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {post.is_anonymous ? 'Anonymous' : (post.profiles?.full_name || 'User')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPostIcon(post.post_type)}
                  <span className="text-sm font-medium text-gray-600">
                    {getTypeLabel(post.post_type)}
                  </span>
                </div>
              </div>

              {post.milestone_data && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-600">
                        {post.milestone_data.days_clean}
                      </p>
                      <p className="text-xs text-gray-600">Days Clean</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-600">
                        {post.milestone_data.puffs_avoided}
                      </p>
                      <p className="text-xs text-gray-600">Puffs Avoided</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => addReaction(post.id, 'support')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                      post.user_reaction && post.user_reaction.length > 0
                        ? 'bg-pink-100 text-pink-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{post.reaction_count}</span>
                  </button>

                  <div className="flex items-center space-x-1 text-gray-500">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <Star className="w-4 h-4 text-purple-500" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>Inspiring</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
