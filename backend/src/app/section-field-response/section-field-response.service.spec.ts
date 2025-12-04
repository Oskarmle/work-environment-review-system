import { Test, TestingModule } from '@nestjs/testing';
import { SectionFieldResponseService } from './section-field-response.service';

describe('SectionFieldResponseService', () => {
  let service: SectionFieldResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionFieldResponseService],
    }).compile();

    service = module.get<SectionFieldResponseService>(
      SectionFieldResponseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
