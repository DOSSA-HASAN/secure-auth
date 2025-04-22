import express from "express"
import { getUserInfo, isAuthenticated, login, logout, register, resetPassword, sendPasswordResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/authController.js"
import passport from "passport"
import { verify } from "../middleware/verify.js"
import { refresh } from "../middleware/refresh.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/send-otp", verify, sendVerifyOtp)
router.post("/verify-account", verify, verifyEmail)
router.post("/authenticated", verify, isAuthenticated)
router.post("/send-reset-otp", sendPasswordResetOtp)
router.post("/reset-password", resetPassword)
router.post("/refresh", refresh)
router.get('/user/:userId', getUserInfo)

export default router