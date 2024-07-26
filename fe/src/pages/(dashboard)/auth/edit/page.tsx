import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Skeleton } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
  confirmpassword: string;
  name: string;
  role: string;
  avatar?: string;
};

const UserEditAdminPage = () => {
  const { id } = useParams();
  const [ messageApi, contextHolder ] = message.useMessage();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => instance.get(`/users/${id}`)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (users: FieldType) => {
      try {
        return await instance.put(`/users/${id}`, users)
      } catch (error) {
        throw new Error("Cập nhật tài khoản thất bại");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật tài khoản thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      })
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      })
    }
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
};


  if (isLoading) return <div>...Loading</div>
  if (isError) return <div>{error.message}</div>
  return (
    <div>
      {contextHolder  }
            <div className='flex items-center justify-between mb-5 '>
                <h1 className='text-2xl font-semibold'>Cập nhật: {data?.data.name} </h1>
                <Button type='primary'>
                    <Link to={`/admin/users`} >
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
            <div className='max-w-4xl mx-auto'>
            <Skeleton loading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={data?.data}
                    >
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email bắt buộc phải nhập!" },
                            ]}
                        >
                            <Input disabled={isPending} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Password bắt buộc phải nhập!" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item<FieldType>
                            label="Confirm Password"
                            name="confirmpassword"
                            rules={[
                                { required: true, message: "Confirm Password bắt buộc phải nhập!" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item> */}


                        <Form.Item<FieldType> label="Name" name="name">
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType> label="Role" name="role">
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType> label="Avatar" name="avatar">
                            <Input />
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
                </Skeleton>
            </div>
        </div>
  )
};

export default UserEditAdminPage;
