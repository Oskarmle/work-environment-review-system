import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FocusArea } from './entities/focus-area.entity';
import { FocusAreaService } from './focus-area.service';
import { FocusAreaController } from './focus-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FocusArea])],
  providers: [FocusAreaService],
  controllers: [FocusAreaController],
})
export class FocusAreaModule {}
