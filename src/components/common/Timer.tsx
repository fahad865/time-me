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
  incrementTimer: () => void;
}

class Timer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.timer.timeLog.id !== this.props.timer.timeLog.id && this.props.timer.timerHandle) {
      clearInterval(this.props.timer.timerHandle);
    }
    if (nextProps.timer.isRunning && !nextProps.timer.timerHandle) {
      const newHandle = setInterval(this.updateElapsedTime, 1000);
      const timer = { ...nextProps.timer };
      timer.timerHandle = newHandle;
      nextProps.handleTimerChange(timer);
    }
  }

  startTimer = () => {
    const timer = Object.assign({}, this.props.timer);
    this.props.startTimer(timer);
  }

  stopTimer = () => {
    const timer = Object.assign({}, this.props.timer);
    this.props.stopTimer(timer);
    // clearInterval(timer.timerHandle);
  }

  updateElapsedTime = () => {
    this.props.incrementTimer();
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
            <ElapsedTime elapsedTime={this.props.timer.timeLog.timeElapsed} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Timer;