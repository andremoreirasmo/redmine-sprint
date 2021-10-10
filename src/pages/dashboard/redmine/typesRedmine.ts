import { User } from './../../auth/types';

export interface RedmineUser {
  role: number;
  user: User;
}

export interface Redmine {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  redmine_users: RedmineUser[];
}
