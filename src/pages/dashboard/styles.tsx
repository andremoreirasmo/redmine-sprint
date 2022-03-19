import ListItemLink from '@/components/ListItemLink';
import { AppBar, Box, Container, Drawer } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';

export const Logo = styled.img`
  width: 40px;
  height: 30px;
`;

export const Root = styled.div`
  display: flex;
`;

type HeaderAppBarProps = {
  $drawerWidth: number;
  $drawerIsVisible: boolean;
};

export const HeaderAppBar = styled(AppBar)<HeaderAppBarProps>`
  ${props =>
    !props.$drawerIsVisible &&
    css`
      width: calc(100% - ${props.$drawerWidth}px);
    `}

  background-color: ${props =>
    alpha(props.theme.palette.background.default, 0.5)};
  backdrop-filter: blur(6px);
  box-shadow: none;
`;

export const PopOverUser = styled(Box)`
  min-width: 218px;
  border-radius: 20px;

  .boxInfoUser {
    margin: 12px 0 12px 20px;
    justify-content: flex-start;
  }

  .boxButtonLogout {
    padding: 0px 16px 16px;
  }
`;

type SideBarAppBarProps = {
  $drawerWidth: number;
  $open: boolean;
};

export const SideBar = styled(Drawer)<SideBarAppBarProps>`
  .MuiDrawer-paper {
    width: ${props => props.$drawerWidth}px;
    flex-shrink: 0;
    white-space: nowrap;
    background-color: ${props =>
      alpha(props.theme.palette.background.default, 0.5)};
    backdrop-filter: blur(6px);

    ${props =>
      props.$open &&
      css`
        transition: ${props =>
          props.theme.transitions.create('width', {
            easing: props.theme.transitions.easing.sharp,
            duration: props.theme.transitions.duration.enteringScreen,
          })};
      `}

    ${props =>
      !props.$open &&
      css`
        overflow-x: 'hidden';
        transition: ${props.theme.transitions.create('width', {
          easing: props.theme.transitions.easing.sharp,
          duration: props.theme.transitions.duration.leavingScreen,
        })};
      `}
  }

  .MuiListItemIcon-root,
  .MuiListSubheader-root,
  .MuiListItemText-root {
    color: #9e9e9e;
  }

  .MuiRadio-root,
  .MuiListSubheader-root {
    ${props =>
      !props.$open &&
      css`
        display: none;
      `}
  }

  .MuiListSubheader-root {
    text-transform: uppercase;
    font-weight: 700;
  }
`;

type ToolbarSidebarProps = {
  $drawerIsVisible: boolean;
};

export const ToolbarSidebar = styled.div<ToolbarSidebarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px 10px 24px;
  ${props => props.theme.mixins.toolbar as unknown as string}

  ${(props: ToolbarSidebarProps) =>
    props.$drawerIsVisible &&
    css`
      justify-content: space-between;
    `}
`;

export const ListItemSidebar = styled(ListItemLink)`
  .item {
    border: 4px solid transparent;

    ${props =>
      props.selected &&
      css`
        background-color: ${props =>
          alpha(props.theme.palette.primary.main, 0.1)};
        border-right-color: ${props => props.theme.palette.primary.main};

        .MuiListItemIcon-root,
        .MuiListItemText-root {
          color: ${props => props.theme.palette.primary.main};
        }
      `}
  }

  .icon {
    justify-content: center;
  }
`;

type ContentProps = {
  $drawerWidth: number;
};

export const Content = styled(Container)<ContentProps>`
  padding: 80px 16px 0px 16px;
  margin-left: ${props => props.$drawerWidth}px;
`;
