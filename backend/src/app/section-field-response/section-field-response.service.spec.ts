import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionFieldResponseService } from './section-field-response.service';
import { SectionFieldResponse } from './entities/section-field-response.entity';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';

describe('SectionFieldResponseService', () => {
  let service: SectionFieldResponseService;
  let repository: Repository<SectionFieldResponse>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionFieldResponseService,
        {
          provide: getRepositoryToken(SectionFieldResponse),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SectionFieldResponseService>(
      SectionFieldResponseService,
    );
    repository = module.get<Repository<SectionFieldResponse>>(
      getRepositoryToken(SectionFieldResponse),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new section field response', async () => {
      const createDto: CreateSectionFieldResponseDto = {
        sectionFieldId: 'field-1',
        reportId: 'report-1',
        comment: 'Test comment',
        isOkay: false,
        isNotRelevant: false,
      };

      const response = {
        id: '1',
        comment: 'Test comment',
        isOkay: false,
        isNotRelevant: false,
        sectionField: { id: 'field-1' },
        report: { id: 'report-1' },
      };

      mockRepository.create.mockReturnValue(response);
      mockRepository.save.mockResolvedValue(response);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        comment: 'Test comment',
        isOkay: false,
        isNotRelevant: false,
        sectionField: { id: 'field-1' },
        report: { id: 'report-1' },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(response);
      expect(result).toEqual(response);
    });
  });

  describe('findAllForAReport', () => {
    it('should return all responses for a report', async () => {
      const reportId = 'report-1';
      const responses = [
        {
          id: '1',
          comment: 'Comment 1',
          report: { id: reportId },
          sectionField: { whatToCheck: 'Field 1' },
        },
        {
          id: '2',
          comment: 'Comment 2',
          report: { id: reportId },
          sectionField: { whatToCheck: 'Field 2' },
        },
      ];

      mockRepository.find.mockResolvedValue(responses);

      const result = await service.findAllForAReport(reportId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { report: { id: reportId } },
        relations: ['sectionField'],
      });
      expect(result).toEqual(responses);
    });
  });

  describe('createMany', () => {
    it('should create multiple section field responses', async () => {
      const dtos: CreateSectionFieldResponseDto[] = [
        {
          sectionFieldId: 'field-1',
          reportId: 'report-1',
          comment: 'Comment 1',
          isOkay: true,
          isNotRelevant: false,
        },
        {
          sectionFieldId: 'field-2',
          reportId: 'report-1',
          comment: 'Comment 2',
          isOkay: false,
          isNotRelevant: false,
        },
      ];

      const createdResponses = [
        { id: '1', comment: 'Comment 1' },
        { id: '2', comment: 'Comment 2' },
      ];

      const mockQueryBuilder = {
        insert: jest.fn().mockReturnThis(),
        into: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ raw: createdResponses }),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.createMany(dtos);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual(createdResponses);
    });
  });

  describe('updateSectionFieldResponses', () => {
    it('should delete existing responses and create new ones', async () => {
      const dtos: CreateSectionFieldResponseDto[] = [
        {
          sectionFieldId: 'field-1',
          reportId: 'report-1',
          comment: 'New comment',
          isOkay: true,
          isNotRelevant: false,
        },
      ];

      const createdResponses = [{ id: '1', comment: 'New comment' }];

      mockRepository.delete.mockResolvedValue({ affected: 2 });

      const mockQueryBuilder = {
        insert: jest.fn().mockReturnThis(),
        into: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ raw: createdResponses }),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.updateSectionFieldResponses(dtos);

      expect(mockRepository.delete).toHaveBeenCalledWith({
        report: { id: 'report-1' },
      });
      expect(result).toEqual(createdResponses);
    });
  });
});
