/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        'rose-gold': 'hsl(var(--rose-gold))',
        'warm-gold': 'hsl(var(--warm-gold))',
        'matte-red': 'hsl(var(--matte-red))',
        'navy': 'hsl(var(--navy))',
        'navy-deep': 'hsl(var(--navy-deep))',
        'ivory': 'hsl(var(--ivory))',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Karla', 'Helvetica Neue', 'sans-serif'],
        bengali: ['"Noto Serif Bengali"', '"Hind Siliguri"', 'serif'],
      },
      backgroundImage: {
        'gradient-heritage': 'linear-gradient(135deg, hsl(var(--navy)), hsl(var(--navy-deep)))',
        'gradient-gold': 'linear-gradient(135deg, hsl(var(--warm-gold)), hsl(var(--rose-gold)))',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'royal': '0 20px 40px -15px rgba(22, 26, 38, 0.15)',
      }
    },
  },
  plugins: [],
}
