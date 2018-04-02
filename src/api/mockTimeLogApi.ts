// import { TimeLog } from '../types';
import delay from './delay';
import { replaceAll, ApiError } from './mockApiHelper';

export interface TimeLog {
  id: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  projectId: string;
  timeElapsed: number;
}

const timeLogs: TimeLog[] = [
  {
    id: 'log-1',
    description: 'Task 1',
    startTime: new Date(),
    endTime: new Date(),
    projectId: '1',
    timeElapsed: 0
  },
  {
    id: 'log-2',
    description: 'Task 2',
    startTime: new Date(),
    // endTime: new Date(),
    projectId: '2',
    timeElapsed: 0
  },
  {
    id: 'log-3',
    description: 'Task 3',
    startTime: new Date(),
    endTime: new Date(),
    projectId: '3',
    timeElapsed: 0
  }
];

// This would be performed on the server in a real app. Just stubbing in.
const generateId = (timeLog: TimeLog) => {
  return replaceAll(timeLog.description, ' ', '-');
};

class TimeLogApi {
  static loadTimeLogs() {
    return new Promise<TimeLog[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(timeLogs.filter((item) => item.endTime));
      }, delay);
    });
  }

  static getActiveTimer() {
    return new Promise<TimeLog>((resolve, reject) => {
      setTimeout(() => {
        let timer = timeLogs.filter((item) => !item.endTime)[0];
        if (timer) {
          timer.timeElapsed = Math.floor((Date.now() - timer.startTime!.getTime()) / 1000);
        }
        resolve(timeLogs.filter((item) => !item.endTime)[0]);
      }, delay);
    });
  }

  static saveTimeLog(timeLog: TimeLog) {
    timeLog = Object.assign({}, timeLog);
    return new Promise<TimeLog>((resolve, reject) => {
      setTimeout(() => {
        let validationResult = this.validateTimeLog(timeLog);
        if (!validationResult.pass) {
          reject(validationResult.message);
        }
        if (timeLog.id) {
          const timeLogIndex = timeLogs.findIndex(item => item.id === timeLog.id);
          timeLogs.splice(timeLogIndex, 1, timeLog);
        } else {
          timeLog.id = generateId(timeLog);
          timeLogs.push(timeLog);
        }
        resolve(timeLog);
      }, delay);
    });
  }

  static startTimer(timeLog: TimeLog) {
    timeLog.startTime = new Date();
    return this.saveTimeLog(timeLog);
  }

  static stopTimer(timeLog: TimeLog) {
    timeLog.endTime = new Date();
    return this.saveTimeLog(timeLog);
  }

  static deleteTimeLog(timeLog: TimeLog) {
    return new Promise<TimeLog>((resolve, reject) => {
      setTimeout(() => {
        const timeLogIndex = timeLogs.findIndex(item => item.id === timeLog.id);
        timeLogs.splice(timeLogIndex, 1);
        resolve(timeLog);
      }, delay);
    });
  }

  private static validateTimeLog(timeLog: TimeLog) {
    const minTimeLogNameLength = 1;
    let error: ApiError;
    if (timeLog.description.length < minTimeLogNameLength) {
      error = {
        pass: false,
        message: `Name must be at least ${minTimeLogNameLength} characters`
      };
    } else {
      error = {
        pass: true
      };
    }
    return error;
  }

}

export default TimeLogApi;