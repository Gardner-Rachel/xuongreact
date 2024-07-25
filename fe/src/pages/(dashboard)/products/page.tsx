import { IProduct } from '@/common/types/product';
import instance from '@/configs/axios';
import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message, Popconfirm, Skeleton, Table } from 'antd';
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

    const columns = [
        {
            key: "name",
            title: "Tên sản phẩm",
            dataIndex: "name",
            filterSearch: true,
            filters: data ? createFilters(data?.data?.data) : [],
            onFilter: (value: string, product: IProduct) => product.name.includes(value),
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            sortDirections : ["ascend", "descend"],
        },
        {
            key: "price",
            title: "Giá sản phẩm",
            dataIndex: "price",
        },
        {
            key: "action",
            render: (_: any, product: any) => {
                const { _id } = product;
                return (
                    <div className='flex space-x-3'>
                        <Popconfirm
                            title="Xóa sản phâm"
                            description="Bạn có chắc chắn muốn xóa không"
                            onConfirm={() => mutate(_id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                        <Button>
                            <Link to={`/admin/products/${product._id}/edit`}>Cập nhật</Link>
                        </Button>
                    </div>
                )
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