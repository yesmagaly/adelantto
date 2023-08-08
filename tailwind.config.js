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
        },
      },
    },
  },
  plugins: [],
};
