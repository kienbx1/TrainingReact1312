// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '414px',
        xml: '1300px'
      },
      boxShadow: {
        blueShadow: '0 8px 16px 0 rgb(53 119 240 / 30%)',
        redShadow: '0 8px 16px 0 rgb(255 73 124 / 40%)',
        '3xl': '0 2px 10px 0 rgb(0 0 0 / 10%)',
        '4xl': '6px 6px 12px 0px #00000054;'
      },
      colors: {
        'orange-primary': '#f9f3f0',
        'dot-active': '#ff497c'
      },
      backgroundImage: {
        'img-newsletter': "url('/Images/banner_newsletter.jpg')",
        'img-login': "url('/Images/banner_login.webp')",
        'img-register': "url('/Images/banner_register.webp')",
        'img-forget-password': "url('/Images/banner_forget.webp')"
      }
    }
  },
  plugins: []
}
