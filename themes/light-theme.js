import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E1E1E'
    },
    secondary: {
      // main: '#3A64D8'
      main: "#fd751a"
    },
    info: {
      main: '#fff'
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info'
      },
      styleOverrides: {
        root: {
					textTransform: 'none',
					boxShadow: 'none',
					borderRadius: 10,
          color: 'white'
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
  }
});