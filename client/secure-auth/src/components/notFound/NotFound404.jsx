import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./notfound.scss"

function NotFound404() {

    const handleNavigate = () => {
        const navigate = useNavigate("/")
    }

    return (
        <section className='not-found-section'>
            <div className="bg-deco">
                <img src="/bg-gradient-deco.png" alt="" />
            </div>
            <figure>
                <img src="/robot-404.png" alt="" />
            </figure>
            <article>
                <h1>404</h1>
                <p>This page could not be found</p>
                <p>You can either stay and chill here, or go back to the beginning.</p>
                <button onClick={handleNavigate}>BACK TO HOME</button>
            </article>
        </section>
    )
}

export default NotFound404
