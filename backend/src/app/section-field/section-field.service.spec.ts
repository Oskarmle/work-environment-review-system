import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionFieldService } from './section-field.service';
import { SectionField } from './entities/section-field.entity';
import { CreateSectionFieldDto } from './dto/section-field.dto';

describe('SectionFieldService', () => {
  let service: SectionFieldService;
  let repository: Repository<SectionField>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionFieldService,
        {
          provide: getRepositoryToken(SectionField),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SectionFieldService>(SectionFieldService);
    repository = module.get<Repository<SectionField>>(
      getRepositoryToken(SectionField),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new section field', async () => {
      const createDto: CreateSectionFieldDto = {
        sectionId: 'section-1',
        whatToCheck: 'Test what to check',
        howToCheck: 'Test how to check',
        responsibility: 'Test responsibility',
        lawInspection: true,
        internalControl: false,
      };

      const sectionField = {
        id: '1',
        whatToCheck: 'Test what to check',
        howToCheck: 'Test how to check',
        responsibility: 'Test responsibility',
        lawInspection: true,
        internalControl: false,
        section: { id: 'section-1' },
      };

      mockRepository.create.mockReturnValue(sectionField);
      mockRepository.save.mockResolvedValue(sectionField);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        whatToCheck: 'Test what to check',
        howToCheck: 'Test how to check',
        responsibility: 'Test responsibility',
        lawInspection: true,
        internalControl: false,
        section: { id: 'section-1' },
      });
      expect(mockRepository.save).toHaveBeenCalledWith(sectionField);
      expect(result).toEqual(sectionField);
    });
  });

  describe('findAll', () => {
    it('should return all section fields with relations', async () => {
      const sectionFields = [
        {
          id: '1',
          whatToCheck: 'Field 1',
          section: { id: 'section-1', name: 'Section 1' },
        },
        {
          id: '2',
          whatToCheck: 'Field 2',
          section: { id: 'section-2', name: 'Section 2' },
        },
      ];

      mockRepository.find.mockResolvedValue(sectionFields);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['section'],
      });
      expect(result).toEqual(sectionFields);
    });
  });
});
