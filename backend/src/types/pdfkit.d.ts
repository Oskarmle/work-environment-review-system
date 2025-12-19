declare module 'pdfkit' {
  import { Readable } from 'stream';

  namespace PDFKit {
    interface PDFDocumentOptions {
      compress?: boolean;
      info?: DocumentInfo;
      userPassword?: string;
      ownerPassword?: string;
      permissions?: {
        printing?: string;
        modifying?: boolean;
        copying?: boolean;
        annotating?: boolean;
        fillingForms?: boolean;
        contentAccessibility?: boolean;
        documentAssembly?: boolean;
      };
      pdfVersion?: string;
      autoFirstPage?: boolean;
      size?: string | number[];
      margin?: number;
      margins?: { top: number; left: number; bottom: number; right: number };
      layout?: 'portrait' | 'landscape';
      bufferPages?: boolean;
    }

    interface DocumentInfo {
      Title?: string;
      Author?: string;
      Subject?: string;
      Keywords?: string;
      CreationDate?: Date;
      ModDate?: Date;
    }

    interface PDFDocument extends Readable {
      // Text methods
      text(
        text: string,
        x?: number,
        y?: number,
        options?: {
          align?: string;
          width?: number;
          height?: number;
          ellipsis?: boolean | string;
          columns?: number;
          columnGap?: number;
          indent?: number;
          paragraphGap?: number;
          lineGap?: number;
          wordSpacing?: number;
          characterSpacing?: number;
          fill?: boolean;
          stroke?: boolean;
          link?: string;
          underline?: boolean;
          strike?: boolean;
          continued?: boolean;
        },
      ): this;

      fontSize(size: number): this;
      font(font: string): this;
      fillColor(color: string): this;
      strokeColor(color: string): this;
      lineWidth(width: number): this;
      moveDown(lines?: number): this;
      moveUp(lines?: number): this;

      // Document methods
      end(): void;
      addPage(options?: PDFDocumentOptions): this;

      // Events
      on(event: 'data', listener: (chunk: Buffer) => void): this;
      on(event: 'end', listener: () => void): this;
      on(event: 'error', listener: (error: Error) => void): this;
      on(event: string, listener: (...args: unknown[]) => void): this;
    }
  }

  interface PDFDocumentConstructor {
    new (options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument;
  }

  const PDFDocument: PDFDocumentConstructor;
  export = PDFDocument;
}
