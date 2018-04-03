import * as React from 'react';
import { Project } from '../types/index';
import { Table, Icon, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import CreateProject from './CreateProject';
import EditableCell from './common/EditableCell';

export interface Props {
  projects: Project[];
  getProject: (id: string) => void;
  editProject: (item: Project) => void;
  saveProject: (item: Project) => void;
  deleteProject: (item: Project) => void;
}

class ProjectList extends React.Component<Props, { showCreateDialog: boolean }> {
  columns: ColumnProps<Project>[];
  form: any;
  constructor(props: Props) {
    super(props);
    this.state = { showCreateDialog: false };
    this.columns = [];
    this.columns.push(this.createColumn('name', 'Name', '40%'));
    this.columns.push(this.createColumn('hourlyRate', 'Hourly rate', '20%'));
    this.columns.push(this.createColumn('currency', 'Currency', '20%'));
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
    const target = this.props.projects.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.props.editProject(target);
    }
  }

  editItem(key: string) {
    const target = this.props.projects.filter(item => key === item.id)[0];
    if (target) {
      this.props.editProject(target);
    }
  }

  saveItem(key: string) {
    const target = this.props.projects.filter(item => key === item.id)[0];
    if (target) {
      this.props.saveProject(target);
    }
  }

  cancelItem(key: string) {
    this.props.getProject(key);
  }

  deleteItem(key: string) {
    const newData = [...this.props.projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      this.props.deleteProject(target);
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
      this.props.saveProject(values);
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
          <Button type="primary" icon="plus-circle" onClick={this.showModal}>New project</Button>
        </div>
        <Table
          className="App-component"
          rowKey={'id'}
          bordered={true}
          dataSource={this.props.projects}
          columns={this.columns}
          pagination={{position: 'bottom', defaultPageSize: 5}}
        />        
        <CreateProject
          ref={this.saveFormRef}
          show={this.state.showCreateDialog}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default ProjectList;