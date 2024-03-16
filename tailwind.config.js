// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{html, js, tsx, jsx, ts}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

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