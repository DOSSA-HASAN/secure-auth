import React, { useContext, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import "./verifyemail.scss"
import { ucontext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }

    const { user, requestVerificationOtp, verifyAccount } = useContext(ucontext)
    const [otpValues, setOtpValues] = useState(new Array(5).fill(""))
    const [error, setError] = useState("");
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const handleOtpInput = (e, index) => {
        const value = e.target.value
        if (/^[0-9]$/.test(value) || value == "") {
            const newOtpvalue = [...otpValues]
            newOtpvalue[index] = value
            setOtpValues(newOtpvalue)

            if (value !== "" && index < 6) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtpValues = [...otpValues]
            newOtpValues[index] = ""
            setOtpValues(newOtpValues)

            if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    }

    const handleResendOtp = (e) => {
        e.preventDefault()
        setError("")
        if (user.length !== 0) {
            requestVerificationOtp(user.id)
        } else {
            navigate('/')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.isAccountVerified == false) {
            const otpString = otpValues.join("")
            const otpNumber = Number(otpString)
            const success = await verifyAccount(user?.id, otpNumber.toString())

            if (success) {
                setError("")
                console.log("account verified")
                navigate('/profile')
            } else {
                console.log("otp may have expired")
                setError("OTP may have expired or does not match, click the link below to generate a new OTP code")
            }
        } else {
            navigate('/profile')
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <section className='verify-email-section'>
                <div className="bg-deco">
                    <img src="/bg-gradient-deco.png" alt="" />
                </div>
                {
                    error !== "" &&
                    <div className="error">
                        <p>{error}</p>
                    </div>
                }
                <main className='main-verify-cont'>
                    <div className="input-cont">
                        {otpValues.map((value, index) => (
                            <input
                                key={index}
                                type='number'
                                className='box'
                                value={value}
                                onChange={(e) => handleOtpInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => inputRefs.current[index] = el}
                                maxLength={1}
                            />
                        ))}
                    </div>
                    <button onClick={handleSubmit}>Submit OTP</button>
                    <div className="resend-email-cont">
                        <p>click <span onClick={handleResendOtp}>here</span> to resend the email if you havent already received one.</p>
                    </div>
                </main>

            </section>
        </motion.div>
    )
}

export default VerifyEmail
