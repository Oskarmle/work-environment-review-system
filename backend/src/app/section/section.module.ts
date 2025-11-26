import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionController } from './section.controller';
import { Section } from './entities/section.entity';
import { SectionService } from './section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
