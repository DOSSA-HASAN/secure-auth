import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import genSalt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"
import transporter from "../config/nodeMailer.js"

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "missing required fields" })
    }

    try {

        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(409).json({ success: false, message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = userModel({
            name,
            email,
            password: hashedPassword
        })

        try {
            await user.save();
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        )

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Welcome to Secure-Auth",
            text: `Hey there ${name}, your account has been successfully created with the email id: ${email}`
        }

        await transporter.sendMail(mailOptions).catch((err) => { console.log(err.message) })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })


        res.status(201).json({
            success: true,
            message: "user registered successfully"
        })

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Both email and password are required" })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "logged in succesfully",
            user: { id: user._id, email: user.email, name: user.name }
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }
}

const logout = (req, res) => {


    try {
        if (!req?.cookies?.token) {
            return res.status(401).json({ success: false, message: "no user was logged in" })
        }
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
            path: "/"
        })

        return res.status(200).json({ success: true, message: "user logged out successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Sorry an error occured, could not log you out" })
    }
}

const sendVerifyOtp = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "missing user id" })
    }

    try {

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "sorry could not send an otp, account was not found" })
        }
        if (user.isAccountVerified) {
            return res.status(409).json({ success: false, message: "account has already been verified" })
        }

        const otp = String(Math.floor(10000 + Math.random() * 90000))

        user.verifyOtp = otp;
        //otp expires after one day
        user.verifyOtpExpiredAt = Date.now() + (24 * 60 * 60 * 1000)
        await user.save()

        //send mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your verification OTP is ${otp}. Kindly verify your account using this OTP`
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({ success: true, message: "otp has been set successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body

    if (!userId) {
        return res.status(400).json({ success: false, message: "user id is needed for verification" })
    }

    try {
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "user was not found" })
        }

        if (user.isAccountVerified) {
            return res.status(200).json({ success: true, message: "account had already been verified" })
        }

        if (user.verifyOtp = "" || otp !== user.verifyOtp) {
            return res.status(400).json({ success: false, message: "OTP may be invalid, please try again" })
        }

        if (user.verifyOtpExpiredAt < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP has expired" })
        }

        user.isAccountVerified = true
        user.verifyOtp = ""
        user.verifyOtpExpiredAt = 0

        await user.save()

        return res.status(200).json({ success: true, message: "Account verified successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const isAuthenticated = (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "user is authenticated" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const sendPasswordResetOtp = async (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.status(400).json({ success: false, message: "missing user id" })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "no user found" })
        }

        const otp = String(Math.floor(Math.random() * 900000) + 100000)

        user.resetOtp = otp;
        user.resetOtpExpiredAt = Date.now() + (15 * 60 * 1000)
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Rest OTP Request",
            text: `You had requested an OTP to reset your accounts password, kindly use this OTP for the process: ${otp}`
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({ success: true, message: "otp has been sent successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "missing required fields" })
    }

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "no user found" })
        }

        if (user.resetOtp == "" || user.resetOtpExpiredAt == 0) {
            return res.status(400).json({ success: false, message: "no reset otp was requested from this account" })
        }

        if (otp !== user.resetOtp){
            return res.status(400).json({ succes: false, message: "OTP is invalid, the otp provided does not match"})
        }

        if (user.resetOtpExpiredAt < Date.now()) {
            return res.status(400).json({ succes: false, message: "password reset otp has expired, please request for a new oe" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        user.resetOtp = ""
        user.resetOtpExpiredAt = 0
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Password Has Been Changed",
            text: `Your account of ID: ${user.id} has been changed`
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({ success: false, message: "Account password has been changed successfully"})

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendPasswordResetOtp, resetPassword }