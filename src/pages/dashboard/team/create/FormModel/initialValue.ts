import { IBasicTeam, ITeamActivities, ITeamCategories } from '../types/';

export const initialValuesBasicForm: IBasicTeam = {
  name: '',
  hours_per_point: 0,
  users_redmine: [],
};

const initialValuesActivities: ITeamActivities = {
  activities: [],
};

const initialValuesCategories: ITeamCategories = {
  categories: [],
};

export default {
  ...initialValuesBasicForm,
  ...initialValuesActivities,
  ...initialValuesCategories,
};
