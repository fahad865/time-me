import { Menu, Icon, Row, Col } from 'antd';
import * as React from 'react';
import Timer from '../../containers/common/Timer';

class Header extends React.Component {
  state = {
    current: 'timelog',
    isTimerRunning: false
  };

  handleClick = (e: any) => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  startTimer = () => {
    this.setState({
      isTimerRunning: true
    });
  }

  stopTimer = () => {
    this.setState({
      isTimerRunning: false
    });
  }

  render() {
    return (
      <div>
        <div style={{ backgroundColor: '#ededee' }}>
          <br />
          <Row type="flex" justify="space-between">
            <Col>
              <Menu
                style={{ background: 'transparent' }}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="timelog">
                  <Icon type="clock-circle" />Time Log
                </Menu.Item>
                <Menu.Item key="projects">
                  <Icon type="folder" />Projects
                </Menu.Item>
              </Menu>
            </Col>
            <Col style={{ margin: '10px 10px 10px 0' }}>
              <Timer />
              { /*
              <Row type="flex" justify="space-between">
                <Col >
                  <InputGroup compact={true} >
                    <Select placeholder="Project" style={{ width: 80 }}>
                      <Option value="Project A">Project A</Option>
                      <Option value="Project B">Project B</Option>
                    </Select>
                    <Input style={{ width: '65%' }} placeholder="New task" />
                  </InputGroup>
                </Col>
                <Col>
                  {
                    this.state.isTimerRunning ?
                      <Button type="danger" icon="check" shape="circle" onClick={this.stopTimer} />
                      :
                      <Button type="primary" icon="caret-right" shape="circle" onClick={this.startTimer} />
                  }
                </Col>
                <Col>
                  <ElapsedTime elapsedTime={97} />
                </Col>
              </Row>
              */}
            </Col>
          </Row>
          <br />
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default Header;