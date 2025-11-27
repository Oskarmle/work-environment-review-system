export type ReportResponse = {
  id: string;
  comment: string;
  imageUrl: string;
  isCompleted: boolean;
  isNotRelevant?: boolean;
  isOkay?: boolean;
  sectionFieldId: string;
  reportId: string;
};
