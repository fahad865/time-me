import types from '../actions/actionTypes';
import { AppError } from '../types';
import { ErrorAction } from '../actions/errorActions';
import { initialState } from './index';

export default function errorReducer(state: AppError = initialState.error, action: ErrorAction) {
  switch (action.type) {
    case types.ACTION_FAILURE:
      return state.errorMessage ? {
        errorMessage: state.errorMessage + '; ' + action.error.errorMessage
      } : { ...action.error };
    case types.ERROR_RESET:
      return {
        errorMessage: ''
      };
    default:
      return state;
  }
}
