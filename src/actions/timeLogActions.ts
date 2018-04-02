import types from './actionTypes';
import { TimeLog } from '../types';
import timeLogApi from '../api/timeLogApi';
import { Dispatch } from 'react-redux';

export interface EditTimeLog {
  type: types.EDIT_TIMELOG;
  timeLog: TimeLog;
}

export interface CreateTimeLogSuccess {
  type: types.CREATE_TIMELOG_SUCCESS;
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

export interface GetTimeLogSuccess {
  type: types.GET_TIMELOG_SUCCESS;
  timeLog: TimeLog;
}

interface TimeLogUpdated {
  type: types.TIMELOG_UPDATED;
  data: string;
}

export type TimeLogAction = CreateTimeLogSuccess | SaveTimeLogSuccess | DeleteTimeLogSuccess | LoadTimeLogsSuccess
  | EditTimeLog | GetTimeLogSuccess;

function saveTimeLogSuccess(timeLog: TimeLog): SaveTimeLogSuccess {
  return {
    type: types.SAVE_TIMELOG_SUCCESS,
    timeLog
  };
}

function createTimeLogSuccess(timeLog: TimeLog): CreateTimeLogSuccess {
  return {
    type: types.CREATE_TIMELOG_SUCCESS,
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

function getTimeLogSuccess(timeLog: TimeLog): GetTimeLogSuccess {
  return {
    type: types.GET_TIMELOG_SUCCESS,
    timeLog
  };
}

function timeLogUpdated(id: string): TimeLogUpdated {
  return {
    type: types.TIMELOG_UPDATED,
    data: id
  };
}

export function loadTimeLogs() {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.loadTimeLogs().then(response => response.json()).then(response => {
      dispatch(loadTimeLogsSuccess(response.map((value: any) => {
        return {
          ...value,
          id: value._id,
          startTime: new Date(value.startTime),
          endTime: new Date(value.endTime)
        };
      })));
    })
      .catch(error => {
        throw (error);
      });
  };
}

export function getTimeLog(id: string) {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.getTimeLog(id).then(response => response.json()).then(response => {
      dispatch(getTimeLogSuccess({
        ...response,
        id: response._id,
        startTime: new Date(response.startTime),
        endTime: new Date(response.endTime)
      }));
    })
      .catch(error => {
        throw (error);
      });
  };
}

export function saveTimeLog(timeLog: TimeLog) {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.saveTimeLog(timeLog).then(response => response.json()).then(response => {
      if (timeLog.id) {
        dispatch(saveTimeLogSuccess({
          ...response,
          id: response._id,
          startTime: new Date(response.startTime),
          endTime: new Date(response.endTime)
        }));
      } else {
        dispatch(createTimeLogSuccess({
          ...response,
          id: response._id,
          startTime: new Date(response.startTime),
          endTime: new Date(response.endTime)
        }));
      }
      dispatch(timeLogUpdated(response._id));
    })
      .catch(error => {
        throw (error);
      });
  };
}

export function deleteTimeLog(timeLog: TimeLog) {
  return function (dispatch: Dispatch<TimeLogAction>) {
    return timeLogApi.deleteTimeLog(timeLog).then((response) => {
      dispatch(deleteTimeLogSuccess(timeLog));
      dispatch(timeLogUpdated(timeLog.id));
    })
      .catch(error => {
        throw (error);
      });
  };
}