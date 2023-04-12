import React, { useEffect, useState } from 'react'
import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
import { delteProduct, getAllProduct } from '../../api/Product';
import IData from '../../models/Products'
import { Input } from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
interface DataType {
    key: string | number;
    _id: string;
    name: string;
    price: number;
}
const ProductManagementPage = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [data, setData] = useState<DataType[]>([])
    const [selectItems, setSelectItems] = useState<string[]>([])
    const [search, setSearch] = useState<DataType[]>([])
    const [text, setText] = useState('')
    const { Search } = Input;
    const removeItem = function (id: string) {
        const a = confirm("Are you sure about that =)) ?")
        if (a) {
            delteProduct(id)
                .then(items => {
                    getAllProduct()
                        .then(data => {
                            message.success("Delete successful")
                            setData(data.data.map((item: IData) => {
                                return {
                                    key: item._id,
                                    ...item
                                }
                            }));
                        })

                })
                .catch(err => {
                    message.error(err?.response?.data?.message || "Something went wrong")
                    console.log(err)

                })

        }

    }

    const handleRemoveSelected = function(){
        let a = confirm("Are you sure about that =)) ?")
        if(a){

            const deletePromise = selectItems.map(id=>{
                return delteProduct(id)
            })
    
            Promise.all(deletePromise)
            .then(response => {
                message.success("Delete items successfully")
                setSelectItems([])
                getAllProduct()
                .then(data=>{
                    setData(data.data.map((item: IData) => {
                        return {
                            key: item._id,
                            ...item
                        }
                    }));
                })
            })
            .catch(err=>{
                message.error("Some thing went wrong")
            })
        }
        
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
            render: (img) => <img style={{ width: '100px' }} src={img} alt="Product Image" />
        },
        {
            title: 'Category',
            dataIndex: 'cate',
            key: 'cate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: DataType) => {
                return (

                    <Space size="middle">
                        <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeItem(record._id)}>Remove</Button>
                        <Button type="primary" ><Link to={`/admin/products/${record._id}/update`}>Update</Link></Button>
                    </Space>
                )
            },
        },
    ];
    const handleSearch = function (e: any) {
        const value = e.target.value
        setText(value)
        if (value.length > 0) {
            setSearch(data.filter(item => {
                return item.name.includes(value)
            }))
        } else {
            setSearch([])
        }

    }
    // const data: DataType[] = props.products.map((item: IProduct) => {
    //     return {
    //         key: item.id,
    //         ...item
    //     }
    // })
    console.log(selectItems);
    
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectItems(selectedRowKeys.map(key => String(key)));
        },

    };
    console.log(data)
    useEffect(() => {
        getAllProduct()
            .then(data => {
                
                setData(data.data.map((item: IData) => {
                    return {
                        key: item._id,
                        cate:item?.categoryId?.name,
                        ...item
                    }
                }));
            })
    }, [])
    return (
        <div>
            <div style={{ fontSize: '30px' }}>Product Management</div>
            <div style={{ border: "1px solid #ccc", margin: '30px 0' }}></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{display:'flex',gap:'10px'}}>
                    <Button type="primary" danger onClick ={handleRemoveSelected} disabled = {selectItems.length > 0 ? false : true}><DeleteOutlined /></Button>
                    <Button type='primary'><Link to={'/admin/managementProducts/add'}>Add New Product</Link></Button>
                </div>
                <Search
                    style={{ width: '400px' }}
                    placeholder="input search text"
                    // enterButton="Search"
                    size="large"
                    onKeyUp={(e) => handleSearch(e)}
                />

            </div>
            <div>

                <Table rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }} columns={columns} dataSource={text.length > 0 ? search : data} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    )
}

export default ProductManagementPage