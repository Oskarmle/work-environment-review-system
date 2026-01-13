import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';

describe('SectionService', () => {
  let service: SectionService;
  let repository: Repository<Section>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        {
          provide: getRepositoryToken(Section),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    repository = module.get<Repository<Section>>(getRepositoryToken(Section));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new section', async () => {
      const createDto: CreateSectionDto = {
        name: 'Test Section',
        description: 'Test description',
      };
      const section = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(section);
      mockRepository.save.mockResolvedValue(section);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(section);
      expect(result).toEqual(section);
    });
  });

  describe('findAll', () => {
    it('should return all sections', async () => {
      const sections = [
        { id: '1', name: 'Section 1', description: 'Description 1' },
        { id: '2', name: 'Section 2', description: 'Description 2' },
      ];

      mockRepository.find.mockResolvedValue(sections);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(sections);
    });
  });

  describe('remove', () => {
    it('should delete a section', async () => {
      const id = '1';
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
