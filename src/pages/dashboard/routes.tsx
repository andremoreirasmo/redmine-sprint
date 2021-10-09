import PollIcon from '@material-ui/icons/Poll';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import GroupIcon from '@material-ui/icons/Group';

import Sprints from './sprints';
import Settings from './settings';
import Team from './team';

interface Routes {
  path: string;
  exact: boolean;
  caption: string;
  component: JSX.Element;
  icon: JSX.Element;
  isSetting: boolean;
}

const routes: Routes[] = [
  {
    path: '/dashboard',
    exact: true,
    caption: 'Sprints',
    component: <Sprints />,
    icon: <PollIcon />,
    isSetting: false,
  },
  {
    path: '/dashboard/teams',
    exact: true,
    caption: 'Equipes',
    component: <Team />,
    icon: <GroupIcon />,
    isSetting: true,
  },
  {
    path: '/dashboard/settings',
    exact: true,
    caption: 'Configurações',
    component: <Settings />,
    icon: <SettingsApplicationsIcon />,
    isSetting: true,
  },
];

export default routes;
