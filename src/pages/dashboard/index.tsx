import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

import ListSubheader from "@material-ui/core/ListSubheader";
import Radio from "@material-ui/core/Radio";

import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ListItemLink from "../../components/ListItemLink";
import { RootState } from "../../store";
import routes from "./routes";
import useStyles from "./styles";

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pathActive = useSelector(
    (state: RootState) => state.router.location.pathname
  );

  const openIcon = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDrawer = () => {
    console.log("drawer is open");
    setOpen(!open);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <IconButton
              edge="end"
              aria-haspopup="true"
              onClick={handleClick}
              color="default"
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Popover
              id={id}
              open={openIcon}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box className={classes.popOverUser}>
                <Box className={classes.boxInfoUser}>
                  <Typography variant="subtitle1">Minimal UI</Typography>
                  <Typography variant="body2" color="textSecondary">
                    demo@minimals.cc
                  </Typography>
                </Box>
                <Divider />
                <List>
                  <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                  <ListItemLink
                    to="/"
                    primary="Profile"
                    icon={<PersonIcon />}
                  />
                  <ListItemLink
                    to="/"
                    primary="Settings"
                    icon={<SettingsIcon />}
                  />
                </List>
                <Box className={classes.boxButtonLogout}>
                  <Button fullWidth size="medium" variant="outlined">
                    Logout
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paperDrawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Radio
            checked={open}
            onClick={handleDrawer}
          />
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListSubheader className={classes.listSubheader}>Geral</ListSubheader>
          {routes
            .filter((route) => !route.isSetting)
            .map((route) => (
              <ListItemLink
                to={route.path}
                primary={route.caption}
                icon={route.icon}
                classNameItem={clsx(classes.menu, {
                  [classes.menuActive]: route.path === pathActive,
                })}
              />
            ))}
        </List>
        <ListSubheader className={classes.listSubheader}>Gestão</ListSubheader>
        <List>
          {routes
            .filter((route) => route.isSetting)
            .map((route) => (
              <ListItemLink
                to={route.path}
                primary={route.caption}
                icon={route.icon}
                classNameItem={clsx(classes.menu, {
                  [classes.menuActive]: route.path === pathActive,
                })}
              />
            ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
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
