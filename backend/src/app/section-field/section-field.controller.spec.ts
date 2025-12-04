import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldController } from './section-field.controller';

describe('SectionFieldController', () => {
  let controller: SectionFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionFieldController],
    }).compile();

    controller = module.get<SectionFieldController>(SectionFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
