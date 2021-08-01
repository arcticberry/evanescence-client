const defaultTheme = require('tailwindcss/defaultTheme')
const {brand, colors} = require('./src/config/palette.js')

module.exports = {
  purge: [
    './src/components/**/*.{js,jsx}',
    './src/screens/**/*.{js,jsx}',
    './public/index.html',
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        ...brand,
        ...colors,
      },
      borderRadius: (theme) => ({
        2: theme('spacing.2'),
        4: theme('spacing.4'),
      }),
      inset: (theme) => ({
        2: theme('spacing.2'),
      }),
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
      },
    },
  },
  // plugins: [require('@zendeskgarden/tailwindcss')]
}
