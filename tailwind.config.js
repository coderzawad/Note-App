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
          primary: 'rgb(166, 147, 94)',
          secondary: 'rgb(180, 166, 121)',
          tertiary: 'rgb(208, 184, 144)',
          accent: 'rgb(142, 88, 41)',
          dark: 'rgb(96, 61, 46)',
        }
      }
    },
  },
  plugins: [],
}