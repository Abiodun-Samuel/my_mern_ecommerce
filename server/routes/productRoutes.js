import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/", getProducts);
//or
// router.route("/").get(getProducts);

router.get("/:id", getProductById);
//or
// router.route("/iis").get(getProductById);

// Admin priviledges
router.delete("/:id", protect, admin, deleteProduct);

export default router;
