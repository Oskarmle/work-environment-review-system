export type SerializableFile = {
  name: string;
  type: string;
  size: number;
  dataUrl: string; // base64 encoded data URL
};

export type ReportResponse = {
  comment: string;
  image: File | null;
  isNotRelevant: boolean;
  isOkay: boolean;
  sectionFieldId: string;
  reportId: string;
};

export type SerializableReportResponse = {
  comment: string;
  image: SerializableFile | null;
  isNotRelevant: boolean;
  isOkay: boolean;
  sectionFieldId: string;
  reportId: string;
};

export type SectionFieldResponseForReport = {
  id: string;
  comment?: string;
  isNotRelevant: boolean;
  isOkay: boolean;
  sectionFieldId?: string;
  reportId?: string;
  sectionField?: { id: string };
  report?: { id: string };
  imageData?: any;
  imageMimeType?: string | null;
  imageFileName?: string | null;
  imageSize?: number | null;
};
