import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportService.create(createReportDto);
  }

  @Get()
  async findAll() {
    return await this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Body('id') id: string) {
    return await this.reportService.findOne({ where: { id } });
  }

  @Patch(':id/complete')
  async markAsCompleted(@Param('id') id: string) {
    return await this.reportService.markAsCompleted(id);
  }
}
