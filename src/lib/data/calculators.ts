export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  inputs: CalculatorInput[];
  formula: string;
  units: string[];
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select';
  unit?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  help?: string;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  calculators: string[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: 'construction-and-building',
    name: 'Construction and Building',
    description: 'Essential calculators for construction projects, concrete work, and building materials',
    slug: 'construction-and-building',
    icon: 'Building2',
    calculators: [
      'concrete-slab-calculator',
      'brick-and-block-calculator',
      'drywall-calculator',
      'insulation-calculator',
      'lumber-board-foot-calculator',
      'decking-calculator',
      'framing-material-estimator'
    ]
  },
  {
    id: 'carpentry-and-woodworking',
    name: 'Carpentry and Woodworking',
    description: 'Specialized tools for lumber calculations, framing, and woodworking projects',
    slug: 'carpentry-and-woodworking',
    icon: 'Hammer',
    calculators: [
      'lumber-board-foot-calculator',
      'decking-calculator',
      'stair-calculator',
      'rafter-calculator',
      'fence-calculator'
    ]
  },
  {
    id: 'landscaping-and-outdoor',
    name: 'Landscaping and Outdoor',
    description: 'Calculate materials for landscaping, gardening, and outdoor improvement projects',
    slug: 'landscaping-and-outdoor',
    icon: 'TreePine',
    calculators: [
      'soil-mulch-gravel-calculator',
      'paver-calculator',
      'fence-calculator',
      'grass-seed-calculator',
      'pond-liner-calculator'
    ]
  },
  {
    id: 'painting-and-finishing',
    name: 'Painting and Finishing',
    description: 'Estimate paint coverage, wallpaper needs, and finishing materials',
    slug: 'painting-and-finishing',
    icon: 'Paintbrush2',
    calculators: [
      'paint-coverage-calculator',
      'wallpaper-calculator',
      'tile-calculator',
      'flooring-calculator'
    ]
  },
  {
    id: 'electrical-and-plumbing',
    name: 'Electrical and Plumbing',
    description: 'Basic electrical and plumbing calculations for DIY projects',
    slug: 'electrical-and-plumbing',
    icon: 'Zap',
    calculators: [
      'ohms-law-calculator',
      'wire-gauge-calculator',
      'pipe-volume-calculator',
      'tank-volume-calculator'
    ]
  },
  {
    id: 'conversions-and-math',
    name: 'Conversions and Math',
    description: 'Unit converters and mathematical tools for project planning',
    slug: 'conversions-and-math',
    icon: 'Calculator',
    calculators: [
      'unit-converter',
      'percentage-calculator',
      'ratio-calculator',
      'triangle-calculator'
    ]
  }
];

