import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

interface CartActionParams {
    userId: string;
    productId?: string;
    quantity?: number;
}

const CART_QUERY_KEY = "cart";

const fetchCart = async (userId: string) => {
    const { data } = await axios.get(`${BASE_URL}/carts/${userId}`);
    return data;
};

const modifyCart = async (action: string, params: CartActionParams) => {
    const url = `${BASE_URL}/carts/${action}`;
    const { data } = await axios.put(url, params);
    return data.cart;
};

const useCart = (userId: string) => {
    const queryClient = useQueryClient();

    const {
        data: cart,
        isLoading,
        error,
    } = useQuery({
        queryKey: [CART_QUERY_KEY, userId],
        queryFn: () => fetchCart(userId),
        enabled: !!userId,
    });

    const mutationOptions = {
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [CART_QUERY_KEY, userId],
            }),
    };

    const performMutation = (action: string) => {
        return useMutation({
            mutationFn: (params: CartActionParams) => modifyCart(action, params),
            ...mutationOptions,
        });
    };

    return {
        cart,
        isLoading,
        error,
        addItem: performMutation("add-to-cart"),
        updateQuantity: performMutation("update"),
        removeItem: performMutation("remove"),
        increaseQuantity: performMutation("increase"),
        decreaseQuantity: performMutation("decrease"),
    };
};

export default useCart;
