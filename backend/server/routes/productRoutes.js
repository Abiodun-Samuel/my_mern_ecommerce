import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductBySlug,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Public Routes
router.get("/", getProducts);
//or
// router.route("/").get(getProducts);

router.get("/top", getTopProducts);
router.get("/:slug", getProductBySlug);
router.get("/category/:category_slug", getProductsByCategory);
// router.get("/category/:slug", getProductById);

//Autheticated Users Routes
router.post("/:slug/reviews", protect, createProductReview);
//or
// router.route("/:id").get(getProductById);

// Admin Routes
router.delete("/:slug", protect, admin, deleteProduct);
router.post("/", protect, admin, createProduct);
router.put("/:slug", protect, admin, updateProduct);

export default router;
