import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HealthVista</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:block absolute md:relative top-full md:top-auto left-0 md:left-auto right-0 md:right-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1 p-4 md:p-0">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition rounded-lg hover:bg-gray-100 md:hover:bg-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition rounded-lg hover:bg-gray-100 md:hover:bg-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                to="/categories"
                className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition rounded-lg hover:bg-gray-100 md:hover:bg-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-gray-700 hover:text-emerald-600 transition rounded-lg hover:bg-gray-100 md:hover:bg-transparent"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
