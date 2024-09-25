export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'island-moments': ['"Island Moments"', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}