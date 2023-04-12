import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailCate, updateCate } from '../../../api/categories'
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

interface Cate {
    _id: string,
    name: string
}
export default function UpdateCate() {
    const { id } = useParams()
    const [cate, setCate] = useState<Partial<Cate>>({})
    const [loading, setLoading] = useState(false)
    const onFinish = (values: any) => {
        console.log('value', values);
        const dataToServer = {
            name: values.name.trim().replace(/\s+/g, ' '),     
        }
        updateCate(id,dataToServer)
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
    useEffect(() => {
        getDetailCate(id)
            .then(data => {
                setCate(
                    {
                        _id: data.data.data._id,
                        name: data.data.data.name
                    }
                );
                setLoading(true)
            })
            .catch(error => {
                console.log(error);

            })
    }, [])
    return (
        <>

            <div style={{ fontSize: '30px' }}>Add new product</div>
            <div style={{ border: "1px solid #ccc", margin: '30px 0' }}></div>
            {loading &&
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 30 }}
                    layout="vertical"
                    style={{ maxWidth: '100%' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ name: cate?.name }}
                >
                    <Form.Item
                        label="Name categories "
                        name="name"
                        rules={[{ required: true, message: 'Please input your name product!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Add new</Button>
                    </Form.Item>
                </Form>
            }
        </>
    )
}
