import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom'

export default function LayoutAdmin() {
    const { Header, Footer, Sider } = Layout;

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

   


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, display:'flex' ,color:"white",fontWeight:'bold',justifyContent:'center',alignItems:"center", margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} >ADMIN</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key ='1'>
                        <Link to="/admin"><PieChartOutlined /> Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key ='2' >
                        <Link to="/admin/managementProducts"> <DesktopOutlined /> Products</Link>
                    </Menu.Item>
                    <Menu.Item key ='3' >
                        <Link to="/admin/managementCategories"> <DesktopOutlined /> Categories</Link>
                    </Menu.Item>

                    <Menu.Item key ='4' >
                        <Link to="/admin/managementUsers"> <DesktopOutlined /> Users</Link>
                    </Menu.Item>
                    <Menu.Item key ='5' >
                        <Link to="/"> <DesktopOutlined /> Client</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <div style={{ margin: '16px',padding:24, minHeight: 560, background: colorBgContainer }}>
                    <Outlet />

                </div>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}
