import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {}
