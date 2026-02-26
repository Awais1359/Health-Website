import { Link } from 'react-router-dom';
import { Article } from '../lib/supabase';
import { Clock, User, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article & { categories?: any };
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (featured) {
    return (
      <Link to={`/article/${article.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
              {article.categories?.name || 'Featured'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.read_time} min read
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
              </div>
              <div className="bg-white/20 hover:bg-emerald-600 p-2 rounded-full transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="overflow-hidden h-48">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              {article.categories?.name || 'Health'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.read_time} min
              </div>
              <span>{publishDate}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
