// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '414px'
      },
      boxShadow: {
        '3xl': '0 2px 10px 0 rgb(0 0 0 / 10%)'
      },
      colors: {
        'orange-primary': '#f9f3f0'
      }
    }
  },
  plugins: []
}
