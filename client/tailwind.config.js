/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Gold
        secondary: '#000000', // Black
        accent: '#FFFFFF', // White
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
