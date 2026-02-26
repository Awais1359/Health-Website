import { useEffect, useState } from 'react';
import { supabase, Article } from '../lib/supabase';
import { ArticleCard } from '../components/ArticleCard';
import { Search } from 'lucide-react';

export function ArticlesPage() {
  const [articles, setArticles] = useState<(Article & { categories?: any })[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<(Article & { categories?: any })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  async function fetchArticles() {
    try {
      const { data } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .order('published_at', { ascending: false });

      if (data) {
        setArticles(data);
        setFilteredArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Health Articles
          </h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive collection of health and wellness articles
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, content, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
