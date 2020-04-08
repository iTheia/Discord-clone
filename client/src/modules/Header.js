import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {

    const navList = React.createRef()

    const isLogin = ()=>{
        const user = localStorage.getItem('auth-token')
        if (user) {
            return 
        }
        return <Link className="login-button" to="/login">Login</Link>
    }
    const toggle = ()=>{
        const nav = document.querySelector('.nav-list')
        nav.classList.toggle('nav-active')
    }
    localStorage.removeItem('user')
    return (
        <div className="nav-bar">
            <div className="burger" onClick={toggle}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <ul className="nav-list" ref={navList}>
                <li className="nav-list__nav-item">
                    <a href="#1" className="nav-list__nav-link">Home</a>
                </li>
                <li className="nav-list__nav-item">
                    <a href="#1" className="nav-list__nav-link">About</a>
                </li>
                <li className="nav-list__nav-item">
                    <a href="#1" className="nav-list__nav-link">Developer</a>
                </li>
            </ul>
            {isLogin()}
        </div>
    )
}
