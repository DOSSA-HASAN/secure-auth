import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import Layout from '../Layout';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import VerifyEmail from '../components/verifyEmail/VerifyEmail';
import Password from '../components/password/Password';
import NotFound404 from '../components/notFound/NotFound404';
import Profile from '../components/userProfile/Profile';

function AnimatedRoutes() {

    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='verify-user' element={<VerifyEmail />} />
                    <Route path='reset-user-password' element={<Password />} />
                    <Route path='profile' element={<Profile />} />

                    <Route path='*' element={<NotFound404 />} />
                    {/* <Profile />
                         <ResetPassword /> */}
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
