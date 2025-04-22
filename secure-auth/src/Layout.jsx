import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <section>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default Layout
