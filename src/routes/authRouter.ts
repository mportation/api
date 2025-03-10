import { Router } from "express";
import { signupAuth, loginAuth, otpAuth, verifyOtp, resendOtp } from "../controllers/authController.js";

const router = Router();

router.post("/login", loginAuth);
router.post("/signup", signupAuth);
router.post("/otp", otpAuth);
router.post("/verify", verifyOtp);
router.post("/resend", resendOtp);

export default router;

