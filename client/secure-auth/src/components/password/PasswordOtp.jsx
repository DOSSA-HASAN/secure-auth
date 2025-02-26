import React, { useState, useRef, useContext, useEffect } from 'react'
import { ucontext } from '../../UserContext'
import "../verifyEmail/verifyemail.scss"
import { useNavigate } from 'react-router-dom'

function PasswordOtp() {

    const { user, resetPassword } = useContext(ucontext)
    const [otpValues, setOtpValues] = useState(new Array(6).fill(""))
    const inputRefs = useRef([])
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmedPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState()
    const navigate = useNavigate()

    const validatePasswords = () => {
        if (newPassword !== confirmPassword) {
            setError("passwords dont match")
            setPasswordsMatch(false)
        } else if (newPassword == confirmPassword) {
            setError("")
            setPasswordsMatch(true)
        }
    }

    useEffect(() => {
        validatePasswords()
    }, [newPassword, confirmPassword])

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

    const handleResendOtp = () => {
        if (user) {
            requestPasswordResetOtp(user.email)
        } else {
            navigate('/')
        }
    }

    const handleSubmit = (e) => {
        if (passwordsMatch) {
            resetPassword(user.email, otpValues, newPassword)
        }
    }

    return (
        <>
            <section className='reset-password-otp-section'>
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
                    <div className="resend-email-cont">
                        <p>click <span onClick={handleResendOtp}>here</span> to resend the OTP if you havent already received one.</p>
                    </div>
                </main>
            </section>
            <section className='reset-password-form-section'>
                <div className="bg-deco">
                    <img src="/bg-gradient-deco.png" alt="" />
                </div>

                <div className={passwordsMatch ? '' : "error-cont"}>
                    <p>{error}</p>
                </div>

                <input type="password" name='new-pass' required placeholder='Enter New Password' onChange={(e) => setNewPassword(e.target.value)} />
                <input type="password" name='confirm-pass' required placeholder='Confirm New Password' onChange={(e) => setConfirmedPassword(e.target.value)} />
                <button onClick={handleSubmit} disabled={!passwordsMatch} style={{ cursor: !passwordsMatch ? 'not-allowed' : 'pointer', backgroundColor: !passwordsMatch ? '#275927' : '#21c321', color: !passwordsMatch ? 'gray' : '#fff' }}>Save Changes</button>
                <p>You will be required to login again after changin your password</p>
            </section>
        </>
    )
}

export default PasswordOtp
