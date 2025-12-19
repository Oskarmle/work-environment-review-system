type PDFDocumentType = {
  text(text: string, x?: number, y?: number): PDFDocumentType;
  text(
    text: string,
    options?: { align?: string; width?: number },
  ): PDFDocumentType;
  fontSize(size: number): PDFDocumentType;
  moveDown(lines?: number): PDFDocumentType;
  font(fontName: string): PDFDocumentType;
  fillColor(color: string): PDFDocumentType;
  rect(x: number, y: number, width: number, height: number): PDFDocumentType;
  stroke(): PDFDocumentType;
  fill(color: string): PDFDocumentType;
  lineWidth(width: number): PDFDocumentType;
  image(
    src: Buffer | string,
    x?: number,
    y?: number,
    options?: {
      fit?: [number, number];
      align?: string;
      valign?: string;
      width?: number;
      height?: number;
    },
  ): PDFDocumentType;
  image(
    src: Buffer | string,
    options?: {
      fit?: [number, number];
      align?: string;
      valign?: string;
      width?: number;
      height?: number;
    },
  ): PDFDocumentType;
  y: number;
  x: number;
  page: {
    width: number;
    height: number;
    margins: { left: number; right: number; top: number; bottom: number };
  };
  addPage(): PDFDocumentType;
  end(): void;
  on(event: 'data', listener: (chunk: Buffer) => void): PDFDocumentType;
  on(event: 'end', listener: () => void): PDFDocumentType;
  on(event: 'error', listener: (error: Error) => void): PDFDocumentType;
};

export type PDFDocumentConstructor = {
  new (options?: {
    margin?: number;
    size?: string | number[];
    layout?: 'portrait' | 'landscape';
  }): PDFDocumentType;
};
