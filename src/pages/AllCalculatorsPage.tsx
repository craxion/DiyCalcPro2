import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, Sparkles } from 'lucide-react';
import { CalculatorCard } from '../components/UI/CalculatorCard';
import { sampleCalculators, calculatorCategories } from '../lib/data/calculators';
import { generateCalculatorUrl } from '../lib/utils/url-slug';

export function AllCalculatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  const filteredCalculators = sampleCalculators.filter(calculator => {
    const matchesSearch = calculator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         calculator.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || calculator.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-3 mb-8">
            <Grid3X3 className="h-5 w-5" />
            <span className="font-bold text-sm">All Professional Tools</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-grey-800 mb-6">
            All Professional
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Calculators
            </span>
          </h1>
          
          <p className="text-xl text-grey-600 max-w-4xl mx-auto leading-relaxed">
            Browse our complete collection of professional calculators for construction, 
            carpentry, landscaping, and home improvement projects.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 mb-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-4 h-5 w-5 text-grey-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                />
              </div>
              <div className="relative group">
                <Filter className="absolute left-4 top-4 h-5 w-5 text-grey-400 group-focus-within:text-primary-500 transition-colors" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-300 text-lg min-w-[200px]"
                >
                  <option value="all">All Categories</option>
                  {calculatorCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-lg text-grey-600">
              Showing <span className="font-bold text-primary-600">{filteredCalculators.length}</span> of <span className="font-bold text-primary-600">{sampleCalculators.length}</span> calculators
            </p>
            <div className="flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Professional Grade</span>
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCalculators.map((calculator, index) => (
              <div
                key={calculator.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CalculatorCard
                  name={calculator.name}
                  description={calculator.description}
                  category={calculator.category}
                  url={generateCalculatorUrl(calculator.category, calculator.name)}
                  isPopular={index < 2}
                  isNew={index === 1}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl p-16 shadow-card-hover border border-grey-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-orange-glow">
                <Search className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-grey-800 mb-6">
                No calculators found
              </h2>
              
              <p className="text-lg text-grey-600 mb-8 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              
              <button
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="group bg-gradient-orange text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-orange-glow hover:shadow-orange-glow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}