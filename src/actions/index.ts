import { ProjectAction } from './projectActions';
import { TimerAction } from './timerActions';
import { TimeLogAction } from './timeLogActions';

export type rootAction = ProjectAction | TimerAction | TimeLogAction;