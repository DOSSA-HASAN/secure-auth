import React, { useState } from 'react'
import "./register.scss"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
                    <input type="email" name="email" id="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                    <div className="passwords">
                        <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <button>CONTINUE</button>
                </form>
            </main>
        </section>
    )
}

export default Register
