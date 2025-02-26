import React, { useEffect, useState } from 'react'
import "./resetpassword.scss"

function ResetPassword() {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmedPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState()

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

    return (
        <section className='reset-password-form-section'>
            <div className="bg-deco">
                <img src="/bg-gradient-deco.png" alt="" />
            </div>

            <div className={passwordsMatch ? '' : "error-cont"}>
                <p>{error}</p>
            </div>

            <input type="password" name='new-pass' required placeholder='Enter New Password' onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" name='confirm-pass' required placeholder='Confirm New Password' onChange={(e) => setConfirmedPassword(e.target.value)} />
            {/* <button onClick={handleSubmit} disabled={!passwordsMatch} style={{ cursor: !passwordsMatch ? 'not-allowed' : 'pointer', backgroundColor: !passwordsMatch ? '#275927' : '#21c321', color: !passwordsMatch ? 'gray' : '#fff' }}>Save Changes</button> */}
            <p>You will be required to login again after changin your password</p>
        </section>
    )
}

export default ResetPassword
