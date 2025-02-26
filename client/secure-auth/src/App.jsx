import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/login/Login'
import VerifyEmail from './components/verifyEmail/VerifyEmail'
import NotFound404 from './components/notFound/NotFound404'
import Profile from './components/userProfile/Profile'
import Layout from './Layout'
import Password from './components/password/Password'
import AnimatedRoutes from './animatedRoutes/AnimatedRoutes'
import { UserContext } from './UserContext'

function App() {
  return (
    <>
      <UserContext>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </UserContext>
    </>
  )
}

export default App
