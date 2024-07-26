import instance from '@/configs/axios';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, message } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';


type FieldType = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    avatar?: string;
}

const Register = () => {
    const [form] = Form.useForm();
    const [ messageApi, contextHolder ] = message.useMessage();

    const { mutate, isPending } = useMutation({
        mutationFn: async (register: FieldType) => {
            try {
                return await instance.post(`/auth/signup`, register)
            } catch (error) {
                throw new Error("Đăng ký thất bại.")
            }
        },
        onSuccess: () =>{
            messageApi.open({
                type: "success",
                content: "Đăng ký thành công",
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
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
        <h1 className='text-2xl font-semibold'>Register</h1>
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
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email không đúng định dạng!' }]}
            >
                <Input disabled={isPending} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password không đúng định dạng!' }]}
            >
                <Input.Password disabled={isPending} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Confirm Password không đúng định dạng!' }]}
            >
                <Input.Password disabled={isPending} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name không đúng định dạng!' }]}
            >
                <Input disabled={isPending} />
            </Form.Item>

            <Form.Item<FieldType> label="Avatar" name="avatar">
                <Input disabled={isPending} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loading3QuartersOutlined className='animate-spin mr-2' />
                            Đăng ký
                        </>
                    ) : (
                        "Đăng ký"
                    )}
                </Button>
            </Form.Item>
        </Form>

    </div>
</div>
  )
}

export default Register;