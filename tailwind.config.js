/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF2800',
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc7c7',
          300: '#ffa3a3',
          400: '#ff6b6b',
          500: '#FF2800',
          600: '#e61e00',
          700: '#c21800',
          800: '#9e1400',
          900: '#7a1000',
        },
        text: {
          primary: '#162137',
          secondary: '#292e38',
        },
        gray: {
          disabled: '#9ca3af',
        }
      },
    },
  },
  plugins: [],
} 