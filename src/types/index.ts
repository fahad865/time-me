export interface StoreState {
  projects: Project[];
  timeLogs: TimeLog[];
  timer: RunningTimer;
  error: AppError;
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

export interface TimeLog {
  id: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  timeElapsed: number;
  projectId: string;
  editable?: boolean;
  operation?: string;
}

export interface RunningTimer {
  timeElapsed: number;
  timeLog: TimeLog;
  isRunning: boolean;
  timerHandle?: any;
}

export interface AppError {
  errorMessage: string;
}