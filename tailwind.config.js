/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,jsx,ts,tsx,css}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Rubik"],
      },

      colors: {
        primary: {
          green: "#5BC79B",
          blue: "#0D1B3B",
          "blue-light": "#1977F3",
        },
      },
    },
  },
  plugins: [],
};
