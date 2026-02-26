import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-bold">HealthVista</span>
            </div>
            <p className="text-gray-400">Your trusted source for health information and wellness guidance.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/articles" className="text-gray-400 hover:text-white transition">Articles</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition">Categories</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/nutrition" className="text-gray-400 hover:text-white transition">Nutrition</Link></li>
              <li><Link to="/category/fitness" className="text-gray-400 hover:text-white transition">Fitness</Link></li>
              <li><Link to="/category/mental-health" className="text-gray-400 hover:text-white transition">Mental Health</Link></li>
              <li><Link to="/category/medical-news" className="text-gray-400 hover:text-white transition">Medical News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a href="mailto:info@healthvista.com" className="text-gray-400 hover:text-white transition">info@healthvista.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">1-800-HEALTH-1</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">Health Plaza, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2024 HealthVista. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
