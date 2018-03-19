export interface StoreState {
  projects: Project[];
  timeLogs: TimeLog[];
  timer: RunningTimer;
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