export type ReportResponse = {
  comment: string;
  image: File | null;
  isNotRelevant: boolean;
  isOkay: boolean;
  sectionFieldId: string;
  reportId: string;
};
