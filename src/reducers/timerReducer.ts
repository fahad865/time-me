import types from '../actions/actionTypes';
import { RunningTimer } from '../types';
import { TimerAction } from '../actions/timerActions';
import { initialState } from './index';

export default function timerReducer(state: RunningTimer = initialState.timer, action: TimerAction) {
  switch (action.type) {
    case types.LOAD_TIMER_SUCCESS:
    case types.START_TIMER_SUCCESS:
    case types.STOP_TIMER_SUCCESS:
    case types.HANDLE_TIMER_CHANGE:
      return { ...action.timer };
    case types.INCREMENT_TIMER:
      return {
        ...state,
        timeLog: {
          ...state.timeLog,
          timeElapsed: state.timeLog.timeElapsed + 1
        }
      };
    default:
      return state;
  }
}
