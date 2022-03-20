import { createTheme } from '@material-ui/core/styles';

const GetTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00AB55',
      },
      secondary: {
        main: '#147874',
      },
    },
    shape: {
      borderRadius: 8,
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

export default GetTheme;
