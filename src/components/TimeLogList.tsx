import * as React from 'react';
import { TimeLog, Project } from '../types/index';
import { Table, Icon, Button, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import CreateTimeLog from './CreateTimeLog';
import EditableCell from './common/EditableCell';
const Option = Select.Option;

export interface Props {
  timeLogs: TimeLog[];
  projects: Project[];
  editTimeLog: (item: TimeLog) => void;
  saveTimeLog: (item: TimeLog) => void;
  deleteTimeLog: (item: TimeLog) => void;
  getTimeLog: (id: string) => void;
}

class TimeLogList extends React.Component<Props, { showCreateDialog: boolean }> {
  columns: ColumnProps<TimeLog>[];
  form: any;
  constructor(props: Props) {
    super(props);
    this.state = { showCreateDialog: false };
    this.columns = [];
    this.columns.push(this.createColumn('description', 'Description', '30%'));
    this.columns.push(this.createColumn('projectId', 'Project', '20%'));
    this.columns.push(this.createColumn('startTime', 'Start time', '15%'));
    this.columns.push(this.createColumn('endTime', 'End time', '15%'));
    this.columns.push({
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.saveItem(record.id)}>Save</a>
                  <a onClick={() => this.cancelItem(record.id)}>Cancel</a>
                </span>
                :
                <span>
                  <Icon type="edit" className="App-icon" onClick={() => this.editItem(record.id)} />
                  <Icon type="delete" className="App-icon" onClick={() => this.deleteItem(record.id)} />
                </span>
            }
          </div>
        );
      },
    });
  }

  renderColumns(text: string, record: any, column: string) {
    return column === 'projectId' ? (
      record.editable ? (
        <Select
          disabled={!record.editable}
          value={text}
          style={{ width: '100%' }}
          placeholder="Project"
          onChange={value => this.handleChange(value, record.id, column)}
        >
          {
            this.props.projects.map((item, index) =>
              <Option key={index} value={item.id}>{item.name}</Option>
            )
          }
        </Select>
      ) : (
          (() => {
            const item = this.props.projects.find(value => { return value.id === text; });
            return item ? item.name : '';
          })()
        )
    ) : (
        <EditableCell
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.id, column)}
        />
      );
  }

  createColumn(propertyName: any, columnName: string, columnWidth: string) {
    return ({
      title: columnName,
      dataIndex: propertyName,
      width: columnWidth,
      render: (text: string, record: any) => this.renderColumns(text, record, propertyName),
    });
  }

  handleChange(value: any, key: string, column: string) {
    const target = this.props.timeLogs.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.props.editTimeLog(target);
    }
  }

  editItem(key: string) {
    const target = this.props.timeLogs.filter(item => key === item.id)[0];
    if (target) {
      this.props.editTimeLog(target);
    }
  }
  saveItem(key: string) {
    const target = this.props.timeLogs.filter(item => key === item.id)[0];
    if (target) {
      this.props.saveTimeLog(target);
    }
  }
  cancelItem(key: string) {
    this.props.getTimeLog(key);
  }
  deleteItem(key: string) {
    const newData = [...this.props.timeLogs];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      this.props.deleteTimeLog(target);
    }
  }

  showModal = () => {
    this.setState({ showCreateDialog: true });
  }
  handleCancel = () => {
    this.form.resetFields();
    this.setState({ showCreateDialog: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }
      this.props.saveTimeLog(values);
      form.resetFields();
      this.setState({ showCreateDialog: false });
    });
  }

  saveFormRef = (form: any) => {
    this.form = form;
  }

  render() {
    return (
      <div>
        <div className="App-component" style={{ textAlign: 'right' }}>
          <Button type="primary" icon="plus-circle" onClick={this.showModal}>Manual log entry</Button>
        </div>
        <Table
          className="App-component"
          rowKey={'id'}
          bordered={true}
          dataSource={this.props.timeLogs}
          columns={this.columns}
          pagination={{position: 'bottom', defaultPageSize: 5}}
        />        
        <CreateTimeLog
          ref={this.saveFormRef}
          show={this.state.showCreateDialog}
          projects={this.props.projects}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default TimeLogList;