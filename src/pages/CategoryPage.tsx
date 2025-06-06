import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CalculatorCard } from '../components/UI/CalculatorCard';
import { calculatorCategories, sampleCalculators } from '../lib/data/calculators';
import { generateCalculatorUrl } from '../lib/utils/url-slug';
import { ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  
  const category = calculatorCategories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    return <Navigate to="/categories\" replace />;
  }

  const IconComponent = (Icons as any)[category.icon] || Icons.Calculator;
  const categoryCalculators = sampleCalculators.filter(calc => 
    calc.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === categorySlug
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/categories" 
            className="inline-flex items-center space-x-2 text-grey-600 hover:text-primary-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Categories</span>
          </Link>
        </div>

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative mb-8">
            <div className="bg-gradient-orange p-8 rounded-3xl mx-auto mb-6 w-32 h-32 flex items-center justify-center shadow-orange-glow animate-float">
              <IconComponent className="h-16 w-16 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary-500 animate-bounce-subtle" />
          </div>
          
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-2 mb-6">
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold text-sm">{category.calculators.length} Professional Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-grey-800 mb-6">
            {category.name}
            <span className="block text-primary-600 text-4xl md:text-5xl mt-2">
              Calculators
            </span>
          </h1>
          
          <p className="text-xl text-grey-600 max-w-4xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Calculators Grid */}
        {categoryCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categoryCalculators.map((calculator, index) => (
              <div
                key={calculator.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CalculatorCard
                  name={calculator.name}
                  description={calculator.description}
                  category={calculator.category}
                  url={generateCalculatorUrl(calculator.category, calculator.name)}
                  isPopular={index === 0}
                  isNew={index === 1}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl p-16 shadow-card-hover border border-grey-300 mb-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-orange-glow">
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-grey-800 mb-6">
                Calculators Coming Soon
              </h2>
              
              <p className="text-lg text-grey-600 mb-8 max-w-md mx-auto">
                We're working on adding calculators for this category. 
                Check back soon or explore our other categories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-orange text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-orange-glow hover:shadow-orange-glow-lg">
                  Notify Me When Available
                </button>
                <Link 
                  to="/categories"
                  className="group border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Browse Other Categories
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-white rounded-3xl p-10 shadow-card-hover border border-grey-300 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-grey-800">
                About {category.name} Calculators
              </h2>
            </div>
            
            <p className="text-lg text-grey-600 leading-relaxed mb-8">
              Our {category.name.toLowerCase()} calculators are designed to help professionals and DIY enthusiasts 
              accurately estimate material quantities, project costs, and planning requirements. Each calculator 
              uses industry-standard formulas and accounts for common variables like waste factors and material 
              specifications to ensure reliable results for your projects.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-2xl font-bold text-primary-600 mb-2">99.9%</div>
                <div className="text-sm text-grey-600">Accuracy Rate</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-2xl font-bold text-primary-600 mb-2">Industry</div>
                <div className="text-sm text-grey-600">Standard Formulas</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-2xl font-bold text-primary-600 mb-2">Professional</div>
                <div className="text-sm text-grey-600">Grade Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}