import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationsModule } from './app/stations/stations.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), StationsModule],
})
export class AppModule {}
