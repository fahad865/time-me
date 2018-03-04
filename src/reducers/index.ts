import { combineReducers } from 'redux';
import projects from './projectReducer';
import { StoreState } from '../types';
import { rootAction } from '../actions';

export const initialState: StoreState = {
    projects: [],
    // showCreateProjectDialog: false,
    // timeRegistrations: []
};

const appReducer = combineReducers<StoreState>({
  projects
});

const rootReducer = (state: StoreState, action: rootAction) => {
  return appReducer(state, action);
};

export default rootReducer;
