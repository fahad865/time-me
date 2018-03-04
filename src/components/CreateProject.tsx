import * as React from 'react';
import { Project } from '../types/index';
import { Modal, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;

export interface Props {
    show: boolean;
    project?: Project;        
    onCreate: () => void;
    onCancel: () => void;
}

function CreateProject({show, project, onCreate, onCancel, form}: Props & FormComponentProps) {
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

export default Form.create<Props>() (CreateProject);