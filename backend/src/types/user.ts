import { Report } from 'src/app/report/entities/report.entity';
import { Role } from 'src/app/role/entities/role.entity';
import { Station } from 'src/app/station/entities/station.entity';

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
