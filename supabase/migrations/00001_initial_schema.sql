-- MoltbotCommunity Database Schema
-- This migration creates all tables, types, RLS policies, and functions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE post_type AS ENUM ('guide', 'fix', 'faq', 'clawdbot', 'question');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
CREATE TYPE report_status AS ENUM ('pending', 'resolved', 'dismissed');
CREATE TYPE reported_type AS ENUM ('post', 'answer', 'comment', 'user');

-- ============================================
-- TABLES
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  reputation INTEGER DEFAULT 0,
  role user_role DEFAULT 'user',
  is_banned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table (guides, fixes, FAQs, clawdbot content, questions)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type post_type NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  views INTEGER DEFAULT 0,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status post_status DEFAULT 'draft',
  accepted_answer_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_posts_type ON public.posts(type);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);

-- Answers table
CREATE TABLE public.answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_answers_post ON public.answers(post_id);
CREATE INDEX idx_answers_user ON public.answers(user_id);
CREATE INDEX idx_answers_votes ON public.answers(votes DESC);

-- Add foreign key for accepted_answer_id after answers table exists
ALTER TABLE public.posts
  ADD CONSTRAINT fk_accepted_answer
  FOREIGN KEY (accepted_answer_id)
  REFERENCES public.answers(id)
  ON DELETE SET NULL;

-- Comments table
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_type TEXT NOT NULL CHECK (parent_type IN ('post', 'answer')),
  parent_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_parent ON public.comments(parent_type, parent_id);
CREATE INDEX idx_comments_user ON public.comments(user_id);

-- Votes table
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  answer_id UUID NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
  value INTEGER NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, answer_id)
);

CREATE INDEX idx_votes_answer ON public.votes(answer_id);
CREATE INDEX idx_votes_user ON public.votes(user_id);

-- Tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_tags_name ON public.tags(name);

-- Post-Tags junction table
CREATE TABLE public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post ON public.post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON public.post_tags(tag_id);

-- Reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reported_type reported_type NOT NULL,
  reported_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status report_status DEFAULT 'pending',
  resolved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_reported ON public.reports(reported_type, reported_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update answer votes
CREATE OR REPLACE FUNCTION update_answer_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.answers
    SET votes = votes + NEW.value
    WHERE id = NEW.answer_id;

    -- Update reputation for answer author
    UPDATE public.users
    SET reputation = reputation + (CASE WHEN NEW.value = 1 THEN 10 ELSE -2 END)
    WHERE id = (SELECT user_id FROM public.answers WHERE id = NEW.answer_id);
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.answers
    SET votes = votes - OLD.value
    WHERE id = OLD.answer_id;

    -- Reverse reputation change
    UPDATE public.users
    SET reputation = reputation - (CASE WHEN OLD.value = 1 THEN 10 ELSE -2 END)
    WHERE id = (SELECT user_id FROM public.answers WHERE id = OLD.answer_id);
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.answers
    SET votes = votes - OLD.value + NEW.value
    WHERE id = NEW.answer_id;

    -- Update reputation difference
    UPDATE public.users
    SET reputation = reputation - (CASE WHEN OLD.value = 1 THEN 10 ELSE -2 END) + (CASE WHEN NEW.value = 1 THEN 10 ELSE -2 END)
    WHERE id = (SELECT user_id FROM public.answers WHERE id = NEW.answer_id);
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to update tag post count
CREATE OR REPLACE FUNCTION update_tag_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.tags
    SET post_count = post_count + 1
    WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.tags
    SET post_count = post_count - 1
    WHERE id = OLD.tag_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept an answer
CREATE OR REPLACE FUNCTION accept_answer(answer_id UUID, post_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Unaccept any previously accepted answer
  UPDATE public.answers
  SET is_accepted = FALSE
  WHERE post_id = accept_answer.post_id AND is_accepted = TRUE;

  -- Accept the new answer
  UPDATE public.answers
  SET is_accepted = TRUE
  WHERE id = accept_answer.answer_id;

  -- Update the post's accepted_answer_id
  UPDATE public.posts
  SET accepted_answer_id = accept_answer.answer_id
  WHERE id = accept_answer.post_id;

  -- Award reputation to answer author
  UPDATE public.users
  SET reputation = reputation + 15
  WHERE id = (SELECT user_id FROM public.answers WHERE id = accept_answer.answer_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_answers_updated_at
  BEFORE UPDATE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Vote counting trigger
CREATE TRIGGER on_vote_change
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION update_answer_votes();

-- Tag count trigger
CREATE TRIGGER on_post_tag_change
  AFTER INSERT OR DELETE ON public.post_tags
  FOR EACH ROW EXECUTE FUNCTION update_tag_count();

-- New user profile creation trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users are viewable by everyone"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone"
  ON public.posts FOR SELECT
  USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

CREATE POLICY "Users can delete their own posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Answers policies
CREATE POLICY "Answers are viewable by everyone"
  ON public.answers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create answers"
  ON public.answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own answers"
  ON public.answers FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

CREATE POLICY "Users can delete their own answers"
  ON public.answers FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Comments policies
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Votes policies
CREATE POLICY "Votes are viewable by everyone"
  ON public.votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON public.votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON public.votes FOR DELETE
  USING (auth.uid() = user_id);

-- Tags policies
CREATE POLICY "Tags are viewable by everyone"
  ON public.tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.tags FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Post_tags policies
CREATE POLICY "Post tags are viewable by everyone"
  ON public.post_tags FOR SELECT
  USING (true);

CREATE POLICY "Post authors can manage tags"
  ON public.post_tags FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.posts WHERE id = post_id AND author_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- Reports policies
CREATE POLICY "Admins can view all reports"
  ON public.reports FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ) OR reporter_id = auth.uid());

CREATE POLICY "Authenticated users can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  ));

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default tags
INSERT INTO public.tags (name, slug, description) VALUES
  ('moltbot', 'moltbot', 'General MoltBot discussions and questions'),
  ('clawdbot', 'clawdbot', 'ClawdBot related content'),
  ('setup', 'setup', 'Installation and setup guides'),
  ('troubleshooting', 'troubleshooting', 'Problem solving and fixes'),
  ('features', 'features', 'Bot features and capabilities'),
  ('automation', 'automation', 'Automation tips and tricks'),
  ('api', 'api', 'API usage and integration'),
  ('plugins', 'plugins', 'Plugins and extensions'),
  ('performance', 'performance', 'Performance optimization'),
  ('security', 'security', 'Security best practices');
