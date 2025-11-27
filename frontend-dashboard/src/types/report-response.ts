export type ReportResponse = {
  id: string;
  comment: string;
  imageUrl: string;
  isCompleted: boolean;
  isRelevant?: boolean;
  isOkay?: boolean;
  sectionFieldId: string;
  reportId: string;
};
