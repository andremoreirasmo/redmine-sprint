import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - 102px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: alpha(theme.palette.background.default, 0.5),
      backdropFilter: "blur(6px)",
      boxShadow: "none",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",      
    },
    paperDrawer: {
      backgroundColor: 'inherit',
      backdropFilter: "blur(16px)",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",      
    },
    drawerClosed: {      
      width: 90,      
    },
    listSubheader: {
      color: theme.palette.text.primary,
      textTransform: "uppercase",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    contentDrawerClose: {
      marginLeft: 92,
    },
    content: {      
      paddingTop: 116,
      paddingBottom: 80,
      paddingLeft: 16,
      paddingRight: 16,
    },
    menu: {
      borderRight: "4px solid transparent",
    },
    menuActive: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      borderRightColor: theme.palette.primary.main,
      color: theme.palette.primary.main,      
    },
    menuIcon: {
      justifyContent: "center",
    },
    popOverUser: {
      minWidth: "218px",
      borderRadius: 20,
    },
    boxInfoUser: {
      marginTop: "12px",
      marginBottom: "12px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    boxButtonLogout: {
      padding: "0px 16px 16px",
    },
    hide: {
      display: 'none',
    }
  })
);

export default useStyles;
