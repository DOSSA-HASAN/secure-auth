import express from "express"
import { isAuthenticated, login, logout, register, resetPassword, sendPasswordResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/authController.js"
import passport from "passport"
import { verify } from "../middleware/verify.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/send-otp", verify, sendVerifyOtp)
router.post("/verify-account", verify, verifyEmail)
router.post("/authenticated", verify, isAuthenticated)
router.post("/send-reset-otp", sendPasswordResetOtp)
router.post("/reset-password", resetPassword)

//google auth routes
router.get('google', passport.authenticate('google', { scope: ['email', 'profile'] }))

//google callback redirect
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile')
    }
)

export default router