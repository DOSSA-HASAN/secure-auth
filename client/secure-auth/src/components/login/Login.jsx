import React from 'react'
import "./login.scss"

function Login() {
    return (
        <section className="login-section">
            <main className="login-main-container">
                <div className="bg-deco"></div>
                <figure className="left">
                    <h1>Welcome back</h1>
                    <p>Please login to continue</p>
                    <i class="fa-solid fa-arrow-right"></i>
                    <div className="deco"></div>
                </figure>
                <form>
                    <h2>Login</h2>
                    <div className="inputs">
                        <input type="email" name="email" id="email" placeholder='Email' required />
                        <input type="password" name="password" id="password" placeholder='Password' required/>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </main>
        </section>
    )
}

export default Login
