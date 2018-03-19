import { Row, Col, Input, Select, Button } from 'antd';
import * as React from 'react';
import ElapsedTime from './ElapsedTime';
import { Project, RunningTimer } from '../../types';
const InputGroup = Input.Group;
const Option = Select.Option;

export interface Props {
  timer: RunningTimer;
  projects: Project[];
  startTimer: (item: RunningTimer) => void;
  stopTimer: (item: RunningTimer) => void;
  loadTimeLogs: () => void;
  handleTimerChange: (item: RunningTimer) => void;
}

class Timer extends React.Component<Props, { timerHandle: any }> {
  // timerHandle: any;
  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    // tslint:disable-next-line:no-debugger
    // debugger;
    // if (!this.timerHandle && !!nextProps.timer.timeLog.id) {
    if (nextProps.timer.isRunning && !this.props.timer.isRunning) {
      // tslint:disable-next-line:no-console
      // console.log('in1', this.timerHandle);
      // tslint:disable-next-line:no-console
      console.log('in2', nextProps.timer);
      const newHandle = setInterval(this.updateElapsedTime, 1000);
      const timer = Object.assign({}, nextProps.timer);
      timer.timerHandle = newHandle;
      nextProps.handleTimerChange(timer);
      // this.setState({ timerHandle: newHandle });
    }
  }

  getElapsedTime = (startTime: Date) => {
    return Math.floor((Date.now() - startTime.getTime()) / 1000);
  }

  startTimer = () => {
    const timer = Object.assign({}, this.props.timer);
    this.props.startTimer(timer);
    // this.timerHandle = setInterval(this.updateElapsedTime, 1000);
  }

  stopTimer = () => {
    // tslint:disable-next-line:no-debugger
    debugger;
    const timer = Object.assign({}, this.props.timer);
    this.props.stopTimer(timer);
    this.props.loadTimeLogs();
    clearInterval(timer.timerHandle);
    // this.setState({ timerHandle: undefined });
  }

  updateElapsedTime = () => {
    if (this.props.timer.timeLog.startTime) {
      const timer = Object.assign({}, this.props.timer);
      timer.timeElapsed = this.getElapsedTime(timer.timeLog.startTime!);
      this.props.handleTimerChange(timer);
    } else {
      // clearInterval(this.timerHandle);
    }
  }

  handleDescriptionChange = (event: any) => {
    const timer = Object.assign({}, this.props.timer);
    timer.timeLog.description = event.target.value;
    this.props.handleTimerChange(timer);
  }

  handleProjectSelection = (value: string) => {
    const timer = Object.assign({}, this.props.timer);
    timer.timeLog.projectId = value;
    this.props.handleTimerChange(timer);
  }

  render() {
    const { projects, timer } = this.props;
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col >
            <InputGroup compact={true} >
              <Select
                value={timer.timeLog.projectId}
                onChange={this.handleProjectSelection}
                placeholder="Project"
                style={{ width: 80 }}
              >
                {
                  projects.map((item, index) =>
                    <Option key={index} value={item.id}>{item.name}</Option>
                  )
                }
              </Select>
              <Input
                style={{ width: '65%' }}
                placeholder="New task"
                value={timer.timeLog.description}
                onChange={this.handleDescriptionChange}
              />
            </InputGroup>
          </Col>
          <Col>
            {
              this.props.timer.isRunning ?
                <Button type="danger" icon="check" shape="circle" onClick={this.stopTimer} />
                :
                <Button type="primary" icon="caret-right" shape="circle" onClick={this.startTimer} />
            }
          </Col>
          <Col>
            <ElapsedTime elapsedTime={this.props.timer.timeElapsed} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Timer;