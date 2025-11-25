import { Test, TestingModule } from '@nestjs/testing';
import { InitialCheckService } from './initial-check.service';

describe('InitialCheckService', () => {
  let service: InitialCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitialCheckService],
    }).compile();

    service = module.get<InitialCheckService>(InitialCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
