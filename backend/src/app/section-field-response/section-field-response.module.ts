import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionFieldResponse } from './entities/section-field-response.entity';
import { SectionFieldResponseController } from './section-field-response.controller';
import { SectionFieldResponseService } from './section-field-response.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionFieldResponse])],
  controllers: [SectionFieldResponseController],
  providers: [SectionFieldResponseService],
})
export class SectionFieldResponseModule {}
