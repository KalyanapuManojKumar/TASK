import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import referralRoutes from "./routes/referral.routes.js";

dotenv.config();
connectDB();

const app = express();

/* =========================
   Security Middlewares
========================= */

// Secure HTTP headers
app.use(helmet());

// Rate Limiting (100 requests per 15 mins per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

/* =========================
   CORS Configuration
========================= */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow cookies
  }),
);

/* =========================
   Body & Cookie Parsing
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   Routes
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/referrals", referralRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =========================
   Global Error Handler
========================= */

app.use(errorHandler);

/* =========================
   Server Start
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
