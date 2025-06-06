import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, Search, Zap } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-grey-800/95 backdrop-blur-md shadow-lg' 
        : 'bg-grey-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="bg-gradient-orange p-2.5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-orange-glow group-hover:shadow-orange-glow-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-primary-500 transition-colors duration-300">
                DIYCalculatorPro
              </span>
              <span className="text-xs text-grey-400 -mt-1">Professional Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/calculators" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isActiveLink('/calculators') 
                  ? 'text-primary-500' 
                  : 'text-grey-200 hover:text-primary-500'
              }`}
            >
              All Calculators
              {isActiveLink('/calculators') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-orange rounded-full"></div>
              )}
            </Link>
            <Link 
              to="/categories" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isActiveLink('/categories') 
                  ? 'text-primary-500' 
                  : 'text-grey-200 hover:text-primary-500'
              }`}
            >
              Categories
              {isActiveLink('/categories') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-orange rounded-full"></div>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isActiveLink('/about') 
                  ? 'text-primary-500' 
                  : 'text-grey-200 hover:text-primary-500'
              }`}
            >
              About
              {isActiveLink('/about') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-orange rounded-full"></div>
              )}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2.5 pl-11 pr-4 text-sm bg-grey-700 border border-grey-600 rounded-xl text-white placeholder-grey-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-grey-600 transition-all duration-300"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-grey-400 group-focus-within:text-primary-500 transition-colors duration-300" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 p-1.5 bg-primary-500 hover:bg-primary-600 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Zap className="h-3 w-3 text-white" />
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-grey-200 hover:text-primary-500 hover:bg-grey-700 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-grey-700 py-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-11 pr-4 text-sm bg-grey-700 border border-grey-600 rounded-xl text-white placeholder-grey-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-grey-400" />
              </form>
              <Link
                to="/calculators"
                className="text-grey-200 hover:text-primary-500 font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-grey-700"
                onClick={() => setIsMenuOpen(false)}
              >
                All Calculators
              </Link>
              <Link
                to="/categories"
                className="text-grey-200 hover:text-primary-500 font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-grey-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-grey-200 hover:text-primary-500 font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-grey-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}