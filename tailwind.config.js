export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shade: {
          900: "#151316",
          800: "#D5D5D7",
          700: "#DEDEE0",
          600: "#E8E7EA",
          500: "#EEEDF0",
          400: "#F6F5F8",
          300: "#FFFFFF",
        },
        orange: "#F37022",
        blue: "#0066B1",
        error: "#D73535",
      },
      fontFamily: {
        "medium-cereal": ["MediumCereal"],
        "black-cereal": ["BlackCereal"],
        "bold-cereal": ["BoldCereal"],
        "book-cereal": ["BookCereal"],
        "extra-bold-cereal": ["ExtraBoldCereal"],
        "light-cereal": ["LightCereal"],
        'island-moments': ['"Island Moments"', 'cursive'],
      },
      fontSize: {
        xxs: ["7px", { lineHeight: "10px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "normal" }],
        "6xl": ["60px", { lineHeight: "normal" }],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}