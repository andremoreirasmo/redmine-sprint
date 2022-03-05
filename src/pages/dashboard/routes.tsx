import PollIcon from '@material-ui/icons/Poll';
import GroupIcon from '@material-ui/icons/Group';
import LanguageIcon from '@material-ui/icons/Language';

import Sprints from './sprints';
import Redmine from './redmine/list';
import CreateRedmine from './redmine/create';
import Team from './team';

interface Routes {
  path: string;
  exact: boolean;
  caption?: string;
  component: JSX.Element;
  icon?: JSX.Element;
  isSetting?: boolean;
}

const routesMenu: Routes[] = [
  {
    path: '/dashboard/sprint',
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
    path: '/dashboard/redmine/',
    exact: true,
    caption: 'Redmine',
    component: <Redmine />,
    icon: <LanguageIcon />,
    isSetting: true,
  },
];

const generalRoutes: Routes[] = [
  {
    path: '/dashboard/redmine/create',
    exact: true,
    component: <CreateRedmine />,
  },
  {
    path: '/dashboard/redmine/edit/:idRedmine',
    exact: true,
    component: <CreateRedmine />,
  },
];

function allRoutes() {
  return generalRoutes.concat(routesMenu);
}

export { routesMenu, allRoutes };
