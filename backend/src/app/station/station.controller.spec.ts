import { Test, TestingModule } from '@nestjs/testing';
import { StationController } from './station.controller';
import { StationService } from './station.service';

describe('StationController', () => {
  let controller: StationController;

  const mockStationService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationController],
      providers: [
        {
          provide: StationService,
          useValue: mockStationService,
        },
      ],
    }).compile();

    controller = module.get<StationController>(StationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
