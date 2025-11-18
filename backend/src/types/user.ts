import { Station } from './station';
import { Report } from './report';
import { Role } from './role';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  station: Station;
  reports?: Report[];
};
