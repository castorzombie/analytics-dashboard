/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a', // dark blue
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#0f172a', // very dark blue
          foreground: '#e0e7ef',
        },
        // Add more as needed
      },
    },
  },
  plugins: [],
}
