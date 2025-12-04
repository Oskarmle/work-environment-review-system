import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldService } from './section-field.service';

describe('SectionFieldService', () => {
  let service: SectionFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionFieldService],
    }).compile();

    service = module.get<SectionFieldService>(SectionFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
