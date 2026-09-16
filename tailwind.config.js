/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        app: {
          bg: '#1C1C1E',
          surface: '#F4F5F8',
          accent: '#C3B8FF',
          accentHover: '#A899FF',
          lime: '#D4F670',
          darkCard: '#2A2A2A',
          text: '#111111',
          textMuted: '#666666'
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
