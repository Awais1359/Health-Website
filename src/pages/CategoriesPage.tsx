import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, Category, Article } from '../lib/supabase';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowLeft } from 'lucide-react';
// import namespace for dynamic icon lookup
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';

export function CategoriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<(Article & { categories?: any })[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [slug]);

  async function fetchData() {
    try {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesData) {
        setAllCategories(categoriesData);
      }

      if (slug) {
        const selectedCategory = categoriesData?.find(c => c.slug === slug);
        if (selectedCategory) {
          setCategory(selectedCategory);

          const { data: articlesData } = await supabase
            .from('articles')
            .select('*, categories(*)')
            .eq('category_id', selectedCategory.id)
            .order('published_at', { ascending: false });

          if (articlesData) {
            setArticles(articlesData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (slug && !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {slug && category ? (
          <>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white mb-12">
              <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg opacity-90">{category.description}</p>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No articles in this category yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Browse Categories
              </h1>
              <p className="text-xl text-gray-600">
                Explore health topics organized by category
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map(cat => {
                const IconComponent = (LucideIcons as any)[cat.icon] as React.ComponentType<
                  React.SVGProps<SVGSVGElement>
                >;
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="inline-block bg-emerald-100 p-4 rounded-lg mb-4">
                      {IconComponent && <IconComponent className="w-8 h-8 text-emerald-600" />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{cat.name}</h2>
                    <p className="text-gray-600">{cat.description}</p>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
