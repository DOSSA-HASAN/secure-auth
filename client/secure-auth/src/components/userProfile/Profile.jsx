import React, { useContext } from 'react'
import "./profile.scss"
import { ucontext } from '../../UserContext'

function Profile() {

    const { user } = useContext(ucontext)

    return (
        <section className='profile-section'>
            <div className="bg-deco">
                <img src="/bg-gradient-deco.png" alt="" />
            </div>
            <article>
                <h1>WELCOME {user.name}</h1>
            </article>
        </section>
    )
}

export default Profile
