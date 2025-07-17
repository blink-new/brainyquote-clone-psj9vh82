import { Heart, Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quotes: [
      { label: 'Daily Quotes', page: 'daily' },
      { label: 'Featured Quotes', page: 'home' },
      { label: 'Random Quotes', page: 'home' },
      { label: 'Popular Quotes', page: 'home' }
    ],
    browse: [
      { label: 'Authors', page: 'authors' },
      { label: 'Topics', page: 'topics' },
      { label: 'Categories', page: 'topics' },
      { label: 'Search', page: 'search' }
    ],
    about: [
      { label: 'About Us', page: 'about' },
      { label: 'Contact', page: 'contact' },
      { label: 'Privacy Policy', page: 'privacy' },
      { label: 'Terms of Service', page: 'terms' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">BrainyQuote</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover thousands of inspirational quotes from the world's greatest minds. 
              Start your day with wisdom and motivation.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quotes Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quotes</h3>
            <ul className="space-y-2">
              {footerLinks.quotes.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Inspired</h3>
              <p className="text-gray-400 text-sm">
                Get daily quotes delivered to your inbox
              </p>
            </div>
            
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-gray-400 mb-4 md:mb-0">
              <span>© {currentYear} BrainyQuote. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for inspiration seekers everywhere.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button
                onClick={() => onNavigate('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}