/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'bedar-sc1': '768px',
        'bedar-sc2': '640px',
      }
    },
  },
  plugins: [],
}