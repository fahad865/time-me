export interface Project {
  id: string;
  name: string;
  hourlyRate: number;
  currency: string;
  timeSpent: number;
}

export interface TimeLog {
  id: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  timeElapsed?: number;
  projectId: string;
}

export interface ApiError {
  pass: boolean;
  code?: string;
  message?: string;
}