import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

interface OrderActionParams {
    userId: string;
    orderId?: string;
    items?: any[];
    totalPrice?: number;
    customerName?: string;
    status?: string;
}

const ORDER_QUERY_KEY = "order";

const fetchOrder = async (userId: string, orderId?: string) => {
    const url = orderId 
        ? `${BASE_URL}/orders/${userId}/${orderId}` 
        : `${BASE_URL}/orders/${userId}`;
    const { data } = await axios.get(url);
    return data;
};

const modifyOrder = async (action: string, params: OrderActionParams) => {
    let url = `${BASE_URL}/orders`;
    if (action === ACTION_TYPES.UPDATE_STATUS) {
        url += `/${params.userId}/${params.orderId}/status`;
        const { data } = await axios.patch(url, { status: params.status });
        return data;
    } else {
        const method = action === ACTION_TYPES.CREATE ? 'post' : 'put';
        const { data } = await axios[method](url, params);
        return data.order;
    }
};


// Định nghĩa các loại hành động
const ACTION_TYPES = {
    CREATE: "create",
    UPDATE: "update",
    UPDATE_STATUS: "updateStatus",
};

const useOrder = (userId: string, orderId?: string) => {
    const queryClient = useQueryClient();

    const {
        data: order,
        isLoading,
        error,
    } = useQuery({
        queryKey: [ORDER_QUERY_KEY, userId, orderId],
        queryFn: () => fetchOrder(userId, orderId || ''),
        enabled: !!userId,
    });

    const mutationOptions = {
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY, userId, orderId],
            }),
    };

    const performMutation = (action: string) => {
        return useMutation({
            mutationFn: (params: OrderActionParams) => modifyOrder(action, params),
            ...mutationOptions,
        });
    };

    const orderActions = (action: string) => ({
        mutate: (params: OrderActionParams) =>
            performMutation(action).mutate(params),
    });

    // Hàm tạo đơn hàng mới
    const createOrder = (orderDetails: Omit<OrderActionParams, 'userId'>) =>
        orderActions(ACTION_TYPES.CREATE).mutate({ userId, ...orderDetails });

    // Hàm cập nhật đơn hàng
    const updateOrder = (orderId: string, orderDetails: Omit<OrderActionParams, 'userId' | 'orderId'>) =>
        orderActions(ACTION_TYPES.UPDATE).mutate({ userId, orderId, ...orderDetails });

    // Hàm cập nhật trạng thái đơn hàng
    const updateOrderStatus = (orderId: string, status: string) =>
        orderActions(ACTION_TYPES.UPDATE_STATUS).mutate({ userId, orderId, status });

    return {
        order,
        isLoading,
        error,
        createOrder,
        updateOrder,
        updateOrderStatus,
    };
};


export default useOrder;
