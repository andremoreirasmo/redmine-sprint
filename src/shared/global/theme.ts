import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00AB55',
    },
    secondary: {
      main: '#147874',
    },
  },
  shape: {
    borderRadius: 14,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 8,
      },
    },
    MuiTypography: {
      h5: {
        fontWeight: 700,
      },
    },
  },
});

export default theme;