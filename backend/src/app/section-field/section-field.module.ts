import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionField } from './entities/section-field.entity';
import { SectionFieldController } from './section-field.controller';
import { SectionFieldService } from './section-field.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionField])],
  controllers: [SectionFieldController],
  providers: [SectionFieldService],
})
export class SectionFieldModule {}
