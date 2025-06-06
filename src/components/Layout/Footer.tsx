import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-grey-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                <Calculator className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">DIYCalculatorPro</span>
                <div className="text-sm text-primary-500 font-medium">Professional Tools</div>
              </div>
            </div>
            <p className="text-grey-300 mb-6 max-w-md leading-relaxed">
              Professional-grade calculators for DIY enthusiasts, contractors, and builders. 
              Accurate calculations for construction, landscaping, and home improvement projects.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-grey-300">
                <Mail className="h-4 w-4 text-primary-500" />
                <span className="text-sm">support@diycalculatorpro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-grey-300">
                <Phone className="h-4 w-4 text-primary-500" />
                <span className="text-sm">1-800-DIY-CALC</span>
              </div>
              <div className="flex items-center space-x-3 text-grey-300">
                <MapPin className="h-4 w-4 text-primary-500" />
                <span className="text-sm">Professional Tools Division</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="group p-2 bg-grey-700 rounded-lg hover:bg-primary-500 transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5 text-grey-300 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group p-2 bg-grey-700 rounded-lg hover:bg-primary-500 transition-all duration-300 hover:scale-110">
                <Github className="h-5 w-5 text-grey-300 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group p-2 bg-grey-700 rounded-lg hover:bg-primary-500 transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5 text-grey-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-orange rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/calculators" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>All Calculators</span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Popular Categories
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-orange rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/calculators/construction-and-building" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Construction</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators/carpentry-and-woodworking" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Carpentry</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators/landscaping-and-outdoor" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Landscaping</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators/painting-and-finishing" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Painting</span>
                </Link>
              </li>
              <li>
                <Link to="/calculators/electrical-and-plumbing" className="text-grey-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Electrical & Plumbing</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-grey-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-grey-400 text-sm">
              &copy; 2025 DIYCalculatorPro. All rights reserved. Built for professionals by professionals.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/terms" className="text-grey-400 hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-grey-400 hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-grey-400 hover:text-primary-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}