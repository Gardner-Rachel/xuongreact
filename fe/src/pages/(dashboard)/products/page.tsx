import { IProduct } from '@/common/types/product';
import instance from '@/configs/axios';
import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message, Popconfirm, Skeleton, Table } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';


const ProductsManagementPage = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => instance.get(`/products`),
    });

    const dataSource = data?.data?.data.map((product: IProduct) => ({
        key: product._id,
        ...product,
    }));

    
    const { mutate } = useMutation({
        mutationFn: async (_id: number | string) => {
            try {
                return await instance.delete(`/products/${_id}`)
            } catch (error) {
                throw new Error("Xóa sả phẩm thất bại");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Sản phẩm đã được xóa thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            })
        },
    })

    const createFilters = (products: IProduct[]) => {
        return products
            .map((product: IProduct) => product.name)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
            .map((name: string) => ({ text: name, value: name }));
    };

    const columns  = [
        {
            key: "name",
            title: "Tên sản phẩm",
            dataIndex: "name",
            ellipsis: true,
            filterSearch: true,
            filters: data ? createFilters(data?.data?.data) : [],
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            onFilter: (value: string , product: IProduct) => product.name.includes(value),
            sortDirections : ["ascend", "descend"],
        },
        {
            key: "category",
            title: "Danh mục",
            dataIndex: "category", 
            ellipsis: true, 
        },
        {
            key: "price",
            title: "Giá sản phẩm",
            dataIndex: "price",
        },
        {
            key: "image",
            title: "Ảnh",
            dataIndex: "image",
        },
        // {
        //     key: "gallery",
        //     title: "Gallery",
        //     dataIndex: "gallery",
        // },
        {
            key: "description",
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            key: "discount",
            title: "Giá khuyến mãi",
            dataIndex: "discount",
        },
        {
            key: "countInStock",
            title: "Số lượng sản phẩm",
            dataIndex: "countInStock",
        },
        // {
        //     key: "featured",
        //     title: "Sản phẩm nổi bật",
        //     dataIndex: "featured",
        // },
        {
            key: "tags",
            title: "Tags",
            dataIndex: "tags",
        },
        // {
        //     key: "attributes",
        //     title: "Thuộc tính",
        //     dataIndex: "attributes",
        // },
        {
            key: "action",
            title: "Action",
            render: (_: any, product: any) => {
                const { _id } = product;
                return (
                    <div className='flex flex-col space-y-2'>
                        <Button>
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
            }
        }
    ];


    if (isLoading) return <div>...Loading</div>
    if (isError) return <div>{error.message}</div>;
    return (
        <div>
            {contextHolder}
            <div className='flex items-center justify-between mb-5 '>
                <h1 className='text-2xl font-semibold'>Quản lý sản phẩm</h1>
                <Button type='primary'>
                    <Link to={`/admin/products/add`}>
                        <PlusCircleFilled /> Thêm sản phẩm
                    </Link>
                </Button>
            </div>
                <Skeleton loading={isLoading} active>
                    <Table dataSource={dataSource} columns={columns} />
                </Skeleton>
        </div>
    )   
}

export default ProductsManagementPage;