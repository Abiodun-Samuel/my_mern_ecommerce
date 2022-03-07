import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getPayStackPublicKey } from "../controllers/paymentController.js";

const router = express.Router();
router.get("/paystack_public_key", protect, getPayStackPublicKey);

export default router;
