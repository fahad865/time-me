import * as React from 'react';
import { TimeLog } from '../types/index';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;

export interface Props {
  show: boolean;
  timeLog?: TimeLog;
  onCreate: () => void;
  onCancel: () => void;
}

function CreateTimeLog({ show, timeLog, onCreate, onCancel, form }: Props & FormComponentProps) {
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
        <FormItem label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title of collection!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create<Props>()(CreateTimeLog);