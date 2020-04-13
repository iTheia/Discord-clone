import React from 'react'
import { Link } from 'react-router-dom'
export default function TopSlide({leftPannel, rigthPannel, center:{title, link}}) {

    const pannelActive = (name) => {
        const pannel = document.querySelector(`.${name}`)
        pannel.classList.toggle(`${name}__active`)
    }

    return (
        <div className="top-slide">
            <div className="burger" onClick={() => pannelActive(leftPannel)} >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <Link className="center" to={link}>{title}</Link>
            <div className="burger" onClick={() => pannelActive(rigthPannel)}  >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}
