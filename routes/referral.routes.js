import express from "express";
import {
  createReferral,
  getAllReferrals,
  getMyReferrals,
} from "../controllers/referral.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createReferralSchema } from "../validations/referral.validation.js";

const router = express.Router();

// ✅ Create referral with validation
router.post("/", protect, validate(createReferralSchema), createReferral);

// Get all referrals
router.get("/", protect, getAllReferrals);

// Get my referrals
router.get("/my", protect, getMyReferrals);

export default router;
