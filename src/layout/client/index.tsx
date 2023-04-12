import {
    UserOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, theme, message, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { getAllProduct } from '../../api/Product';
interface IData {
    _id: number,
    name: string,
    price: string,
    img: string
}
export default function LayoutClient() {
    let user: string | null = localStorage.getItem("userInformation")
    const [search, setSearch] = useState('')
    const [data, setData] = useState<IData[]>([])
    const [dataSearch, setDataSearch] = useState<IData[]>([])
    let role = ''
    if (user) {
        role = JSON.parse(user).role;

    }

    const navigate = useNavigate()
    const handleLogout = () => {
        if (user) {
            localStorage.setItem('userInformation',"");
            message.success("Logged out")
            setTimeout(() => navigate('/auth'), 1000)

        }
    }
    const items: MenuProps['items'] = [
        {
            label: <Link to='/' >Thông tin</Link >,
            key: '0',
        },
        {
            label: <Link to='/' >Giỏ hàng</Link >,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Đăng xuất</div>,
            key: '3',
        },
    ];
    if (role === 'admin') {
        items.push({
            label: <Link to='/admin'>Admin page</Link>,
            key: '4',
        });
    }

    //function handle
    const handleSearch = function (e: any) {
        const value = e.target.value
        setSearch(value)

        const dataSearc = data.filter(item => {
            return item.name.includes(value)
        })
        setDataSearch(dataSearc);

    }


    const { Search } = Input;
    const { Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        getAllProduct()
            .then(data => {
                setData(data.data);


            })
    }, [])
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: 'white' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between', // căn phần tử bên trong header sang 2 cạnh trái và phải
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: 120,
                            height: 31,
                            margin: '16px 24px 16px 0',
                            background: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            color: "black",
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            alignItems: "center",
                            fontSize: '23px',
                        }}
                    >
                        Client
                    </div>
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ flex: 1 }} // phần tử con của <div>, dãn đầy kích thước
                    >
                        <div style={{ width: "700px", display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <Search

                                placeholder="input search text"
                                enterButton="Search"
                                size="large"
                                onChange={handleSearch}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '90%',
                                width: '100%',
                                background: 'white',
                                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                display: search.length > 0 ? 'flex' : 'none',
                                flexDirection: 'column',
                                overflow: 'scroll',
                                maxHeight: '300px'

                            }}>
                                {dataSearch.map(item => (
                                    <div key={item._id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '10px',
                                        borderBottom: '1px solid #ccc'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <a href={`/products/${item._id}`}>
                                                <img style={{ width: '80px', objectFit: 'cover' }} src={item?.img} alt="" />
                                            </a>
                                        </div>
                                        <div>
                                            <a href={`/products/${item._id}`}>
                                                <Typography.Title level={5} style={{ margin: '0' }}>{item?.name}</Typography.Title>
                                            </a>
                                            <Typography.Paragraph style={{ fontWeight: 'bold' }}>{item.price}$</Typography.Paragraph>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                        <Menu.Item key='1'>
                            <Link to="/"><PieChartOutlined /> Home Page</Link>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Link to="/products"><PieChartOutlined /> Products</Link>
                        </Menu.Item>
                        <Menu.Item key='3' style={{ marginLeft: 'auto' }}>
                            {user ?
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            User
                                            <UserOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>

                                :
                                <>
                                    <Menu.Item key='4'>
                                        <Link to="/auth"><PieChartOutlined /> Login</Link>
                                    </Menu.Item>
                                    <Menu.Item key='5'>
                                        <Link to="/auth/register"><PieChartOutlined /> Register</Link>
                                    </Menu.Item>
                                </>
                            }
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content className="site-layout">
                <div style={{ padding: 24, minHeight: 600, background: colorBgContainer }}>{<Outlet />}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}
