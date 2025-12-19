import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private mailService: MailService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report | Error> {
    const unfinishedReport = await this.reportRepository.findOne({
      where: {
        userId: createReportDto.userId,
        isCompleted: false,
      },
    });

    if (unfinishedReport) {
      return Error('User has an unfinished report');
    }

    const { focusAreaId, stationId, ...reportData } = createReportDto;

    const report = this.reportRepository.create({
      ...reportData,
      focusArea: { id: focusAreaId },
      station: { id: stationId },
    });
    return this.reportRepository.save(report);
  }

  findOne(options: FindOneOptions<Report>): Promise<Report | null> {
    return this.reportRepository.findOne(options);
  }

  findAll(isCompleted?: boolean): Promise<Report[]> {
    return this.reportRepository.find({
      where: isCompleted !== undefined ? { isCompleted } : {},
      relations: ['station', 'focusArea'],
    });
  }

  async findByUserId(userId: string, isCompleted?: boolean): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        userId,
        ...(isCompleted !== undefined && { isCompleted }),
      },
      relations: ['station', 'focusArea'],
    });
  }

  async markAsCompleted(reportId: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
      relations: ['station'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (report.isCompleted === true) {
      return report;
    }

    report.isCompleted = true;

    if (
      report.notificationEmails &&
      report.notificationEmails.length > 0 &&
      report.isCompleted === true
    ) {
      report.notificationEmails.forEach((email) => {
        void this.mailService.sendEmail({
          to: email,
          subject: 'Report Completed',
          text: `Rundering på ${report.station.stationName} er nu fuldført. Mail er sendt til ${report.notificationEmails?.join(', ')}.`,
        });
      });
    }

    report.notificationEmails = [];
    return this.reportRepository.save(report);
  }
}
