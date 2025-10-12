/*
  # Add Community and Support Features
  
  This migration adds the remaining tables for:
  - Community feed and social features
  - Buddy system for peer support
  - Trigger journal for pattern identification
  - Notification pattern tracking
  
  ## New Tables
  
  1. `craving_strategies` - Coping strategies and effectiveness tracking
  2. `community_posts` - User milestone shares and success stories
  3. `post_reactions` - Reactions/support on community posts
  4. `buddy_connections` - Peer accountability pairing
  5. `buddy_messages` - Private messaging between buddies
  6. `trigger_journal` - Detailed trigger logging
  7. `notification_patterns` - Smart notification timing data
  
  ## Security
  
  - All tables use RLS
  - Users can only access their own data
  - Community content is visible to all authenticated users
  - Buddy features require mutual consent
*/

-- Craving strategies table
CREATE TABLE IF NOT EXISTS craving_strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  strategy_name text NOT NULL,
  description text,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  times_used integer DEFAULT 0,
  success_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE craving_strategies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own strategies"
  ON craving_strategies FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  post_type text NOT NULL DEFAULT 'milestone' CHECK (post_type IN ('milestone', 'story', 'encouragement', 'tip')),
  milestone_data jsonb,
  is_anonymous boolean DEFAULT false,
  reaction_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view posts"
  ON community_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own posts"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Post reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reaction_type text NOT NULL DEFAULT 'support' CHECK (reaction_type IN ('support', 'inspire', 'celebrate', 'strength')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view reactions"
  ON post_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add reactions"
  ON post_reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own reactions"
  ON post_reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Buddy connections table
CREATE TABLE IF NOT EXISTS buddy_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  buddy_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  initiated_by uuid REFERENCES auth.users(id) NOT NULL,
  last_interaction_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (user_id != buddy_id),
  UNIQUE(user_id, buddy_id)
);

ALTER TABLE buddy_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their buddy connections"
  ON buddy_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = buddy_id);

CREATE POLICY "Users can create buddy requests"
  ON buddy_connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR auth.uid() = buddy_id);

CREATE POLICY "Users can update their connections"
  ON buddy_connections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = buddy_id)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = buddy_id);

-- Buddy messages table
CREATE TABLE IF NOT EXISTS buddy_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid REFERENCES buddy_connections(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE buddy_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buddy connection participants can view messages"
  ON buddy_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM buddy_connections
      WHERE buddy_connections.id = connection_id
      AND (buddy_connections.user_id = auth.uid() OR buddy_connections.buddy_id = auth.uid())
      AND buddy_connections.status = 'accepted'
    )
  );

CREATE POLICY "Buddy connection participants can send messages"
  ON buddy_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM buddy_connections
      WHERE buddy_connections.id = connection_id
      AND (buddy_connections.user_id = auth.uid() OR buddy_connections.buddy_id = auth.uid())
      AND buddy_connections.status = 'accepted'
    )
  );

-- Trigger journal table
CREATE TABLE IF NOT EXISTS trigger_journal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trigger_category text NOT NULL,
  specific_trigger text,
  location text,
  time_of_day text,
  people_present text[],
  emotional_state text[],
  physical_state text,
  notes text,
  craving_intensity integer CHECK (craving_intensity >= 1 AND craving_intensity <= 10),
  successfully_avoided boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trigger_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own trigger journal"
  ON trigger_journal FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Notification patterns table
CREATE TABLE IF NOT EXISTS notification_patterns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hour_of_day integer NOT NULL CHECK (hour_of_day >= 0 AND hour_of_day <= 23),
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  craving_count integer DEFAULT 0,
  puff_count integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id, hour_of_day, day_of_week)
);

ALTER TABLE notification_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification patterns"
  ON notification_patterns FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage notification patterns"
  ON notification_patterns FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_user ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_buddy_connections_status ON buddy_connections(status);
CREATE INDEX IF NOT EXISTS idx_buddy_messages_connection ON buddy_messages(connection_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trigger_journal_user_created ON trigger_journal(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_patterns_user ON notification_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_craving_strategies_user ON craving_strategies(user_id);
