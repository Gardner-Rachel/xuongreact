import { IUser } from "@/common/types/user";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

const UserAdminPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => instance.get(`/users`),
  });

  const dataSource = data?.data.map((user: IUser) => ({
    key: user._id,
    ...user,
  }));

  const { mutate, isPending } = useMutation({
    mutationFn: async (_id: number | string) => {
      try {
        return await instance.delete(`/users/${_id}`);
      } catch (error) {
        throw new Error("Xoá tài khoản thất bại.");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Tài khoản đã được xóa thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });


  const columns = [
    {
      key: "_id",
      title: "ID",
      dataIndex: "_id",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "name",
      title: "Tên tài khoản",
      dataIndex: "name",
      filterSearch: true,
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "avatar",
      title: "Avatar",
      dataIndex: "avatar",
      // ellipsis: true,
      render: (avatars: string[]) => (
        <Image.PreviewGroup>
          {avatars.map((avatar, index) => (
            <Image
              key={index}
              src={avatar}
              alt={`avatar-${index}`}
              width={190}
              height={120}
            />
          ))}
        </Image.PreviewGroup>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, user: any) => {
        const { _id } = user;
        return (
          <div className="flex space-x-2">
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn chắc chắn muốn xóa không?"
              onConfirm={() => mutate(_id)}
              // onCancel={cancel}
              okText="Có"
              cancelText="Không"
            >
              {isPending ? (
                <>
                  <Button danger>
                    <Loader2Icon className="animate-spin" />
                  </Button>
                </>
              ) : (
                <>
                  <Button danger>Delete</Button>
                </>
              )}
            </Popconfirm>
            <Button>
              <Link to={`/admin/users/${_id}/edit`}>Cập nhật</Link>
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
        {contextHolder}
        <div className='flex items-center justify-between mb-5 '>
            <h1 className='text-2xl font-semibold'>Quản lý tài khoản</h1>
            <Button type='primary'>
                <Link to={`/admin/users/add`}>
                    <PlusCircleFilled /> Đăng ký
                </Link>
            </Button>
        </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns} />
            </Skeleton>
    </div>
)   
}

export default UserAdminPage;
