module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "Oswald",
      },
      fontSize: {
        xxs: "0.5rem",
      },
      colors: {
        default: "#0A1116",
        widget: "#848484",
      },
      screens: {
        pc: "1200px",
      },
    },
  },
  plugins: [],
};
