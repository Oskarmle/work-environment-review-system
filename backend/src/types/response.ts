export type SectionFieldResponseType = {
  comment?: string;
  isNotRelevant?: boolean;
  isOkay?: boolean;
  sectionField: { id: string };
  report: { id: string };
  imageData?: Buffer;
  imageMimeType?: string;
  imageFileName?: string;
  imageSize?: number;
};
