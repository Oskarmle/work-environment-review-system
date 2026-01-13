import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreaController } from './focus-area.controller';
import { FocusAreaService } from './focus-area.service';

describe('FocusAreaController', () => {
  let controller: FocusAreaController;

  const mockFocusAreaService = {
    create: jest.fn(),
    findActiveOne: jest.fn(),
    findAll: jest.fn(),
    activeFocusArea: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FocusAreaController],
      providers: [
        {
          provide: FocusAreaService,
          useValue: mockFocusAreaService,
        },
      ],
    }).compile();

    controller = module.get<FocusAreaController>(FocusAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
