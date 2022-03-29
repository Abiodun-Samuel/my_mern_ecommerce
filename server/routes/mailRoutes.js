import express from "express";
const router = express.Router();
import { productRequestMail } from "../controllers/mailController.js";
import { protect } from "../middleware/authMiddleware.js";

// send request product info mail
router.post("/product_request", protect, productRequestMail);

export default router;
