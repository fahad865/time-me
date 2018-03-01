// import { Project } from '../types';
import delay from './delay';
import { replaceAll, ApiError } from './mockApiHelper';

export interface Project {
    id: string;
    name: string;
    hourlyRate: number;
    currency: string;
    timeSpent: number;    
}

const projects: Project[] = [
    {
        id: 'project-1',
        name: 'Project 1',
        hourlyRate: 20,
        currency: 'USD',
        timeSpent: 0
    },
    {
        id: 'project-2',
        name: 'Project 2',
        hourlyRate: 40,
        currency: 'USD',
        timeSpent: 0
    },
    {
        id: 'project-3',
        name: 'Project 3',
        hourlyRate: 60,
        currency: 'USD',
        timeSpent: 0
    }
];

// This would be performed on the server in a real app. Just stubbing in.
const generateId = (project: Project) => {
    return replaceAll(project.name, ' ', '-');
};

class ProjectApi {
    static loadProjects() {
        return new Promise<Project[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], projects));
            },         delay);
        });
    }

    static updateProject(project: Project) {
        project = Object.assign({}, project);
        return new Promise<Project>((resolve, reject) => {
            setTimeout(() => {
                let validationResult = this.validateProject(project);
                if (!validationResult.pass) {
                    reject(validationResult.message);                    
                }
                if (project.id) {                    
                    const projectIndex = projects.findIndex(item => item.id === project.id);
                    projects.splice(projectIndex, 1, project);
                } else {                    
                    project.id = generateId(project);                    
                    projects.push(project);
                }
          
                resolve(project);
            },         delay);
        });
    }

    static deleteProject(project: Project) {
        return new Promise<Project>((resolve, reject) => {
            setTimeout(() => {
                const projectIndex = projects.findIndex(item => item.id === project.id);
                projects.splice(projectIndex, 1);
                resolve(project);
            },         delay);
        });
    }

    private static validateProject(project: Project) {
        const minProjectNameLength = 1;
        let error: ApiError;
        if (project.name.length < minProjectNameLength) {
            error = {
                pass: false,
                message: `Name must be at least ${minProjectNameLength} characters`
            };                        
        } else {
            error = {
                pass: true                
            };
        }
        return error;
    }

}

export default ProjectApi;