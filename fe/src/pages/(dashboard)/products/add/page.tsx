import instance from '@/configs/axios';
import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Form, FormProps, GetProp, Image, Input, InputNumber, message, Select, Upload, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type FieldType = {
    name: string;
    category: string;
    price: number;
    image: string[];
    gallery?: string[];
    description?: string;
    discount?: number;
    countInStock?: number;
    featured?: boolean;
    tags?: string[];
    attributes?: string[];
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ProductAddPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();


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
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => instance.get(`/categories`),
    });


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
        const imageUrls = fileList
            .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
            .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

        mutate({ ...values, image: imageUrls });
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
                        rules={[
                            { required: true, message: 'Giá sản phẩm bắt buộc phải nhập!' },
                            { type: "number", min: 0, message: 'Giá sản phẩm phải lớn hơn 0'},
                        ]}
                        
                    >
                        <InputNumber disabled={isPending} addonAfter="Vnd" />
                    </Form.Item>

                    <Form.Item<FieldType> label="Ảnh sản phẩm" name="image" rules={[{ required: true, message: 'Ảnh sản phẩm không được để trống' }]}>
                        <Upload
                            action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                            data={{ upload_preset: "demo-upload" }}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: "none" }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>

                    {/* <Form.Item<FieldType> label="Ảnh sản phẩm" name="image">
                        <Input />
                    </Form.Item> */}

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