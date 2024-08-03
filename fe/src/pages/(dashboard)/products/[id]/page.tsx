import instance from "@/configs/axios";
import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Tag,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../../../styles/style.css";

type Props = {};

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

const ProductDetailManagement = (props: Props) => {
  const { id } = useParams();
  const { data, isLoading, isError, error, refetch  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => instance.get(`/products/${id}`),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get(`/categories`),
  });
  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [id, refetch]);

  

  const productCategories = data?.data.category || [];
  const categoryOptions = categories?.data
    .filter((category: { _id: number | string; name: string }) =>
      productCategories.includes(category._id)
    )
    .map((category: { _id: number | string; name: string }) => ({
      value: category._id,
      label: category.name,
    }));

    

  if (isLoading) return <div>...Laoding</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1
          className="text-2xl font-semibold flex"
          style={{ fontSize: "30px", fontWeight: "500" }}
        >
          Chi tiết sản phẩm:{" "}
          <div className="pl-3 text-red-500">{data?.data.name}</div>
        </h1>
      </div>

      <Skeleton loading={isLoading}>
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          initialValues={data?.data}
        >
          <div className="grid grid-cols-[auto,300px] gap-8">
            <div>
              <Form.Item<FieldType>
                label="Tên sản phẩm"
                name="name"
                className="large-label"
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType> label="Danh mục" className="large-label">
                <div>
                  {productCategories.map((categoryId: string) => {
                    const category = categoryOptions.find(
                      (option: { value: string | number; label: string }) =>
                        option.value === categoryId
                    );
                    return category ? (
                      <Tag key={category.value}>{category.label}</Tag>
                    ) : null;
                  })}
                </div>
              </Form.Item>

              {/* <Form.Item<FieldType> label="Danh mục" name="category" className="large-label">
                <Select
                  mode="multiple"
                  options={categoryOptions}
                  defaultValue={productCategories}
                />
              </Form.Item> */}

              <Form.Item<FieldType>
                label="Giá sản phẩm"
                name="price"
                className="large-label"
              >
                <InputNumber addonAfter="Vnd" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Giá khuyến mãi"
                name="discount"
                className="large-label"
              >
                <InputNumber addonAfter="Vnd" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Ảnh sản phẩm"
                name="image"
                className="large-label"
              >
                <div>
                  {data?.data.image?.map(
                    (images: string, index: number | string) => (
                      <Image
                        key={index}
                        src={images}
                        alt={`product-${index}`}
                        width={350}
                        style={{ marginRight: "8px", marginBottom: "8px" }}
                      />
                    )
                  )}
                </div>
              </Form.Item>

              <Form.Item<FieldType>
                label="Mô tả sản phẩm"
                name="description"
                className="large-label"
              >
                <TextArea rows={20} />
              </Form.Item>

              <Form.Item<FieldType>
                name="featured"
                valuePropName="checked"
                className="large-label"
              >
                <Checkbox>Sản phẩm nổi bật</Checkbox>
              </Form.Item>

              <Form.Item<FieldType>
                className="large-label"
                label="Sản phẩm trong kho"
                name="countInStock"
              >
                <InputNumber />
              </Form.Item>
              <Button type="primary">
                <Link to={`/admin/products`}>
                  <BackwardFilled /> Quay lại
                </Link>
              </Button>
            </div>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};

export default ProductDetailManagement;
