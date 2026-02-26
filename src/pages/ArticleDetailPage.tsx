import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Article, Comment } from '../lib/supabase';
import { Clock, User, Calendar, Share2, ArrowLeft } from 'lucide-react';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<(Article & { categories?: any }) | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  async function fetchArticle() {
    try {
      const { data } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        setArticle(data);

        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('article_id', data.id)
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (commentsData) {
          setComments(commentsData);
        }

        await supabase
          .from('articles')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!article || !commentForm.name || !commentForm.email || !commentForm.content) return;

    setSubmitting(true);
    try {
      await supabase.from('comments').insert({
        article_id: article.id,
        name: commentForm.name,
        email: commentForm.email,
        content: commentForm.content,
        approved: false
      });

      setCommentForm({ name: '', email: '', content: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </Link>

        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full font-semibold">
              {article.categories?.name || 'Health'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{article.read_time} min read</span>
            </div>
            <button className="flex items-center gap-2 ml-auto hover:text-emerald-600 transition">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </header>

        <div className="mb-12">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
        </div>

        <div
          className="prose prose-lg max-w-none mb-12 text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="border-t border-gray-200 pt-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              Thank you for your comment! It will be published after moderation.
            </div>
          )}

          <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={commentForm.name}
                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={commentForm.email}
                onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <textarea
              placeholder="Your Comment"
              value={commentForm.content}
              onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 mb-4"
              rows={4}
              required
            ></textarea>

            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </form>

          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
