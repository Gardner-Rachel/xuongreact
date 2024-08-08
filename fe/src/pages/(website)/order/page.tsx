import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import useOrder from '@/common/hooks/userOrder';

const OrderPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [cartData, setCartData] = useState<{ items: any[], totalPrice: number } | null>(null);
    const [form] = Form.useForm();
    
    // Hook useOrder sẽ không được khởi tạo cho đến khi userId có giá trị
    const { createOrder, isLoading, error } = useOrder(userId || '');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user._id);
        } else {
            message.error('Bạn chưa đăng nhập');
            // Xử lý khi không có thông tin người dùng
        }
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            setCartData(cart);
            // Cập nhật giá trị của các trường trong form
            form.setFieldsValue({
                items: JSON.stringify(cart.items, null, 2),
                totalPrice: cart.totalPrice,
            });
        } else {
            message.error('Không có dữ liệu giỏ hàng.');
            // Xử lý khi không có dữ liệu giỏ hàng
        }
    }, [form]);

    const handleSubmit = async (values: any) => {
        if (!cartData) {
            message.error('Dữ liệu giỏ hàng không có');
            return;
        }

        try {
            const orderDetails = {
                items: cartData.items,
                totalPrice: cartData.totalPrice,
                customerName: values.customerName,
            };
            const response = await createOrder(orderDetails);
            const { order } = response;
            if (order && order._id) {
                message.success(`Đơn hàng đã được tạo thành công với ID: ${order._id}`);
            } else {
                message.success('Đơn hàng đã được tạo thành công!');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            message.error('Có lỗi xảy ra khi tạo đơn hàng.');
        }
    };

    if (userId === null) return <div>Loading user...</div>;
    
    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Thanh toán đơn hàng</h1>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                    label="Tên khách hàng"
                    name="customerName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                >
                    <Input placeholder="Nhập tên khách hàng" />
                </Form.Item>
                <Form.Item
                    label="Danh sách mặt hàng"
                    name="items"
                >
                    <Input.TextArea rows={15}
                        placeholder="Danh sách mặt hàng"
                        readOnly    
                    />
                </Form.Item>
                <Form.Item
                    label="Tổng giá"
                    name="totalPrice"
                >
                    <Input
                        type="number"
                        placeholder="Tổng giá"
                        readOnly
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className="w-full"
                    >
                        Xác nhận đơn hàng
                    </Button>
                </Form.Item>
            </Form>
            {error && <p className="text-red-500">{error.message}</p>}
            {isLoading && (
                <div className="flex justify-center mt-4">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default OrderPage;
