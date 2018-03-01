import Projects from '../components/Projects';
import { StoreState, Project } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/projectActions';

export type StateFromProps = {
    projects: Project[];
};

export type DispatchFromProps = {    
    editProject: (item: Project) => void;
    updateProject: (item: Project) => void;
    deleteProject: (item: Project) => void;
};

export function mapStateToProps({ projects }: StoreState) {
  // tslint:disable-next-line:no-console
  console.log('4', projects);
  return {
    projects
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<Project>): DispatchFromProps => ({    
    editProject: (item: Project) => dispatch(actions.editProject(item)),
    updateProject: (item: Project) => dispatch(actions.updateProject(item)),
    deleteProject: (item: Project) => dispatch(actions.deleteProject(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);