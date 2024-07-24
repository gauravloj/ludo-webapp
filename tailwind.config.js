/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 15 column grid
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
