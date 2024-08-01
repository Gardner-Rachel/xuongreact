// Định nghĩa interface cho item trong đơn hàng
interface OrderItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

// Định nghĩa interface cho đơn hàng
interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    orderNumber: string;
    customerName: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
}