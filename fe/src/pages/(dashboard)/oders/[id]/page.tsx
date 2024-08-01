import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
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
        <div className='flex items-center justify-between mb-5 '>
            <h1 className='text-2xl font-semibold'>Chi tiết đơn hàng</h1>
            {/* <Button
             type='primary'>
                <Link to={`/admin/users/add`}>
                    <PlusCircleFilled /> Đăng ký
                </Link>
            </Button> */}
        </div>
            {/* <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns}  />
            </Skeleton> */}
    </div>
  )
}

export default OrderDetailPage;