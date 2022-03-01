import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Public Routes
router.get("/", getProducts);
//or
// router.route("/").get(getProducts);

router.get("/:id", getProductById);

//Autheticated Users Routes
router.post("/:id/reviews", protect, createProductReview);
//or
// router.route("/:id").get(getProductById);

// Admin Routes
router.delete("/:id", protect, admin, deleteProduct);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);

export default router;
