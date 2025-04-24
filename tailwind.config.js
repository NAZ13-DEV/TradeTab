/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 0px #3b82f6' }, // Tailwind blue-500
          '50%': { boxShadow: '0 0 12px #3b82f6' },
        },
      },
      animation: {
        glow: 'glow 1s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindScrollbar],
}

