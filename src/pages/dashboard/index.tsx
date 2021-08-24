import { useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import routes from "./routes";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

import useStyles from "./styles";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const pathActive = useSelector(
    (state: RootState) => state.router.location.pathname
  );

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
          >
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
          {routes
            .filter((route) => !route.isSetting)
            .map((route) => (
              <NavLink
                to={route.path}
                className={classes.link}
                key={route.caption}
              >
                <ListItem
                  button
                  key={route.caption}
                  className={clsx(classes.menu, {
                    [classes.menuActive]: route.path === pathActive,
                  })}
                >
                  <ListItemIcon
                    className={clsx({
                      [classes.menuItemIconActive]: route.path === pathActive,
                    })}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.caption} />
                </ListItem>
              </NavLink>
            ))}
        </List>
        <Divider />
        <List>
          {routes
            .filter((route) => route.isSetting)
            .map((route) => (
              <NavLink
                to={route.path}
                className={classes.link}
                key={route.caption}
              >
                <ListItem
                  button
                  key={route.caption}
                  className={clsx(classes.menu, {
                    [classes.menuActive]: route.path === pathActive,
                  })}
                >
                  <ListItemIcon
                    className={clsx({
                      [classes.menuItemIconActive]: route.path === pathActive,
                    })}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.caption} />
                </ListItem>
              </NavLink>
            ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} exact={route.exact} key={route.caption}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </main>
    </div>
  );
}
