import { Router } from "express";
import { createOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/order";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);
router.patch("/orders/:userId/:orderId/status", updateOrderStatus);
export default router;
