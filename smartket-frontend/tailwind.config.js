/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xl: { max: '1535px' },
      lg: { max: '1279px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
      xs: { max: '575px' },
    },
    extend: {
      colors: {
        primary: '',
        secondary: '',
        background: '#242424',
      },
      fontFamily: {
        urbanist: 'Urbanist',
      },
    },
  },
  plugins: [],
}
