import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InitialCheckService } from './initial-check.service';
import { InitialCheck } from './entities/initial-check.entity';
import { CreateInitialCheckDto } from './dto/create-initial-check.dto';

describe('InitialCheckService', () => {
  let service: InitialCheckService;
  let repository: Repository<InitialCheck>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitialCheckService,
        {
          provide: getRepositoryToken(InitialCheck),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InitialCheckService>(InitialCheckService);
    repository = module.get<Repository<InitialCheck>>(
      getRepositoryToken(InitialCheck),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new initial check', async () => {
      const createDto: CreateInitialCheckDto = {
        title: 'Test Initial Check',
        description: 'Test description',
      };
      const initialCheck = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(initialCheck);
      mockRepository.save.mockResolvedValue(initialCheck);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(initialCheck);
      expect(result).toEqual(initialCheck);
    });
  });

  describe('findAll', () => {
    it('should return all initial checks', async () => {
      const initialChecks = [
        { id: '1', title: 'Check 1', description: 'Description 1' },
        { id: '2', title: 'Check 2', description: 'Description 2' },
      ];

      mockRepository.find.mockResolvedValue(initialChecks);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(initialChecks);
    });
  });

  describe('remove', () => {
    it('should delete an initial check', async () => {
      const id = '1';
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
