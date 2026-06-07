/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceBlack: '#0B1020',
        darkNavy: '#111827',
        slateGray: '#1F2937',
        neonCyan: '#00F0FF',
        neonGreen: '#39FF14',
        neonYellow: '#FFD700',
        neonRed: '#FF003C',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
