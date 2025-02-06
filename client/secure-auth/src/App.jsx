import React from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes } from 'react-router-dom'
import Register from './components/register/Register'

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <Register />
        <Routes>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
