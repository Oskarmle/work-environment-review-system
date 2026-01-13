import { Test, TestingModule } from '@nestjs/testing';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

describe('SectionController', () => {
  let controller: SectionController;

  const mockSectionService = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionController],
      providers: [
        {
          provide: SectionService,
          useValue: mockSectionService,
        },
      ],
    }).compile();

    controller = module.get<SectionController>(SectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
