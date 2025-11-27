export type ReportResponse = {
  comment: string;
  // FIXME: Update to be string when image is a Cloudinary URL
  imageUrl: File | null;
  isNotRelevant: boolean;
  isOkay: boolean;
  sectionFieldId: string;
  reportId: string;
};
