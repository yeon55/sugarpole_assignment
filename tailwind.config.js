/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundColor: (theme) => ({
      ...theme("colors"),
      button: "#0F62FE",
    }),
  },
  plugins: [],
};
