/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fall-and-disappear": {
          "0%": {
            opacity: "0",
            top: "0",
            left: "0",
            transform: "scale(1)",
          },
          "25%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            top: "-200px",
            transform: "scale(1)",
          },
          "100%": {
            top: "-150px",
            left: "-300px",
            transform: "scale(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
