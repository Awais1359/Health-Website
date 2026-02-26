import { createClient } from '@supabase/supabase-js';

// read values injected at build time by Vite.  They must start with
// `VITE_` for Vite to expose them to the client bundle.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Emit a helpful message rather than throwing; the missing values are
  // usually due to forgetting to create a `.env` file or to restart the
  // development server after adding them.  Keeping the app alive makes it
  // easier to debug and avoids an uncaught error in the console.
  console.error(
    'Missing Supabase environment variables.\n' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your `.env`\n' +
    'or in the shell before running `npm run dev`.',
  );
}

// fall back to an empty string so createClient can always be called; any
// requests will fail harmlessly if the configuration is wrong.
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

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
