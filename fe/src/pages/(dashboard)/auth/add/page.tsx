import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, FormProps, GetProp, Image, Input, message, Upload, UploadFile, UploadProps } from 'antd';
import { reject } from 'lodash';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


type FieldType = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    avatar?: string[];
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload" >>[0];

const UserAddAdminPage = () => {
    const [form] = Form.useForm();
    const [ messageApi, contextHolder ] = message.useMessage();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getBase64 = (file: FileType): Promise<string> => 
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    }

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type='button'>
            <PlusOutlined />
            <div style={{margin: 8}}>Upload</div>
        </button>
    )

    const handleChange: UploadProps["onChange"] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    }

    

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
        const imageUrls = fileList
            .filter((file) => file.status === "done")
            .map((file) => file.response?.secure_url);
        mutate({ ...values, avatar: imageUrls})
    };

  return (
    <div>
        {contextHolder}
    <div className='flex items-center justify-between mb-5 '>
        <h1 className='text-2xl font-semibold'>Đăng ký</h1>
        <Button type='primary'>
            <Link to={`/admin/users`} >
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
                <Upload 
                    action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                    data={{upload_preset: "demo-upload"}}
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{display: "none"}}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(""),
                        }} 
                        src={previewImage}
                    />
                )}
            </Form.Item>
                
            {/* <Form.Item<FieldType> label="Avatar" name="avatar" >
                <Input disabled={isPending} />
            </Form.Item> */}

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

export default UserAddAdminPage;