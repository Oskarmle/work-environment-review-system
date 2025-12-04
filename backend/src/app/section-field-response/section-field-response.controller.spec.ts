import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldResponseController } from './section-field-response.controller';

describe('SectionFieldResponseController', () => {
  let controller: SectionFieldResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionFieldResponseController],
    }).compile();

    controller = module.get<SectionFieldResponseController>(
      SectionFieldResponseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
