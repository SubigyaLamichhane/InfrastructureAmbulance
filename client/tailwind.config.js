/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.{js,jsx,tsx,ts,html}', './*/*.html'],
  theme: {
    extend: {
      fontSize: {
        main: '10rem',
        defualt: '3rem',
        larger: '4rem',
      },
      color: {
        placeholder: '#605D5D',
      },
      borderRadius: {
        standard: '15px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
