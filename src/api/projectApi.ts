import { Project } from './types';
import * as constants from './constants';

class ProjectApi {
  static loadProjects() {
    return fetch(`${constants.serverUrl}/project`, {
      method: 'get',
      headers: constants.requestHeader
    });
  }

  static getProject(id: string) {
    return fetch(`${constants.serverUrl}/project/${id}`, {
      method: 'get',
      headers: constants.requestHeader
    });
  }

  static saveProject(project: Project) {
    if (project.id) {
      return fetch(`${constants.serverUrl}/project/${project.id}`, {
        method: 'put',
        headers: constants.requestHeader,
        body: JSON.stringify(project)
      });
    } else {
      return fetch(`${constants.serverUrl}/project`, {
        method: 'post',
        headers: constants.requestHeader,
        body: JSON.stringify(project)
      });
    }
  }

  static deleteProject(project: Project) {
    return fetch(`${constants.serverUrl}/project/${project.id}`, {
      method: 'delete',
      headers: constants.requestHeader,
      body: JSON.stringify(project)
    });
  }
}

export default ProjectApi;