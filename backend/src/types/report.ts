export type Report = {
  id: string;
  doesAmgKnowTasks: boolean;
  reportAccidents: boolean;
  workWithRelevantAmgAreas: boolean;
  followUpApvAndWellBeing: boolean;
  actionPlanMade: boolean;
  comment?: boolean;
  revisedAt: Date;
  isCompleted: boolean;
};
