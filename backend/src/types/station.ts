import { Report } from './report';
import { User } from './user';

export type Station = {
  id: string;
  stationName: string;
  users: User[];
  reports: Report[];
};
