import instance from '@/configs/axios';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, message } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../../../styles/register.css'


type FieldType = {
    email: string;
    password: string;
}

const Login = () => {
    const [form] = Form.useForm();
    const [ messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: async (register: FieldType) => {
            try {
                const response = await instance.post(`/auth/signin`, register);
                return response.data;
            } catch (error) {
                throw new Error("Đăng nhập thất bại.")
            }
        },
        onSuccess: (data) =>{
          const { token, user } = data;
          if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            messageApi.open({
              type: "success",
              content: "Đăng nhập thành công",
            });
            navigate(`/`);
          } else {
            messageApi.open({
              type: "error",
              content: "Dữ liệu không hợp lệ",
            })
          }
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
    <div className='register-container'>
        {contextHolder}
    <div className='register-title'>
        Login
    </div>
    <div className='register-form'>
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
                rules={[{ required: true, message: 'Email không đúng!' }]}
            >
                <Input disabled={isPending} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Password không đúng' }]}
            >
                <Input.Password disabled={isPending} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loading3QuartersOutlined className='animate-spin mr-2' />
                            Đăng nhập
                        </>
                    ) : (
                        "Đăng nhập"
                    )}
                </Button>
            </Form.Item>
        </Form>

    </div>
</div>
  )
}

export default Login;