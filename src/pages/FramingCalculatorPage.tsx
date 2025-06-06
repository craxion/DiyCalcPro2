import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  Calculator, 
  Info, 
  RefreshCw, 
  Printer, 
  ArrowLeft, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  Home,
  Triangle,
  Plus,
  Minus,
  AlertTriangle
} from 'lucide-react';
import { createPrintFunction, PrintableResultsWrapper } from '../utils/printUtils';

export function FramingCalculatorPage() {
  const { categorySlug, calculatorSlug } = useParams<{ 
    categorySlug: string; 
    calculatorSlug: string; 
  }>();
  
  // Mock calculator data for framing estimator
  const calculator = {
    id: 'framing-material-estimator',
    name: 'Framing Material Estimator (Walls and Roof)',
    description: 'Comprehensive calculator for wall and roof framing materials including lumber, sheathing, and cost estimates',
    category: 'Construction and Building',
    slug: 'framing-material-estimator',
    formula: 'Material quantities based on framing standards and spacing requirements'
  };
  
  if (calculatorSlug !== 'framing-material-estimator') {
    return <Navigate to="/calculators" replace />;
  }

  const [framingMode, setFramingMode] = useState<'wall' | 'roof'>('wall');
  const [inputs, setInputs] = useState<Record<string, any>>({
    wallType: 'Exterior',
    roofType: 'Gable Roof',
    studSpacing: '16 inches O.C.',
    roofPitch: '6 in 12',
    lumberSize: '2x4',
    wasteFactor: 10,
    includeSheathing: 'Yes',
    sheathingType: 'OSB',
    sheathingThickness: '1/2 inch',
    overhang: 1
  });
  const [results, setResults] = useState<Record<string, any>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [windows, setWindows] = useState<Array<{width: number, height: number, count: number}>>([]);
  const [doors, setDoors] = useState<Array<{width: number, height: number, count: number}>>([]);

  // Create the standardized print function for this calculator
  const printResults = createPrintFunction(calculator.slug, calculator.name);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (inputId: string, value: string | number) => {
    setInputs(prev => ({ ...prev, [inputId]: value }));
    
    // Trigger calculation
    calculateResults({ ...inputs, [inputId]: value });
  };

  const addWindow = () => {
    setWindows(prev => [...prev, { width: 3, height: 4, count: 1 }]);
  };

  const removeWindow = (index: number) => {
    setWindows(prev => prev.filter((_, i) => i !== index));
  };

  const updateWindow = (index: number, field: string, value: number) => {
    setWindows(prev => prev.map((window, i) => 
      i === index ? { ...window, [field]: value } : window
    ));
  };

  const addDoor = () => {
    setDoors(prev => [...prev, { width: 3, height: 6.75, count: 1 }]);
  };

  const removeDoor = (index: number) => {
    setDoors(prev => prev.filter((_, i) => i !== index));
  };

  const updateDoor = (index: number, field: string, value: number) => {
    setDoors(prev => prev.map((door, i) => 
      i === index ? { ...door, [field]: value } : door
    ));
  };

  const calculateResults = (currentInputs: Record<string, any>) => {
    if (framingMode === 'wall') {
      calculateWallFraming(currentInputs);
    } else {
      calculateRoofFraming(currentInputs);
    }
  };

  const calculateWallFraming = (currentInputs: Record<string, any>) => {
    const length = currentInputs.length || 0;
    const height = currentInputs.height || 8;
    const studSpacing = currentInputs.studSpacing === '16 inches O.C.' ? 16 : 24;
    const wasteFactor = (currentInputs.wasteFactor || 10) / 100;
    const lumberCost = currentInputs.lumberCost || 0;
    const sheathingCost = currentInputs.sheathingCost || 0;
    const isExterior = currentInputs.wallType === 'Exterior';
    
    if (length === 0) {
      setResults({});
      return;
    }

    // Calculate studs
    const studCount = Math.floor((length * 12) / studSpacing) + 1;
    const cornerStuds = 2; // Assume corner construction
    const totalStuds = studCount + cornerStuds;
    
    // Calculate plates
    const bottomPlateLength = length;
    const topPlateLength = isExterior ? length * 2 : length; // Double top plate for exterior
    
    // Calculate headers for openings
    let headerLength = 0;
    let kingStuds = 0;
    let jackStuds = 0;
    
    windows.forEach(window => {
      headerLength += (window.width + 0.5) * window.count; // Add 1/2" for bearing
      kingStuds += 2 * window.count;
      jackStuds += 2 * window.count;
    });
    
    doors.forEach(door => {
      headerLength += (door.width + 0.5) * door.count;
      kingStuds += 2 * door.count;
      jackStuds += 2 * door.count;
    });
    
    // Calculate total lumber
    const studLength = height;
    const totalStudLinearFeet = (totalStuds + kingStuds + jackStuds) * studLength;
    const totalPlateLinearFeet = bottomPlateLength + topPlateLength;
    const totalHeaderLinearFeet = headerLength;
    const totalLumberLinearFeet = totalStudLinearFeet + totalPlateLinearFeet + totalHeaderLinearFeet;
    const totalLumberWithWaste = totalLumberLinearFeet * (1 + wasteFactor);
    
    // Calculate sheathing
    let sheathingArea = 0;
    let sheathingSheets = 0;
    let sheathingCostTotal = 0;
    
    if (currentInputs.includeSheathing === 'Yes') {
      sheathingArea = length * height;
      
      // Subtract window and door areas
      windows.forEach(window => {
        sheathingArea -= (window.width * window.height * window.count);
      });
      doors.forEach(door => {
        sheathingArea -= (door.width * door.height * door.count);
      });
      
      sheathingSheets = Math.ceil(sheathingArea / 32); // 4x8 = 32 sq ft per sheet
      sheathingCostTotal = sheathingSheets * sheathingCost;
    }
    
    // Calculate costs
    const lumberCostTotal = totalLumberWithWaste * lumberCost;
    const totalCost = lumberCostTotal + sheathingCostTotal;
    
    setResults({
      totalStuds: totalStuds + kingStuds + jackStuds,
      studLinearFeet: totalStudLinearFeet.toFixed(1),
      plateLinearFeet: totalPlateLinearFeet.toFixed(1),
      headerLinearFeet: totalHeaderLinearFeet.toFixed(1),
      totalLumberLinearFeet: totalLumberLinearFeet.toFixed(1),
      totalLumberWithWaste: totalLumberWithWaste.toFixed(1),
      wasteAmount: (totalLumberWithWaste - totalLumberLinearFeet).toFixed(1),
      sheathingArea: sheathingArea.toFixed(1),
      sheathingSheets: sheathingSheets,
      lumberCost: lumberCostTotal.toFixed(2),
      sheathingCostTotal: sheathingCostTotal.toFixed(2),
      totalCost: totalCost.toFixed(2),
      kingStuds: kingStuds,
      jackStuds: jackStuds
    });
  };

  const calculateRoofFraming = (currentInputs: Record<string, any>) => {
    const length = currentInputs.length || 0; // Ridge length
    const width = currentInputs.width || 0; // Building width
    const roofPitch = currentInputs.roofPitch || '6 in 12';
    const overhang = currentInputs.overhang || 1;
    const rafterSpacing = currentInputs.studSpacing === '16 inches O.C.' ? 16 : 24;
    const wasteFactor = (currentInputs.wasteFactor || 10) / 100;
    const lumberCost = currentInputs.lumberCost || 0;
    const sheathingCost = currentInputs.sheathingCost || 0;
    const isHip = currentInputs.roofType === 'Hip Roof';
    
    if (length === 0 || width === 0) {
      setResults({});
      return;
    }

    // Parse roof pitch
    const pitchParts = roofPitch.split(' in ');
    const rise = parseInt(pitchParts[0]);
    const run = 12;
    
    // Calculate rafter length
    const span = width / 2; // Half the building width
    const riseTotal = (span / run) * rise;
    const rafterLength = Math.sqrt(span * span + riseTotal * riseTotal) + overhang;
    
    // Calculate number of rafters
    const rafterCount = Math.floor((length * 12) / rafterSpacing) + 1;
    const totalRafters = rafterCount * 2; // Both sides
    
    // Hip roof adjustments
    let hipRafters = 0;
    let jackRafters = 0;
    if (isHip) {
      hipRafters = 4; // Four hip rafters
      jackRafters = Math.floor(width / (rafterSpacing / 12)) * 2; // Approximate jack rafters
    }
    
    // Ridge board
    const ridgeLength = isHip ? length - width : length;
    
    // Calculate total lumber
    const rafterLinearFeet = (totalRafters + jackRafters) * rafterLength;
    const hipRafterLength = rafterLength * 1.414; // Hip rafter is longer
    const hipLinearFeet = hipRafters * hipRafterLength;
    const ridgeLinearFeet = ridgeLength;
    const totalLumberLinearFeet = rafterLinearFeet + hipLinearFeet + ridgeLinearFeet;
    const totalLumberWithWaste = totalLumberLinearFeet * (1 + wasteFactor);
    
    // Calculate roof sheathing
    let sheathingArea = 0;
    let sheathingSheets = 0;
    let sheathingCostTotal = 0;
    
    if (currentInputs.includeSheathing === 'Yes') {
      const roofArea = length * width;
      const pitchMultiplier = Math.sqrt(1 + (rise / run) * (rise / run));
      sheathingArea = roofArea * pitchMultiplier;
      sheathingSheets = Math.ceil(sheathingArea / 32); // 4x8 = 32 sq ft per sheet
      sheathingCostTotal = sheathingSheets * sheathingCost;
    }
    
    // Calculate costs
    const lumberCostTotal = totalLumberWithWaste * lumberCost;
    const totalCost = lumberCostTotal + sheathingCostTotal;
    
    setResults({
      totalRafters: totalRafters + jackRafters,
      hipRafters: hipRafters,
      jackRafters: jackRafters,
      rafterLength: rafterLength.toFixed(1),
      rafterLinearFeet: rafterLinearFeet.toFixed(1),
      hipLinearFeet: hipLinearFeet.toFixed(1),
      ridgeLinearFeet: ridgeLinearFeet.toFixed(1),
      totalLumberLinearFeet: totalLumberLinearFeet.toFixed(1),
      totalLumberWithWaste: totalLumberWithWaste.toFixed(1),
      wasteAmount: (totalLumberWithWaste - totalLumberLinearFeet).toFixed(1),
      sheathingArea: sheathingArea.toFixed(1),
      sheathingSheets: sheathingSheets,
      lumberCost: lumberCostTotal.toFixed(2),
      sheathingCostTotal: sheathingCostTotal.toFixed(2),
      totalCost: totalCost.toFixed(2),
      roofPitch: roofPitch,
      pitchMultiplier: Math.sqrt(1 + (rise / run) * (rise / run)).toFixed(2)
    });
  };

  const resetCalculator = () => {
    setInputs({
      wallType: 'Exterior',
      roofType: 'Gable Roof',
      studSpacing: '16 inches O.C.',
      roofPitch: '6 in 12',
      lumberSize: '2x4',
      wasteFactor: 10,
      includeSheathing: 'Yes',
      sheathingType: 'OSB',
      sheathingThickness: '1/2 inch',
      overhang: 1
    });
    setWindows([]);
    setDoors([]);
    setResults({});
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Mode Selector */}
        <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-grey-100 rounded-2xl p-2 flex">
              <button
                onClick={() => setFramingMode('wall')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  framingMode === 'wall'
                    ? 'bg-gradient-orange text-white shadow-orange-glow'
                    : 'text-grey-600 hover:text-primary-600'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Wall Framing</span>
              </button>
              <button
                onClick={() => setFramingMode('roof')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  framingMode === 'roof'
                    ? 'bg-gradient-orange text-white shadow-orange-glow'
                    : 'text-grey-600 hover:text-primary-600'
                }`}
              >
                <Triangle className="h-5 w-5" />
                <span>Roof Framing</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-grey-800">
                    {framingMode === 'wall' ? 'Wall Framing Details' : 'Roof Framing Details'}
                  </h2>
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
                {/* Common Inputs */}
                <div>
                  <label className="block text-sm font-bold text-grey-700 mb-2">
                    {framingMode === 'wall' ? 'Wall Length' : 'Building Length (Ridge)'} (ft) *
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="1"
                    value={inputs.length || ''}
                    onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                    placeholder={framingMode === 'wall' ? 'Enter wall length' : 'Enter building length'}
                  />
                </div>

                {framingMode === 'wall' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Wall Type *
                      </label>
                      <select
                        value={inputs.wallType}
                        onChange={(e) => handleInputChange('wallType', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="Exterior">Exterior (Double Top Plate)</option>
                        <option value="Interior">Interior (Single Top Plate)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Wall Height (ft) *
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="6"
                        value={inputs.height || ''}
                        onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 8)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                        placeholder="Enter wall height"
                      />
                    </div>
                  </>
                )}

                {framingMode === 'roof' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Roof Type *
                      </label>
                      <select
                        value={inputs.roofType}
                        onChange={(e) => handleInputChange('roofType', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="Gable Roof">Gable Roof</option>
                        <option value="Hip Roof">Hip Roof</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Building Width (ft) *
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="1"
                        value={inputs.width || ''}
                        onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                        placeholder="Enter building width"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Roof Pitch *
                      </label>
                      <select
                        value={inputs.roofPitch}
                        onChange={(e) => handleInputChange('roofPitch', e.target.value)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="4 in 12">4 in 12 (Low Pitch)</option>
                        <option value="6 in 12">6 in 12 (Standard)</option>
                        <option value="8 in 12">8 in 12 (Steep)</option>
                        <option value="10 in 12">10 in 12 (Very Steep)</option>
                        <option value="12 in 12">12 in 12 (45 Degrees)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Overhang Length (ft)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="4"
                        value={inputs.overhang || ''}
                        onChange={(e) => handleInputChange('overhang', parseFloat(e.target.value) || 1)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                        placeholder="Enter overhang length"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-grey-700 mb-2">
                    {framingMode === 'wall' ? 'Stud' : 'Rafter'} Spacing *
                  </label>
                  <select
                    value={inputs.studSpacing}
                    onChange={(e) => handleInputChange('studSpacing', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                  >
                    <option value="16 inches O.C.">16 inches O.C. (Standard)</option>
                    <option value="24 inches O.C.">24 inches O.C. (Economy)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-grey-700 mb-2">
                    Lumber Size *
                  </label>
                  <select
                    value={inputs.lumberSize}
                    onChange={(e) => handleInputChange('lumberSize', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                  >
                    <option value="2x4">2x4</option>
                    <option value="2x6">2x6</option>
                    <option value="2x8">2x8</option>
                    <option value="2x10">2x10</option>
                    <option value="2x12">2x12</option>
                  </select>
                </div>

                {/* Windows and Doors for Wall Framing */}
                {framingMode === 'wall' && (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-grey-800">Window Openings</h3>
                        <button
                          onClick={addWindow}
                          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Window</span>
                        </button>
                      </div>
                      {windows.map((window, index) => (
                        <div key={index} className="bg-grey-100 p-4 rounded-xl mb-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-grey-700">Window {index + 1}</span>
                            <button
                              onClick={() => removeWindow(index)}
                              className="text-error-500 hover:text-error-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Width (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={window.width}
                                onChange={(e) => updateWindow(index, 'width', parseFloat(e.target.value) || 3)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Height (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={window.height}
                                onChange={(e) => updateWindow(index, 'height', parseFloat(e.target.value) || 4)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Count</label>
                              <input
                                type="number"
                                min="1"
                                value={window.count}
                                onChange={(e) => updateWindow(index, 'count', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-grey-800">Door Openings</h3>
                        <button
                          onClick={addDoor}
                          className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Door</span>
                        </button>
                      </div>
                      {doors.map((door, index) => (
                        <div key={index} className="bg-grey-100 p-4 rounded-xl mb-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-grey-700">Door {index + 1}</span>
                            <button
                              onClick={() => removeDoor(index)}
                              className="text-error-500 hover:text-error-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Width (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={door.width}
                                onChange={(e) => updateDoor(index, 'width', parseFloat(e.target.value) || 3)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Height (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={door.height}
                                onChange={(e) => updateDoor(index, 'height', parseFloat(e.target.value) || 6.75)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Count</label>
                              <input
                                type="number"
                                min="1"
                                value={door.count}
                                onChange={(e) => updateDoor(index, 'count', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Additional Options */}
                <div className="border-t border-grey-200 pt-6">
                  <h3 className="text-lg font-bold text-grey-800 mb-4">Additional Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Waste Factor (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="25"
                        value={inputs.wasteFactor || ''}
                        onChange={(e) => handleInputChange('wasteFactor', parseInt(e.target.value) || 10)}
                        className="w-full px-4 py-3 border-2 border-grey-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Lumber Cost per Linear Foot ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={inputs.lumberCost || ''}
                        onChange={(e) => handleInputChange('lumberCost', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-grey-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      Include Sheathing
                    </label>
                    <select
                      value={inputs.includeSheathing}
                      onChange={(e) => handleInputChange('includeSheathing', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-grey-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {inputs.includeSheathing === 'Yes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Sheathing Type
                        </label>
                        <select
                          value={inputs.sheathingType}
                          onChange={(e) => handleInputChange('sheathingType', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-grey-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                        >
                          <option value="OSB">OSB</option>
                          <option value="Plywood">Plywood</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Sheathing Cost per Sheet ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={inputs.sheathingCost || ''}
                          onChange={(e) => handleInputChange('sheathingCost', parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-3 border-2 border-grey-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success-50 to-primary-50 opacity-30"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-success-500 to-success-600 p-3 rounded-xl shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-grey-800">Material Calculations</h2>
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
                <PrintableResultsWrapper calculatorSlug={calculator.slug}>
                  <div className="space-y-6">
                    {framingMode === 'wall' ? (
                      <>
                        {/* Wall Lumber Calculations */}
                        <div className="result-section bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                          <h3 className="section-title font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                            <span>Wall Lumber Requirements</span>
                          </h3>
                          <div className="space-y-3">
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Total Studs (including king/jack):</span>
                              <span className="result-value font-bold text-grey-800">{results.totalStuds} pieces</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Stud Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.studLinearFeet} ft</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Plate Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.plateLinearFeet} ft</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Header Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.headerLinearFeet} ft</span>
                            </div>
                            <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-grey-300">
                              <span className="result-label font-bold text-primary-600">Total Lumber (with waste):</span>
                              <span className="result-value highlight-value font-bold text-primary-600 text-xl">{results.totalLumberWithWaste} ft</span>
                            </div>
                          </div>
                        </div>

                        {/* Wall Sheathing */}
                        {inputs.includeSheathing === 'Yes' && (
                          <div className="result-section bg-gradient-to-r from-secondary-100 to-secondary-200 p-6 rounded-2xl border border-secondary-300">
                            <h3 className="section-title font-bold text-secondary-800 mb-4 text-lg flex items-center space-x-2">
                              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                              <span>Wall Sheathing Requirements</span>
                            </h3>
                            <div className="space-y-3">
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Sheathing Area:</span>
                                <span className="result-value font-bold text-secondary-800">{results.sheathingArea} sq ft</span>
                              </div>
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Sheathing Sheets (4x8):</span>
                                <span className="result-value font-bold text-secondary-800">{results.sheathingSheets} sheets</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Roof Lumber Calculations */}
                        <div className="result-section bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                          <h3 className="section-title font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                            <span>Roof Lumber Requirements</span>
                          </h3>
                          <div className="space-y-3">
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Total Rafters:</span>
                              <span className="result-value font-bold text-grey-800">{results.totalRafters} pieces</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Rafter Length:</span>
                              <span className="result-value font-bold text-grey-800">{results.rafterLength} ft each</span>
                            </div>
                            {results.hipRafters > 0 && (
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-grey-600">Hip Rafters:</span>
                                <span className="result-value font-bold text-grey-800">{results.hipRafters} pieces</span>
                              </div>
                            )}
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Ridge Board:</span>
                              <span className="result-value font-bold text-grey-800">{results.ridgeLinearFeet} ft</span>
                            </div>
                            <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-grey-300">
                              <span className="result-label font-bold text-primary-600">Total Lumber (with waste):</span>
                              <span className="result-value highlight-value font-bold text-primary-600 text-xl">{results.totalLumberWithWaste} ft</span>
                            </div>
                          </div>
                        </div>

                        {/* Roof Sheathing */}
                        {inputs.includeSheathing === 'Yes' && (
                          <div className="result-section bg-gradient-to-r from-secondary-100 to-secondary-200 p-6 rounded-2xl border border-secondary-300">
                            <h3 className="section-title font-bold text-secondary-800 mb-4 text-lg flex items-center space-x-2">
                              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                              <span>Roof Sheathing Requirements</span>
                            </h3>
                            <div className="space-y-3">
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Roof Area:</span>
                                <span className="result-value font-bold text-secondary-800">{results.sheathingArea} sq ft</span>
                              </div>
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Pitch Multiplier:</span>
                                <span className="result-value font-bold text-secondary-800">{results.pitchMultiplier}</span>
                              </div>
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Sheathing Sheets (4x8):</span>
                                <span className="result-value font-bold text-secondary-800">{results.sheathingSheets} sheets</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Cost Summary */}
                    {(inputs.lumberCost > 0 || inputs.sheathingCost > 0) && (
                      <div className="result-section bg-gradient-to-r from-success-100 to-success-200 p-6 rounded-2xl border border-success-300">
                        <h3 className="section-title font-bold text-success-800 mb-4 text-lg flex items-center space-x-2">
                          <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                          <span>Cost Estimate</span>
                        </h3>
                        <div className="space-y-3">
                          {inputs.lumberCost > 0 && (
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-success-700">Lumber Cost:</span>
                              <span className="result-value font-bold text-success-800">${results.lumberCost}</span>
                            </div>
                          )}
                          {inputs.sheathingCost > 0 && inputs.includeSheathing === 'Yes' && (
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-success-700">Sheathing Cost:</span>
                              <span className="result-value font-bold text-success-800">${results.sheathingCostTotal}</span>
                            </div>
                          )}
                          <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-success-300">
                            <span className="result-label font-bold text-success-700">Total Estimated Cost:</span>
                            <span className="result-value highlight-value font-bold text-success-700 text-xl">${results.totalCost}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Waste Summary */}
                    <div className="result-section bg-gradient-to-r from-warning-100 to-warning-200 p-6 rounded-2xl border border-warning-300">
                      <h3 className="section-title font-bold text-warning-800 mb-4 text-lg flex items-center space-x-2">
                        <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                        <span>Waste and Safety Factors</span>
                      </h3>
                      <div className="space-y-3">
                        <div className="result-row flex justify-between items-center">
                          <span className="result-label text-warning-700">Waste Factor Applied:</span>
                          <span className="result-value font-bold text-warning-800">{inputs.wasteFactor || 10}%</span>
                        </div>
                        <div className="result-row flex justify-between items-center">
                          <span className="result-label text-warning-700">Additional Material:</span>
                          <span className="result-value font-bold text-warning-800">{results.wasteAmount} ft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PrintableResultsWrapper>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-orange-glow">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-grey-800 mb-2">Ready to Calculate</h3>
                  <p className="text-grey-600">Enter your {framingMode} details to see professional material calculations</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions and Tips */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* How to Use */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-10 relative overflow-hidden">
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
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <p className="text-grey-600">Select your framing mode: Wall or Roof framing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <p className="text-grey-600">Enter the basic dimensions and specifications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <p className="text-grey-600">For walls: Add window and door openings as needed</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">4</div>
                  <p className="text-grey-600">Configure lumber size, spacing, and cost options</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">5</div>
                  <p className="text-grey-600">Review calculations and print for reference</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Tips */}
          <div className="bg-white rounded-3xl shadow-card-hover border border-grey-300 p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6600' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-orange p-3 rounded-xl shadow-orange-glow">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-grey-800">Professional Tips</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-primary-50 p-4 rounded-xl border border-primary-200">
                  <h4 className="font-bold text-primary-700 mb-2">Lumber Selection</h4>
                  <p className="text-sm text-primary-600">Use 2x4 for non-load bearing walls, 2x6 for exterior walls with insulation, and 2x8+ for long spans or heavy loads.</p>
                </div>
                <div className="bg-secondary-50 p-4 rounded-xl border border-secondary-200">
                  <h4 className="font-bold text-secondary-700 mb-2">Spacing Standards</h4>
                  <p className="text-sm text-secondary-600">16" O.C. is standard for most applications. 24" O.C. can be used for non-structural walls or with engineered lumber.</p>
                </div>
                <div className="bg-success-50 p-4 rounded-xl border border-success-200">
                  <h4 className="font-bold text-success-700 mb-2">Waste Factor</h4>
                  <p className="text-sm text-success-600">Include 10-15% waste for cuts, mistakes, and future repairs. Complex layouts may require higher waste factors.</p>
                </div>
                <div className="bg-warning-50 p-4 rounded-xl border border-warning-200">
                  <h4 className="font-bold text-warning-700 mb-2">Code Compliance</h4>
                  <p className="text-sm text-warning-600">Always verify calculations with local building codes and consult a structural engineer for load-bearing modifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}