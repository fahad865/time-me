import types from './actionTypes';
import { AppError } from '../types';

export interface ActionFailure {
  type: types.ACTION_FAILURE;
  error: AppError;
}

export interface ErrorReset {
  type: types.ERROR_RESET;
}

export type ErrorAction = ActionFailure | ErrorReset;

export function actionFailure(error: AppError): ActionFailure {
  return {
    type: types.ACTION_FAILURE,
    error
  };
}

export function errorReset(): ErrorReset {
  return {
    type: types.ERROR_RESET
  };
}