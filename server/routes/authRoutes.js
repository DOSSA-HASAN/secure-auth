import express from "express"
import { isAuthenticated, login, logout, register, resetPassword, sendPasswordResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/authController.js"
import userAuth from "../middleware/userAuth.js"
import passport from "passport"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/send-otp", userAuth, sendVerifyOtp)
router.post("/verify-account", userAuth, verifyEmail)
router.post("/authenticated", userAuth, isAuthenticated)
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