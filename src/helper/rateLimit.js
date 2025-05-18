import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000, // max 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, try again later",
});
