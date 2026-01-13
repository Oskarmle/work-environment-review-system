import { Test, TestingModule } from '@nestjs/testing';
import { InitialCheckController } from './initial-check.controller';
import { InitialCheckService } from './initial-check.service';

describe('InitialCheckController', () => {
  let controller: InitialCheckController;

  const mockInitialCheckService = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitialCheckController],
      providers: [
        {
          provide: InitialCheckService,
          useValue: mockInitialCheckService,
        },
      ],
    }).compile();

    controller = module.get<InitialCheckController>(InitialCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
