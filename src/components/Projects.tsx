import * as React from 'react';
import { Project } from '../types/index';
import { Table, Input, Popconfirm, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';

export interface ProjectTableItem extends Project {    
    operation: string;
}
export interface Props {
    projects: Project[];
    editProject?: () => void;
    updateProject?: () => void;
    deleteProject?: () => void;
}

export interface CellProps {
    editable: boolean;
    value: any;
    onChange: (event: any) => void;
}

/*
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
*/
const EditableCell = ({ editable, value, onChange }: CellProps) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class Projects extends React.Component<Props, {data: Project[]}> {
  cacheData: Project[];
  columns: ColumnProps<ProjectTableItem>[];
  
  constructor(props: Props) {
    super(props);    
    this.columns = [{
      title: 'Name',
      dataIndex: 'name',
      width: '40%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: 'Hourly rate',
      dataIndex: 'hourlyRate',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'hourlyRate'),
    }, {
      title: 'Currency',
      dataIndex: 'currency',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'currency'),
    }, {
      title: 'Operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : 
                <span>                    
                    <Icon type="edit" className="App-icon" onClick={() => this.edit(record.key)}/>
                    <Icon type="delete" className="App-icon" onClick={() => this.delete(record.key)}/>                
                </span>
            }
          </div>
        );
      },
    }];
    this.state = { data: this.props.projects };
    this.cacheData = this.props.projects.map(item => ({ ...item }));
  }
  renderColumns(text: string, record: any, column: string) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value: string, key: string, column: string) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key: string) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key: string) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key: string) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  delete(key: string) {
    const newData = [...this.state.data].filter(item => key !== item.key);    
    this.setState({ data: newData });
    this.cacheData = newData.map(item => ({ ...item }));    
  }
  render() {
    return <Table bordered={true} dataSource={this.state.data} columns={this.columns} />;
  }
}

export default Projects;