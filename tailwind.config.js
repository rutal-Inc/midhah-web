/** @type {import('tailwindcss').Config} */
const Color = require("color");

const lighten = (color, val) =>
  Color(color).mix(Color("white"), val).rgb().string();
const darken = (color, val) =>
  Color(color).mix(Color("black"), val).rgb().string();

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#256279",
          light: lighten("#256279", 0.2),
          dark: darken("#256279", 0.2),
        },
        secondary: {
          DEFAULT: "#1C8EB0",
          light: lighten("#1C8EB0", 0.2),
          dark: darken("#1C8EB0", 0.2),
        },
        tertiary: {
          DEFAULT: "#247C99",
          light: lighten("#247C99", 0.2),
          dark: darken("#247C99", 0.2),
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
