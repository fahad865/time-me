import Timer from '../../components/common/Timer';
import { StoreState, RunningTimer, Project } from '../../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../actions/timerActions';
import { loadTimeLogs } from '../../actions/timeLogActions';

export type StateFromProps = {
  timer: RunningTimer;
  projects: Project[];
};

export type DispatchFromProps = {
  startTimer: (item: RunningTimer) => void;
  stopTimer: (item: RunningTimer) => void;
  handleTimerChange: (item: RunningTimer) => void;
  loadTimeLogs: () => void;
};

export function mapStateToProps({ projects, timer }: StoreState) {
  return {
    projects,
    timer
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<RunningTimer | Project[]>): DispatchFromProps => ({
  startTimer: (item: RunningTimer) => dispatch(actions.startTimer(item)),
  stopTimer: (item: RunningTimer) => dispatch(actions.stopTimer(item)),
  loadTimeLogs: () => dispatch(loadTimeLogs()),
  handleTimerChange: (item: RunningTimer) => dispatch(actions.handleTimerChange(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);