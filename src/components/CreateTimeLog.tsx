import * as React from 'react';
import { TimeLog, Project } from '../types/index';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;
const Option = Select.Option;

export interface Props {
  show: boolean;
  timeLog?: TimeLog;
  projects: Project[];
  onCreate: () => void;
  onCancel: () => void;
}

function CreateTimeLog({ show, timeLog, projects, onCreate, onCancel, form }: Props & FormComponentProps) {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={show}
      title="Log time"
      okText="Log"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter the log description' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="Project">
          {getFieldDecorator('projectId')(
            <Select placeholder="Project">
              {
                projects.map((item, index) =>
                  <Option key={index} value={item.id}>{item.name}</Option>
                )
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="Start time">
          {getFieldDecorator('startTime', {
            rules: [{ required: true, message: 'Please enter the start time' }],
          })(
            <DatePicker
              showTime={true}
              format="DD-MM-YYYY HH:mm:ss"
              placeholder="Select Time"
              style={{ margin: '-5px 0' }}
            />
          )}
        </FormItem>
        <FormItem label="End time">
          {getFieldDecorator('endTime', {
            rules: [{ required: true, message: 'Please enter the end time' }],
          })(
            <DatePicker
              showTime={true}
              format="DD-MM-YYYY HH:mm:ss"
              placeholder="Select Time"
              style={{ margin: '-5px 0' }}
            />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create<Props>()(CreateTimeLog);