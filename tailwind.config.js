/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notes: {
          primary: '#3B82F6',    // Bright blue
          secondary: '#60A5FA',  // Light blue
          tertiary: '#93C5FD',   // Lighter blue
          accent: '#1D4ED8',     // Dark blue
          dark: '#1E3A8A',       // Navy blue
        }
      }
    },
  },
  plugins: [],
}