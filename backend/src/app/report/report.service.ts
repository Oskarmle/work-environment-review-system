import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const { focusAreaId, ...reportData } = createReportDto;

    const report = this.reportRepository.create({
      ...reportData,
      focusArea: { id: focusAreaId },
    });
    return this.reportRepository.save(report);
  }

  findOne(options: FindOneOptions<Report>): Promise<Report | null> {
    return this.reportRepository.findOne(options);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  async findByUserId(userId: string, isCompleted?: boolean): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        userId,
        ...(isCompleted !== undefined && { isCompleted }),
      },
    });
  }

  async markAsCompleted(reportId: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (report.isCompleted === true) {
      return report;
    }

    report.isCompleted = true;
    return this.reportRepository.save(report);
  }
}
