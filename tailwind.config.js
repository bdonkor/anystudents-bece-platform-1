/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#334155',
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#010409',
        },
        forest: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#334155',
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#010409',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f5b400',
          600: '#d97706',
        },
        ink: '#1a1a2e',
        cream: '#fffdf7',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245,180,0,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(245,180,0,0)' },
        }
      }
    },
  },
  plugins: [],
}
