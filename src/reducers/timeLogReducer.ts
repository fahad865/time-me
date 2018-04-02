import types from '../actions/actionTypes';
import { TimeLog } from '../types';
import { TimeLogAction } from '../actions/timeLogActions';
import { initialState } from './index';

export default function timeLogReducer(
  state: TimeLog[] = initialState.timeLogs,
  action: TimeLogAction) {
  switch (action.type) {
    case types.LOAD_TIMELOGS_SUCCESS:
      return action.timeLogs;
    case types.EDIT_TIMELOG:
      action.timeLog.editable = true;
      return state.map(item => {
        return item.id === action.timeLog.id ? action.timeLog : item;
      });
    case types.SAVE_TIMELOG_SUCCESS:
      action.timeLog.editable = false;
      return state.map(item => {
        return item.id === action.timeLog.id ? action.timeLog : item;
      });
    case types.CREATE_TIMELOG_SUCCESS:
      return [...state, action.timeLog];
    case types.DELETE_TIMELOG_SUCCESS:
      return state.filter(timeLog => timeLog.id !== action.timeLog.id);
    case types.GET_TIMELOG_SUCCESS:
      return state.map(item => {
        return item.id === action.timeLog.id ? action.timeLog : item;
      });
    default:
      return state;
  }
}