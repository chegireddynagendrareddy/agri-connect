/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f4ed',
          200: '#e7dfd1',
          300: '#d5c6af',
          400: '#bfa787',
          500: '#a88965',
          600: '#8c6b4b',
          700: '#70523a',
          800: '#5c4230',
          900: '#4c3729',
          950: '#2a1d15',
        },
        accent: {
          amber: '#f59e0b',
          orange: '#ea580c',
          terracotta: '#c2410c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      boxShadow: {
        'agri-soft': '0 4px 20px -2px rgba(22, 101, 52, 0.08)',
        'agri-glow': '0 0 25px rgba(34, 197, 94, 0.25)',
        'agri-card': '0 10px 30px -5px rgba(20, 83, 45, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
