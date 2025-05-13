/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      colors: {
        blue: {
          900: '#1E3A8A', // Primary color
          800: '#1E40AF',
          700: '#1D4ED8',
          600: '#2563EB',
          500: '#3B82F6',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        teal: {
          600: '#0F766E', // Secondary color
          500: '#14B8A6',
          100: '#CCFBF1',
          50: '#F0FDFA',
        },
        yellow: {
          600: '#D97706', // Accent color
          500: '#F59E0B',
          400: '#FBBF24',
          100: '#FEF3C7',
          50: '#FFFBEB',
        },
      },
    },
  },
  plugins: [],
};