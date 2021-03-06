import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  createOrderAndPay,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/", protect, addOrderItems);
router.post("/create_order_and_pay", protect, createOrderAndPay);
router.get("/", protect, admin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
