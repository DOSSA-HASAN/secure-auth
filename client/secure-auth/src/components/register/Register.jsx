import React, { useState } from 'react'
import "./register.scss"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const setPass = (e) => {
        setPassword(e.target.value)
        validatePasswordMatch(e.target.value, confirmPassword)
    }

    const confirmPass = (e) => {
        setConfirmPassword(e.target.value)
        validatePasswordMatch(password, e.target.value)
    }

    const validatePasswordMatch = (pass, confirmedPass) => {
        if (confirmPassword && pass !== confirmedPass) {
            setError("Passwords do not match")
        } else {
            setError("")
        }
    }

    return (
        <section className='register-section'>
            <main className="register-main-container">
                <div className="bg-deco"></div>
                <figure className="left">
                    <h1>Nice to meet you :)</h1>
                    <p>Just register to join with us</p>
                    <i class="fa-solid fa-arrow-right"></i>
                    <div className="deco"></div>
                </figure>
                <form>
                    <h2>Register</h2>
                    <input type="text" name="username" id="username" required placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    <input type="email" name="email" id="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <span className='password-error'>
                        <p>{error}</p>
                    </span>
                    <div className="passwords">
                        <input type="password" name="password" id="password" placeholder='Password' onChange={setPass} />
                        <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm password' onChange={confirmPass} />
                    </div>
                    <button type='submit' disabled={error !== ""}>CONTINUE</button>
                </form>
            </main>
        </section>
    )
}

export default Register
