import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
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
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menu: {
      borderRight: "4px solid transparent",
    },
    menuActive: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      borderRightColor: theme.palette.primary.main,
      color: theme.palette.primary.main,      
    },
    menuItemIconActive: {
      color: theme.palette.primary.main,
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
  })
);

export default useStyles;
