import React, { useEffect, useState } from 'react';
import { CategoryCard } from '../components/UI/CategoryCard';
import { calculatorCategories } from '../lib/data/calculators';
import { generateCategoryUrl } from '../lib/utils/url-slug';
import { Grid3X3, Sparkles, TrendingUp } from 'lucide-react';

export function CategoriesPage() {
  const [isVisible, setIsVisible] = useState(false);

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
            <span className="font-bold text-sm">Calculator Categories</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-grey-800 mb-6">
            Professional Calculator
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>
          
          <p className="text-xl text-grey-600 max-w-4xl mx-auto leading-relaxed">
            Browse our comprehensive collection of professional calculators organized by project type. 
            Find the perfect tool for your construction, landscaping, or home improvement project.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-grey-300">
              <div className="text-2xl font-bold text-primary-600">6</div>
              <div className="text-sm text-grey-600">Categories</div>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-grey-300">
              <div className="text-2xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-grey-600">Calculators</div>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-grey-300">
              <div className="text-2xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-grey-600">Professional</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {calculatorCategories.map((category, index) => (
            <div
              key={category.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={category.icon}
                calculatorCount={category.calculators.length}
                url={generateCategoryUrl(category.name)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-card-hover border border-grey-300 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-700 rounded-full px-6 py-2 mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold text-sm">Can't Find What You're Looking For?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-grey-800 mb-6">
              We're Always Adding
              <span className="block text-primary-600">New Professional Tools</span>
            </h2>
            
            <p className="text-lg text-grey-600 mb-8 max-w-2xl mx-auto">
              We're constantly adding new calculators based on user feedback. 
              Let us know what tools you need for your projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-orange text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-orange-glow hover:shadow-orange-glow-lg">
                Request a Calculator
              </button>
              <button className="group border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}