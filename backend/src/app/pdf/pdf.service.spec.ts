import { Test, TestingModule } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import { SectionFieldResponseService } from '../section-field-response/section-field-response.service';

describe('PdfService', () => {
  let service: PdfService;
  let sectionFieldResponseService: SectionFieldResponseService;

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
    sectionFieldResponseService = module.get<SectionFieldResponseService>(
      SectionFieldResponseService,
    );
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

    it('should generate PDF when responses with comments exist', async () => {
      const reportId = 'test-report-id';
      const title = 'Test Report';

      const responsesWithComments = [
        {
          id: '1',
          comment: 'Test comment',
          isOkay: false,
          isNotRelevant: false,
          sectionField: {
            whatToCheck: 'Test field',
            lawInspection: true,
            internalControl: false,
            howToCheck: 'Test how to check',
            responsibility: 'Test responsibility',
          },
          imageData: null,
        },
      ];

      mockSectionFieldResponseService.findAllForAReport.mockResolvedValue(
        responsesWithComments,
      );

      const result = await service.generatePdf(title, reportId);

      expect(
        mockSectionFieldResponseService.findAllForAReport,
      ).toHaveBeenCalledWith(reportId);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
