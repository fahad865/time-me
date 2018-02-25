export interface StoreState {
  projects: Project[];
  timeRegistrations: TimeRegistration[];  
}

export interface Project {
  key: string;
  name: string;
  hourlyRate: number;
  currency: string;
  editable?: boolean;
}

export interface TimeRegistration {
  description: string;
  startTime: Date;
  endTime: Date;
  projectName: string;
}
