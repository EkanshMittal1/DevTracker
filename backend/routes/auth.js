import express from "express";
import { register, login } from "../controllers/authController.js";

// routes/auth.js
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { message: "Too many attempts, pleaseconst router = express.Router(); try again later" },
});
const router = express.Router();
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);


router.post("/register", register);
router.post("/login", login);

export default router;