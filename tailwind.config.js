/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2375D0",
        secondary: "#7CC84E",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
}