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
import { addNewProduct, getOneProduct, updateProduct } from '../../api/Product';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IData from '../../models/Products';
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
interface IDefault {
    value:string,
    label:string
}
export default function UpdateProduct() {
    const { id } = useParams()
    const [isProductLoaded, setIsProductLoaded] = useState(false);
    const [categories, setCategories] = useState<Cate[]>([])
    const [defaultCate, setDefaultCate] = useState<Partial<IDefault>>({})
    const { TextArea } = Input;    
    const [product, setProduct] = useState<Partial<IData>>({})
    console.log(product);
    
    const onFinish = (values: any) => {
        console.log(values.categoriesId)
        const dataToServer = {
            ...values,
            name: values.name.trim().replace(/\s+/g, ' '),
            description: values.description.trim().replace(/\s+/g, ' '),
            
        }
        if(dataToServer.categoryId === undefined){
            // console.log(defaultCate.value)
            dataToServer.categoryId = defaultCate.value
        }
      
        if(dataToServer.img === undefined){
            dataToServer.img = product.img
            updateProduct(id, dataToServer)
            .then(data => {
                message.success("Update successful")

                console.log(data)
            })
            .catch(err => {
                message.error(err?.response?.data?.message || "Something went wrong")
            })
        }else{

            const uploadData = new FormData();
            uploadData.append("file", dataToServer.img.target.files[0], "img");
            cloudinaryUpload(uploadData)
            .then(data=>{
                
                dataToServer.img = data.data.secure_url
                updateProduct(id, dataToServer)
                    .then(data => {
                        message.success("Update successful")
        
                        console.log(data)
                    })
                    .catch(err => {
                        message.error(err?.response?.data?.message || "Something went wrong")
                    })
            })
            .catch(err=>{
                message.error(err?.response?.data?.message || "Something went wrong")

            })
        }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        getOneProduct(id)
            .then(data => {
                setProduct(data.data.data)
                setIsProductLoaded(true)
                setDefaultCate({
                    value:data.data.data.categoryId._id,
                    label:data.data.data.categoryId.name
                })
            })
            .catch(error => console.log('Failed:', error))

    }, [])
    const option = categories
    useEffect(() => {
        getAllCate()
            .then(data => {
                setCategories(data.data.data.map((item: Cate) => {
                    return {
                        key: item._id,
                        label: item.name,
                        value: item._id
                    }
                }));
            })
    }, [])
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

    return (
        <>
            <div style={{ fontSize: '30px' }}>Update product</div>
            <div style={{ border: "1px solid #ccc", margin: '30px 0' }}></div>
            {isProductLoaded &&
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 30 }}
                    layout="vertical"
                    style={{ maxWidth: '100%' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={{ name: product?.name, price: product?.price,description:product?.description }}
                >
                    <Form.Item
                        label="Name Product "
                        name="name"
                        rules={[{ required: true, message: 'Please input your name product!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price "
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Categories"
                    name='categoryId'
                    // rules={[{ required: true, message: 'Please set your categories!' }]}
                    >
                        <Select
                            options={option}
                            defaultValue={defaultCate}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                    name ="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList"
                    name="img"
                    // rules={[{ required: true, message: 'Please upload your img' }]}
                    >
                        <input type="file" name="img"  id="" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Add new</Button>
                    </Form.Item>
                </Form>
            }
        </>
    );
}
