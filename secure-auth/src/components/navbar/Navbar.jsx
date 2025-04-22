import React, { useContext, useState } from 'react'
import "./navbar.scss"
import { Link } from "react-router-dom"
import { ucontext } from '../../UserContext'

function Navbar() {

    const { user, logout } = useContext(ucontext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLinksOpen, setIsLinksOpen] = useState(false)

    return (
        <nav className='navigation-bar'>
            <figure className="logo-cont">
                <img src="/logo.png" alt="" />
                <h1>SECURE AUTH</h1>
            </figure>
            <main className="links-cont">
                {!user?.id && <Link to={""}><p>LOGIN</p></Link>}
                {!user?.id && <Link to={"/register"} className='register-btn'><p>REGISTER</p></Link>}
                {
                    user &&
                    <figure className={isLinksOpen ? 'account-setting display-setting' : 'account-setting'}>
                        <i onClick={() => setIsLinksOpen(!isLinksOpen)} className="fa-solid fa-gear"></i>

                        <article className={isLinksOpen ? 'settings' : 'hide-settings'}>
                            <Link to={"reset-user-password"}><p>RESET PASSWORD</p></Link>
                            {user.isAccountVerified !== true && <Link to={"verify-user"}><p>VERIFY ACCOUNT</p></Link>}
                            {user == null && <Link to={"login"}><p>LOGIN</p></Link>}
                            <Link to={""} onClick={logout}><p>LOGOUT</p></Link>
                            {
                                user?.name &&
                                <span>
                                    <div className="circle">{user?.name[0]}</div>
                                    <Link to={"/profile"}><p>PROFILE</p></Link>
                                </span>
                            }
                        </article>
                    </figure>
                }
            </main>
            <main className="mobile-menu">
                <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <article className={isMenuOpen ? "mobile-links" : "hide-mobile-links"}>
                    <Link to={"login"}><p>LOGIN</p></Link>
                    <Link to={"register"}><p>REGISTER</p></Link>
                    <Link to={"reset-user-password"}><p>RESET PASSWORD</p></Link>
                    {user?.isAccountVerified !== true && <Link to={"verify-user"}><p>VERIFY ACCOUNT</p></Link>}
                    <Link to={""} onClick={logout}><p>LOGOUT</p></Link>
                    {
                        user?.name &&
                        <span>
                            <div className="circle">{user?.name[0]}</div>
                            <Link to={"/profile"}><p>PROFILE</p></Link>
                        </span>
                    }
                </article>
            </main>
        </nav>
    )
}

export default Navbar
