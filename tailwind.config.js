/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        DotGothic16: ['DotGothic16', 'sans-serif'],
        courrierPrime: ['Courier Prime', 'monospace'],
      },
    },
  },
  plugins: [],
};
