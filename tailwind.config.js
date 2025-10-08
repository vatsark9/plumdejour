/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        'primary-dark': '#7c3aed',
        secondary: '#ec4899',
        accent: '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float-bg': 'float-bg 25s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)',
          },
        },
        'float-bg': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
      },
    },
  },
  plugins: [],
}