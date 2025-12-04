import { Test, TestingModule } from '@nestjs/testing';
import { InitialCheckController } from './initial-check.controller';

describe('InitialCheckController', () => {
  let controller: InitialCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InitialCheckController],
    }).compile();

    controller = module.get<InitialCheckController>(InitialCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
