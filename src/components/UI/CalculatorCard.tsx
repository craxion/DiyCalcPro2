import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Zap, TrendingUp } from 'lucide-react';

interface CalculatorCardProps {
  name: string;
  description: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
  isPopular?: boolean;
  isNew?: boolean;
}

export function CalculatorCard({ 
  name, 
  description, 
  category, 
  url, 
  icon, 
  isPopular = false,
  isNew = false 
}: CalculatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={url}
      className="group block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-grey-300 hover:shadow-card-hover hover:border-primary-500 transition-all duration-300 p-6 transform hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden">
        
        {/* Background Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isNew && (
            <span className="bg-gradient-orange text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse-orange">
              NEW
            </span>
          )}
          {isPopular && (
            <span className="bg-success-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {icon ? (
                <div className="bg-gradient-orange p-3 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-orange-glow">
                  <div className="text-white">
                    {icon}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-orange p-3 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-orange-glow">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-grey-800 group-hover:text-primary-600 transition-colors duration-300 text-lg">
                  {name}
                </h3>
                <p className="text-sm text-primary-600 font-semibold bg-primary-50 px-2 py-1 rounded-full inline-block">
                  {category}
                </p>
              </div>
            </div>
            
            {/* Arrow with animation */}
            <div className="relative">
              <ArrowRight className={`h-5 w-5 text-grey-400 group-hover:text-primary-600 transition-all duration-300 ${
                isHovered ? 'transform translate-x-1' : ''
              }`} />
              <Zap className={`absolute inset-0 h-5 w-5 text-primary-500 transition-all duration-300 ${
                isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
              }`} />
            </div>
          </div>

          {/* Description */}
          <p className="text-grey-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-grey-200 group-hover:border-primary-200 transition-colors duration-300">
            <span className="text-xs text-grey-500 font-medium uppercase tracking-wide">
              Professional Tool
            </span>
            <div className="flex items-center space-x-2 text-primary-600 font-semibold text-sm">
              <span>Calculate Now</span>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 border-2 border-primary-500 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    </Link>
  );
}