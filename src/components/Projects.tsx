import * as React from 'react';
import { Project } from '../types/index';
import { Table, Input, Popconfirm, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';

export interface Props {
    projects: Project[];  
    editProject: (item: Project) => void;  
    updateProject: (item: Project) => void;
    deleteProject: (item: Project) => void;
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

class Projects extends React.Component<Props, {}> {  
  columns: ColumnProps<Project>[];   
  constructor(props: Props) {
    super(props);    
    // tslint:disable-next-line:no-console
    console.log('3', props.projects);
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
  render() {
    return <Table rowKey={'id'} bordered={true} dataSource={this.props.projects} columns={this.columns} />;
  }
}
    
export default Projects;