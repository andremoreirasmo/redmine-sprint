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
      },
    },    
    // MuiMenuItem: {
    //   root: {
    //     fontSize: "0.875rem",
    //   },
    // },
  },
});

export default theme;
