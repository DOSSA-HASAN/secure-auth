import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import "./notfound.scss"

function NotFound404() {

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }
    
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <section className='not-found-section'>
                <div className="bg-deco">
                    <img src="/bg-gradient-deco.png" alt="" />
                </div>
                <figure>
                    <img src="/robot-404.png" alt="" />
                </figure>
                <article>
                    <h1>404</h1>
                    <p>This page could not be found</p>
                    <p>You can either stay and chill here, or go back to the beginning.</p>
                    <button onClick={handleNavigate}>BACK TO HOME</button>
                </article>
            </section>
        </motion.div>
    )
}

export default NotFound404
