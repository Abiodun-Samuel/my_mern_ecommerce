import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

router.get("/", getProducts);
//or
// router.route("/").get(getProducts);

router.get("/:id", getProductById);
//or
// router.route("/iis").get(getProductById);

export default router;
