import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationsModule } from './app/stations/stations.module';
import { RolesModule } from './app/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), StationsModule, RolesModule],
})
export class AppModule {}
