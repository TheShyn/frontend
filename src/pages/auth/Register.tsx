import React from 'react';
import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { postRegister } from '../../api/auth';

export default function Register() {
    const onFinish = (values: any) => {
        console.log(values);
        
        postRegister(values)
        .then(data=>{
            console.log(data);
            message.success('Successfully register account')
        })
        .catch(err => {
            console.log(err);
            message.error(err?.response?.data?.message || "Something went wrong")
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            style={{

                backgroundColor: 'rgba( 248, 248, 255, 0.3 )',
                backdropFilter: 'blur(13px)',
                padding: '10px 50px',
                borderRadius: '10px',
                boxShadow: '0px 8px 32px 0 rgba(0,0,0,0.3)',
                minWidth: '450px'
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Typography.Title style={{ textAlign: 'center', marginBottom: '30px' }}>Register</Typography.Title>
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' },{
                    validator: (_, value) =>
                        !value.includes(" ")
                            ? Promise.resolve()
                            : Promise.reject(new Error("No spaces allowed"))
                }]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' },{
                    validator: (_, value) =>
                        !value.includes(" ")
                            ? Promise.resolve()
                            : Promise.reject(new Error("No spaces allowed"))
                }]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input confirm password!'
                    },
                    ({getFieldValue})=>({
                        validator(_,value){
                            if(!value || getFieldValue('password') === value){
                                return Promise.resolve()

                            }
                            return Promise.reject("The comfirm password is not matches the password")
                        }
                    }),
                    {
                        validator: (_, value) =>
                            !value.includes(" ")
                                ? Promise.resolve()
                                : Promise.reject(new Error("No spaces allowed"))
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>    

            <Form.Item wrapperCol={{}}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form.Item>
            <Typography.Paragraph style={{textAlign:'center'}}><Link to='/auth' >Login now</Link></Typography.Paragraph>
        </Form>
    )
}
