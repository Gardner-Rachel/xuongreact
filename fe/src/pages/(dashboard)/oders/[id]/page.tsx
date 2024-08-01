import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Divider, Form, Input, InputNumber, List, Skeleton } from 'antd';
import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

type FieldType = {
    _id: string;
    userId: string;
    items: OrderItem[];
    orderNumber: string;
    customerName: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
};


const OrderDetailPage = (props: Props) => {
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", userId, orderId],
    queryFn: () => instance.get(`/orders/${userId}/${orderId}`)
  })

  console.log(data);
  
  
  
  if (isLoading) return <div>...Loading</div>
  if (isError) return <div>{error.message}</div>
  return (
    <div>
    <div className='flex items-center justify-between mb-5'>
        <h1 className='text-2xl font-semibold'>Chi tiết đơn hàng: {data?.data._id}</h1>
    </div>

    <Skeleton loading={isLoading}>
      <Form name='basic' layout='vertical' initialValues={data?.data} >
        <Card>
          <Form.Item<FieldType>
            label="ID"
            name="_id"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="ID User"
            name="userId"
          >
            <Input />
          </Form.Item>

          <Divider orientation="left" style={{ fontSize: '18px' }}>Chi tiết sản phẩm</Divider>

          <List
            dataSource={data?.data.items}
            renderItem={(item: OrderItem) => (
              <List.Item key={item._id}>
                <Card>
                  <p><strong>Tên sản phẩm:</strong> {item.name}</p>
                  <p><strong>Giá:</strong> {item.price} VND</p>
                  <p><strong>Số lượng:</strong> {item.quantity}</p>
                </Card>
              </List.Item>
            )}
          />

          <Divider orientation="left" style={{ fontSize: '18px'}}>Thông tin đơn hàng</Divider>

          <Form.Item<FieldType>
            label="Số đơn hàng"
            name="orderNumber"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tên khách hàng"
            name="customerName"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tổng đơn hàng"
            name="totalPrice"
          >
            <InputNumber addonAfter="VND" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Thời gian"
            name="createdAt"
          >
            <Input />
          </Form.Item>
        </Card>
      </Form>
    </Skeleton>
</div>
  )
}

export default OrderDetailPage;