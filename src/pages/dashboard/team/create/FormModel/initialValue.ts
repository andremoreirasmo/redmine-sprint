import { ICreateTeam } from '../types/';

export const initialValuesBasicForm: ICreateTeam = {
  name: '',
  hours_per_point: 0,
  redmine_id: '',
  users_redmine: [],
  activities: [],
  categories: [],
};

export default initialValuesBasicForm;
