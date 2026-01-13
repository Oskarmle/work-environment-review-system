import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldController } from './section-field.controller';
import { SectionFieldService } from './section-field.service';

describe('SectionFieldController', () => {
  let controller: SectionFieldController;

  const mockSectionFieldService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionFieldController],
      providers: [
        {
          provide: SectionFieldService,
          useValue: mockSectionFieldService,
        },
      ],
    }).compile();

    controller = module.get<SectionFieldController>(SectionFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
