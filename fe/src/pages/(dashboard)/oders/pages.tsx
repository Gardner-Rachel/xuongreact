import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Skeleton, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const OdersManagementPage = (props: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => instance.get(`orders`).then((res) => res.data),
  });

  const dataSource =
    data?.flatMap((order: Order) =>
      order.items.map((item: OrderItem) => ({
        key: item._id,
        orderId: order._id,
        customerName: order.customerName,
        totalPrice: order.totalPrice,
        status: order.status,
        userId: order.userId,
        ...item,
      }))
    ) || [];

    const createOrderFilters = (orders: Order[]) => {
      return orders
        .map((order: Order) => order._id)
        .filter(
          (value: string, index: number, self: string[]) =>
            self.indexOf(value) === index
        )
        .map((_id: string) => ({ text: _id, value: _id }));
    };

  const columns = [
    {
      key: "orderId",
      title: "ID Đơn hàng",
      dataIndex: "orderId",
      filterSearch: true,
      filters: data ? createOrderFilters(data) : [],
      sorter: (a: Order, b: Order) => a._id.localeCompare(b._id),
      onFilter: (value: string, product: Order) =>
      product._id.includes(value),
      sortDirections: ["ascend", "descend"],
    },
    {
      key: "customerName",
      title: "Khách hàng",
      dataIndex: "customerName",
    },
    {
      key: "totalPrice",
      title: "Tổng đơn hàng",
      dataIndex: "totalPrice",
    },
    {
      key: "status",
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, order: any) => {
        const { orderId, userId } = order;
        return (
          <div className="flex space-x-2">
            <Button>
              <Link to={`/admin/orders/${userId}/${orderId}`}>Chi tiết</Link>
            </Button>
            <Button>
              <Link to={`/admin/orders/${userId}/${orderId}/status`}>Cập nhật</Link>
            </Button>
          </div>
        );
      },
    },
  ];

  

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 ">
        <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>
        {/* <Button
             type='primary'>
                <Link to={`/admin/users/add`}>
                    <PlusCircleFilled /> Đăng ký
                </Link>
            </Button> */}
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={dataSource} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default OdersManagementPage;
