import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Clock, Target, Zap, TrendingUp, Award, Shield } from 'lucide-react';
import { CategoryCard } from '../components/UI/CategoryCard';
import { CalculatorCard } from '../components/UI/CalculatorCard';
import { calculatorCategories, sampleCalculators } from '../lib/data/calculators';
import { generateCategoryUrl, generateCalculatorUrl } from '../lib/utils/url-slug';

export function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const featuredCalculators = sampleCalculators.slice(0, 4);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-grey-800 via-grey-700 to-grey-800 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-secondary-400 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Award className="h-4 w-4 text-primary-400" />
              <span className="text-primary-300 font-semibold text-sm">Professional Grade Tools</span>
              <Zap className="h-4 w-4 text-primary-400 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Professional DIY Calculators for
              <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-glow">
                Smarter Project Planning
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-grey-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              Accurate calculations for construction, carpentry, landscaping, and home improvement. 
              <span className="text-primary-400 font-semibold">Save time, reduce waste, and plan like a pro.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/calculators"
                className="group bg-gradient-orange text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-orange-glow hover:shadow-orange-glow-lg"
              >
                <span className="text-lg">Explore All Calculators</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/categories"
                className="group border-2 border-primary-500 text-primary-400 px-10 py-5 rounded-2xl font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
                <div className="text-grey-400 text-sm">Professional Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">100K+</div>
                <div className="text-grey-400 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">99.9%</div>
                <div className="text-grey-400 text-sm">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">24/7</div>
                <div className="text-grey-400 text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-2 mb-6">
              <Shield className="h-4 w-4" />
              <span className="font-semibold text-sm">Why Choose DIYCalculatorPro?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-grey-800 mb-6">
              Built by Professionals,
              <span className="block text-primary-600">For Professionals</span>
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto">
              Our calculators deliver accuracy and reliability you can trust for any project size.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-success-500 to-success-600 p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grey-800 mb-4 group-hover:text-primary-600 transition-colors">
                Industry-Standard Formulas
              </h3>
              <p className="text-grey-600 leading-relaxed">
                All calculations use proven, professional-grade formulas trusted by contractors and builders worldwide.
              </p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-orange-glow">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grey-800 mb-4 group-hover:text-primary-600 transition-colors">
                Save Time & Money
              </h3>
              <p className="text-grey-600 leading-relaxed">
                Quick, accurate calculations help you order the right amount of materials and avoid costly mistakes.
              </p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-card-hover transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grey-800 mb-4 group-hover:text-primary-600 transition-colors">
                Trusted by Thousands
              </h3>
              <p className="text-grey-600 leading-relaxed">
                Used by DIY enthusiasts, contractors, and professionals for projects large and small.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-700 rounded-full px-6 py-2 mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold text-sm">Calculator Categories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-grey-800 mb-6">
              Find the Perfect Tool
              <span className="block text-primary-600">For Your Project</span>
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto">
              From construction to landscaping, we've got professional-grade calculators for every need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {calculatorCategories.map((category, index) => (
              <div
                key={category.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-2 mb-6">
              <Zap className="h-4 w-4" />
              <span className="font-semibold text-sm">Popular Calculators</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-grey-800 mb-6">
              Get Started with
              <span className="block text-primary-600">Our Most Popular Tools</span>
            </h2>
            <p className="text-xl text-grey-600 max-w-3xl mx-auto">
              Jump right in with our most popular calculators for common DIY projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredCalculators.map((calculator, index) => (
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
                  isPopular={index < 2}
                  isNew={index === 1}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/calculators"
              className="group inline-flex items-center space-x-3 bg-gradient-orange text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-orange-glow hover:shadow-orange-glow-lg"
            >
              <span className="text-lg">View All Calculators</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-grey-800 via-grey-700 to-grey-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-primary-500 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Target className="h-20 w-20 mx-auto mb-8 text-primary-400 animate-bounce-subtle" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Next Project?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-grey-300 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who trust DIYCalculatorPro for accurate project planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/calculators"
              className="group bg-gradient-orange text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300 inline-flex items-center justify-center space-x-3 shadow-orange-glow hover:shadow-orange-glow-lg"
            >
              <span className="text-lg">Get Started Now</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/categories"
              className="group border-2 border-primary-500 text-primary-400 px-10 py-5 rounded-2xl font-bold hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}