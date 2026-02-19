import express from "express";
import {
  createReferral,
  getAllReferrals,
  getMyReferrals,
} from "../controllers/referral.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create referral
router.post("/", protect, createReferral);

// Get all referrals
router.get("/", protect, getAllReferrals);

// Get my referrals
router.get("/my", protect, getMyReferrals);

export default router;
