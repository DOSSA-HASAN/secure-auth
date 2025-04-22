import React, { useContext } from 'react'
import "./profile.scss"
import { ucontext } from '../../UserContext'
import { Link } from 'react-router-dom'

function Profile() {

    const { user } = useContext(ucontext)

    return (
        <section className='profile-section'>
            <div className="bg-deco">
                <img src="/bg-gradient-deco.png" alt="" />
            </div>
            <article>
                {
                    user == null ?
                        <Link to={'/'}><p>Click Here to Login</p></Link> :
                        <h1>WELCOME {user.name}</h1>
                }
            </article>
        </section>
    )
}

export default Profile
