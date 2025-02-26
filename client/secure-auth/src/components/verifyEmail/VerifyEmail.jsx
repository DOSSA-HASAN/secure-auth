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

    const { user, requestVerificationOtp } = useContext(ucontext)
    const [otpValues, setOtpValues] = useState(new Array(6).fill(""))
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
        if (user.length !== 0) {
            requestVerificationOtp(user.userId)
        } else {
            navigate('/')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user.length !== 0){
            verifyAccount(otpValues, user.userId)
        } else {
            navigate('/')
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
