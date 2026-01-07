import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreaService } from './focus-area.service';
import { CreateFocusAreaDto } from './dto/focus-area.dto';
import { FocusArea } from 'src/types/focus-area';

describe('FocusAreaService', () => {
  let service: FocusAreaService;

  const mockFocusAreaRepository = {
    create: jest.fn(),
    findActiveOne: jest.fn(),
    findAll: jest.fn(),
    activeFocusArea: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FocusAreaService,
        {
          provide: 'FocusAreaRepository',
          useValue: mockFocusAreaRepository,
        },
      ],
    }).compile();

    service = module.get<FocusAreaService>(FocusAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create new focus area with active set to true', async () => {
      const newFocusAreaDto: CreateFocusAreaDto = {
        title: 'New Focus Area',
        year: 2026,
        isActive: true,
      };

      mockFocusAreaRepository.create.mockReturnValue(newFocusAreaDto);
      mockFocusAreaRepository.save.mockResolvedValue(newFocusAreaDto);

      expect(await service.create(newFocusAreaDto)).toEqual(newFocusAreaDto);
      expect(mockFocusAreaRepository.create).toHaveBeenCalledWith(
        newFocusAreaDto,
      );
      expect(mockFocusAreaRepository.save).toHaveBeenCalledWith(
        newFocusAreaDto,
      );
    });

    it('Should set all other focus areas to false', async () => {
      const newFocusAreaDto: CreateFocusAreaDto = {
        title: 'New Focus Area',
        year: 2026,
        isActive: true,
      };

      const newFocusArea: FocusArea = {
        ...newFocusAreaDto,
        id: 'new-id-123',
      };

      mockFocusAreaRepository.update.mockImplementation(
        (criteria, updateData) => {
          expect(criteria).toEqual({ isActive: true });
          expect(updateData).toEqual({ isActive: false });
          return Promise.resolve({ affected: 2, raw: [], generatedMaps: [] });
        },
      );

      mockFocusAreaRepository.create.mockReturnValue(newFocusArea);
      mockFocusAreaRepository.save.mockResolvedValue(newFocusArea);

      await service.create(newFocusAreaDto);

      expect(mockFocusAreaRepository.update).toHaveBeenCalledTimes(1);
    });
  });
});
