import { Injectable } from '@nestjs/common';
import { PDFDocumentConstructor } from 'src/types/pdf';
import { SectionFieldResponseService } from '../section-field-response/section-field-response.service';

const getPDFDocument = async (): Promise<PDFDocumentConstructor> => {
  const module = await import('pdfkit');
  return module.default as unknown as PDFDocumentConstructor;
};

@Injectable()
export class PdfService {
  constructor(
    private sectionFieldResponseService: SectionFieldResponseService,
  ) {}
  async generatePdf(title: string, reportId: string): Promise<Buffer> {
    const sectionFieldResponses =
      await this.sectionFieldResponseService.findAllForAReport(reportId);

    const responsesWithComments = sectionFieldResponses.filter(
      (response) => response.comment && response.comment.trim() !== '',
    );

    if (responsesWithComments.length === 0) {
      throw new Error('No section field responses with comments found.');
    }

    const PDFDocument = await getPDFDocument();

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (error: Error) =>
        reject(new Error(`PDF generation failed: ${error.message}`)),
      );

      doc.fontSize(20).text(title, { align: 'center' });
      doc.moveDown();

      responsesWithComments.forEach((response) => {
        if (response.sectionField) {
          doc.fontSize(14).text(response.sectionField.whatToCheck);
          doc.moveDown(0.5);

          if (response.sectionField.lawInspection) {
            doc.fontSize(10).text('Lovpligtig eftersyn: Ja');
          }
          if (response.sectionField.internalControl) {
            doc.fontSize(10).text('Intern kontrol: Ja');
          }
          if (response.sectionField.howToCheck) {
            doc
              .fontSize(10)
              .text(
                `Hvordan/hvor tjekkes: ${response.sectionField.howToCheck}`,
              );
          }
          if (response.sectionField.responsibility) {
            doc
              .fontSize(10)
              .text(`Ansvar: ${response.sectionField.responsibility}`);
          }
          doc.moveDown(0.5);
        }

        doc.fontSize(12).text(`Bemærkninger: ${response.comment}`);
        doc.moveDown(0.5);

        if (response.imageData) {
          try {
            const maxWidth = 500;
            const maxHeight = 400;

            doc.image(response.imageData, {
              fit: [maxWidth, maxHeight],
              align: 'center',
            });
            doc.moveDown();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            doc.fontSize(10).text(`[Intet billede tilgængeligt]`);
            doc.moveDown();
          }
        }

        doc.moveDown();
      });

      doc.end();
    });
  }
}
