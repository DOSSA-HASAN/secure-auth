import React, { useState } from 'react'
import ResetPassword from './ResetPassword'
import PasswordOtp from './PasswordOtp'
import { motion } from 'framer-motion'

function Password() {

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    }

    const [otpSuccess, setOtpSucces] = useState(false)

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <main>
                {
                    otpSuccess ? <ResetPassword /> : <PasswordOtp />
                }
            </main>
        </motion.div>
    )
}

export default Password
