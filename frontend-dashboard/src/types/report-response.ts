export type ReportResponse = {
  comment: string;
  image: File | null;
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
