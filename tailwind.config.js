const defaultTheme = require('tailwindcss/defaultTheme')

const colors = {
  'cerulean-crayola': '#00b4d8',
  'star-command-blue': '#0077b6',
  'sky-blue-crayola': '#90e0ef',
  'powder-blue': '#caf0f8',
  'carribean-green': '#06d6a0',
  'oxford-blue': '#001b2e',
  slate: '#496179',
  'sweet-pink': '#ef476f',
  yangtze: '#ffd166',
}

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
        'brand-primary': colors['cerulean-crayola'],
        'brand-secondary': colors['star-command-blue'],
        'brand-tertiary': colors['slate'],
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
