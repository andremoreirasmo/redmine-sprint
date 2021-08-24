import React, { useState }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Location } from 'history';

import routes from "./routes";

import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
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
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,  
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    link: { 
      textDecoration: 'none',
      color: 'inherit',
    },
    menu: {
      borderLeft: '4px solid transparent',      
    },
    menuActive: {
      borderLeftColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    menuItemIconActive: {        
      color: theme.palette.primary.main,
    }
  }),
);

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pathActive, setPathActive] = useState('');

  const handleDrawer = () => {
    setOpen(!open);
  };
  
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar className={clsx(classes.appBar, {[classes.appBarShift]: open})}> 
              <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawer} edge="start" >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap>
                Redmine Sprint
              </Typography>                  
          </Toolbar>        
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >        
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {routes.filter(route => !route.isSetting).map(route => (
              <NavLink to={route.path} className={classes.link} key={route.caption} isActive={(_, location: Location<any>) => {
                if (location.pathname !== pathActive) {
                  setPathActive(location.pathname);
                }
                
                return true;
              }}>
                <ListItem button key={route.caption}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.caption} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {routes.filter(route => route.isSetting).map(route => (
              <NavLink to={route.path} className={classes.link} key={route.caption}>
                <ListItem button key={route.caption} className={clsx(classes.menu, {[classes.menuActive]: route.path === pathActive})}>
                  <ListItemIcon className={clsx({[classes.menuItemIconActive]: route.path === pathActive})}>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.caption} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>            
          <Switch>
            {routes.map(route => (
              <Route path={route.path} exact={route.exact} key={route.caption}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </main>
      </div>
    </Router>   
  );
}
