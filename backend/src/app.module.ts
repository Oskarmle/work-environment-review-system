import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationsModule } from './app/stations/stations.module';
import { RolesModule } from './app/roles/roles.module';
import { FocusAreasModule } from './app/focus-areas/focus-areas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StationsModule,
    RolesModule,
    FocusAreasModule,
  ],
})
export class AppModule {}
