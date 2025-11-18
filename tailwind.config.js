/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        'custom-h1': '#3b82f6', // blue-500
        'custom-p': '#60a5fa', // blue-400
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

