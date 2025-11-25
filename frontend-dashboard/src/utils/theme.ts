import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

// FIXME: Theme is not working correctly for DatePicker components

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2c4e',
      contrastText: '#e3e4df',
    },
    secondary: {
      main: '#e09e40',
      contrastText: '#1f2c4e',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#fafafa',
    },
  },
  components: {
    MuiDatePicker: {
      defaultProps: {
        displayWeekNumber: true,
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#e3e4df',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e3e4df',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e3e4df',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e3e4df',
          },
        },
        input: {
          color: '#e3e4df',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#e3e4df', // light grey label
          '&.Mui-focused': {
            color: '#e3e4df', // light grey when focused
          },
        },
      },
    },
  },
});

export default theme;