export const sampleCalculators: Calculator[] = [
  {
    id: 'concrete-slab-calculator',
    name: 'Concrete Slab Calculator',
    description: 'Calculate the amount of concrete needed for slabs, driveways, and foundations',
    category: 'Construction and Building',
    slug: 'concrete-slab-calculator',
    formula: 'Volume = Length × Width × Thickness',
    units: ['cubic yards', 'cubic feet', 'bags'],
    inputs: [
      { id: 'length', label: 'Length', type: 'number', unit: 'ft', required: true, min: 0.1, step: 0.1, help: 'Length of the concrete slab' },
      { id: 'width', label: 'Width', type: 'number', unit: 'ft', required: true, min: 0.1, step: 0.1, help: 'Width of the concrete slab' },
      { id: 'thickness', label: 'Thickness', type: 'number', unit: 'in', required: true, min: 1, step: 0.25, help: 'Thickness of the concrete slab' },
      { id: 'waste', label: 'Waste Factor', type: 'number', unit: '%', required: false, min: 0, max: 50, step: 1, help: 'Additional concrete for waste (typically 5-10%)' }
    ]
  },
  {
    id: 'paint-coverage-calculator',
    name: 'Paint Coverage Calculator',
    description: 'Estimate how much paint you need for walls, ceilings, and rooms',
    category: 'Painting and Finishing',
    slug: 'paint-coverage-calculator',
    formula: 'Coverage = (Total Area - Window/Door Area) ÷ Coverage per Gallon',
    units: ['gallons', 'quarts', 'liters'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', type: 'number', unit: 'ft', required: true, min: 1, step: 0.1 },
      { id: 'roomWidth', label: 'Room Width', type: 'number', unit: 'ft', required: true, min: 1, step: 0.1 },
      { id: 'ceilingHeight', label: 'Ceiling Height', type: 'number', unit: 'ft', required: true, min: 6, step: 0.1 },
      { id: 'doors', label: 'Number of Doors', type: 'number', required: false, min: 0, step: 1 },
      { id: 'windows', label: 'Number of Windows', type: 'number', required: false, min: 0, step: 1 },
      { id: 'coats', label: 'Number of Coats', type: 'number', required: true, min: 1, max: 3, step: 1 }
    ]
  },
  {
    id: 'lumber-board-foot-calculator',
    name: 'Lumber Board Foot Calculator',
    description: 'Calculate board feet for lumber purchases and project planning',
    category: 'Carpentry and Woodworking',
    slug: 'lumber-board-foot-calculator',
    formula: 'Board Feet = (Length × Width × Thickness) ÷ 144',
    units: ['board feet', 'linear feet'],
    inputs: [
      { id: 'length', label: 'Length', type: 'number', unit: 'ft', required: true, min: 1, step: 0.25, help: 'Length of the lumber piece' },
      { id: 'width', label: 'Width', type: 'number', unit: 'in', required: true, min: 1, step: 0.25, help: 'Width of the lumber piece' },
      { id: 'thickness', label: 'Thickness', type: 'number', unit: 'in', required: true, min: 0.25, step: 0.25, help: 'Thickness of the lumber piece' },
      { id: 'quantity', label: 'Quantity', type: 'number', required: true, min: 1, step: 1, help: 'Number of pieces needed' }
    ]
  },
  {
    id: 'soil-mulch-gravel-calculator',
    name: 'Soil, Mulch and Gravel Calculator',
    description: 'Calculate cubic yards of soil, mulch, or gravel needed for landscaping projects',
    category: 'Landscaping and Outdoor',
    slug: 'soil-mulch-gravel-calculator',
    formula: 'Volume = Length × Width × Depth',
    units: ['cubic yards', 'cubic feet', 'bags'],
    inputs: [
      { id: 'length', label: 'Length', type: 'number', unit: 'ft', required: true, min: 0.1, step: 0.1, help: 'Length of the area to cover' },
      { id: 'width', label: 'Width', type: 'number', unit: 'ft', required: true, min: 0.1, step: 0.1, help: 'Width of the area to cover' },
      { id: 'depth', label: 'Depth', type: 'number', unit: 'in', required: true, min: 0.5, step: 0.25, help: 'Desired depth of material' },
      { id: 'materialType', label: 'Material Type', type: 'select', required: true, options: ['Soil', 'Mulch', 'Gravel', 'Sand'], help: 'Type of material being calculated' }
    ]
  },
  {
    id: 'framing-material-estimator',
    name: 'Framing Material Estimator (Walls and Roof)',
    description: 'Comprehensive calculator for wall and roof framing materials including lumber, sheathing, and cost estimates',
    category: 'Construction and Building',
    slug: 'framing-material-estimator',
    formula: 'Material quantities based on framing standards and spacing requirements',
    units: ['linear feet', 'board feet', 'sheets', 'pieces'],
    inputs: [
      { id: 'framingMode', label: 'Framing Mode', type: 'select', required: true, options: ['Wall Framing', 'Roof Framing'], help: 'Select whether you are calculating wall or roof framing materials' },
      { id: 'wallType', label: 'Wall Type', type: 'select', required: false, options: ['Exterior', 'Interior'], help: 'Exterior walls use double top plates and headers for all openings' },
      { id: 'roofType', label: 'Roof Type', type: 'select', required: false, options: ['Gable Roof', 'Hip Roof'], help: 'Type of roof structure being framed' },
      { id: 'length', label: 'Length', type: 'number', unit: 'ft', required: true, min: 1, step: 0.25, help: 'Wall length or building length along ridge' },
      { id: 'width', label: 'Width', type: 'number', unit: 'ft', required: false, min: 1, step: 0.25, help: 'Building width (for roof framing only)' },
      { id: 'height', label: 'Height', type: 'number', unit: 'ft', required: false, min: 6, step: 0.25, help: 'Wall height from floor to top plate' },
      { id: 'studSpacing', label: 'Stud/Rafter Spacing', type: 'select', required: true, options: ['16 inches O.C.', '24 inches O.C.'], help: 'On Center spacing for studs or rafters' },
      { id: 'roofPitch', label: 'Roof Pitch', type: 'select', required: false, options: ['4 in 12', '6 in 12', '8 in 12', '10 in 12', '12 in 12'], help: 'Rise per 12 inches of run' },
      { id: 'overhang', label: 'Overhang Length', type: 'number', unit: 'ft', required: false, min: 0, max: 4, step: 0.25, help: 'Rafter overhang beyond wall line' },
      { id: 'lumberSize', label: 'Lumber Size', type: 'select', required: true, options: ['2x4', '2x6', '2x8', '2x10', '2x12'], help: 'Dimensional lumber size for studs/rafters' },
      { id: 'wasteFactor', label: 'Waste Factor', type: 'number', unit: '%', required: false, min: 0, max: 25, step: 1, help: 'Additional material for waste (typically 10-15%)' },
      { id: 'lumberCost', label: 'Lumber Cost per Linear Foot', type: 'number', unit: '$', required: false, min: 0, step: 0.01, help: 'Cost per linear foot of lumber' },
      { id: 'includeSheathing', label: 'Include Sheathing', type: 'select', required: false, options: ['Yes', 'No'], help: 'Include sheathing material calculations' },
      { id: 'sheathingType', label: 'Sheathing Type', type: 'select', required: false, options: ['OSB', 'Plywood'], help: 'Type of sheathing material' },
      { id: 'sheathingThickness', label: 'Sheathing Thickness', type: 'select', required: false, options: ['1/2 inch', '5/8 inch', '3/4 inch'], help: 'Thickness of sheathing panels' },
      { id: 'sheathingCost', label: 'Sheathing Cost per Sheet', type: 'number', unit: '$', required: false, min: 0, step: 0.01, help: 'Cost per 4x8 sheet of sheathing' }
    ]
  }
];