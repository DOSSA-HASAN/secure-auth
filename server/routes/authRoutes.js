import express from "express"
import { isAuthenticated, login, logout, register, sendVerifyOtp, verifyEmail } from "../controllers/authController.js"
import userAuth from "../middleware/userAuth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/send-otp", userAuth, sendVerifyOtp)
router.post("/verify-account", userAuth, verifyEmail)
router.post("/authenticated", userAuth, isAuthenticated)

export default router