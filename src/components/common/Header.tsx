import { Menu, Icon, Row, Col } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../containers/common/Timer';

const Header: React.SFC<{}> = () => (
  <div>
    <div style={{ backgroundColor: '#ededee' }}>
      <br />
      <Row type="flex" justify="space-between">
        <Col>
          <Menu
            style={{ background: 'transparent' }}
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            mode="horizontal"
          >
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home" />Home
                  </Link>
            </Menu.Item>
            <Menu.Item key="/timelogs">
              <Link to="/timelogs">
                <Icon type="clock-circle" />Time Log
                  </Link>
            </Menu.Item>
            <Menu.Item key="/projects">
              <Link to="/projects">
                <Icon type="folder" />Projects
                  </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col style={{ margin: '10px 10px 10px 0' }}>
          <Timer />
        </Col>
      </Row>
      <br />
    </div>
    <br />
    <br />
  </div>
);

export default Header;