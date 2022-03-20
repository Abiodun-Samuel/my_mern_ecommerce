import express from "express";
const router = express.Router();
import {
  addCategory,
  getCategory,
  getProductsByCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/", protect, admin, addCategory);
router.get("/", getCategory);
router.get("/:slug", getProductsByCategory);
// router.get("/myorders", protect, getMyOrders);
// router.get("/:id", protect, getOrderById);
// router.put("/:id/pay", protect, updateOrderToPaid);
// router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
