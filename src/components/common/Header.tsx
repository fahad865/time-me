import { Menu, Icon, Row, Col, Input, Select, Button } from 'antd';
import * as React from 'react';
const InputGroup = Input.Group;
const Option = Select.Option;

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
        <div style={{ backgroundColor: '#ededee'}}>
          <br />
          <Row type="flex" justify="space-between">
            <Col>
              <Menu
                style={{ background: 'transparent'}}
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
              <Col span={20} >
                <InputGroup compact={true} >
                  <Select placeholder="Project" style={{ width: 100 }}>
                    <Option value="Project A">Project A</Option>
                    <Option value="Project B">Project B</Option>
                  </Select>
                  <Input style={{ width: '60%' }} placeholder="New task" />            
                </InputGroup>
              </Col>
              <Col span={4}>
                {
                  this.state.isTimerRunning ?
                    <div>
                    <Col span={14}>
                    <Button type="danger" icon="pause" shape="circle" onClick={this.stopTimer} />
                    </Col>
                    <Col span={10}>
                    <Button type="danger" icon="check" shape="circle" onClick={this.stopTimer} />
                    </Col>
                    </div>
                  :
                    <Button type="primary" icon="caret-right" shape="circle" onClick={this.startTimer} />
                }
              </Col>
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