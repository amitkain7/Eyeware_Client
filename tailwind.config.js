/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height : {
         30 : '10rem',
         1: '2px'
      },
      flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
}