import { Button, Space, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Input } from 'antd'
import { deleteCate, getAllCate } from '../../../api/categories';
import { DeleteOutlined } from '@ant-design/icons'
interface DataType {
    key: string,
    _id: string,
    name: string
}
interface ICate {
    _id: string,
    name: string
}
export default function ManagementCategories() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [categories, setCategories] = useState<DataType[]>([])
    const [selectItems, setSelectItems] = useState<string[]>([])
    const [search, setSearch] = useState<DataType[]>([])
    const [text, setText] = useState('')
    const { Search } = Input;
    const removeItem = (id: string | undefined) => {
        const a = confirm("Are you sure about that =)) ?")
        if (a) {
            deleteCate(id)
                .then((data => {
                    console.log(data)
                    message.success("Delete successful")
                    getAllCate()
                        .then(data => {
                            setCategories(data.data.data.map((item: ICate) => {
                                return {
                                    key: item._id,
                                    ...item
                                }
                            }));
                        })
                }))
                .catch(err => {
                    console.log(err);
                    message.error(err?.response?.data?.message || "Something went wrong")

                })

        }
    }
    const handleRemoveSelected = function () {
        let a = confirm("Are you sure about that =)) ?")
        if (a) {

            const deletePromise = selectItems.map(id => {
                return deleteCate(id)
            })

            Promise.all(deletePromise)
                .then(response => {
                    message.success("Delete items successfully")
                    setSelectItems([])
                    getAllCate()
                        .then(data => {
                            setCategories(data.data.data.map((item: ICate) => {
                                return {
                                    key: item._id,
                                    ...item
                                }
                            }));

                        })
                        .catch(err => console.log(err))
                })
                .catch(err => {
                    message.error("Some thing went wrong")
                })
        }

    }
    console.log(selectItems);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectItems(selectedRowKeys.map(key => String(key)));
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Undefined', // Column configuration not to be checked
            name: record.name,
        }),

    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: DataType) => {
                return (

                    <Space size="middle" style={{ display: record._id === '642f40c18d53ccc72a3af5d8' ? "none" : "flex" }}>
                        <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeItem(record._id)}>Remove</Button>
                        <Button type="primary" ><Link to={`/admin/managementCategories/${record._id}/update`}>Update</Link></Button>
                    </Space>
                )
            },
        },
    ];
    const handleSearch = function (e: any) {
        const value = e.target.value
        setText(value)
        if (value.length > 0) {
            setSearch(categories.filter(item => {
                return item.name.includes(value)
            }))
        } else {
            setSearch([])
        }

    }
    useEffect(() => {
        getAllCate()
            .then(data => {
                setCategories(data.data.data.map((item: ICate) => {
                    return {
                        key: item._id,
                        ...item
                    }
                }));

            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div>
                <div style={{ fontSize: '30px' }}>Product Management</div>
                <div style={{ border: "1px solid #ccc", margin: '30px 0' }}></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button type="primary" danger onClick={handleRemoveSelected} disabled={selectItems.length > 0 ? false : true}><DeleteOutlined /></Button>
                        <Button type='primary' style={{ marginBottom: '15px' }}><Link to={'/admin/managementCategories/add'}>Add New Categories</Link></Button>
                    </div>
                    <Search
                        style={{ width: '400px' }}
                        placeholder="input search text"
                        // enterButton="Search"
                        size="large"
                        onKeyUp={handleSearch}
                    />
                </div>
                <Table rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }} columns={columns} dataSource={text.length > 0 ? search : categories} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    )
}
