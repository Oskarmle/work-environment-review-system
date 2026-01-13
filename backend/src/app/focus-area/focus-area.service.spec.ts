import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FocusAreaService } from './focus-area.service';
import { FocusArea } from './entities/focus-area.entity';
import { CreateFocusAreaDto } from './dto/focus-area.dto';

describe('FocusAreaService', () => {
  let service: FocusAreaService;
  let repository: Repository<FocusArea>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FocusAreaService,
        {
          provide: getRepositoryToken(FocusArea),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FocusAreaService>(FocusAreaService);
    repository = module.get<Repository<FocusArea>>(
      getRepositoryToken(FocusArea),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new focus area with isActive false', async () => {
      const createDto: CreateFocusAreaDto = {
        title: 'Test Focus Area',
        year: 2026,
        isActive: false,
      };
      const focusArea = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(focusArea);
      mockRepository.save.mockResolvedValue(focusArea);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(focusArea);
      expect(result).toEqual(focusArea);
    });

    it('should deactivate other focus areas when creating an active one', async () => {
      const createDto: CreateFocusAreaDto = {
        title: 'Active Focus Area',
        year: 2026,
        isActive: true,
      };
      const focusArea = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(focusArea);
      mockRepository.save.mockResolvedValue(focusArea);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.create(createDto);

      expect(mockRepository.update).toHaveBeenCalledWith(
        { isActive: true },
        { isActive: false },
      );
      expect(mockRepository.save).toHaveBeenCalledWith(focusArea);
      expect(result).toEqual(focusArea);
    });
  });

  describe('findActiveOne', () => {
    it('should return active focus area', async () => {
      const focusArea = {
        id: '1',
        name: 'Active Focus Area',
        isActive: true,
      };

      mockRepository.findOneBy.mockResolvedValue(focusArea);

      const result = await service.findActiveOne();

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        isActive: true,
      });
      expect(result).toEqual(focusArea);
    });

    it('should return null when no active focus area exists', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findActiveOne();

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all focus areas', async () => {
      const focusAreas = [
        { id: '1', name: 'Focus Area 1', isActive: true },
        { id: '2', name: 'Focus Area 2', isActive: false },
      ];

      mockRepository.find.mockResolvedValue(focusAreas);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(focusAreas);
    });
  });

  describe('activeFocusArea', () => {
    it('should activate a specific focus area', async () => {
      const id = '1';
      const focusArea = { id, name: 'Focus Area 1', isActive: true };

      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOneBy.mockResolvedValue(focusArea);

      const result = await service.activeFocusArea(id);

      expect(mockRepository.update).toHaveBeenCalledWith(
        { isActive: true },
        { isActive: false },
      );
      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        isActive: true,
      });
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(focusArea);
    });
  });

  describe('remove', () => {
    it('should delete a focus area', async () => {
      const id = '1';
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
