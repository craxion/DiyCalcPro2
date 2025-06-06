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
      'insulation-calculator'
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
      'rafter-calculator'
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
      'grass-seed-calculator'
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
  }
];