module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      scale:['focus-within'],
      padding: ['responsive', 'last', 'first', 'hover', 'focus', 'active', 'group-hover'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),('@tailwindcss/forms')],
}
