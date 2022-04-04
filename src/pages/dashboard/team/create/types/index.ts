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

interface ICategory {
  name: string;
  categories_redmine: IApiCategoryRedmine[];
}

interface IUserRedmine {
  id: string;
  id_user_redmine: number;
  name: string;
}

interface ICreateTeam {
  name: string;
  hours_per_point: number;
  users_redmine: IUserRedmine[];
  categories: ICategory[];
  activities: IActivity[];
}

export type {
  IApiRedmineActivity,
  IActivity,
  IApiCategoryRedmine,
  ICategory,
  IUserRedmine,
  ICreateTeam,
};
