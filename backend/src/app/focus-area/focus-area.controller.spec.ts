import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreaController } from './focus-area.controller';

describe('FocusAreaController', () => {
  let controller: FocusAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FocusAreaController],
    }).compile();

    controller = module.get<FocusAreaController>(FocusAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
