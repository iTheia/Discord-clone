import React from 'react'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import iphone from '../src/iphone.svg'
import phone from '../src/phone.svg'
import desktop from '../src/desktop.svg'
import laptop from '../src/laptop.svg'
import cube from '../src/cube.svg'
import bomb from '../src/bomb.svg'
import coin from '../src/coin.svg'
import triangle from '../src/triangle.svg'
import controller from '../src/controller.svg'
import circle from '../src/circle.svg'
import box from '../src/box.svg'
import { Link } from 'react-router-dom'

export default function Home() {
    localStorage.removeItem('auth-token')
    return (
        <div className="landing-page">
            <Header />
            <div className="home container">
                <h1>A new way to chat with your communities and friends.</h1>
                <p>Discord is the easiest way to communicate over voice, video, and text, whether you’re part of a school club, a nightly gaming group, a worldwide art community, or just a handful of friends that want to hang out.</p>
                <button className="fancy__button__alternative">Download for windows</button>
                <Link className="fancy__button" to="/home">Open App in the browser </Link>
                <div className="content">
                    <img className="desktop" src={desktop} alt=""/>
                    <img className="iphone" src={iphone} alt=""/>
                    <img className="phone" src={phone} alt=""/>
                    <img className="laptop" src={laptop} alt=""/>
                    <img className="controller" src={controller} alt=""/>
                </div>
            </div>
            <div className="about container">
                <div className="content">
                    <h1>Hellow User</h1>
                    <p>This is a simple copy of the discord page and functionality,
                    it is made for my own development and I hope you <span className="highlight">enjoy it</span></p>
                    <p>With this application you can create your own servers, within them text channels that you can
                    create or delete as you like, invite friends, chat with them privately</p>
                    <h1>Technical info</h1>
                    <p>
                        This app is made using <span className="highlight">React MongoDb Express NodeJs</span>
                    </p>
                </div>
            </div>
            <div className="developer container">
                
            </div>
            <Footer/>
        </div>
    )
}
