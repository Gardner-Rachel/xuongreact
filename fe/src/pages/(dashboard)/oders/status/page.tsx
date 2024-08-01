import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, message, Select } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";

type Props = {};

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

const OrderStatelPage = (props: Props) => {
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", userId, orderId],
    queryFn: () => instance.get(`/orders/${userId}/${orderId}`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (status: string) =>
      instance.patch(`orders/${userId}/${orderId}/status`, { status }),
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật trạng thái thành công.",
      }),
        queryClient.invalidateQueries({
          queryKey: ["orders", userId, orderId],
        });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Form Submitted:", values);
    mutate(values.status);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">
          Trạng thái đơn hàng: {data?.data._id}
        </h1>
        <Button type="primary">
          <Link to={`/admin/orders`}>
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={data?.data}
      >
        <Form.Item<FieldType> label="Trạng thái" name="status" >
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="confirmed">Confirmed</Select.Option>
            <Select.Option value="shipped">Shipped</Select.Option>
            <Select.Option value="delivered">Delivered</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {isPending ? (
              <>
                <Loading3QuartersOutlined className="animate-spin" /> Submit
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderStatelPage;
