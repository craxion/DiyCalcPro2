/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Traffic Cone Orange & Greys Theme
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6600', // Primary Traffic Cone Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#fff9f5',
          100: '#fff2e6',
          200: '#ffe0cc',
          300: '#ffccb3',
          400: '#ffb899',
          500: '#FFAA66', // Secondary Accent Orange
          600: '#ff9933',
          700: '#e6751a',
          800: '#cc5200',
          900: '#b33d00',
        },
        grey: {
          50: '#FFFFFF', // White highlights
          100: '#F8F8F8', // Lightest grey
          200: '#EFEFEF', // Light grey backgrounds
          300: '#E0E0E0', // Subtle borders
          400: '#BDBDBD', // Medium-light grey
          500: '#9E9E9E', // Medium grey
          600: '#6B6B6B', // Medium grey (secondary text/borders)
          700: '#424242', // Dark grey
          800: '#2C2C2C', // Darkest grey (primary text/backgrounds)
          900: '#1A1A1A', // Deepest grey
        },
        // Semantic colors using the theme
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'pulse-orange': 'pulseOrange 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 102, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 102, 0, 0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 102, 0, 0.2), 0 0 10px rgba(255, 102, 0, 0.2), 0 0 15px rgba(255, 102, 0, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(255, 102, 0, 0.4), 0 0 20px rgba(255, 102, 0, 0.4), 0 0 30px rgba(255, 102, 0, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(255, 102, 0, 0.3)',
        'orange-glow-lg': '0 0 30px rgba(255, 102, 0, 0.4)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)',
        'card-active': '0 15px 35px rgba(0, 0, 0, 0.15), 0 6px 15px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6600 0%, #FFAA66 100%)',
        'gradient-grey': 'linear-gradient(135deg, #2C2C2C 0%, #424242 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #EFEFEF 0%, #F8F8F8 100%)',
      }
    },
  },
  plugins: [],
  safelist: [
    // Ensure all custom classes are included in the build
    'bg-gradient-orange',
    'bg-gradient-grey', 
    'bg-gradient-subtle',
    'shadow-orange-glow',
    'shadow-orange-glow-lg',
    'shadow-card-hover',
    'shadow-card-active',
    'animate-float',
    'animate-glow',
    'animate-pulse-orange',
    'animate-bounce-subtle',
    'animate-slide-up',
    'animate-fade-in',
    'animate-scale-in',
    // All grey colors
    'bg-grey-50', 'bg-grey-100', 'bg-grey-200', 'bg-grey-300', 'bg-grey-400', 'bg-grey-500', 'bg-grey-600', 'bg-grey-700', 'bg-grey-800', 'bg-grey-900',
    'text-grey-50', 'text-grey-100', 'text-grey-200', 'text-grey-300', 'text-grey-400', 'text-grey-500', 'text-grey-600', 'text-grey-700', 'text-grey-800', 'text-grey-900',
    'border-grey-50', 'border-grey-100', 'border-grey-200', 'border-grey-300', 'border-grey-400', 'border-grey-500', 'border-grey-600', 'border-grey-700', 'border-grey-800', 'border-grey-900',
    // All primary colors
    'bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900',
    'text-primary-50', 'text-primary-100', 'text-primary-200', 'text-primary-300', 'text-primary-400', 'text-primary-500', 'text-primary-600', 'text-primary-700', 'text-primary-800', 'text-primary-900',
    'border-primary-50', 'border-primary-100', 'border-primary-200', 'border-primary-300', 'border-primary-400', 'border-primary-500', 'border-primary-600', 'border-primary-700', 'border-primary-800', 'border-primary-900',
    // All secondary colors
    'bg-secondary-50', 'bg-secondary-100', 'bg-secondary-200', 'bg-secondary-300', 'bg-secondary-400', 'bg-secondary-500', 'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-800', 'bg-secondary-900',
    'text-secondary-50', 'text-secondary-100', 'text-secondary-200', 'text-secondary-300', 'text-secondary-400', 'text-secondary-500', 'text-secondary-600', 'text-secondary-700', 'text-secondary-800', 'text-secondary-900',
    'border-secondary-50', 'border-secondary-100', 'border-secondary-200', 'border-secondary-300', 'border-secondary-400', 'border-secondary-500', 'border-secondary-600', 'border-secondary-700', 'border-secondary-800', 'border-secondary-900',
  ]
};