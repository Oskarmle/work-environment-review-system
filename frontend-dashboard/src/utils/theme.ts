// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2c4e',
      contrastText: '#e3e4df',
    },
    secondary: {
      main: '#e09e40',
      contrastText: '#ffffff',
    },
    tertiary: { main: '#e3e4df' },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#fafafa',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

export default theme;
