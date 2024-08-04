import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, DownOutlined, ShopOutlined, ShoppingOutlined, WhatsAppOutlined, QuestionCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';

const menuList = [
    { name: "Trang chủ", url: "/", icon: <HomeOutlined /> },
    { name: "Shop All", url: "/products", icon: <ShopOutlined /> },
    { name: "Giỏ hàng", url: "/cart", icon: <ShoppingOutlined/>},
    { name: "Thanh toán", url: "/order", icon: <CreditCardOutlined/>},
    { name: "Giới thiệu", url: "", icon: <QuestionCircleOutlined/>},
    { name: "Liên hệ", url: "", icon: <WhatsAppOutlined/>}
];

const Nav: React.FC = () => {
    const { data: categories, isLoading, error, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance.get(`/categories`),
    });

    const categoryMenu = (
        <Menu>
            {categories?.data.map((category: any, index: number) => (
                <Menu.Item key={index}>
                    <Link to={category.url}>{category.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
    

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;
    return (
        <Menu mode="horizontal" className="w-full flex justify-center">
             <Menu.Item key="categories" className="relative">
                <Dropdown overlay={categoryMenu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className="flex items-center">
                        Danh mục
                        <DownOutlined className="ml-2" />
                    </a>
                </Dropdown>
            </Menu.Item>
            {menuList.map((item, index) => (
                <Menu.Item key={index} icon={item.icon}>
                    <Link to={item.url}>{item.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default Nav;
