import { Test, TestingModule } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import { SectionFieldResponseService } from '../section-field-response/section-field-response.service';

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock pdfkit module
jest.mock('pdfkit', () => {
  const mockDoc = {
    fontSize: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    moveDown: jest.fn().mockReturnThis(),
    image: jest.fn().mockReturnThis(),
    on: jest.fn((event: string, callback: () => void) => {
      if (event === 'end') {
        // Simulate document end
        setTimeout(() => callback(), 0);
      }
      return mockDoc;
    }),
    end: jest.fn(),
  };
  return jest.fn(() => mockDoc) as any;
});
/* eslint-enable @typescript-eslint/no-unsafe-return */
/* eslint-enable @typescript-eslint/no-explicit-any */

describe('PdfService', () => {
  let service: PdfService;

  const mockSectionFieldResponseService = {
    findAllForAReport: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PdfService,
        {
          provide: SectionFieldResponseService,
          useValue: mockSectionFieldResponseService,
        },
      ],
    }).compile();

    service = module.get<PdfService>(PdfService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generatePdf', () => {
    it('should throw error when no responses with comments are found', async () => {
      const reportId = 'test-report-id';
      const title = 'Test Report';

      mockSectionFieldResponseService.findAllForAReport.mockResolvedValue([
        {
          id: '1',
          comment: '',
          sectionField: { whatToCheck: 'Test field' },
        },
      ]);

      await expect(service.generatePdf(title, reportId)).rejects.toThrow(
        'No section field responses with comments found.',
      );
    });
  });
});
