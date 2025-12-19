import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Report } from '../report/entities/report.entity';
import { SectionFieldResponseModule } from '../section-field-response/section-field-response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), SectionFieldResponseModule],
  controllers: [PdfController],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
