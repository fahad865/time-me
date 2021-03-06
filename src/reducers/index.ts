import { combineReducers } from 'redux';
import projects from './projectReducer';
import timer from './timerReducer';
import timeLogs from './timeLogReducer';
import error from './errorReducer';
import { StoreState } from '../types';
import { rootAction } from '../actions';

export const initialState: StoreState = {
  projects: [],
  timeLogs: [],
  timer: {
    timeElapsed: 0,
    timeLog: {
      id: '',
      description: '',
      projectId: '',
      timeElapsed: 0
    },
    isRunning: false
  },
  error: {
    errorMessage: ''
  }
};

const appReducer = combineReducers<StoreState>({
  projects,
  timeLogs,
  timer,
  error
});

const rootReducer = (state: StoreState, action: rootAction) => {
  return appReducer(state, action);
};

export default rootReducer;
