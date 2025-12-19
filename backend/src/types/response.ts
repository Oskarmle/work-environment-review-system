export type SectionFieldResponseType = {
  comment?: string;
  isNotRelevant?: boolean;
  isOkay?: boolean;
  sectionFieldId: string;
  reportId: string;
  imageData?: Buffer;
  imageMimeType?: string;
  imageFileName?: string;
  imageSize?: number;
};
