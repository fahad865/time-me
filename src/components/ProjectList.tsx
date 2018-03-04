import * as React from 'react';
import { Project } from '../types/index';
import { Table, Input, Popconfirm, Icon, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import CreateProject from './CreateProject';

export interface Props {
    projects: Project[];  
    // showCreateDialog: boolean;
    editProject: (item: Project) => void;  
    updateProject: (item: Project) => void;
    deleteProject: (item: Project) => void;
    // showCreateProjectDialog: () => void;
    // hideCreateProjectDialog: () => void;
}

export interface CellProps {
    editable: boolean;
    value: any;
    onChange: (event: any) => void;
}

const EditableCell = ({ editable, value, onChange }: CellProps) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class ProjectList extends React.Component<Props, {showCreateDialog: boolean}> {  
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
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancelItem(record.id)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : 
                <span>                    
                  <Icon type="edit" className="App-icon" onClick={() => this.editItem(record.id)}/>
                  <Icon type="delete" className="App-icon" onClick={() => this.deleteItem(record.id)}/>                
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
      this.props.updateProject(target);      
    }
  }
  cancelItem(key: string) {    
    const target = this.props.projects.filter(item => key === item.id)[0];
    if (target) {
      // TODO: Reload data to undo last change
      // Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);      
      this.props.updateProject(target);
    }
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
    this.setState({ showCreateDialog: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err: any, values: any) => {
      if (err) {
        return;
      }

      // tslint:disable-next-line:no-console
      console.log('Received values of form: ', values);
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
          dataSource={this.props.projects} 
          columns={this.columns} 
        />
        <div className="App-component" style={{textAlign: 'left', marginTop: '-55px'}}>
          <Button type="primary" onClick={this.showModal}>Create new project</Button>        
        </div>
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