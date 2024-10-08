import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  message,
  Skeleton,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { reject } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
  confirmpassword: string;
  name: string;
  role: string;
  avatar?: string[];
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UserEditAdminPage = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

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
  
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
      console.log({ newFileList });
      setFileList([...newFileList]); // Sử dụng spread operator để duy trì danh sách file
    };
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => instance.get(`/users/${id}`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (users: FieldType) => {
      try {
        return await instance.put(`/users/${id}`, users);
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
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  useEffect(() => {
    if (data?.data?.avatar) {
      setFileList(
        data?.data?.avatar?.map((url: any, index: number) => {
          return {
            uid: index.toString(),
            name: `avatar${index}`,
            status: "done",
            url: url,
          };
        })
      );
    }
  }, [data]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const imageUrls = fileList
      .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
      .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

    mutate({ ...values, avatar: imageUrls });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5 ">
        <h1 className="text-2xl font-semibold">Cập nhật: {data?.data.name} </h1>
        <Button type="primary">
          <Link to={`/admin/users`}>
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
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
              rules={[{ required: true, message: "Email bắt buộc phải nhập!" }]}
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

            <Form.Item label="Avatar" name="avatar">
              <Upload
                action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                data={{ upload_preset: "demo-upload" }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
              > {fileList.length >= 8 ? null : uploadButton}</Upload>
               <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            </Form.Item>

            {/* <Form.Item<FieldType> label="Avatar" name="avatar">
                            <Input />
                        </Form.Item> */}

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

export default UserEditAdminPage;
