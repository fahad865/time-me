import { TimeLog } from './types';
import * as constants from './constants';

class TimeLogApi {
  static loadTimeLogs() {
    return fetch(`${constants.serverUrl}/timelog`, {
      method: 'get',
      headers: constants.requestHeader
    });
  }

  static getActiveTimer() {
    return fetch(`${constants.serverUrl}/timer`, {
      method: 'get',
      headers: constants.requestHeader
    });
  }

  static startTimer(timeLog: TimeLog) {
    return fetch(`${constants.serverUrl}/timer`, {
      method: 'post',
      headers: constants.requestHeader,
      body: JSON.stringify(timeLog)
    });
  }

  static stopTimer(timeLog: TimeLog) {
    return fetch(`${constants.serverUrl}/timer/${timeLog.id}`, {
      method: 'put',
      headers: constants.requestHeader,
      body: JSON.stringify(timeLog)
    });
  }

  static getTimeLog(id: string) {
    return fetch(`${constants.serverUrl}/timelog/${id}`, {
      method: 'get',
      headers: constants.requestHeader
    });
  }

  static saveTimeLog(timeLog: TimeLog) {
    if (timeLog.id) {
      return fetch(`${constants.serverUrl}/timelog/${timeLog.id}`, {
        method: 'put',
        headers: constants.requestHeader,
        body: JSON.stringify(timeLog)
      });
    } else {
      return fetch(`${constants.serverUrl}/timelog`, {
        method: 'post',
        headers: constants.requestHeader,
        body: JSON.stringify(timeLog)
      });
    }
  }

  static deleteTimeLog(timeLog: TimeLog) {
    return fetch(`${constants.serverUrl}/timelog/${timeLog.id}`, {
      method: 'delete',
      headers: constants.requestHeader,
      body: JSON.stringify(timeLog)
    });
  }

}

export default TimeLogApi;