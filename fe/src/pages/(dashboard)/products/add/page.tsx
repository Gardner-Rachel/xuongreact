import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Form, FormProps, Input, InputNumber, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { Link } from 'react-router-dom';

type FieldType = {
    name: string;
    category: string;
    price: number;
    image?: string;
    gallery?: string[];
    description?: string;
    discount?: number;
    countInStock?: number;
    featured?: boolean;
    tags?: string[];
    attributes?: string[];
};

const ProductAddPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance.get(`/categories`),
    });

    console.log(categories);
    

    const { mutate, isPending } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                return await instance.post(`/products`, product)
            } catch (error) {
                throw new Error("Thêm sản phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm sản phẩm thành công",
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            });
        }
    });

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        mutate(values);
    };

    return (
        <div>
            {contextHolder}
            <div className='flex items-center justify-between mb-5 '>
                <h1 className='text-2xl font-semibold'>Thêm sản phẩm</h1>
                <Button type='primary'>
                    <Link to={`/admin/products`} >
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
            <div className='max-w-4xl mx-auto'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Tên sản phẩm bắt buộc phải có!' }]}
                    >
                        <Input disabled={isPending} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Danh mục" name="category">
                        <Select
                            options={categories?.data?.map((category: { _id: number | string, name: string}) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                            // options={[
                            //     { value: 'jack', label: 'Jack' },
                            //     { value: 'lucy', label: 'Lucy' },
                            //     { value: 'Yiminghe', label: 'yiminghe' },
                            //     { value: 'disabled', label: 'Disabled', disabled: true },
                            // ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Giá sản phẩm"
                        name="price"
                        rules={[{ required: true, message: 'Giá sản phẩm bắt buộc phải có!' }]}
                    >
                        <InputNumber disabled={isPending} />
                    </Form.Item>

                    <Form.Item<FieldType> label="Ảnh sản phẩm" name="image">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label=" Gallery ảnh" name="gallery">
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType> label="Mô tả sản phẩm" name="description" >
                        <TextArea rows={4} disabled={isPending} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Giá khuyến mãi"
                        name="discount"
                        rules={[
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || value < getFieldValue("price")) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Gía khuyến mãi phải nhỏ hơn giá sản phẩm!")
                                    );
                                }
                            })
                        ]}
                     >
                        <InputNumber addonAfter="Vnd" />
                    </Form.Item>

                    <Form.Item<FieldType> label="Số lượng sản phẩm" name="countInStock" >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item<FieldType> label="Sản phẩm nổi bật" name="featured" valuePropName='checked' >
                        <Checkbox />
                    </Form.Item>

                    <Form.Item<FieldType> label="Tags" name="tags" >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Thuộc tính" name="attributes" >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loading3QuartersOutlined className='animate-spin mr-2' />
                                    Submit
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default ProductAddPage;