import types from './actionTypes';
import { Project } from '../types';
import projectApi from '../api/mockProjectApi';
import { Dispatch } from 'react-redux';

export interface AddProject {
    type: types.ADD_PROJECT;
    project: Project;
}

export interface EditProject {
    type: types.EDIT_PROJECT;
    project: Project;
}

export interface UpdateProject {
    type: types.UPDATE_PROJECT;
    project: Project;
}

export interface DeleteProject {
    type: types.DELETE_PROJECT;    
    project: Project;
}

export interface LoadProjects {
    type: types.LOAD_PROJECTS;        
}

export interface AddProjectSuccess {
    type: types.ADD_PROJECT_SUCCESS;
    project: Project;
}

export interface EditProjectSuccess {
    type: types.EDIT_PROJECT_SUCCESS;
    project: Project;
}

export interface UpdateProjectSuccess {
    type: types.UPDATE_PROJECT_SUCCESS;
    project: Project;
}

export interface DeleteProjectSuccess {
    type: types.DELETE_PROJECT_SUCCESS;    
    project: Project;
}

export interface LoadProjectsSuccess {
    type: types.LOAD_PROJECTS_SUCCESS;    
    projects: Project[];
}

export type ProjectAction = AddProjectSuccess | UpdateProjectSuccess | DeleteProjectSuccess | LoadProjectsSuccess
    | AddProject | EditProject | UpdateProject | DeleteProject | LoadProjects;

function updateProjectSuccess(project: Project): UpdateProjectSuccess {
    return {
        type: types.UPDATE_PROJECT_SUCCESS,
        project
    };
}

function deleteProjectSuccess(project: Project): DeleteProjectSuccess {
    return {
        type: types.DELETE_PROJECT_SUCCESS,        
        project
    };
}

function loadProjectsSuccess(projects: Project[]): LoadProjectsSuccess {
    return {
        type: types.LOAD_PROJECTS_SUCCESS,
        projects        
    };
}

export function editProject(project: Project): EditProject {
    return {
        type: types.EDIT_PROJECT,
        project
    };
}

export function loadProjects() {
    return function(dispatch: Dispatch<ProjectAction>) {
        return projectApi.loadProjects().then((response) => {
            dispatch(loadProjectsSuccess(response));
        })
        .catch(error => {            
            throw (error);
        });
    };
}

export function updateProject(project: Project) {
    return function(dispatch: Dispatch<ProjectAction>) {
        return projectApi.updateProject(project).then((response) => {
            dispatch(updateProjectSuccess(response));
        })
        .catch(error => {            
            throw (error);
        });
    };
}

export function deleteProject(project: Project) {
    return function(dispatch: Dispatch<ProjectAction>) {
        return projectApi.deleteProject(project).then((response) => {
            dispatch(deleteProjectSuccess(response));
        })
        .catch(error => {            
            throw (error);
        });
    };
}