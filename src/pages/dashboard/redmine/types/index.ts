import { User } from './../../../auth/types';

export interface RedmineUser {
  role: number;
  user: User;
}

export interface Redmine {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  project_import: number;
  redmine_users: RedmineUser[];
}
