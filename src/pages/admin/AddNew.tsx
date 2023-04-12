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
import { addNewProduct } from '../../api/Product';
import { useEffect, useState } from 'react';
import { getAllCate } from '../../api/categories';
import cloudinaryUpload from '../../api/update';

// interface IForm{
//     name: string,
//     price: string
// }

// const schema = yup.object({
//     name: yup.string().required("Không được bỏ trống"),
//     price: yup.number().typeError('Vui lòng nhập một số').required("Không được bỏ trống").positive('Giá phải lớn hơn 0')
// })
interface Cate {
    _id: string,
    name: string,
    products: []
}
export default function AddNew() {
    const { TextArea } = Input;
    const [categories, setCategories] = useState<Cate[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const onFinish = (values: any) => {
        const dataToServer = {
            ...values,
            name: values.name.trim().replace(/\s+/g, ' '),
            description: values.description.trim().replace(/\s+/g, ' '),
            
        }
        console.log(dataToServer);
        
        
        const uploadData = new FormData();
        uploadData.append("file", values.img.target.files[0], "file");
        console.log(uploadData.get("file"))
        cloudinaryUpload(uploadData)
        .then(data =>{
            console.log(data);
            dataToServer.img = data.data.secure_url
            addNewProduct(dataToServer)
            .then(res => {
                message.success("Add successful")
                console.log(res)
            })
            .catch(err => {
                console.log(err);
                
                message.error(err?.response?.data?.message || "Something went wrong")
            })
        })
        .catch(err => console.log(err))
        // cloudinaryUpload()


        
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // const {register, handleSubmit, formState: { errors }} = useForm<IForm>({
    //     resolver: yupResolver(schema),
    //     reValidateMode: "onBlur"
    // })
    // const onSubmit:SubmitHandler<IForm> = (data) =>{
    //     console.log(data);
    //     addNewProduct(data)
    //     .then(item => console.log(item));


    //     // e.preventDefault()
    // }
    const option = categories
    console.log(categories);
    useEffect(() => {
        getAllCate()
            .then(data => {
                setCategories(data.data.data.map((item:Cate)=>{
                    return {
                        key:item._id,
                        label:item.name,
                        value:item._id
                    }
                }));
                setIsLoading(true)
            })
    }, [])
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
                    label="Name Product "
                    name="name"
                    rules={[{ required: true, message: 'Please input your name product!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price "
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                
                <Form.Item
                    label="Categories"
                    name='categoryId'
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
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                name ="description"
                rules={[{ required: true, message: 'Please input your description!' },]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList"
                name="img"
                rules={[{ required: true, message: 'Please upload your img' }]}
                >
                    <input  type="file" id="" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">Add new</Button>
                </Form.Item>
            </Form>
        </>
    );
}
