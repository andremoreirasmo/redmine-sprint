import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import Radio from "@material-ui/core/Radio";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ListItemLink from "../../components/ListItemLink";
import { RootState } from "../../store";
import routes from "./routes";
import {
  Content,
  HeaderAppBar,
  ListItemSidebar,
  PopOverUser,
  Root,
  SideBar,
  ToolbarSidebar,
  Logo,
} from "./styles";

import LogoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../store/auth.store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [openFixedDrawer, setOpenFixedDrawer] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const pathActive = useSelector(
    (state: RootState) => state.router.location.pathname
  );
  const userAuth = useAuth();

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

  const drawerWidthMin = 90;
  const drawerWidthMax = 280;
  const getDrawerWidth = () => {
    return drawerIsVisible() ? drawerWidthMax : drawerWidthMin;
  };

  return (
    <Root>
      <HeaderAppBar
        $drawerWidth={getDrawerWidth()}
        $drawerIsVisible={drawerIsVisible()}
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
              <PopOverUser>
                <Box className="boxInfoUser">
                  <Typography variant="subtitle1">
                    {userAuth.user?.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {userAuth.user?.email}
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
                <Box className="boxButtonLogout">
                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    onClick={() => dispatch(logout({}))}
                  >
                    Logout
                  </Button>
                </Box>
              </PopOverUser>
            </Popover>
          </Grid>
        </Toolbar>
      </HeaderAppBar>
      <SideBar
        variant="permanent"
        $drawerWidth={getDrawerWidth()}
        $open={drawerIsVisible()}
        onMouseEnter={() => setShowDrawer(true)}
        onMouseLeave={() => setShowDrawer(false)}
      >
        <ToolbarSidebar $drawerIsVisible={drawerIsVisible()}>
          <Logo src={LogoImg} alt="logo" />
          <Tooltip title="Fixar">
            <Radio checked={openFixedDrawer} onClick={handleDrawer} />
          </Tooltip>
        </ToolbarSidebar>
        <List>
          <ListSubheader>Geral</ListSubheader>
          {routes
            .filter((route) => !route.isSetting)
            .map((route) => (
              <ListItemSidebar
                to={route.path}
                primary={route.caption}
                icon={route.icon}
                selected={route.path === pathActive}
                showText={drawerIsVisible()}
                key={route.caption}
              />
            ))}
        </List>
        <ListSubheader>Gestão</ListSubheader>
        <List>
          {routes
            .filter((route) => route.isSetting)
            .map((route) => (
              <ListItemSidebar
                to={route.path}
                primary={route.caption}
                icon={route.icon}
                selected={route.path === pathActive}
                showText={drawerIsVisible()}
                key={route.caption}
              />
            ))}
        </List>
      </SideBar>
      <Content
        maxWidth="xl"
        $drawerWidth={openFixedDrawer ? drawerWidthMax : drawerWidthMin}
      >
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} exact={route.exact} key={route.caption}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Content>
    </Root>
  );
}
