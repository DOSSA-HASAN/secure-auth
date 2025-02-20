import React from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/login/Login'
import VerifyEmail from './components/verifyEmail/VerifyEmail'

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          {/* <Register /> */}
          {/* <Login /> */}
          <VerifyEmail />
        <Routes>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
