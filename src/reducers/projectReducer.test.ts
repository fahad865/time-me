import projectReducer from './projectReducer';
import * as actions from '../actions/projectActions';
import { Project } from '../types';

function setupInitialState(): Project[] {
  return [{
    id: '1',
    currency: 'DKK',
    hourlyRate: 100,
    name: 'Project 1',
    timeSpent: 0
  }, {
    id: '2',
    currency: 'DKK',
    hourlyRate: 200,
    name: 'Project 2',
    timeSpent: 0
  }];
}

describe('Project reducer', () => {
  it('should add project on CREATE_PROJECT_SUCCESS', () => {
    const initialState = setupInitialState();
    const newProject = {
      id: '3',
      currency: 'DKK',
      hourlyRate: 300,
      name: 'Project 3',
      timeSpent: 0
    };

    const action = actions.createProjectSuccess(newProject);

    const newState = projectReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual('Project 1');
    expect(newState[1].name).toEqual('Project 2');
    expect(newState[2].name).toEqual('Project 3');
  });
});