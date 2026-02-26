/*
  # Create Health Articles Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique) - for URL-friendly names
      - `description` (text)
      - `icon` (text) - lucide icon name
      - `created_at` (timestamp)

    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique) - for URL-friendly article URLs
      - `excerpt` (text)
      - `content` (text) - full HTML/markdown content
      - `category_id` (uuid, foreign key)
      - `image_url` (text) - stock image URL
      - `author` (text)
      - `read_time` (integer) - estimated read time in minutes
      - `views` (integer) - article view count
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `comments`
      - `id` (uuid, primary key)
      - `article_id` (uuid, foreign key)
      - `name` (text)
      - `email` (text)
      - `content` (text)
      - `approved` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Articles table is publicly readable
    - Categories table is publicly readable
    - Comments require approval by default and are publicly readable when approved
    - Comments can be created by anyone but stored for moderation

  3. Indexes
    - Index on articles.category_id for faster queries
    - Index on articles.slug for URL lookups
    - Index on articles.published_at for sorting
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url text,
  author text DEFAULT 'Health Vista',
  read_time integer DEFAULT 5,
  views integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  content text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Approved comments are publicly readable"
  ON comments FOR SELECT
  TO anon
  USING (approved = true);

CREATE POLICY "Anyone can create comments"
  ON comments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);

INSERT INTO categories (name, slug, description, icon) VALUES
  ('Nutrition', 'nutrition', 'Evidence-based nutrition and diet guides', 'Apple'),
  ('Fitness', 'fitness', 'Exercise routines and fitness tips', 'Dumbbell'),
  ('Mental Health', 'mental-health', 'Mental wellbeing and stress management', 'Brain'),
  ('Disease Prevention', 'disease-prevention', 'Tips to prevent common diseases', 'Shield'),
  ('Lifestyle', 'lifestyle', 'Healthy lifestyle habits', 'Heart'),
  ('Medical News', 'medical-news', 'Latest healthcare breakthroughs', 'Stethoscope')
ON CONFLICT DO NOTHING;
