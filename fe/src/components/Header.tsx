import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Avatar, Dropdown, MenuProps } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/header.css";
import { NavLink, useNavigate } from "react-router-dom";

const { Header } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Headers = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user) {
      setIsLogin(true);
      // Kiểm tra nếu user.avatar là một mảng và có phần tử đầu tiên
      setAvatar(
        user.avatar && Array.isArray(user.avatar) ? user.avatar[0] : null
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    setAvatar(null);
    navigate("/");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined style={{ marginRight: '8px' }} />
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const menuItems: MenuProps["items"] = isLogin ? [
        getItem("", "1", <BellOutlined />),
        getItem(
          <Dropdown overlay={userMenu} trigger={["click"]}>
            {avatar ? <Avatar src={avatar} /> : <UserOutlined />}
          </Dropdown>,
          "4"
        ),
      ] : [
        getItem("", "1", <BellOutlined />),
        getItem(<NavLink to="/register">Register</NavLink>, "2"),
        getItem(<NavLink to="/login">Login</NavLink>, "3"),
        getItem("", "4", <UserOutlined />),
      ];

  return (
    <Header className="header">
      <div className="logo">MyApp</div>
      <Input
        className="search-input"
        prefix={<SearchOutlined />}
        placeholder="Search..."
      />
      <Menu mode="horizontal" className="menu" items={menuItems} />
    </Header>
  );
};

export default Headers;
