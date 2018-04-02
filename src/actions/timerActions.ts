import types from './actionTypes';
import { RunningTimer } from '../types';
import { Dispatch } from 'react-redux';
import timeLogApi from '../api/timeLogApi';
import { loadTimeLogs } from './timeLogActions';

export interface StartTimerSuccess {
  type: types.START_TIMER_SUCCESS;
  timer: RunningTimer;
}

export interface StopTimerSuccess {
  type: types.STOP_TIMER_SUCCESS;
  timer: RunningTimer;
}

export interface LoadTimerSuccess {
  type: types.LOAD_TIMER_SUCCESS;
  timer: RunningTimer;
}

export interface HandleTimerChange {
  type: types.HANDLE_TIMER_CHANGE;
  timer: RunningTimer;
}

export interface IncrementTimer {
  type: types.INCREMENT_TIMER;
}

interface TimerUpdated {
  type: types.TIMER_UPDATED;
  data: string;
}
export type TimerAction = StartTimerSuccess | StopTimerSuccess | LoadTimerSuccess | HandleTimerChange
  | IncrementTimer;

function startTimerSuccess(timer: RunningTimer): StartTimerSuccess {
  return {
    type: types.START_TIMER_SUCCESS,
    timer
  };
}

function stopTimerSuccess(timer: RunningTimer): StopTimerSuccess {
  return {
    type: types.STOP_TIMER_SUCCESS,
    timer
  };
}

function loadTimerSuccess(timer: RunningTimer): LoadTimerSuccess {
  return {
    type: types.LOAD_TIMER_SUCCESS,
    timer
  };
}

export function handleTimerChange(timer: RunningTimer): HandleTimerChange {
  return {
    type: types.HANDLE_TIMER_CHANGE,
    timer
  };
}

export function incrementTimer(): IncrementTimer {
  return {
    type: types.INCREMENT_TIMER,
  };
}

function timerUpdated(id: string): TimerUpdated {
  return {
    type: types.TIMER_UPDATED,
    data: id
  };
}

export function startTimer(timer: RunningTimer) {
  return function (dispatch: Dispatch<TimerAction>) {
    return timeLogApi.startTimer(timer.timeLog).then(response => response.json()).then(response => {
      dispatch(startTimerSuccess({
        timeElapsed: 0,
        timeLog: {
          description: response.description,
          id: response._id,
          projectId: response.projectId,
          startTime: response.startTime,
          timeElapsed: response.timeElapsed
        },
        isRunning: true
      }));
      dispatch(timerUpdated(response._id));
    }).catch(error => {
      throw (error);
    });
  };
}

export function stopTimer(timer: RunningTimer) {
  return function (dispatch: Dispatch<TimerAction>) {
    return timeLogApi.stopTimer(timer.timeLog).then((response) => {
      dispatch(stopTimerSuccess({
        timeElapsed: 0,
        timeLog: {
          description: '',
          id: '',
          projectId: '',
          timeElapsed: 0
        },
        isRunning: false
      }));
      clearInterval(timer.timerHandle);
      dispatch(loadTimeLogs());
      dispatch(timerUpdated(timer.timeLog.id));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadTimer() {
  return function (dispatch: Dispatch<TimerAction>) {
    return timeLogApi.getActiveTimer()
      .then(handleErrors)
      .then(response => response.json())
      .then(response => {
        dispatch(loadTimerSuccess({
          timeElapsed: 0,
          timeLog: {
            description: response.description,
            id: response._id,
            projectId: response.projectId,
            startTime: response.startTime,
            timeElapsed: response.timeElapsed
          },
          isRunning: true
        }));
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(error);
        dispatch(loadTimerSuccess({
          timeElapsed: 0,
          timeLog: {
            description: '',
            id: '',
            projectId: '',
            timeElapsed: 0
          },
          isRunning: false
        }));
      });
  };
}

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}