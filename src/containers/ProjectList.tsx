import ProjectList from '../components/ProjectList';
import { StoreState, Project } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/projectActions';

export type StateFromProps = {
  projects: Project[];
  // showCreateProjectDialog?: boolean;
};

export type DispatchFromProps = {
  getProject: (id: string) => void;
  editProject: (item: Project) => void;
  saveProject: (item: Project) => void;
  deleteProject: (item: Project) => void;
};

export function mapStateToProps({ projects }: StoreState) {
  return {
    projects
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<Project>): DispatchFromProps => ({
  getProject: (id: string) => dispatch(actions.getProject(id)),
  editProject: (item: Project) => dispatch(actions.editProject(item)),
  saveProject: (item: Project) => dispatch(actions.saveProject(item)),
  deleteProject: (item: Project) => dispatch(actions.deleteProject(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);