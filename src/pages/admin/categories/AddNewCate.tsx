import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    message
} from 'antd';
import { addNewCate } from '../../../api/categories';
export default function AddNewCate() {
    const onFinish = (values: any) => {
        const dataToServer = {
            name: values.name.trim().replace(/\s+/g, ' '),     
        }
        addNewCate(dataToServer)
            .then(data => {
                console.log(data);
                message.success("Create successfully")
            })
            .catch(error => {
                console.log(error);
                message.error(error?.response?.data?.message || "Something went wrong")

            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>

            <div style={{ fontSize: '30px' }}>Add new product</div>
            <div style={{ border: "1px solid #ccc", margin: '30px 0' }}></div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 30 }}
                layout="vertical"
                style={{ maxWidth: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name categories "
                    name="name"
                    rules={[{ required: true, message: 'Please input your name product!' }
                        
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Add new</Button>
                </Form.Item>
            </Form>
        </>
    )
}
