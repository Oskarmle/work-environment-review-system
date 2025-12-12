import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('user/:userId')
  async findAllByUserId(
    @Param('userId') userId: string,
    @Query('isCompleted') isCompleted?: string,
  ) {
    const isCompletedBool =
      isCompleted === 'true'
        ? true
        : isCompleted === 'false'
          ? false
          : undefined;
    return await this.reportService.findAllByUserId(userId, isCompletedBool);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportService.findOne({ where: { id } });
  }

  @Patch(':id/complete')
  async markAsCompleted(@Param('id') id: string) {
    return await this.reportService.markAsCompleted(id);
  }
}
