import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import useOrder from "@/common/hooks/userOrder";
import TextArea from "antd/es/input/TextArea";

const OrderPage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [cartData, setCartData] = useState<{ items: any[], totalPrice: number } | null>(null);
    const [form] = Form.useForm();

    const { createOrder } = useOrder(userId || '');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user._id);
        } else {
            message.error('Bạn chưa đăng nhập');
        }
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            setCartData(cart);
            form.setFieldsValue({
                items: JSON.stringify(cart.items, null, 2),
                totalPrice: cart.totalPrice,
            });
        } else {
            message.error('Không có dữ liệu trong giỏ hàng');
        }
    }, [form]);

    const handleSubmit = async (values: any) => {
        if (!cartData) {
            message.error('Không có dữ liệu trong giỏ hàng');
            return;
        }

        try {
            const orderDetails = {
                items: cartData.items,
                totalPrice: cartData.totalPrice,
                customerName: values.customerName,
                ...values,
            }; 
            await createOrder(orderDetails);
            message.success('Đặt hàng thành công!');
        } catch (error) {
            console.error('Error creating order:', error);
            message.error('Đặt hàng thất bại.');
        }
    };

    if (userId === null) return <div>Loading user...</div>;

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Thanh toán đơn hàng</h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-1/2 md:pr-4">
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item label="Tên *" name="customerName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên của bạn" />
                        </Form.Item>
                        <Form.Item label="Ghi chú đơn hàng (tuỳ chọn)" name="orderNotes">
                            <TextArea rows={4} placeholder="Gi chú" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full mt-6">
                                ĐẶT HÀNG
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="w-full md:w-1/2 md:pl-4 mt-6 md:mt-0">
                    <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
                        <div className="order-summary mb-4">
                            {cartData?.items.map((item, index) => (
                                <div key={index} className="flex justify-between mt-2">
                                    <span>{item.name}</span>
                                    <span>{formatCurrency(item.price)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4 border-t pt-4">
                                <span className="font-bold">Tạm tính</span>
                                <span className="font-bold">{formatCurrency(cartData?.totalPrice || 0)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-lg font-bold">Tổng</span>
                                <span className="text-lg font-bold">{formatCurrency(cartData?.totalPrice || 0)}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Phương thức thanh toán</h3>
                        <Radio.Group className="w-full">
                            <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio>
                            <Radio value="momo" className="mt-4">Thanh toán qua MOMO</Radio>
                            <Radio value="cod" className="mt-4">Trả tiền mặt khi nhận hàng</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;



{/* <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Thanh toán đơn hàng</h1>
            <div className="flex flex-col md:flex-row justify-between">
                TTTT
                <div className="w-full md:w-1/2 md:pr-4">
                    <Form form={form} onFinish={handleSubmit} layout="vertical">
                        Các trường thông tin cá nhân
                        <Form.Item label="Tên *" name="customerName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên của bạn" />
                        </Form.Item>
                        <Form.Item label="Họ *" name="lastName" rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
                            <Input placeholder="Nhập họ của bạn" />
                        </Form.Item>
                        <Form.Item label="Quốc gia/Khu vực *" name="country" initialValue="Việt Nam">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Địa chỉ *" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                            <Input placeholder="Nhập địa chỉ của bạn" />
                        </Form.Item>
                        <Form.Item label="Mã bưu điện (tuỳ chọn)" name="zipCode">
                            <Input placeholder="Nhập mã bưu điện (nếu có)" />
                        </Form.Item>
                        <Form.Item label="Tỉnh / Thành phố *" name="city" rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố!' }]}>
                            <Input placeholder="Nhập tỉnh/thành phố" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại *" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                            <Input placeholder="Nhập số điện thoại của bạn" />
                        </Form.Item>
                        <Form.Item label="Địa chỉ email *" name="email" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email!' }]}>
                            <Input placeholder="Nhập địa chỉ email của bạn" />
                        </Form.Item>
                        <Form.Item label="Ghi chú đơn hàng (tuỳ chọn)" name="orderNotes">
                            <TextArea rows={4} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." />
                        </Form.Item>
                        
                    </Form>
                </div>

                Đơn hàng của bạn
                <div className="w-full md:w-1/2 md:pl-4 mt-6 md:mt-0">
                    <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
                        <div className="order-summary mb-4">
                            {cartData?.items.map((item, index) => (
                                <div key={index} className="flex justify-between mt-2">
                                    <span>{item.name}</span>
                                    <span>{formatCurrency(item.price)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4 border-t pt-4">
                                <span className="font-bold">Tạm tính</span>
                                <span className="font-bold">{formatCurrency(cartData?.totalPrice || 0)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-lg font-bold">Tổng</span>
                                <span className="text-lg font-bold">{formatCurrency(cartData?.totalPrice || 0)}</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Phương thức thanh toán</h3>
                        <Radio.Group className="w-full">
                            <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio>
                            <Radio value="momo" className="mt-4">Thanh toán qua MOMO</Radio>
                            <Radio value="cod" className="mt-4">Trả tiền mặt khi nhận hàng</Radio>
                        </Radio.Group>
                        <Button type="primary" htmlType="submit" className="w-full mt-6">
                            ĐẶT HÀNG
                        </Button>
                    </div>
                </div>
            </div>
        </div> */}