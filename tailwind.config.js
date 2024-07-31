/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 15 column grid
        15: "repeat(15, minmax(0, 1fr))",
      },
      rotate: {
        135: "135deg",
        225: "225deg",
        270: "270deg",
        315: "315deg",
      },
    },
  },
  plugins: [],
};
