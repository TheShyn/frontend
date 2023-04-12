import React from 'react';
import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../api/auth';

export default function Login() {
    const navigate = useNavigate()
    const user = localStorage.getItem('userInformation');
    if(user){
        navigate('/')
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        postLogin(values)
        .then(data=>{
            console.log(data.data);
            const objData = {
                accessToken: data.data.accessToken,
                ...data.data.user
            }
            localStorage.setItem('userInformation', JSON.stringify(objData));
            if(objData.role ==='user'){
                location.replace("/");
                
            }else{
                location.replace("/admin");

            }
            message.success('Successfully logged in')
            // (window as { location: { reload: () => void } }).location.reload();
            // setTimeout(()=>{navigate('/')},1000)
            
        })
        .catch(err =>{
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
                padding:'10px 50px',
                borderRadius:'10px',
                boxShadow:'0px 8px 32px 0 rgba(0,0,0,0.3)',
                minWidth: '450px'
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Typography.Title style ={{textAlign:'center', marginBottom:'30px'}}>Login</Typography.Title>
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
                }   ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item valuePropName="checked" wrapperCol={{ }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item wrapperCol={{ }}>
                <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                    Submit
                </Button>
            </Form.Item>
            <Typography.Paragraph>Doesn't have account ? <Link to ='/auth/register'>Register now</Link></Typography.Paragraph>
        </Form>
    )
}
