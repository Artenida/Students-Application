/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          playfairDisplay: [ 'Playfair Display', 'serif']
        } ,
        colors: {
          custom: {
            'color1': '#f7faff ',
            'color2': '#bbd4fa ',
            'color3': '#6487bd ',
            'color4': '#143a4e ',
            'color5': '#D17B3C ',
          },
        },
      },
      screens: {
        xs: '480px',
        sm: '768px',
        md: '1060px',
      }
    },
    plugins: [],
  }
  
  