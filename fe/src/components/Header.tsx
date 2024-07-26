import React from 'react';
import { Layout, Menu, Input, Button, MenuProps } from 'antd';
import { SearchOutlined, UserOutlined, BellOutlined, SettingOutlined, PieChartOutlined, DesktopOutlined, TagsOutlined } from '@ant-design/icons';
import '../styles/header.css';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;
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

const menuItems: MenuProps['items'] = [
  getItem('', '1', <BellOutlined />),
  getItem(<NavLink to="register">Register</NavLink>, "2"),
  getItem(<NavLink to="login">Login</NavLink>, "3"),
  getItem('', '4', <UserOutlined />),
];



const Headers = () => {
  return (
    <Header className="header">
      <div className="logo">MyApp</div>
      <Input className="search-input" prefix={<SearchOutlined />} placeholder="Search..." />
      <Menu mode="horizontal" className="menu" items={menuItems} />
    </Header>
  );
};

export default Headers;