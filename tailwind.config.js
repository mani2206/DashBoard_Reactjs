/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navyBlue: "#151357",
        darkBlue: "#0d0b45",
        textPurple: "#5e5adb",
        highLight: "#e3e3f9",
      },
      borderWidth: {
        DEFAULT: "0.1px",
      },
    },
  },
  plugins: [],
};
