import GroupIcon from '@material-ui/icons/Group';
import LanguageIcon from '@material-ui/icons/Language';
import PollIcon from '@material-ui/icons/Poll';
import CreateRedmine from './redmine/create';
import Redmine from './redmine/list';
import Sprints from './sprints';
import CreateTeam from './team/create';
import Team from './team/list';

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
    path: '/dashboard/team',
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
  {
    path: '/dashboard/team/create',
    exact: true,
    component: <CreateTeam />,
  },
  {
    path: '/dashboard/team/edit/:idTeam',
    exact: true,
    component: <CreateTeam />,
  },
];

function allRoutes() {
  return generalRoutes.concat(routesMenu);
}

export { routesMenu, allRoutes };
