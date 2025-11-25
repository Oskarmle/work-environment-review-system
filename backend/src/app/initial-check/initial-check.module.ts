import { Module } from '@nestjs/common';
import { InitialCheckController } from './initial-check.controller';
import { InitialCheckService } from './initial-check.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialCheck } from './entities/initial-check.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InitialCheck])],
  providers: [InitialCheckService],
  controllers: [InitialCheckController],
  exports: [],
})
export class InitialCheckModule {}
