import { IProduct } from '@/common/types/product';
import instance from '@/configs/axios';
import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, Table } from 'antd';
import React from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';


const ProductsManagementPage = () => {

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
        mutationFn: (_id: number | string) => instance.delete(`/products/${_id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            throw error;
        },
    })
    const columns = [
        {
            key: "name",
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            key: "price",
            title: "Giá sản phẩm",
            dataIndex: "price",
        },
        {
            key: "action",
            render: (_: any, product: IProduct) => {
                return (
                    <>
                        <Popconfirm
                            title="Xóa sản phâm"
                            description="Bạn có chắc chắn muốn xóa không"
                            onConfirm={() => mutate(product._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];


    if (isLoading) return <div>...Loading</div>
    if (isError) return <div>{error.message}</div>;
    return (
        <div>
            <div className='flex items-center justify-between mb-5 '>
                <h1 className='text-2xl font-semibold'>Quản lý sản phẩm</h1>
                <Button type='primary'>
                    <Link to={`/admin/products/add`}>
                        <PlusCircleFilled /> Thêm sản phẩm
                    </Link>
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ProductsManagementPage;