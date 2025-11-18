import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/app/user/entities/user.entity';
import { Station } from 'src/app/station/entities/station.entity';
import { Role } from 'src/app/role/entities/role.entity';
import { FocusArea } from 'src/app/focus-area/entities/focus-area.entity';
import { Report } from 'src/app/report/entities/report.entity';
import { Section } from 'src/app/section/entities/section.entity';
import { SectionField } from 'src/app/section-field/entities/section-field.entity';
import { SectionFieldResponse } from 'src/app/section-field-response/entities/section-field-response.entity';

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    User,
    Station,
    Role,
    FocusArea,
    Report,
    Section,
    SectionField,
    SectionFieldResponse,
  ],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
};

const dataSourceOptions: DataSourceOptions = {
  ...dbConfig,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
} as DataSourceOptions;

const datasource = new DataSource(dataSourceOptions);
export default datasource;
