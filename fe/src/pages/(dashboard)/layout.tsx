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
import { NavLink, Outlet, useLocation } from 'react-router-dom';


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

const breadcrumbNameMap: Record<string, string> = {
    '/admin': 'Thống kê',
    '/admin/products': 'Danh sách sản phẩm',
    '/admin/products/add': 'Thêm sản phẩm',
    '/admin/categories': 'Danh sách danh mục',
    '/admin/categories/add': 'Thêm danh mục',
    '/admin/users': 'Danh sách tài khoản',
    '/admin/users/add': 'Thêm tài khoản',
    '/admin/orders': 'Danh sách đơn hàng',
};

const LayoutAdmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <NavLink to={url}>{breadcrumbNameMap[url]}</NavLink>
            </Breadcrumb.Item>
        );
    });

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                 <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems}
                    </Breadcrumb>
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