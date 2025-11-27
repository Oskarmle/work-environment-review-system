export type CreateReport = {
  isCompleted: boolean;
  focusAreaId: string;
  stationId: string;
  comment?: string;
  reportBeganAt: string;
  userId: string;
};
