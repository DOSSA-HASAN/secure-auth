import React, { useState } from 'react'
import { motion } from 'framer-motion';
import "./login.scss"

function Login() {

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (

        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
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
                            <input type="email" name="email" id="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" name="password" id="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit">Login</button>
                    </form>
                </main>
            </section>
        </motion.div>
    )
}

export default Login
