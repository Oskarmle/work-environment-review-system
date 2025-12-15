export type CreateReport = {
  isCompleted: boolean;
  focusAreaId: string;
  stationId: string;
  comment?: string;
  userId: string;
};

export type Report = {
  id: string;
  isCompleted: boolean;
  focusAreaId: string;
  stationId: string;
  comment?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
