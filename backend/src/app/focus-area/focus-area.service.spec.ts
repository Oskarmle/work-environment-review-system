import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreaService } from './focus-area.service';

describe('FocusAreaService', () => {
  let service: FocusAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusAreaService],
    }).compile();

    service = module.get<FocusAreaService>(FocusAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
