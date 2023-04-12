import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router-dom'
import { getDetailUser, updateUser } from '../../../api/user';

interface Cate {
    _id: string,
    role: string,
}
interface IOption{
    value: string,
    key:string,
    label:string
}
export default function UpdateUser() {
    const { id } = useParams()
    const option:IOption[] = [
        {
            key:'1',
            label:'admin',
            value:'admin'
        },
        {
            key:'2',
            label:'user',
            value:'user'
        },

    ]
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<Partial<Cate>>({})
    const [defaultUser, setDefaultUser] = useState({})
    const onFinish = (values: any) => {
        console.log('value',values);
        updateUser(id, values)
        .then(data=>{
            message.success("updated successfully")
            console.log(data);
            
        })
        .catch(err=>{
            message.error("error updating user")
            console.log(err);
            
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        getDetailUser(id)
            .then(data => {
                setUser(
                    {
                        _id: data.data.data._id,
                        role: data.data.data.role
                    }
                );
                setDefaultUser({
                    value:data.data.data.role,
                    label:data.data.data.role,
                    key:data.data.data._id,
                    _id: data.data.data._id,
                })
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
                    initialValues={{ role: user?.role }}
                >
                    <Form.Item
                    label="Role"
                    name='role'
                    rules={[{ required: true, message: 'Please set your categories!' }]}
                >
                    {/* <Select>
                        {categories && categories.map(item => {
                            return (
                                <Select.Option key={item._id} value="demo">{item.name}</Select.Option>

                            )
                        })}
                    </Select> */}
                    <Select
                    options={ option}
                    defaultValue={defaultUser}
                    />
                </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Add new</Button>
                    </Form.Item>
                </Form>
            }
        </>
    )
}
