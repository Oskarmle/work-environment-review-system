import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldResponseController } from './section-field-response.controller';
import { SectionFieldResponseService } from './section-field-response.service';

describe('SectionFieldResponseController', () => {
  let controller: SectionFieldResponseController;

  const mockSectionFieldResponseService = {
    create: jest.fn(),
    findAllForAReport: jest.fn(),
    createMany: jest.fn(),
    updateSectionFieldResponses: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionFieldResponseController],
      providers: [
        {
          provide: SectionFieldResponseService,
          useValue: mockSectionFieldResponseService,
        },
      ],
    }).compile();

    controller = module.get<SectionFieldResponseController>(
      SectionFieldResponseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
