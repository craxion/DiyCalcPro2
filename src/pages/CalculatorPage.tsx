import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calculator, Info, RefreshCw, Printer, ArrowLeft, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { sampleCalculators } from '../lib/data/calculators';

export function CalculatorPage() {
  const { categorySlug, calculatorSlug } = useParams<{ 
    categorySlug: string; 
    calculatorSlug: string; 
  }>();
  
  const calculator = sampleCalculators.find(calc => calc.slug === calculatorSlug);
  
  if (!calculator) {
    return <Navigate to="/calculators\" replace />;
  }

  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (inputId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [inputId]: numValue }));
    
    // Trigger calculation
    calculateResults({ ...inputs, [inputId]: numValue });
  };

  const calculateResults = (currentInputs: Record<string, number>) => {
    if (calculator.id === 'concrete-slab-calculator') {
      const length = currentInputs.length || 0;
      const width = currentInputs.width || 0;
      const thickness = (currentInputs.thickness || 0) / 12; // Convert inches to feet
      const wastePercent = currentInputs.waste || 5;
      
      const volume = length * width * thickness;
      const volumeWithWaste = volume * (1 + wastePercent / 100);
      const cubicYards = volumeWithWaste / 27;
      const bags = Math.ceil(cubicYards * 40); // Approximate bags per cubic yard
      
      setResults({
        volume: volume.toFixed(2),
        volumeWithWaste: volumeWithWaste.toFixed(2),
        cubicYards: cubicYards.toFixed(2),
        bags: bags,
        cost: (cubicYards * 120).toFixed(2) // Estimate $120 per cubic yard
      });
    } else if (calculator.id === 'paint-coverage-calculator') {
      const length = currentInputs.roomLength || 0;
      const width = currentInputs.roomWidth || 0;
      const height = currentInputs.ceilingHeight || 0;
      const doors = currentInputs.doors || 0;
      const windows = currentInputs.windows || 0;
      const coats = currentInputs.coats || 1;
      
      const wallArea = 2 * (length + width) * height;
      const doorArea = doors * 20; // Average door area
      const windowArea = windows * 15; // Average window area
      const paintableArea = wallArea - doorArea - windowArea;
      const totalArea = paintableArea * coats;
      const gallons = Math.ceil(totalArea / 350); // 350 sq ft per gallon coverage
      
      setResults({
        wallArea: wallArea.toFixed(0),
        paintableArea: paintableArea.toFixed(0),
        totalArea: totalArea.toFixed(0),
        gallons: gallons,
        cost: (gallons * 45).toFixed(2) // Estimate $45 per gallon
      });
    }
  };

  const resetCalculator = () => {
    setInputs({});
    setResults({});
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to={`/calculators/${categorySlug}`}
            className="inline-flex items-center space-x-2 text-grey-600 hover:text-primary-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to {calculator.category}</span>
          </Link>
        </div>

        {/* Header */}
        <div className={`bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 mb-10 relative overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-orange p-4 rounded-2xl shadow-orange-glow">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-grey-800 mb-2">
                      {calculator.name}
                    </h1>
                    <div className="flex items-center space-x-3">
                      <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-bold text-sm">
                        {calculator.category}
                      </span>
                      <span className="bg-success-100 text-success-700 px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Professional Grade</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-grey-600 mb-6 leading-relaxed">
                  {calculator.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-grey-500">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary-500" />
                    <span>Formula: {calculator.formula}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-grey-800">Project Details</h2>
                </div>
                <button
                  onClick={resetCalculator}
                  className="flex items-center space-x-2 text-grey-500 hover:text-primary-600 transition-all duration-300 hover:scale-105 bg-grey-100 hover:bg-primary-100 px-4 py-2 rounded-xl"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm font-medium">Reset</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {calculator.inputs.map((input, index) => (
                  <div 
                    key={input.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      {input.label}
                      {input.unit && <span className="text-primary-600 ml-1">({input.unit})</span>}
                      {input.required && <span className="text-error-500 ml-1">*</span>}
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        step={input.step || 0.1}
                        min={input.min}
                        max={input.max}
                        value={inputs[input.id] || ''}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg group-hover:border-primary-400"
                        placeholder={`Enter ${input.label.toLowerCase()}`}
                      />
                      {input.help && (
                        <div className="group/tooltip relative">
                          <Info className="absolute right-4 top-4 h-5 w-5 text-grey-400 cursor-help hover:text-primary-500 transition-colors" />
                          <div className="invisible group-hover/tooltip:visible absolute right-0 top-full mt-2 w-72 bg-grey-800 text-white text-sm rounded-xl p-3 z-10 shadow-lg">
                            {input.help}
                            <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-grey-800"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-success-50 to-primary-50 opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-success-500 to-success-600 p-3 rounded-xl shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-grey-800">Calculation Results</h2>
                </div>
                {Object.keys(results).length > 0 && (
                  <button
                    onClick={printResults}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-all duration-300 hover:scale-105 bg-primary-100 hover:bg-primary-200 px-4 py-2 rounded-xl"
                  >
                    <Printer className="h-4 w-4" />
                    <span className="text-sm font-medium">Print</span>
                  </button>
                )}
              </div>

              {Object.keys(results).length > 0 ? (
                <div className="space-y-6">
                  {calculator.id === 'concrete-slab-calculator' && (
                    <>
                      <div className="bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                        <h3 className="font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          <span>Volume Calculations</span>
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-grey-600">Base Volume:</span>
                            <span className="font-bold text-grey-800">{results.volume} cubic feet</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-grey-600">With Waste Factor:</span>
                            <span className="font-bold text-grey-800">{results.volumeWithWaste} cubic feet</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-grey-300">
                            <span className="font-bold text-primary-600">Total Cubic Yards:</span>
                            <span className="font-bold text-primary-600 text-xl">{results.cubicYards} yards³</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-success-100 to-success-200 p-6 rounded-2xl border border-success-300">
                        <h3 className="font-bold text-success-800 mb-4 text-lg flex items-center space-x-2">
                          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                          <span>Material Requirements</span>
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-success-700">Concrete Bags (80lb):</span>
                            <span className="font-bold text-success-800">{results.bags} bags</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-success-300">
                            <span className="font-bold text-success-700">Estimated Cost:</span>
                            <span className="font-bold text-success-700 text-xl">${results.cost}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {calculator.id === 'paint-coverage-calculator' && (
                    <>
                      <div className="bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                        <h3 className="font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          <span>Area Calculations</span>
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-grey-600">Total Wall Area:</span>
                            <span className="font-bold text-grey-800">{results.wallArea} sq ft</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-grey-600">Paintable Area:</span>
                            <span className="font-bold text-grey-800">{results.paintableArea} sq ft</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-grey-300">
                            <span className="font-bold text-primary-600">Total Area to Paint:</span>
                            <span className="font-bold text-primary-600 text-xl">{results.totalArea} sq ft</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-success-100 to-success-200 p-6 rounded-2xl border border-success-300">
                        <h3 className="font-bold text-success-800 mb-4 text-lg flex items-center space-x-2">
                          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                          <span>Paint Requirements</span>
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-success-700">Paint Gallons:</span>
                            <span className="font-bold text-success-800">{results.gallons} gallons</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-success-300">
                            <span className="font-bold text-success-700">Estimated Cost:</span>
                            <span className="font-bold text-success-700 text-xl">${results.cost}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-orange-glow">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-grey-800 mb-2">Ready to Calculate</h3>
                  <p className="text-grey-600">Enter your project details to see professional calculations</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-3xl shadow-card-hover border border-grey-300 p-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                <Info className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-grey-800">How to Use This Calculator</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <p className="text-grey-600">Enter the required measurements in the form above</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <p className="text-grey-600">Results will calculate automatically as you type</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <p className="text-grey-600">Add a waste factor (typically 5-10%) to account for cuts and mistakes</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">4</div>
                  <p className="text-grey-600">Use the print function to save your calculations for reference</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">5</div>
                  <p className="text-grey-600">Double-check measurements before ordering materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}