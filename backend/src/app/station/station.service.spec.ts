import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationService } from './station.service';
import { Station } from './entity/station.entity';
import { CreateStationDto } from './dto/create-station.dto';

describe('StationService', () => {
  let service: StationService;
  let repository: Repository<Station>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationService,
        {
          provide: getRepositoryToken(Station),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StationService>(StationService);
    repository = module.get<Repository<Station>>(getRepositoryToken(Station));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new station', async () => {
      const createDto: CreateStationDto = {
        stationName: 'Test Station',
      };
      const station = { id: '1', ...createDto };

      mockRepository.create.mockReturnValue(station);
      mockRepository.save.mockResolvedValue(station);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(station);
      expect(result).toEqual(station);
    });
  });

  describe('findOne', () => {
    it('should find one station by options', async () => {
      const station = {
        id: '1',
        stationName: 'Test Station',
        address: 'Test Address',
      };
      mockRepository.findOne.mockResolvedValue(station);

      const result = await service.findOne({ where: { id: '1' } });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(station);
    });

    it('should return null when station not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne({ where: { id: 'invalid' } });

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all stations', async () => {
      const stations = [
        { id: '1', stationName: 'Station 1', address: 'Address 1' },
        { id: '2', stationName: 'Station 2', address: 'Address 2' },
      ];

      mockRepository.find.mockResolvedValue(stations);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(stations);
    });
  });
});
