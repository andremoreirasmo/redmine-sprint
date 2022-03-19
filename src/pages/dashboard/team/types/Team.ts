import { TeamActivity } from './TeamActivity';
import { TeamTaskCategory } from './TeamTaskCategory';

export interface Team {
  id: string;
  name: string;
  hours_per_point: number;
  redmine_id: string;
  createdAt: Date;
  updatedAt: Date;
  activities: TeamActivity[];
  categories: TeamTaskCategory[];
}
