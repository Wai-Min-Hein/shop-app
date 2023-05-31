/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'header': ['Roboto', 'sans-serif'],
      'para': ['Roboto Slab', 'sans-serif'],
      
    },
    extend: {
      colors: {
        'primary': "#0a66c2",
        'bg': "#fffffe",
        'bg-second': "#f3f3f3",
        'bg-cart': '#e7e7e7',
        'header': "#181818",
        'para': "#2e2e2e",
        'btn': "#4fc4cf",
        "btn-text": "#181818",
        'icon': '#010204',
        'nav': '#e3f6f8'
      },
      backgroundImage: {
        'black': 'linear-gradient(rgba(15, 14, 23, 0.5), rgba(15, 14, 23, 0.5))',


        'background': ' linear-gradient(3deg, rgb(237,242,244),rgb(247,237,226));'
        
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1537px',
      // => @media (min-width: 1537px) { ... }
    }
  },
  plugins: [],
}

