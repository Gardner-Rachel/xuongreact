import { ICategory } from "@/common/types/category";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

const CategoryManagementPage = () => {

    const [ messageApi, contextHolder ] = message.useMessage();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            try {
                return await instance.get(`/categories`)
            } catch (error) {
                throw new Error("Lấy danh mục thất bại");
            }
        },
    });

    const dataSource = data?.data.map((category: ICategory) => ({
        key: category._id,
        ...category,
    }));
    

    const { mutate, isPending } = useMutation({
        mutationFn: async (_id: number | string) => {
            try {
                return await instance.delete(`/categories/${_id}`)
            } catch (error) {
                throw new Error("Xóa sản phẩm thất bại")
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Danh mục đã được xóa thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            })
        },
    })

    const createFilters = (categorys: ICategory[]) => {
        return categorys
            .map((category: ICategory) => category.name)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
            .map((name: string) => ({ text: name, value: name }));
    };
   

    const columns = [
        {
            key: "_id",
            title: "ID",
            dataIndex: "_id",
        },
        {
            key: "name",
            title: "Tên danh mục",
            dataIndex: "name",
            filterSearch: true,
            filters: data ? createFilters(data?.data) : [],
            sorter: (a: ICategory, b: ICategory) => a.name.localeCompare(b.name),
            onFilter: (value: string , category: ICategory) => category.name.includes(value),
            sortDirections : ["ascend", "descend"],
        },
        {
            key: "action",
            title: "Action",
            render: (_: any, category: any) => {
                const {_id} = category;
                return (
                    <div className="flex space-x-2">
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn chắc chắn muốn xóa không?"
                            onConfirm={() => mutate(_id)}
                            // onCancel={cancel}
                            okText="Có"
                            cancelText="Không"
                        >
                            {isPending ? (
                                <>
                                    <Button danger>
                                        <Loader2Icon className="animate-spin" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button danger>Delete</Button>
                                </>
                            )}
                        </Popconfirm>
                        <Button>
                            <Link to={`/admin/categories/${_id}/edit`}>Cập nhật</Link>
                        </Button>
                    </div>
                );
            }
        }
    ]

    
    if (isLoading) return <div>...Loading</div>;
    if (isError) return <div>{error.message}</div>;
    return (
        <div>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
                <Button type="primary">
                    <Link to={`/admin/categories/add`}>
                        <PlusCircleFilled /> Thêm danh mục
                    </Link>
                </Button>
            </div>
            <Skeleton loading={isLoading} active>
                <Table dataSource={dataSource} columns={columns}></Table>
            </Skeleton>
        </div>
    );
};

export default CategoryManagementPage;
