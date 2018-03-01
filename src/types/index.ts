export interface StoreState {
  projects: Project[];
  // timeRegistrations: TimeRegistration[];  
}

export interface Project {
  id: string;
  name: string;
  hourlyRate: number;
  currency: string;
  timeSpent: number;
  editable?: boolean;
  operation?: string;
}

export interface TimeRegistration {
  description: string;
  startTime: Date;
  endTime: Date;
  projectId: string;
}
