export type SectionField = {
  id: string;
  whatToCheck: string;
  lawInspection: boolean;
  internalControl: boolean;
  howToCheck?: string;
  responsibility?: string;
  section: {
    id: string;
    title: string;
  };
};
