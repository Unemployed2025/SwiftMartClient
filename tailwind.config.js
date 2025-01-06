/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'myfont': ['kanit', 'Spectral', 'Arial', 'sans-serif'],
      'robotofont': ['Roboto']
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
    plugins: [
        flowbite.plugin(),
    ],
  }
}