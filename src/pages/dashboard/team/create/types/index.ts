interface IApiRedmineActivity {
  id: number;
  name: string;
}

interface IApiCategoryRedmine {
  id: number;
  name: string;
  project: {
    id: number;
    name: string;
  };
}

interface IActivity {
  name: string;
  activities_redmine: IApiRedmineActivity[];
}

interface ITeamActivities {
  activities: IActivity[];
}

interface ICategory {
  name: string;
  categories_redmine: IApiCategoryRedmine[];
}

interface ITeamCategories {
  categories: ICategory[];
}

interface IUserRedmine {
  id: string;
  id_user_redmine: number;
  name: string;
}

interface IBasicTeam {
  name: string;
  hours_per_point: number;
  users_redmine: IUserRedmine[];
}

export type {
  IApiRedmineActivity,
  IActivity,
  IApiCategoryRedmine,
  ICategory,
  IUserRedmine,
  IBasicTeam,
  ITeamActivities,
  ITeamCategories,
};
