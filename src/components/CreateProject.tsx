import * as React from 'react';
import { Project } from '../types/index';
import { Modal, Form, Input, InputNumber, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;

export interface Props {
  show: boolean;
  project?: Project;
  onCreate: () => void;
  onCancel: () => void;
}

function CreateProject({ show, project, onCreate, onCancel, form }: Props & FormComponentProps) {
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={show}
      title="Create a new project"
      okText="Create"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name of project' }],
          })(
            <Input />
          )}
        </FormItem>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="Hourly rate">
              {getFieldDecorator('hourlyRate')(<InputNumber />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Currency">
              {getFieldDecorator('currency')(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Form.create<Props>()(CreateProject);