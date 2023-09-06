/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#fafafa',
        'custom-dark-grey': '#999999'
      }
    },
  },
  plugins: [],
}
