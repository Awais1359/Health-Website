import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  image_url: string;
  author: string;
  read_time: number;
  views: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  categories?: Category;
};

export type Comment = {
  id: string;
  article_id: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  created_at: string;
};
