import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import "./register.scss"
import { ucontext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'

function Register() {

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }

    const { register } = useContext(ucontext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {
        setError("")
        e.preventDefault()
        try {
            const success = await register(name, email, password)
            if (success) {
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
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
                        <button onClick={handleSubmit} type='submit' disabled={error !== ""}>CONTINUE</button>
                    </form>
                </main>
            </section>
        </motion.div>
    )
}

export default Register
