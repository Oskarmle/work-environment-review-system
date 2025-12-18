export type CreateReport = {
  isCompleted: boolean;
  focusAreaId: string;
  stationId: string;
  comment?: string;
  userId: string;
  notificationEmails?: string[];
};

export type Report = {
  id: string;
  isCompleted: boolean;
  focusArea: {
    id: string;
    name: string;
  };
  station: {
    id: string;
    stationName: string;
  };
  notificationEmails?: string[];
  comment?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
