import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationModule } from './app/station/station.module';
import { RoleModule } from './app/role/role.module';
import { FocusAreaModule } from './app/focus-area/focus-area.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StationModule,
    RoleModule,
    FocusAreaModule,
  ],
})
export class AppModule {}
