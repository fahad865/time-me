import * as React from 'react';
import { Project } from '../types/index';
import { Table, Input, Popconfirm, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';

export interface ProjectTableItem extends Project {    
    operation: string;
}

export interface Props {
    projects: Project[];    
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

function Projects({projects, updateProject, deleteProject}: Props) {  
  let columns: ColumnProps<ProjectTableItem>[] = [];
  columns.push(createColumn('name', 'Name', '40%'));
  columns.push(createColumn('hourlyRate', 'Hourly rate', '20%'));
  columns.push(createColumn('name', 'Currency', '20%'));
  columns.push({
    title: 'Operation',
    dataIndex: 'operation',
    render: (text, record) => {
      const { editable } = record;
      return (
        <div className="editable-row-operations">
          {
            editable ?
              <span>
                <a onClick={() => saveItem(record.id)}>Save</a>
                <Popconfirm title="Sure to cancel?" onConfirm={() => cancelItem(record.id)}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
              : 
              <span>                    
                  <Icon type="edit" className="App-icon" onClick={() => editItem(record.id)}/>
                  <Icon type="delete" className="App-icon" onClick={() => deleteItem(record.id)}/>                
              </span>
          }
        </div>
      );
    },
  });    

  function renderColumns(text: string, record: any, column: string) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => handleChange(value, record.id, column)}
      />
    );
  }
  
  function createColumn(propertyName: any, columnName: string, columnWidth: string) {
    return ({
      title: columnName,
      dataIndex: propertyName,
      width: columnWidth,
      render: (text: string, record: any) => renderColumns(text, record, propertyName),
    });
  }

  function handleChange(value: string, key: string, column: string) {    
    const newData = [...projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {      
      updateProject(target);
    }    
  }

  function editItem(key: string) {
    const newData = [...projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = true;
      updateProject(target);
    }
  }
  function saveItem(key: string) {
    const newData = [...projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = false;
      updateProject(target);      
    }
  }
  function cancelItem(key: string) {
    const newData = [...projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      // TODO: Reload data to undo last change
      // Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
      target.editable = false;
      updateProject(target);
    }
  }
  function deleteItem(key: string) {
    const newData = [...projects];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target.editable = false;
      deleteProject(target);      
    }
  }

  return <Table bordered={true} dataSource={projects} columns={columns} />;
}
    
export default Projects;