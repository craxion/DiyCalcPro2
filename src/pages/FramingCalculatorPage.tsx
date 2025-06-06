import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Info, 
  RefreshCw, 
  Printer, 
  ArrowLeft, 
  Zap, 
  TrendingUp, 
  CheckCircle,
  Building2,
  Plus,
  Minus,
  Home,
  Ruler,
  DollarSign
} from 'lucide-react';
import { createPrintFunction, PrintableResultsWrapper } from '../utils/printUtils';

interface WindowDoor {
  id: string;
  count: number;
  width: number;
  height: number;
}

export function FramingCalculatorPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [framingMode, setFramingMode] = useState<'wall' | 'roof'>('wall');
  
  // Wall framing inputs
  const [wallType, setWallType] = useState<'exterior' | 'interior'>('exterior');
  const [wallLength, setWallLength] = useState<number>(0);
  const [wallHeight, setWallHeight] = useState<number>(8);
  const [studSpacing, setStudSpacing] = useState<16 | 24>(16);
  const [lumberSize, setLumberSize] = useState<string>('2x4');
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [lumberCost, setLumberCost] = useState<number>(0);
  const [includeSheathing, setIncludeSheathing] = useState<boolean>(false);
  const [sheathingCost, setSheathingCost] = useState<number>(0);
  
  // Roof framing inputs
  const [roofType, setRoofType] = useState<'gable' | 'hip'>('gable');
  const [buildingWidth, setBuildingWidth] = useState<number>(0);
  const [buildingLength, setBuildingLength] = useState<number>(0);
  const [roofPitch, setRoofPitch] = useState<string>('6 in 12');
  const [overhang, setOverhang] = useState<number>(1);
  
  // Window and door openings
  const [windows, setWindows] = useState<WindowDoor[]>([]);
  const [doors, setDoors] = useState<WindowDoor[]>([]);
  
  // Results
  const [results, setResults] = useState<any>({});

  const printResults = createPrintFunction('framing-material-estimator', 'Framing Material Estimator (Walls and Roof)');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    calculateResults();
  }, [
    framingMode, wallType, wallLength, wallHeight, studSpacing, lumberSize, 
    wasteFactor, lumberCost, includeSheathing, sheathingCost, roofType, 
    buildingWidth, buildingLength, roofPitch, overhang, windows, doors
  ]);

  const addWindow = () => {
    const newWindow: WindowDoor = {
      id: `window-${Date.now()}`,
      count: 1,
      width: 3,
      height: 4
    };
    setWindows([...windows, newWindow]);
  };

  const removeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const updateWindow = (id: string, field: keyof WindowDoor, value: number) => {
    setWindows(windows.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const addDoor = () => {
    const newDoor: WindowDoor = {
      id: `door-${Date.now()}`,
      count: 1,
      width: 3,
      height: 6.75
    };
    setDoors([...doors, newDoor]);
  };

  const removeDoor = (id: string) => {
    setDoors(doors.filter(d => d.id !== id));
  };

  const updateDoor = (id: string, field: keyof WindowDoor, value: number) => {
    setDoors(doors.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculateResults = () => {
    if (framingMode === 'wall') {
      calculateWallFraming();
    } else {
      calculateRoofFraming();
    }
  };

  const calculateWallFraming = () => {
    if (!wallLength || !wallHeight) return;

    // Calculate stud count
    const studSpacingFeet = studSpacing / 12;
    const numberOfStuds = Math.floor(wallLength / studSpacingFeet) + 1;
    
    // Calculate plates
    const topPlates = wallType === 'exterior' ? 2 : 1;
    const plateLinearFeet = wallLength * (1 + topPlates); // bottom + top plate(s)
    
    // Calculate total stud linear feet
    const studLinearFeet = numberOfStuds * wallHeight;
    
    // Calculate window and door openings
    let totalWindowArea = 0;
    let totalDoorArea = 0;
    let headerLinearFeet = 0;
    
    windows.forEach(window => {
      const area = (window.width * window.height * window.count) / 144; // convert to sq ft
      totalWindowArea += area;
      headerLinearFeet += window.width * window.count;
    });
    
    doors.forEach(door => {
      const area = (door.width * door.height * door.count) / 144; // convert to sq ft
      totalDoorArea += area;
      headerLinearFeet += door.width * door.count;
    });
    
    // Calculate sheathing
    const wallArea = wallLength * wallHeight;
    const sheathingArea = wallArea - totalWindowArea - totalDoorArea;
    const sheathingSheets = Math.ceil(sheathingArea / 32); // 4x8 = 32 sq ft per sheet
    
    // Apply waste factor
    const wasteMultiplier = 1 + (wasteFactor / 100);
    const totalLumberLinearFeet = (studLinearFeet + plateLinearFeet + headerLinearFeet) * wasteMultiplier;
    
    // Calculate costs
    const lumberCostTotal = totalLumberLinearFeet * lumberCost;
    const sheathingCostTotal = includeSheathing ? sheathingSheets * sheathingCost : 0;
    const totalCost = lumberCostTotal + sheathingCostTotal;

    setResults({
      mode: 'wall',
      numberOfStuds: Math.round(numberOfStuds),
      studLinearFeet: Math.round(studLinearFeet),
      plateLinearFeet: Math.round(plateLinearFeet),
      headerLinearFeet: Math.round(headerLinearFeet),
      totalLumberLinearFeet: Math.round(totalLumberLinearFeet),
      wallArea: Math.round(wallArea),
      sheathingArea: Math.round(sheathingArea),
      sheathingSheets: sheathingSheets,
      lumberCostTotal: lumberCostTotal.toFixed(2),
      sheathingCostTotal: sheathingCostTotal.toFixed(2),
      totalCost: totalCost.toFixed(2),
      wasteFactor: wasteFactor
    });
  };

  const calculateRoofFraming = () => {
    if (!buildingWidth || !buildingLength) return;

    // Parse roof pitch
    const pitchParts = roofPitch.split(' in ');
    const rise = parseInt(pitchParts[0]);
    const run = parseInt(pitchParts[1]);
    const pitchMultiplier = Math.sqrt((rise * rise) + (run * run)) / run;
    
    // Calculate rafter length
    const rafterRun = buildingWidth / 2;
    const rafterLength = (rafterRun * pitchMultiplier) + overhang;
    
    // Calculate number of rafters
    const rafterSpacingFeet = studSpacing / 12;
    const numberOfRafters = Math.floor(buildingLength / rafterSpacingFeet) + 1;
    const totalRafters = numberOfRafters * 2; // Both sides
    
    // Calculate ridge board
    const ridgeLength = buildingLength;
    
    // Calculate total lumber
    const rafterLinearFeet = totalRafters * rafterLength;
    const ridgeLinearFeet = ridgeLength;
    
    // Calculate roof sheathing area
    const roofArea = buildingLength * rafterLength * 2; // Both sides
    const sheathingSheets = Math.ceil(roofArea / 32); // 4x8 = 32 sq ft per sheet
    
    // Apply waste factor
    const wasteMultiplier = 1 + (wasteFactor / 100);
    const totalLumberLinearFeet = (rafterLinearFeet + ridgeLinearFeet) * wasteMultiplier;
    
    // Calculate costs
    const lumberCostTotal = totalLumberLinearFeet * lumberCost;
    const sheathingCostTotal = includeSheathing ? sheathingSheets * sheathingCost : 0;
    const totalCost = lumberCostTotal + sheathingCostTotal;

    setResults({
      mode: 'roof',
      numberOfRafters: totalRafters,
      rafterLength: rafterLength.toFixed(2),
      rafterLinearFeet: Math.round(rafterLinearFeet),
      ridgeLinearFeet: Math.round(ridgeLinearFeet),
      totalLumberLinearFeet: Math.round(totalLumberLinearFeet),
      roofArea: Math.round(roofArea),
      sheathingSheets: sheathingSheets,
      lumberCostTotal: lumberCostTotal.toFixed(2),
      sheathingCostTotal: sheathingCostTotal.toFixed(2),
      totalCost: totalCost.toFixed(2),
      pitchMultiplier: pitchMultiplier.toFixed(3),
      wasteFactor: wasteFactor
    });
  };

  const resetCalculator = () => {
    setWallLength(0);
    setWallHeight(8);
    setBuildingWidth(0);
    setBuildingLength(0);
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
            to="/calculators/construction-and-building"
            className="inline-flex items-center space-x-2 text-grey-600 hover:text-primary-600 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Construction and Building</span>
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
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-orange p-4 rounded-2xl shadow-orange-glow">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-grey-800 mb-2">
                  Framing Material Estimator
                </h1>
                <div className="flex items-center space-x-3">
                  <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-bold text-sm">
                    Construction and Building
                  </span>
                  <span className="bg-success-100 text-success-700 px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Professional Grade</span>
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-grey-600 mb-6 leading-relaxed">
              Comprehensive calculator for wall and roof framing materials including lumber, sheathing, and cost estimates. 
              Calculate studs, plates, rafters, and all necessary components for professional framing projects.
            </p>
            
            {/* Mode Selector */}
            <div className="flex items-center space-x-4 bg-grey-100 p-2 rounded-2xl inline-flex">
              <button
                onClick={() => setFramingMode('wall')}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
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
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                  framingMode === 'roof' 
                    ? 'bg-gradient-orange text-white shadow-orange-glow' 
                    : 'text-grey-600 hover:text-primary-600'
                }`}
              >
                <Building2 className="h-5 w-5" />
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
                    <Ruler className="h-5 w-5 text-white" />
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
                {framingMode === 'wall' ? (
                  <>
                    {/* Wall Type */}
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Wall Type
                      </label>
                      <select
                        value={wallType}
                        onChange={(e) => setWallType(e.target.value as 'exterior' | 'interior')}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="exterior">Exterior Wall</option>
                        <option value="interior">Interior Wall</option>
                      </select>
                    </div>

                    {/* Wall Dimensions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Wall Length (ft)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="1"
                          value={wallLength || ''}
                          onChange={(e) => setWallLength(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                          placeholder="Enter length"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Wall Height (ft)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="6"
                          value={wallHeight || ''}
                          onChange={(e) => setWallHeight(parseFloat(e.target.value) || 8)}
                          className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                          placeholder="8"
                        />
                      </div>
                    </div>

                    {/* Windows */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold text-grey-700">
                          Window Openings
                        </label>
                        <button
                          onClick={addWindow}
                          className="flex items-center space-x-2 bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add Window</span>
                        </button>
                      </div>
                      {windows.map((window) => (
                        <div key={window.id} className="bg-grey-100 p-4 rounded-xl mb-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-grey-700">Window</span>
                            <button
                              onClick={() => removeWindow(window.id)}
                              className="text-error-500 hover:text-error-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Count</label>
                              <input
                                type="number"
                                min="1"
                                value={window.count}
                                onChange={(e) => updateWindow(window.id, 'count', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Width (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={window.width}
                                onChange={(e) => updateWindow(window.id, 'width', parseFloat(e.target.value) || 3)}
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
                                onChange={(e) => updateWindow(window.id, 'height', parseFloat(e.target.value) || 4)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Doors */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold text-grey-700">
                          Door Openings
                        </label>
                        <button
                          onClick={addDoor}
                          className="flex items-center space-x-2 bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add Door</span>
                        </button>
                      </div>
                      {doors.map((door) => (
                        <div key={door.id} className="bg-grey-100 p-4 rounded-xl mb-3">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-grey-700">Door</span>
                            <button
                              onClick={() => removeDoor(door.id)}
                              className="text-error-500 hover:text-error-600"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Count</label>
                              <input
                                type="number"
                                min="1"
                                value={door.count}
                                onChange={(e) => updateDoor(door.id, 'count', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-grey-600 mb-1">Width (ft)</label>
                              <input
                                type="number"
                                step="0.25"
                                min="1"
                                value={door.width}
                                onChange={(e) => updateDoor(door.id, 'width', parseFloat(e.target.value) || 3)}
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
                                onChange={(e) => updateDoor(door.id, 'height', parseFloat(e.target.value) || 6.75)}
                                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Roof Type */}
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Roof Type
                      </label>
                      <select
                        value={roofType}
                        onChange={(e) => setRoofType(e.target.value as 'gable' | 'hip')}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="gable">Gable Roof</option>
                        <option value="hip">Hip Roof</option>
                      </select>
                    </div>

                    {/* Building Dimensions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Building Width (ft)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="1"
                          value={buildingWidth || ''}
                          onChange={(e) => setBuildingWidth(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                          placeholder="Enter width"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-grey-700 mb-2">
                          Building Length (ft)
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="1"
                          value={buildingLength || ''}
                          onChange={(e) => setBuildingLength(parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                          placeholder="Enter length"
                        />
                      </div>
                    </div>

                    {/* Roof Pitch */}
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Roof Pitch
                      </label>
                      <select
                        value={roofPitch}
                        onChange={(e) => setRoofPitch(e.target.value)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      >
                        <option value="4 in 12">4 in 12</option>
                        <option value="6 in 12">6 in 12</option>
                        <option value="8 in 12">8 in 12</option>
                        <option value="10 in 12">10 in 12</option>
                        <option value="12 in 12">12 in 12</option>
                      </select>
                    </div>

                    {/* Overhang */}
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Overhang Length (ft)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="4"
                        value={overhang || ''}
                        onChange={(e) => setOverhang(parseFloat(e.target.value) || 1)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                        placeholder="1"
                      />
                    </div>
                  </>
                )}

                {/* Common Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      {framingMode === 'wall' ? 'Stud' : 'Rafter'} Spacing
                    </label>
                    <select
                      value={studSpacing}
                      onChange={(e) => setStudSpacing(parseInt(e.target.value) as 16 | 24)}
                      className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                    >
                      <option value={16}>16" O.C.</option>
                      <option value={24}>24" O.C.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      Lumber Size
                    </label>
                    <select
                      value={lumberSize}
                      onChange={(e) => setLumberSize(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                    >
                      <option value="2x4">2x4</option>
                      <option value="2x6">2x6</option>
                      <option value="2x8">2x8</option>
                      <option value="2x10">2x10</option>
                      <option value="2x12">2x12</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      Waste Factor (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={wasteFactor || ''}
                      onChange={(e) => setWasteFactor(parseInt(e.target.value) || 10)}
                      className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-grey-700 mb-2">
                      Lumber Cost ($/LF)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={lumberCost || ''}
                      onChange={(e) => setLumberCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Sheathing Options */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      id="includeSheathing"
                      checked={includeSheathing}
                      onChange={(e) => setIncludeSheathing(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-2 border-grey-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="includeSheathing" className="text-sm font-bold text-grey-700">
                      Include Sheathing Calculations
                    </label>
                  </div>
                  
                  {includeSheathing && (
                    <div>
                      <label className="block text-sm font-bold text-grey-700 mb-2">
                        Sheathing Cost ($/sheet)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={sheathingCost || ''}
                        onChange={(e) => setSheathingCost(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-4 border-2 border-grey-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-lg"
                        placeholder="0.00"
                      />
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
                <PrintableResultsWrapper calculatorSlug="framing-material-estimator">
                  <div className="space-y-6">
                    {results.mode === 'wall' ? (
                      <>
                        <div className="result-section bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                          <h3 className="section-title font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                            <span>Wall Framing Components</span>
                          </h3>
                          <div className="space-y-3">
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Number of Studs:</span>
                              <span className="result-value font-bold text-grey-800">{results.numberOfStuds} pieces</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Stud Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.studLinearFeet} LF</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Plate Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.plateLinearFeet} LF</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Header Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.headerLinearFeet} LF</span>
                            </div>
                            <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-grey-300">
                              <span className="result-label font-bold text-primary-600">Total Lumber (with {results.wasteFactor}% waste):</span>
                              <span className="result-value highlight-value font-bold text-primary-600 text-xl">{results.totalLumberLinearFeet} LF</span>
                            </div>
                          </div>
                        </div>

                        {includeSheathing && (
                          <div className="result-section bg-gradient-to-r from-secondary-100 to-secondary-200 p-6 rounded-2xl border border-secondary-300">
                            <h3 className="section-title font-bold text-secondary-800 mb-4 text-lg flex items-center space-x-2">
                              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                              <span>Wall Sheathing</span>
                            </h3>
                            <div className="space-y-3">
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Wall Area:</span>
                                <span className="result-value font-bold text-secondary-800">{results.wallArea} sq ft</span>
                              </div>
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Sheathing Area:</span>
                                <span className="result-value font-bold text-secondary-800">{results.sheathingArea} sq ft</span>
                              </div>
                              <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-secondary-300">
                                <span className="result-label font-bold text-secondary-700">Sheathing Sheets (4x8):</span>
                                <span className="result-value highlight-value font-bold text-secondary-700 text-xl">{results.sheathingSheets} sheets</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="result-section bg-gradient-to-r from-grey-100 to-grey-200 p-6 rounded-2xl border border-grey-300">
                          <h3 className="section-title font-bold text-grey-800 mb-4 text-lg flex items-center space-x-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                            <span>Roof Framing Components</span>
                          </h3>
                          <div className="space-y-3">
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Number of Rafters:</span>
                              <span className="result-value font-bold text-grey-800">{results.numberOfRafters} pieces</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Rafter Length:</span>
                              <span className="result-value font-bold text-grey-800">{results.rafterLength} ft</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Rafter Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.rafterLinearFeet} LF</span>
                            </div>
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-grey-600">Ridge Linear Feet:</span>
                              <span className="result-value font-bold text-grey-800">{results.ridgeLinearFeet} LF</span>
                            </div>
                            <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-grey-300">
                              <span className="result-label font-bold text-primary-600">Total Lumber (with {results.wasteFactor}% waste):</span>
                              <span className="result-value highlight-value font-bold text-primary-600 text-xl">{results.totalLumberLinearFeet} LF</span>
                            </div>
                          </div>
                        </div>

                        {includeSheathing && (
                          <div className="result-section bg-gradient-to-r from-secondary-100 to-secondary-200 p-6 rounded-2xl border border-secondary-300">
                            <h3 className="section-title font-bold text-secondary-800 mb-4 text-lg flex items-center space-x-2">
                              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                              <span>Roof Sheathing</span>
                            </h3>
                            <div className="space-y-3">
                              <div className="result-row flex justify-between items-center">
                                <span className="result-label text-secondary-700">Roof Area:</span>
                                <span className="result-value font-bold text-secondary-800">{results.roofArea} sq ft</span>
                              </div>
                              <div className="result-row highlight-row flex justify-between items-center pt-2 border-t border-secondary-300">
                                <span className="result-label font-bold text-secondary-700">Sheathing Sheets (4x8):</span>
                                <span className="result-value highlight-value font-bold text-secondary-700 text-xl">{results.sheathingSheets} sheets</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Cost Summary */}
                    {(lumberCost > 0 || (includeSheathing && sheathingCost > 0)) && (
                      <div className="result-section bg-gradient-to-r from-success-100 to-success-200 p-6 rounded-2xl border border-success-300">
                        <h3 className="section-title font-bold text-success-800 mb-4 text-lg flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-success-600" />
                          <span>Cost Estimate</span>
                        </h3>
                        <div className="space-y-3">
                          {lumberCost > 0 && (
                            <div className="result-row flex justify-between items-center">
                              <span className="result-label text-success-700">Lumber Cost:</span>
                              <span className="result-value font-bold text-success-800">${results.lumberCostTotal}</span>
                            </div>
                          )}
                          {includeSheathing && sheathingCost > 0 && (
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
                  </div>
                </PrintableResultsWrapper>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-orange p-6 rounded-2xl mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-orange-glow">
                    <Calculator className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-grey-800 mb-2">Ready to Calculate</h3>
                  <p className="text-grey-600">
                    Enter your {framingMode} framing details to see professional material calculations
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-3xl shadow-card-hover border border-grey-300 p-10 relative overflow-hidden">
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
                  <p className="text-grey-600">Select your framing mode: Wall Framing or Roof Framing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <p className="text-grey-600">Enter the dimensions and specifications for your project</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <p className="text-grey-600">Add window and door openings for wall framing calculations</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">4</div>
                  <p className="text-grey-600">Select lumber size, spacing, and include waste factor (10-15% recommended)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">5</div>
                  <p className="text-grey-600">Add material costs for accurate project budgeting</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">6</div>
                  <p className="text-grey-600">Print your results for reference at the lumber yard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}