import ProjectList from '../components/ProjectList';
import { StoreState, Project } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/projectActions';

export type StateFromProps = {
    projects: Project[];
    // showCreateProjectDialog?: boolean;
};

export type DispatchFromProps = {    
    editProject: (item: Project) => void;
    updateProject: (item: Project) => void;
    deleteProject: (item: Project) => void;
    // showCreateProjectDialog: () => void;
    // hideCreateProjectDialog: () => void;
};

export function mapStateToProps({ projects }: StoreState) {
  return {
    projects
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<Project>): DispatchFromProps => ({    
    editProject: (item: Project) => dispatch(actions.editProject(item)),
    updateProject: (item: Project) => dispatch(actions.updateProject(item)),
    deleteProject: (item: Project) => dispatch(actions.deleteProject(item)),
    // showCreateProjectDialog: () => dispatch(actions.showCreateProjectDialog()),
    // hideCreateProjectDialog: () => dispatch(actions.hideCreateProjectDialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);