import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", getProducts);
//or
// router.route("/").get(getProducts);

router.get("/:id", getProductById);
//or
// router.route("/:id").get(getProductById);

// Admin priviledges
router.delete("/:id", protect, admin, deleteProduct);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);

export default router;
