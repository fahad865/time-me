import types from '../actions/actionTypes';
import { RunningTimer } from '../types';
import { TimerAction } from '../actions/timerActions';
import { initialState } from './index';

export default function timerReducer(state: RunningTimer = initialState.timer, action: TimerAction) {
  switch (action.type) {
    case types.START_TIMER_SUCCESS:
      return action.timer;
    case types.STOP_TIMER_SUCCESS:
      return action.timer;
    case types.HANDLE_TIMER_CHANGE:
      return action.timer;
    default:
      return state;
  }
}
