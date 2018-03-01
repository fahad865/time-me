import types from '../actions/actionTypes';
import { Project } from '../types';
import { ProjectAction } from '../actions/projectActions';
import { initialState } from './index';

export default function projectReducer(state: Project[] = initialState.projects, action: ProjectAction): Project[] {
    switch (action.type) {
        case types.LOAD_PROJECTS_SUCCESS:
            return action.projects;
        case types.EDIT_PROJECT:
            action.project.editable = true;
            return state.map(item => {                
                return item.id === action.project.id ? action.project : item;
            });            
        case types.UPDATE_PROJECT_SUCCESS:
            action.project.editable = false;
            return state.map(item => {
                return item.id === action.project.id ? action.project : item;
            });
        case types.DELETE_PROJECT_SUCCESS:
            return [...state.filter(project => project.id !== action.project.id)];
        default:            
            return state;    
    }
}