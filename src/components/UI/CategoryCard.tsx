import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  calculatorCount: number;
  url: string;
}

export function CategoryCard({ name, description, icon, calculatorCount, url }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = (Icons as any)[icon] || Icons.Calculator;

  return (
    <Link
      to={url}
      className="group block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-grey-300 hover:shadow-card-hover hover:border-primary-500 transition-all duration-500 p-8 transform hover:scale-[1.03] hover:-translate-y-2 relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full transition-all duration-700 ${
            isHovered ? 'animate-float opacity-100' : 'opacity-0'
          }`}></div>
          <div className={`absolute top-12 right-8 w-1 h-1 bg-secondary-400 rounded-full transition-all duration-1000 ${
            isHovered ? 'animate-float opacity-100' : 'opacity-0'
          }`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute top-8 right-12 w-1.5 h-1.5 bg-primary-300 rounded-full transition-all duration-900 ${
            isHovered ? 'animate-float opacity-100' : 'opacity-0'
          }`} style={{ animationDelay: '0.3s' }}></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Icon Container */}
          <div className="relative mb-6">
            <div className="bg-gradient-orange p-6 rounded-2xl mx-auto w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-orange-glow group-hover:shadow-orange-glow-lg">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            
            {/* Sparkle Effect */}
            <Sparkles className={`absolute -top-2 -right-2 h-6 w-6 text-primary-500 transition-all duration-500 ${
              isHovered ? 'opacity-100 animate-bounce-subtle' : 'opacity-0'
            }`} />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-grey-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
            {name}
          </h3>
          
          <p className="text-grey-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Stats and Action */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold">
                {calculatorCount} Tools
              </div>
              <div className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold">
                Professional Grade
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-primary-600 font-bold">
              <span>Explore Category</span>
              <ArrowRight className={`h-5 w-5 transition-all duration-300 ${
                isHovered ? 'transform translate-x-2' : ''
              }`} />
            </div>
          </div>
        </div>

        {/* Border Glow Effect */}
        <div className={`absolute inset-0 border-2 border-primary-500 rounded-2xl transition-all duration-500 ${
          isHovered ? 'opacity-100 shadow-orange-glow' : 'opacity-0'
        }`}></div>

        {/* Corner Accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-orange rounded-bl-2xl transition-all duration-500 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}></div>
      </div>
    </Link>
  );
}