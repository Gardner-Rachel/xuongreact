import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, message, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

type FieldType = {
    name: string;
};

const CategoryEditPage = () => {
    const { id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            try {
                const response = await instance.get(`/categories/${id}`);
                return response.data;
            } catch (error) {
                throw new Error("Lấy danh mục thất bại");
            }
        }
    });

    
    const { mutate,  isPending } = useMutation({
        mutationFn: async (category: FieldType) => {
            try {
                return await instance.put(`/categories/${id}`, category);
            } catch (error) {
                throw new Error("Cập nhật danh mục thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Cập nhật danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["category"]
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        }
    });

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Form Submitted:', values);
        mutate(values);
    };

    if (isLoading) return <div>...Loading</div>;
    if (isError) return <div>{error.message}</div>;

    return (
        <div>
            {contextHolder}
            <div className='flex items-center justify-between mb-5 '>
                <h1 className='text-2xl font-semibold'>Cập nhật: {data?.category?.name} </h1>
                <Button type='primary'>
                    <Link to={`/admin/categories`}>
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
            <div className='max-w-4xl mx-auto'>
                <Skeleton loading={isLoading}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={data?.category}
                    >
                        <Form.Item<FieldType>
                            label="Tên danh mục"
                            name="name"
                            rules={[{ required: true, message: "Tên danh mục bắt buộc phải nhập!" }]}
                        >
                            <Input disabled={isPending} />
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
    );
};

export default CategoryEditPage;
