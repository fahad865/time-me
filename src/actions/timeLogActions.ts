import types from './actionTypes';
import { TimeLog } from '../types';
import timeLogApi from '../api/mockTimeLogApi';
import { Dispatch } from 'react-redux';

export interface EditTimeLog {
  type: types.EDIT_TIMELOG;
  timeLog: TimeLog;
}

export interface AddTimeLogSuccess {
  type: types.ADD_TIMELOG_SUCCESS;
  timeLog: TimeLog;
}

export interface SaveTimeLogSuccess {
  type: types.SAVE_TIMELOG_SUCCESS;
  timeLog: TimeLog;
}

export interface DeleteTimeLogSuccess {
  type: types.DELETE_TIMELOG_SUCCESS;
  timeLog: TimeLog;
}

export interface LoadTimeLogsSuccess {
  type: types.LOAD_TIMELOGS_SUCCESS;
  timeLogs: TimeLog[];
}

export type TimeLogAction = AddTimeLogSuccess | SaveTimeLogSuccess | DeleteTimeLogSuccess | LoadTimeLogsSuccess
  | EditTimeLog;

function saveTimeLogSuccess(timeLog: TimeLog): SaveTimeLogSuccess {
  return {
    type: types.SAVE_TIMELOG_SUCCESS,
    timeLog
  };
}

function deleteTimeLogSuccess(timeLog: TimeLog): DeleteTimeLogSuccess {
  return {
    type: types.DELETE_TIMELOG_SUCCESS,
    timeLog
  };
}

function loadTimeLogsSuccess(timeLogs: TimeLog[]): LoadTimeLogsSuccess {
  return {
    type: types.LOAD_TIMELOGS_SUCCESS,
    timeLogs
  };
}

export function editTimeLog(timeLog: TimeLog): EditTimeLog {
  return {
    type: types.EDIT_TIMELOG,
    timeLog
  };
}

export function loadTimeLogs() {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.loadTimeLogs().then((response) => {
      dispatch(loadTimeLogsSuccess(response));
    })
      .catch(error => {
        throw (error);
      });
  };
}

export function saveTimeLog(timeLog: TimeLog) {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.saveTimeLog(timeLog).then((response) => {
      dispatch(saveTimeLogSuccess(response));
    })
      .catch(error => {
        throw (error);
      });
  };
}

export function deleteTimeLog(timeLog: TimeLog) {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.deleteTimeLog(timeLog).then((response) => {
      dispatch(deleteTimeLogSuccess(response));
    })
      .catch(error => {
        throw (error);
      });
  };
}