import {
  AppBar,
  Box,
  Button,
  Container,
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
  const [openFixedDrawer, setOpenFixedDrawer] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pathActive = useSelector(
    (state: RootState) => state.router.location.pathname
  );

  const openIcon = Boolean(anchorEl);
  const id = openIcon ? "simple-popover" : undefined;

  const handleDrawer = () => {
    setOpenFixedDrawer(!openFixedDrawer);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerIsVisible = () => {
    return showDrawer || openFixedDrawer;
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openFixedDrawer,
        })}
      >
        <Toolbar>
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
        className={clsx({
          [classes.drawerOpen]: openFixedDrawer,
          [classes.drawerClose]: !openFixedDrawer,
        })}
        classes={{
          paper: clsx(classes.paperDrawer, {
            [classes.drawerOpen]: drawerIsVisible(),
            [classes.drawerClose]: !drawerIsVisible(),
            [classes.drawerClosed]: !drawerIsVisible(),
          }),
        }}
        onMouseOver={() => setShowDrawer(!showDrawer)}
        onMouseOut={() => setShowDrawer(!showDrawer)}
      >
        <div className={classes.toolbar}>
          <Typography>RDSP</Typography>
          <Radio
            checked={openFixedDrawer}
            onClick={handleDrawer}
            className={clsx({
              [classes.hide]: !drawerIsVisible(),
            })}
          />
        </div>
        <List>
          <ListSubheader
            className={clsx(classes.listSubheader, {
              [classes.hide]: !drawerIsVisible(),
            })}
          >
            Geral
          </ListSubheader>
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
                classNameIcon={classes.menuIcon}
                showText={drawerIsVisible()}
              />
            ))}
        </List>
        <ListSubheader
          className={clsx(classes.listSubheader, {
            [classes.hide]: !drawerIsVisible(),
          })}
        >
          Gestão
        </ListSubheader>
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
                classNameIcon={classes.menuIcon}
                showText={drawerIsVisible()}
              />
            ))}
        </List>
      </Drawer>
      <Container className={classes.content} maxWidth="xl">
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} exact={route.exact} key={route.caption}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Container>
    </div>
  );
}
