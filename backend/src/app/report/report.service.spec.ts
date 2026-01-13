import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { MailService } from '../mail/mail.service';
import { PdfService } from '../pdf/pdf.service';
import { CreateReportDto } from './dto/create-report.dto';

describe('ReportService', () => {
  let service: ReportService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockMailService = {
    sendEmail: jest.fn(),
  };

  const mockPdfService = {
    generatePdf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getRepositoryToken(Report),
          useValue: mockRepository,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: PdfService,
          useValue: mockPdfService,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new report', async () => {
      const createDto: CreateReportDto = {
        userId: 'user-1',
        focusAreaId: 'focus-1',
        stationId: 'station-1',
        IsCompleted: false,
        comment: 'Test comment',
      };

      const report = {
        id: '1',
        userId: 'user-1',
        focusArea: { id: 'focus-1' },
        station: { id: 'station-1' },
        isCompleted: false,
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(report);
      mockRepository.save.mockResolvedValue(report);

      const result = await service.create(createDto);

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(report);
      expect(result).toEqual(report);
    });

    it('should return error if user has unfinished report', async () => {
      const createDto: CreateReportDto = {
        userId: 'user-1',
        focusAreaId: 'focus-1',
        stationId: 'station-1',
        IsCompleted: false,
        comment: 'Test comment',
      };

      const existingReport = { id: '1', userId: 'user-1', isCompleted: false };
      mockRepository.findOne.mockResolvedValue(existingReport);

      const result = await service.create(createDto);

      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('User has an unfinished report');
    });
  });

  describe('findOne', () => {
    it('should find one report by options', async () => {
      const report = { id: '1', userId: 'user-1' };
      mockRepository.findOne.mockResolvedValue(report);

      const result = await service.findOne({ where: { id: '1' } });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(report);
    });
  });

  describe('findAll', () => {
    it('should return all reports', async () => {
      const reports = [
        { id: '1', isCompleted: true },
        { id: '2', isCompleted: false },
      ];
      mockRepository.find.mockResolvedValue(reports);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(reports);
    });

    it('should filter reports by completion status', async () => {
      const reports = [{ id: '1', isCompleted: true }];
      mockRepository.find.mockResolvedValue(reports);

      const result = await service.findAll(true);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { isCompleted: true },
        relations: ['station', 'focusArea'],
      });
      expect(result).toEqual(reports);
    });
  });

  describe('findByUserId', () => {
    it('should find reports by user id', async () => {
      const userId = 'user-1';
      const reports = [{ id: '1', userId }];
      mockRepository.find.mockResolvedValue(reports);

      const result = await service.findByUserId(userId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { userId },
        relations: ['station', 'focusArea'],
      });
      expect(result).toEqual(reports);
    });
  });

  describe('markAsCompleted', () => {
    it('should mark report as completed', async () => {
      const reportId = 'report-1';
      const report = {
        id: reportId,
        isCompleted: false,
        notificationEmails: [],
        station: { stationName: 'Test Station' },
      };

      mockRepository.findOne.mockResolvedValue(report);
      mockRepository.save.mockResolvedValue({ ...report, isCompleted: true });

      const result = await service.markAsCompleted(reportId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: reportId },
        relations: ['station'],
      });
      expect(result.isCompleted).toBe(true);
    });

    it('should throw NotFoundException if report not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.markAsCompleted('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return report if already completed', async () => {
      const report = {
        id: 'report-1',
        isCompleted: true,
        station: { stationName: 'Test' },
      };

      mockRepository.findOne.mockResolvedValue(report);

      const result = await service.markAsCompleted('report-1');

      expect(result).toEqual(report);
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});
