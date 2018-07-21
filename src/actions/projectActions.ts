import types from './actionTypes';
import { Project } from '../types';
import projectApi from '../api/projectApi';
import { Dispatch } from 'react-redux';
import { actionFailure } from './errorActions';

export interface EditProject {
  type: types.EDIT_PROJECT;
  project: Project;
}

export interface CreateProjectSuccess {
  type: types.CREATE_PROJECT_SUCCESS;
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

export interface GetProjectSuccess {
  type: types.GET_PROJECT_SUCCESS;
  project: Project;
}

interface ProjectUpdated {
  type: types.PROJECT_UPDATED;
  data: string;
}

export type ProjectAction = CreateProjectSuccess | UpdateProjectSuccess | DeleteProjectSuccess | LoadProjectsSuccess
  | EditProject | GetProjectSuccess;

export function updateProjectSuccess(project: Project): UpdateProjectSuccess {
  return {
    type: types.UPDATE_PROJECT_SUCCESS,
    project
  };
}

export function createProjectSuccess(project: Project): CreateProjectSuccess {
  return {
    type: types.CREATE_PROJECT_SUCCESS,
    project
  };
}

export function deleteProjectSuccess(project: Project): DeleteProjectSuccess {
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

function getProjectSuccess(project: Project): GetProjectSuccess {
  return {
    type: types.GET_PROJECT_SUCCESS,
    project
  };
}

function projectUpdated(id: string): ProjectUpdated {
  return {
    type: types.PROJECT_UPDATED,
    data: id
  };
}

export function loadProjects() {
  return function (dispatch: Dispatch<ProjectAction>) {
    return projectApi.loadProjects().then(response => response.json()).then(response => {
      dispatch(loadProjectsSuccess(response.map((value: any) => {
        return { ...value, id: value._id };
      })));
    })
      .catch(error => {
        dispatch(actionFailure({
          errorMessage: 'Failed to load projects'
        }));
        throw (error);
      });
  };
}

export function getProject(id: string) {
  return function (dispatch: Dispatch<ProjectAction>) {
    return projectApi.getProject(id).then(response => response.json()).then(response => {
      dispatch(getProjectSuccess({
        ...response,
        id: response._id,
      }));
    })
      .catch(error => {
        dispatch(actionFailure({
          errorMessage: 'Failed to get project'
        }));
        throw (error);
      });
  };
}

export function saveProject(project: Project) {
  return function (dispatch: Dispatch<ProjectAction>) {
    return projectApi.saveProject(project).then(response => response.json()).then(response => {
      if (project.id) {
        dispatch(updateProjectSuccess({
          ...response,
          id: response._id,
        }));
      } else {
        dispatch(createProjectSuccess({
          ...response,
          id: response._id,
        }));
      }
      dispatch(projectUpdated(response._id));
    })
      .catch(error => {
        dispatch(actionFailure({
          errorMessage: 'Failed to save project'
        }));
        throw (error);
      });
  };
}

export function deleteProject(project: Project) {
  return function (dispatch: Dispatch<ProjectAction>) {
    return projectApi.deleteProject(project).then((response) => {
      dispatch(deleteProjectSuccess(project));
      dispatch(projectUpdated(project.id));
    })
      .catch(error => {
        dispatch(actionFailure({
          errorMessage: 'Failed to delete project'
        }));
        throw (error);
      });
  };
}