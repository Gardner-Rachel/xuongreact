import React, { useEffect, useState } from "react";
import { Button, InputNumber, message, Popconfirm, Table } from "antd";
import useCart from "@/common/hooks/useCart";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user._id);
    } else {
      message.error("Bạn chưa đăng nhập");
      navigate("/login");
    }
  }, [navigate]);

  const { cart, isLoading, error, updateQuantity, removeItem } = useCart(userId!);

  if (!userId) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleQuantityChange = (productId: string, value: number | null) => {
    if (!value || value < 1) {
      message.error("Số lượng không hợp lệ");
      return;
    }
    updateQuantity.mutate(
      { userId, productId, quantity: value },
      {
        onSuccess: () => {
          message.success("Cập nhật số lượng thành công");
        },
        onError: (err: any) => {
          message.error(`Lỗi: ${err.message}`);
        },
      }
    );
  };

  const handleRemove = (productId: string) => {
    removeItem.mutate(
      { userId, productId },
      {
        onSuccess: () => {
          message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
        },
        onError: (err: any) => {
          message.error(`Lỗi: ${err.message}`);
        },
      }
    );
  };

  const handleCheckout = () => {
    const totalQuantity = cart?.products.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
    const totalPrice = cart?.products.reduce((total: number, item: any) => total + item.price * item.quantity, 0) || 0;

    // Lưu thông tin giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify({
      items: cart.products,
      totalPrice,
    }));

    navigate('/order'); // Chuyển hướng đến trang OrderPage
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: { productId: string }) => (
        <InputNumber
          min={1}
          defaultValue={text}
          onChange={(value) => handleQuantityChange(record.productId, value)}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: { productId: string }) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
          onConfirm={() => handleRemove(record.productId)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const totalQuantity = cart?.products.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
  const totalPrice = cart?.products.reduce((total: number, item: any) => total + item.price * item.quantity, 0) || 0;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h2>
      <Table
        dataSource={cart?.products || []}
        columns={columns}
        rowKey="productId"
      />
      <div className="mt-4">
        <p className="font-semibold">Tổng số lượng: {totalQuantity}</p>
        <p className="font-semibold">Tổng giá: {totalPrice.toFixed(2)} VND</p>
      </div>
      <Button type="primary" className="mt-4" onClick={handleCheckout}>Thanh toán</Button>
    </div>
  );
};

export default CartPage;
