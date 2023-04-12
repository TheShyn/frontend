import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { deleteUser, getAllUser } from '../../../api/user';
import { Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface DataType {
    name: string,
    role: string,
    key: string,
    _id: string
}
interface IUser {
    _id: string,
    username: string,
    role: string
}
export default function ManagementUsers() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [text, setText] = useState('')
    const [selectItems, setSelectItems] = useState<string[]>([])
    const userr = localStorage.getItem('userInformation');
    const [search, setSearch] = useState([])
    const { Search } = Input;

    let idUser: any = {}
    if (userr) {
        idUser = JSON.parse(userr)._id
    }
    const [user, setUser] = useState([])
    const removeItem = (id: string | undefined) => {
        console.log(id);
        const a = confirm("Are you sure about that =)) ?")
        if (a) {
            deleteUser(id)
                .then(data => {
                    console.log(data)
                    message.success("Delete successful")
                    getAllUser()
                        .then(data => {
                            setUser(data.data.data.map((item: IUser) => {
                                return {
                                    key: item._id,
                                    ...item
                                }
                            }));

                        })
                        .catch(err => console.log(err))
                })
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
                return deleteUser(id)
            })

            Promise.all(deletePromise)
                .then(response => {
                    message.success("Delete items successfully")
                    setSelectItems([])
                    getAllUser()
                        .then(data => {
                            setUser(data.data.data.map((item: IUser) => {
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectItems(selectedRowKeys.map(key => String(key)));
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record._id === idUser, // Column configuration not to be checked
            name: record.name,
        }),

    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: DataType) => {
                return (

                    <Space size="middle" style={{ display: idUser && idUser === record._id ? "none" : "flex" }}>
                        <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeItem(record._id)}>Remove</Button>
                        <Button type="primary" ><Link to={`/admin/managementUsers/${record._id}/update`}>Update</Link></Button>
                    </Space>
                )
            },
        },
    ];
    const handleSearch = function (e: any) {
        const value = e.target.value
        setText(value)
        if (value.length > 0) {
            setSearch(user.filter((item: IUser) => {
                return item.username.includes(value)
            }))
        } else {
            setSearch([])
        }
    }
    useEffect(() => {
        getAllUser()
            .then(data => {
                setUser(data.data.data.map((item: IUser) => {
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
                }} columns={columns} dataSource={text.length > 0 ? search : user} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    )
}
