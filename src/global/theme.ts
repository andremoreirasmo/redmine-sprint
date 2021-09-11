import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {     
      main: "#00AB55",
    },
    secondary: {
      main: "#147874",
    },
  },
  shape: {
    borderRadius: 14,
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: "none",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 8,
      },
    },
  },
});

export default theme;
