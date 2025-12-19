import { Controller, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('generate/:reportId')
  async generatePdf(
    @Param('reportId') reportId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const pdfBuffer = await this.pdfService.generatePdf(
        'Arbejdsmiljørundering',
        reportId,
      );

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length,
      });

      res.status(HttpStatus.OK).send(pdfBuffer);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate sample PDF',
        error: errorMessage,
      });
    }
  }
}
