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
  redmine_activities: IApiRedmineActivity[];
}

interface ICategory {
  name: string;
  productive: boolean;
  redmine_categories: IApiCategoryRedmine[];
}

interface IUserRedmine {
  id: string;
  id_user_redmine: number;
  name: string;
}

interface ICreateTeam {
  name: string;
  hours_per_point: number;
  redmine_id: string;
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
