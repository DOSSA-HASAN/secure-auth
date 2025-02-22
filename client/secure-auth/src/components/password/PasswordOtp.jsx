import React, { useState, useRef } from 'react'
import "../verifyEmail/verifyemail.scss"

function PasswordOtp() {

    const [otpValues, setOtpValues] = useState(new Array(6).fill(""))
    const inputRefs = useRef([])

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

    const handleResendOtp = () => { }
    return (
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
                <button>Submit OTP</button>
                <div className="resend-email-cont">
                    <p>click <span onClick={handleResendOtp}>here</span> to resend the OTP if you havent already received one.</p>
                </div>
            </main>
        </section>
    )
}

export default PasswordOtp
