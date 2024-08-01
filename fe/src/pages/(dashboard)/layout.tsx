import React, { useState } from 'react';
import {
    DatabaseOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

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

const items: MenuItem[] = [
    getItem(<NavLink to="/admin">Thống kê</NavLink>, "1", <PieChartOutlined />),
    getItem("Sản phẩm", "sub2", <DesktopOutlined />, [
        getItem(<NavLink to="/admin/products">Danh sách</NavLink>, "2-1"),
        getItem(<NavLink to="/admin/products/add">Thêm sản phẩm</NavLink>, "2-2"),
    ]),
    getItem("Danh mục", "sub3", <TagsOutlined />, [
        getItem(<NavLink to="/admin/categories">Danh sách</NavLink>, "3-1"),
        getItem(<NavLink to="/admin/categories/add">Thêm danh mục</NavLink>, "3-2"),
    ]),
    getItem("Tài khoản", "sub4", <UserOutlined />, [
        getItem(<NavLink to="/admin/users">Danh sách</NavLink>, "4-1"),
        getItem(<NavLink to="/admin/users/add">Thêm tài khoản</NavLink>, "4-2")
    ]),
    getItem("Đơn hàng", "sub5", <ShoppingCartOutlined/>, [
        getItem(<NavLink to="/admin/orders" >Danh sách đơn hàng</NavLink>, "5-1"),
    ])
];


const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                 <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
                {/* <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <NavLink to="/admin"> Thống Kê </NavLink>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <NavLink to="/admin/products">Sản phẩm</NavLink>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                /> */}
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                       <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;