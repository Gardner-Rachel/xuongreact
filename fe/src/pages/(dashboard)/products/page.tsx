import instance from '@/configs/axios';
import { PlusCircleFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';


const ProductsManagementPage = () => {
    const  { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () => instance.get(`/products`),
    });
console.log(data);

    const dataSource = [];
    
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
        </div>
    )
}

export default ProductsManagementPage;