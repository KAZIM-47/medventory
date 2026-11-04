/**
 * Medventory Official Design System Tokens
 * Strictly follows the official color identity:
 * - Primary Palette: Tea Green + Celadon
 * - Complementary: Deep Forest Green (#183B32)
 * - Neutrals: Application BG (#F7FAF5), Card BG (#FFFFFF), Body (#34423A), Borders (#E2EBDD)
 */

export const THEME = {
  colors: {
    primary: {
      tea100: '#D7FCD4',
      tea200: '#CFF0C8',
      tea300: '#C7E4BB',
      celadon100: '#BFD8AE',
      celadon200: '#BBD2A8',
      celadon300: '#B6CCA1',
    },
    complementary: {
      forest: '#183B32',
      forestHover: '#112B24',
      forestLight: '#235246',
    },
    neutral: {
      appBg: '#F7FAF5',
      cardBg: '#FFFFFF',
      bodyText: '#34423A',
      mutedText: '#5A6F63',
      border: '#E2EBDD',
      subtleHover: '#EEF6EC',
    },
    semantic: {
      warningBg: '#FEF3C7',
      warningText: '#78350F',
      warningBorder: '#FDE68A',
      dangerBg: '#FEE2E2',
      dangerText: '#991B1B',
      dangerBorder: '#FECACA',
      successBg: '#D7FCD4',
      successText: '#183B32',
      successBorder: '#B6CCA1',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    card: '0 1px 3px 0 rgba(24, 59, 50, 0.05), 0 1px 2px -1px rgba(24, 59, 50, 0.05)',
    cardHover: '0 4px 6px -1px rgba(24, 59, 50, 0.08), 0 2px 4px -2px rgba(24, 59, 50, 0.05)',
  },
};

