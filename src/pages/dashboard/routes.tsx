import React from "react";

import PollIcon from '@material-ui/icons/Poll';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import GroupIcon from '@material-ui/icons/Group';

import Sprints from './sprints';
import Settings from './settings';

interface Routes {
  path: string;
  exact: boolean;
  caption: string;
  component: JSX.Element;
  icon: JSX.Element;
  isSetting: boolean;
}

const routes: Routes[]  = [
    {
      path: "/",
      exact: true,
      caption: 'Sprints',
      component: <Sprints />,
      icon: <PollIcon />,
      isSetting: false,
    },
    {
      path: "/teams",
      exact: true,
      caption: 'Equipes',
      component: <h1>Equipes</h1>,
      icon: <GroupIcon />,
      isSetting: true,
    },
    {
      path: "/settings",
      exact: true,
      caption: 'Configurações',
      component: <Settings />,
      icon: <SettingsApplicationsIcon />,
      isSetting: true,
    },    
];

export default routes;