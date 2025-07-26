/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,jsx}", "./src/**/*.{html,jsx}", "./index.html",],
  theme: {
    extend: {
      colors: {
        "black": "#333333",
        "white": "#f6f4f0",
        "gold": "#d0a95d",
        "green": "#86896B",
        "purple": "#94aad2",
        "red" : "#FF2800",
        "gunmetal": "#292e38"
      }
    },
  },
  plugins: [],
}

