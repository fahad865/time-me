import types from './actionTypes';
import { RunningTimer } from '../types';
import { Dispatch } from 'react-redux';
import timeLogApi from '../api/mockTimeLogApi';

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

export type TimerAction = StartTimerSuccess | StopTimerSuccess | LoadTimerSuccess | HandleTimerChange;

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

export function startTimer(timer: RunningTimer) {
  return function (dispatch: Dispatch<TimerAction>) {
    return timeLogApi.startTimer(timer.timeLog).then((response) => {
      dispatch(startTimerSuccess({
        timeElapsed: 0,
        timeLog: response,
        isRunning: true
      }));
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
          projectId: ''
        },
        isRunning: false
      }));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadTimer() {
  return function (dispatch: Dispatch<TimerAction>) {
    return timeLogApi.getActiveTimer().then((response) => {
      dispatch(loadTimerSuccess((response) ? {
        timeElapsed: Date.now() - response.startTime!.getTime() / 1000,
        timeLog: response,
        isRunning: true
      } : {
          timeElapsed: 0,
          timeLog: {
            description: '',
            id: '',
            projectId: ''
          },
          isRunning: false
        }));
    }).catch(error => {
      throw (error);
    });
  };
}