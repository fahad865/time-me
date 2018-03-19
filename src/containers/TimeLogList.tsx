import TimeLogList from '../components/TimeLogList';
import { StoreState, TimeLog } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/timeLogActions';

export type StateFromProps = {
  timeLogs: TimeLog[];
};

export type DispatchFromProps = {
  editTimeLog: (item: TimeLog) => void;
  saveTimeLog: (item: TimeLog) => void;
  deleteTimeLog: (item: TimeLog) => void;
};

export function mapStateToProps({ timeLogs }: StoreState) {
  return {
    timeLogs
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<TimeLog>): DispatchFromProps => ({
  editTimeLog: (item: TimeLog) => dispatch(actions.editTimeLog(item)),
  saveTimeLog: (item: TimeLog) => dispatch(actions.saveTimeLog(item)),
  deleteTimeLog: (item: TimeLog) => dispatch(actions.deleteTimeLog(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLogList);