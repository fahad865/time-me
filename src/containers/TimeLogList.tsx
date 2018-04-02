import TimeLogList from '../components/TimeLogList';
import { StoreState, TimeLog, Project } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/timeLogActions';

export type StateFromProps = {
  timeLogs: TimeLog[];
  projects: Project[];
};

export type DispatchFromProps = {
  editTimeLog: (item: TimeLog) => void;
  saveTimeLog: (item: TimeLog) => void;
  deleteTimeLog: (item: TimeLog) => void;
  getTimeLog: (id: string) => void;
};

export function mapStateToProps({ timeLogs, projects }: StoreState) {
  return {
    timeLogs,
    projects
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<TimeLog>): DispatchFromProps => ({
  editTimeLog: (item: TimeLog) => dispatch(actions.editTimeLog(item)),
  saveTimeLog: (item: TimeLog) => dispatch(actions.saveTimeLog(item)),
  deleteTimeLog: (item: TimeLog) => dispatch(actions.deleteTimeLog(item)),
  getTimeLog: (id: string) => dispatch(actions.getTimeLog(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLogList);