import {css} from 'styled-components'

const brand = {
  700: '#00B4D8',
}

const themeCreator = (parentTheme) => ({
  ...parentTheme,
  components: {
    'accordions.header': css`
      border-bottom: ${(p) =>
        `${p.theme.borderWidths.sm} ${p.theme.borderStyles.solid} ${p.theme.palette.brand[700]}`};
    `,
    'accordions.rotate_icon': css`
      width: 24px;
      height: 24px;
    `,
    'accordions.button': css`
      color: ${(p) => p.theme.palette.brand[700]};
      font-weight: 400;

      &:focus {
        outline: none;
      }
    `,
    'forms.input': css`
      font-weight: ${(p) => p.theme.fontWeights.medium};
    `,
    'forms.checkbox_label': css`
      font-weight: 400;

      &::before {
        content: '';
        border-color: ${(p) => p.theme.palette.brand[700]};
      }
    `,
    'accordions.panel': css``,
  },
  palette: {
    ...parentTheme.palette,
    brand,
  },
  borderRadii: {
    ...parentTheme.borderRadii,
    md: '0',
  },
  colors: {
    ...parentTheme.colors,
    primaryHue: 'brand',
  },
})

export default themeCreator
