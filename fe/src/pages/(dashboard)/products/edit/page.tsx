import instance from "@/configs/axios";
import {
  BackwardFilled,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  GetProp,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Skeleton,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  name: string;
  category: string;
  price: number;
  image?: string[];
  // gallery?: string[];
  description?: string;
  discount?: number;
  countInStock?: number;
  featured?: boolean;
  // tags?: string[];
  // attributes?: string[];
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const ProductEditPage = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Khởi tạo fileList từ dữ liệu API
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
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await instance.get(`/products/${id}`);
      } catch (error) {
        throw new Error("Lấy sản phẩm thất bại");
      }
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get(`/categories`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product: FieldType) => {
      try {
        return await instance.put(`/products/${id}`, product);
      } catch (error) {
        throw new Error("Cập nhật sản phẩm thất bại");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "success",
        content: error.message,
      });
    },
  });

  useEffect(() => {
    if (data?.data?.image) {
      setFileList(
        data?.data?.image?.map((url: any, index: number) => {
          return {
            uid: index.toString(),
            name: `image${index}`,
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

    mutate({ ...values, image: imageUrls });
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
        <h1 className="text-2xl font-semibold">Cập nhật: {data?.data?.name}</h1>
        <Button type="primary">
          <Link to={`/admin/products`}>
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>

      <Skeleton loading={isLoading}>
        <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off" initialValues={data?.data}>
          <div className="grid grid-cols-[auto,300px] gap-8">
            <div>
              <Form.Item<FieldType>
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Tên sản phẩm bắt buộc phải có!" },
                ]}
              >
                <Input disabled={isPending} />
              </Form.Item>

              <Form.Item<FieldType>
                label="Giá sản phẩm"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Giá sản phẩm bắt buộc phải nhập!",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Giá sản phẩm phải lớn hơn 0",
                  },
                ]}
              >
                <InputNumber disabled={isPending} addonAfter="Vnd" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Giá khuyến mãi"
                name="discount"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value < getFieldValue("price")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Giá khuyến mãi phải nhỏ hơn giá sản phẩm!")
                      );
                    },
                  }),
                ]}
              >
                <InputNumber addonAfter="Vnd" />
              </Form.Item>

              <Form.Item<FieldType> label="Ảnh sản phẩm" name="image">
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
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>

              <Form.Item<FieldType> label="Mô tả sản phẩm" name="description">
                <TextArea rows={7} disabled={isPending} />
              </Form.Item>

              <Form.Item<FieldType> name="featured" valuePropName="checked">
                            <Checkbox>Sản phẩm nổi bật</Checkbox>
              </Form.Item>

              <Form.Item<FieldType>
                label="Sản phẩm trong kho"
                name="countInStock"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    message: "Số lượng sản phẩm phải lớn hơn 0",
                  },
                ]}
              >
                <InputNumber defaultValue={0} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  {isPending ? (
                    <>
                      <Loading3QuartersOutlined className="animate-spin" />{" "}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Danh mục sản phẩm"
                name="category"
                className="text-2xl"
              >
                <Checkbox.Group>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {categories?.data.map((category: any) => (
                      <Checkbox
                        key={category._id}
                        value={category._id}
                        style={{ marginRight: "16px", marginBottom: "8px" }}
                      >
                        {category.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};

export default ProductEditPage;
