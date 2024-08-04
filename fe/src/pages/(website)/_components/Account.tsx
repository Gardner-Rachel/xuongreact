import { BellOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input, Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../../styles/header.css";


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

const Account = () => {
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

  const userMenu: MenuProps = {
    items: [
      {
        key: "logout",
        label: (
          <span onClick={handleLogout}>
            <LogoutOutlined style={{ marginRight: '8px' }} />
            Đăng xuất
          </span>
        ),
      },
    ],
  };

  const menuItems: MenuProps["items"] = isLogin ? [
        // getItem("", "1", <BellOutlined />),
        getItem(
          <Dropdown menu={userMenu} trigger={["click"]}>
          {avatar ? <Avatar src={avatar} /> : <UserOutlined />}
        </Dropdown>,
        "4"
        ),
      ] : [
        // getItem("", "1", <BellOutlined />),
        getItem(<NavLink to="/register">Register</NavLink>, "2"),
        getItem(<NavLink to="/login">Login</NavLink>, "3"),
        // getItem("", "4", <UserOutlined />),
      ];
    return (
        <>
            {/* <span className="text-sm">Your Account</span>| */}
            <button className="h-[24px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 w-[24px]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
                <span className="absolute bg-red-500 top-2 rounded-[50%] w-[16px] h-[16px] text-xs text-white">
                    0
                </span>
                
            </button>
            <Menu mode="horizontal" className="menu" items={menuItems} />
        </>
        
        
        
      
    );
};

export default Account;
