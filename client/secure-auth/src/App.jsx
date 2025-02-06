import React from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/login/Login'

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          {/* <Register /> */}
          <Login />
        <Routes>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
