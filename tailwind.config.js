/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offBlack: "#313131",
        darkLime: "#7CB305",
        orochimaru: "#D9D9D9",
        linkColor: "#1890FF",
        grayColor: "#FAFAFA",
        titleColor: "#000000D9",
        buttonColor: "#08979C"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
