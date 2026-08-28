/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F4ECE0',
          300: '#EBDCC8',
          400: '#DFC8AC',
          500: '#D1B28C',
          900: '#2A2118',
        },
        rosegold: {
          50: '#FAF5F3',
          100: '#F5EBE6',
          200: '#EBD5CB',
          300: '#DEBAAC',
          400: '#CF9D8B',
          500: '#B87D65', // Signature Royal Rose Gold
          600: '#A46650',
          700: '#8A503D',
          800: '#714031',
          900: '#5D362B',
        },
        burgundy: {
          50: '#F9F1F2',
          100: '#F3E1E4',
          200: '#E7C5CB',
          300: '#D59EAA',
          400: '#BE7083',
          500: '#A5495E',
          600: '#8B3448',
          700: '#722638',
          800: '#5C202E',
          900: '#4A121A', // Signature Deep Burgundy Wine
          950: '#2C060D',
        },
        heritage: {
          gold: '#C5A059',
          darkgold: '#9A7B38',
          charcoal: '#1A1817',
          ink: '#121110',
          cream: '#FAF8F5',
          warmgray: '#78716C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        bengali: ['"Noto Serif Bengali"', '"Hind Siliguri"', 'serif'],
      },
      backgroundImage: {
        'rosegold-gradient': 'linear-gradient(135deg, #DEBAAC 0%, #B87D65 50%, #8A503D 100%)',
        'rosegold-light': 'linear-gradient(135deg, #F5EBE6 0%, #EBD5CB 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #4A121A 0%, #2C060D 100%)',
        'parchment-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #FAF6EF 100%)',
      },
      boxShadow: {
        'royal': '0 20px 40px -15px rgba(74, 18, 26, 0.07), 0 0 15px rgba(184, 125, 101, 0.08)',
        'royal-lg': '0 30px 60px -15px rgba(74, 18, 26, 0.12), 0 0 25px rgba(184, 125, 101, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(184, 125, 101, 0.1)',
      }
    },
  },
  plugins: [],
}
