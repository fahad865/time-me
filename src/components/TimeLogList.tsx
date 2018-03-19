import * as React from 'react';
import { TimeLog } from '../types/index';
import { Table, Popconfirm, Icon, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import CreateTimeLog from './CreateTimeLog';
import EditableCell from './common/EditableCell';

export interface Props {
  timeLogs: TimeLog[];
  editTimeLog: (item: TimeLog) => void;
  saveTimeLog: (item: TimeLog) => void;
  deleteTimeLog: (item: TimeLog) => void;
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
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancelItem(record.id)}>
                    <a>Cancel</a>
                  </Popconfirm>
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
    return (
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

  handleChange(value: string, key: string, column: string) {
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
    const target = this.props.timeLogs.filter(item => key === item.id)[0];
    if (target) {
      // TODO: Reload data to undo last change
      // Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);      
      this.props.saveTimeLog(target);
    }
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
    this.setState({ showCreateDialog: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }

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
        <Table
          className="App-component"
          rowKey={'id'}
          bordered={true}
          dataSource={this.props.timeLogs}
          columns={this.columns}
        />
        <div className="App-component" style={{ textAlign: 'left', marginTop: '-57px' }}>
          <Button type="primary" icon="plus-circle" onClick={this.showModal}>Manual time log</Button>
        </div>
        <CreateTimeLog
          ref={this.saveFormRef}
          show={this.state.showCreateDialog}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default TimeLogList;