import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sprints from './sprints';
import Settings from './settings';

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
import PollIcon from '@material-ui/icons/Poll';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import GroupIcon from '@material-ui/icons/Group';

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
    }
  }),
);

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
          <Toolbar className={clsx(classes.appBar, {[classes.appBarShift]: open, })}> 
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
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon><PollIcon /></ListItemIcon>
                <ListItemText primary={"Sprints"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>                    
            <ListItem button>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary={"Equipes"} />
            </ListItem>         
            <Link to="settings" className={classes.link}>
              <ListItem button>
                <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>              
                  <ListItemText primary={"Configurações"} />
              </ListItem>
            </Link>              
          </List>
        </Drawer>
        <main className={classes.content}>            
          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Sprints />
            </Route>
          </Switch>         
        </main>
      </div>
    </Router>   
  );
}
