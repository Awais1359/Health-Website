import { useEffect, useState } from 'react';
import { supabase, Article, Category } from '../lib/supabase';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// we import all icons via a namespace so we can look them up dynamically
import * as LucideIcons from 'lucide-react';

export function HomePage() {
  const [featuredArticle, setFeaturedArticle] = useState<(Article & { categories?: any }) | null>(null);
  const [articles, setArticles] = useState<(Article & { categories?: any })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .order('published_at', { ascending: false })
        .limit(7);

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .limit(6);

      if (articlesData) {
        setFeaturedArticle(articlesData[0] || null);
        setArticles(articlesData.slice(1));
      }

      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading health insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Health Guide</span>
            </h1>
            <p className="text-xl text-gray-600">Evidence-based health information and wellness tips delivered daily</p>
          </div>

          {featuredArticle && (
            <div className="mb-16">
              <ArticleCard article={featuredArticle} featured={true} />
            </div>
          )}
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link
              to="/articles"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <Link
              to="/categories"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              // look up the icon component from the LucideIcons namespace
              const IconComponent = (LucideIcons as any)[category.icon] as React.ComponentType<
                React.SVGProps<SVGSVGElement>
              >;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="inline-block bg-emerald-100 p-3 rounded-lg mb-3">
                    {IconComponent && <IconComponent className="w-6 h-6 text-emerald-600" />}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90">Get the latest health tips and wellness insights delivered to your inbox</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
