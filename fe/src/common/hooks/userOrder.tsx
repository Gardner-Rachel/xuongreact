import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export interface OrderActionParams {
    userId: string;
    orderId?: string;
    items?: any[];
    totalPrice?: number;
    customerName?: string;
    status?: string;
}

const ORDER_QUERY_KEY = "order";

const fetchOrder = async (userId: string, orderId: string) => {
    if (!orderId) {
        throw new Error("orderId is required");
    }
    const url = `${BASE_URL}/orders/${userId}/${orderId}`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error: any) {
        throw new Error(`Error fetching order: ${error.message}`);
    }
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
        return data;
    }
};

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
        enabled: !!userId && !!orderId,
    });

    const mutationOptions = {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY, userId, orderId],
            });
        },
    };

    const createOrder = useMutation({
        mutationFn: (params: Omit<OrderActionParams, 'userId'>) => modifyOrder(ACTION_TYPES.CREATE, { userId, ...params }),
        ...mutationOptions,
    });

    const updateOrder = useMutation({
        mutationFn: (params: Omit<OrderActionParams, 'userId' | 'orderId'>) => modifyOrder(ACTION_TYPES.UPDATE, { userId, ...params }),
        ...mutationOptions,
    });

    const updateOrderStatus = useMutation({
        mutationFn: (params: Omit<OrderActionParams, 'userId' | 'orderId'>) => modifyOrder(ACTION_TYPES.UPDATE_STATUS, { userId, ...params }),
        ...mutationOptions,
    });

    return {
        order,
        isLoading,
        error,
        createOrder: createOrder.mutate,
        updateOrder: updateOrder.mutate,
        updateOrderStatus: updateOrderStatus.mutate,
    };
};

export default useOrder;
