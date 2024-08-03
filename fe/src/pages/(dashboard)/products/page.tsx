import { ICategory } from "@/common/types/category";
import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Image,
  message,
  Popconfirm,
  Skeleton,
  Table,
  Pagination,
  Row,
  Col,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductsManagementPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => instance.get(`/categories`),
  });

  const categoriesData = categories?.data?.reduce(
    (categoryName: any, category: { _id: number | string; name: string }) => {
      categoryName[category._id] = category.name;
      return categoryName;
    },
    {}
  );
  console.log(categoriesData);
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", currentPage, pageSize],
    queryFn: () =>
      instance.get(`/products?_page=${currentPage}&_limit=${pageSize}`),
  });

  const dataSource = data?.data?.data.map((product: IProduct) => ({
    key: product._id,
    ...product,
  }));

  const pagination = data?.data?.pagination;

  const { mutate } = useMutation({
    mutationFn: async (_id: number | string) => {
      try {
        return await instance.delete(`/products/${_id}`);
      } catch (error) {
        throw new Error("Xóa sản phẩm thất bại");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Sản phẩm đã được xóa thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["products", currentPage, pageSize],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const createProductFilters = (products: IProduct[]) => {
    return products
      .map((product: IProduct) => product.name)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((name: string) => ({ text: name, value: name }));
  };

  const createCategoryFilters = (categories: ICategory[]) => {
    return categories
      .map((category: ICategory) => category.name)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((name: string) => ({ text: name, value: name }));
  };

  const columns = [
    {
      key: "name",
      title: "Tên sản phẩm",
      dataIndex: "name",
      ellipsis: true,
      filterSearch: true,
      filters: data ? createProductFilters(data?.data?.data) : [],
      sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
      onFilter: (value: string, product: IProduct) =>
      product.name.includes(value),
      sortDirections: ["ascend", "descend"],
    },
    {
      key: "category",
      title: "Danh mục",
      dataIndex: "category",
      ellipsis: true,
      filters: categories ? createCategoryFilters(categories?.data) : [],
      render: (categoryIds: (number | string)[]) =>
        categoryIds
          .map((categoryId) =>
            categoriesData ? categoriesData[categoryId] : "Unknown"
          ).join(", "),
      onFilter: (value: string, product: IProduct) => {
        const productCategoryNames = product.category.map(
          (categoryId) => categoriesData[categoryId] || "Unknown"
        );
        return productCategoryNames.includes(value);
      },
    },
    {
      key: "image",
      title: "Ảnh",
      dataIndex: "image",
      render: (images: string[]) => (
        <Image.PreviewGroup>
          {images.map((image, index) => (
            <Image key={index} src={image} alt={`product-${index}`} />
          ))}
        </Image.PreviewGroup>
      ),
    },
    {
      key: "price",
      title: "Giá sản phẩm",
      dataIndex: "price",
    },
    {
      key: "discount",
      title: "Giá khuyến mãi",
      dataIndex: "discount",
    },
    {
      key: "featured",
      dataIndex: "featured",
      title: "Nổi bật",
      render: (_: any, product: IProduct) => (
        <span>{product.featured ? "Có" : "không"}</span>
      ),
    },
    {
      key: "countInStock",
      dataIndex: "countInStock",
      title: "Tình trạng",
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, product: any) => {
        const { _id } = product;
        return (
          <div className="flex flex-col space-y-2">
            <Button type="primary">
              <Link to={`/admin/products/${product._id}`}>Chi tiết</Link>
            </Button>
            <Button style={{ color: '#1890ff' }}>
              <Link to={`/admin/products/${product._id}/edit`}>Cập nhật</Link>
            </Button>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() => mutate(_id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  if (isLoading) return <div>...Loading</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <Button type="primary">
          <Link to={`/admin/products/add`}>
            <PlusCircleFilled /> Thêm sản phẩm
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Row justify="end" className="mt-5">
          <Col>
            {pagination && (
              <Pagination
                current={pagination.currentPage}
                total={pagination.totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            )}
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
};

export default ProductsManagementPage;
