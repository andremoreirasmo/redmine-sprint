import { AppBar, Box, Container, Drawer } from "@material-ui/core";
import styled, { css } from "styled-components";
import ListItemLink from "../../components/ListItemLink";
import { alpha } from "@material-ui/core/styles";

export const Root = styled.div`
  display: flex;
`;

interface HeaderAppBarProps {
  $drawerWidth: number;
  $drawerIsVisible: boolean;
}

export const HeaderAppBar = styled(AppBar)<HeaderAppBarProps>`
  ${(props) =>
    !props.$drawerIsVisible &&
    css`
      width: calc(100% - ${props.$drawerWidth}px);
    `}

  background-color: ${(props) =>
    alpha(props.theme.palette.background.default, 0.5)};
  backdrop-filter: blur(6px);
  box-shadow: none;
`;

export const PopOverUser = styled(Box)`
  min-width: 218px;
  border-radius: 20px;

  .boxInfoUser {
    margin: 12px 0 12px 20px;
    padding: 0 20p x 0 20px;
    justify-content: flex-start;
  }

  .boxButtonLogout {
    padding: 0px 16px 16px;
  }
`;

interface SideBarAppBarProps {
  $drawerWidth: number;
  $open: boolean;
}

export const SideBar = styled(Drawer)<SideBarAppBarProps>`
  .MuiDrawer-paper {
    width: ${(props) => props.$drawerWidth}px;
    flex-shrink: 0;
    white-space: nowrap;
    background-color: ${(props) =>
      alpha(props.theme.palette.background.default, 0.5)};
    backdrop-filter: blur(6px);

    ${(props) =>
      props.open &&
      css`
        transition: ${(props) =>
          props.theme.transitions.create("width", {
            easing: props.theme.transitions.easing.sharp,
            duration: props.theme.transitions.duration.enteringScreen,
          })};
      `}

    ${(props) =>
      !props.open &&
      css`
        overflow-x: "hidden";
        transition: ${props.theme.transitions.create("width", {
          easing: props.theme.transitions.easing.sharp,
          duration: props.theme.transitions.duration.leavingScreen,
        })};
      `}
  }

  .MuiRadio-root,
  .MuiListSubheader-root {
    ${(props) =>
      !props.open &&
      css`
        display: none;
      `}
  }

  .MuiListSubheader-root {
    color: ${(props) => props.theme.palette.text.primary};
    text-transform: uppercase;
  }
`;

export const ToolbarSidebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing(0, 1)};
  ${(props) => props.theme.mixins.toolbar}
`;

interface ListItemSidebarProps {
  $active: boolean;
}

export const ListItemSidebar = styled(ListItemLink)<ListItemSidebarProps>`
  .item {
    border: 4px solid transparent;

    ${(props) =>
      props.$active &&
      css`
        background-color: ${(props) =>
          alpha(props.theme.palette.primary.main, 0.1)};
        border-right-color: ${(props) => props.theme.palette.primary.main};
        color: ${(props) => props.theme.palette.primary.main};
      `}
  }

  .icon {
    justify-content: center;
  }
`;

interface ContentProps {
  $drawerWidth: number;
}

export const Content = styled(Container)<ContentProps>`
  padding: 116px 16px 80px 16px;
  margin-left: ${(props) => props.$drawerWidth}px;
`;
